import { serverSupabaseClient } from '#supabase/server'

const SLUG_REGEX = /^[a-z0-9-]+$/
const MAX_WISHES = 5_000
// 8 MB hard cap on re-downloaded audio to avoid runaway downloads
const MAX_AUDIO_BYTES = 8 * 1024 * 1024

// Fields we accept from the export; anything else is stripped.
const WEDDING_FIELDS = [
  'slug', 'title', 'language', 'theme_id', 'published',
  'bride_callname', 'bride_fullname', 'bride_info_1', 'bride_info_2', 'bride_info_3',
  'groom_callname', 'groom_fullname', 'groom_info_1', 'groom_info_2', 'groom_info_3',
  'events', 'gifts',
  'livestream_platform', 'livestream_url', 'livestream_event_date',
  'livestream_start_time', 'livestream_is_active',
  'autoplay', 'loop', 'is_active', 'wa_message_template', 'user_config',
] as const

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // ── Basic format validation ────────────────────────────────────────────────
  if (!body || typeof body !== 'object' || body.version !== '1.0' || !body.wedding || typeof body.wedding !== 'object') {
    throw createError({ statusCode: 400, statusMessage: 'Invalid export file format' })
  }

  const userClient = await serverSupabaseClient(event)
  const { data: { user }, error: authError } = await userClient.auth.getUser()

  if (authError || !user) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const rawWedding = body.wedding as Record<string, unknown>
  const audioInfo = body.audio as {
    source_type: string
    title: string
    artist: string | null
    url: string | null
  } | null
  const rawWishes = Array.isArray(body.wishes) ? body.wishes : []

  // ── Build safe wedding payload ─────────────────────────────────────────────
  const weddingPayload: Record<string, unknown> = {}
  for (const field of WEDDING_FIELDS) {
    if (field in rawWedding) {
      weddingPayload[field] = rawWedding[field]
    }
  }

  // Validate and sanitise slug
  let slug = typeof weddingPayload.slug === 'string' ? weddingPayload.slug.trim() : ''
  if (!slug || !SLUG_REGEX.test(slug)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid slug in export file' })
  }

  // Ensure the slug is unique for this user's invitations
  const { data: slugConflict } = await userClient
    .from('weddings')
    .select('id')
    .eq('slug', slug)
    .maybeSingle()

  if (slugConflict) {
    slug = `${slug}-${Date.now()}`
    weddingPayload.slug = slug
  }

  // ── Handle audio ───────────────────────────────────────────────────────────
  let audioId: number | null = null

  if (audioInfo && typeof audioInfo === 'object') {
    if (audioInfo.source_type === 'system') {
      // Match by title among active system tracks
      const { data: match } = await userClient
        .from('audios')
        .select('id')
        .eq('source_type', 'system')
        .eq('is_active', true)
        .eq('title', String(audioInfo.title))
        .maybeSingle()
      audioId = match?.id ?? null

    } else if (audioInfo.source_type === 'user' && typeof audioInfo.url === 'string') {
      // Re-upload user audio to the importing user's storage
      try {
        // Validate the URL points to a Supabase Storage host to prevent SSRF
        const parsedUrl = new URL(audioInfo.url)
        const isSupabaseStorage = parsedUrl.hostname.endsWith('.supabase.co') || parsedUrl.hostname.endsWith('.supabase.in')
        if (!isSupabaseStorage) {
          console.warn('[Import] Skipping audio re-upload: URL is not a Supabase Storage host')
        } else {
          const response = await fetch(audioInfo.url)

          // Guard against oversized files
          const contentLength = Number(response.headers.get('content-length') ?? 0)
          if (response.ok && (contentLength === 0 || contentLength <= MAX_AUDIO_BYTES)) {
            const buffer = await response.arrayBuffer()

            if (buffer.byteLength <= MAX_AUDIO_BYTES) {
              const urlPath = audioInfo.url.split('?')[0]
              const ext = (urlPath.split('.').pop() ?? 'mp3').toLowerCase().replace(/[^a-z0-9]/g, '')
              const allowedExts = ['mp3', 'ogg', 'wav', 'aac', 'm4a', 'flac', 'opus']
              const safeExt = allowedExts.includes(ext) ? ext : 'mp3'
              const fileName = `${user.id}/${Date.now()}.${safeExt}`

              const { error: uploadError } = await userClient.storage
                .from('system_audios')
                .upload(fileName, buffer, { contentType: `audio/${safeExt}` })

              if (!uploadError) {
                const { data: { publicUrl } } = userClient.storage
                  .from('system_audios')
                  .getPublicUrl(fileName)

                const { data: newAudio } = await (userClient as any)
                  .from('audios')
                  .insert({
                    title: String(audioInfo.title ?? 'Imported Audio'),
                    artist: audioInfo.artist ? String(audioInfo.artist) : null,
                    url: publicUrl,
                    source_type: 'user',
                    is_premium: false,
                    is_active: true,
                    user_id: user.id,
                  })
                  .select('id')
                  .single()

                audioId = newAudio?.id ?? null
              }
            }
          }
        }
      } catch (err) {
        // Non-fatal — invitation is still imported, just without audio
        console.error('[Import] Failed to re-upload audio:', err)
      }
    }
  }

  // ── Create the wedding record ──────────────────────────────────────────────
  const { data: newWedding, error: insertError } = await userClient
    .from('weddings')
    .insert({
      ...weddingPayload,
      slug,
      user_id: user.id,
      audio_id: audioId,
      // Always import as unpublished draft — the new owner decides when to publish
      published: false,
    } as any)
    .select('id, slug')
    .single()

  if (insertError || !newWedding) {
    throw createError({ statusCode: 500, statusMessage: `Failed to create invitation: ${insertError?.message ?? 'unknown error'}` })
  }

  // ── Import wishes (capped at MAX_WISHES) ───────────────────────────────────
  let wishesImported = 0
  const wishSlice = rawWishes.slice(0, MAX_WISHES) as Array<Record<string, unknown>>

  if (wishSlice.length > 0) {
    const wishRows = wishSlice.map((w) => ({
      wedding_id: String(newWedding.id),
      guest_name: typeof w.guest_name === 'string' ? w.guest_name.slice(0, 200) : 'Guest',
      message: typeof w.message === 'string' ? w.message.slice(0, 2000) : null,
      attendance: typeof w.attendance === 'string' ? w.attendance : null,
      guest_count: typeof w.guest_count === 'number' && w.guest_count > 0 ? Math.floor(w.guest_count) : 1,
      created_at: typeof w.created_at === 'string' ? w.created_at : new Date().toISOString(),
    }))

    const { error: wishError } = await userClient.from('wishes').insert(wishRows)
    if (wishError) {
      console.error('[Import] Failed to import wishes:', wishError)
    } else {
      wishesImported = wishRows.length
    }
  }

  return {
    success: true,
    wedding: {
      id: newWedding.id,
      slug: newWedding.slug,
    },
    audioImported: audioId !== null,
    wishesImported,
  }
})
