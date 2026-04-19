import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  if (!id || isNaN(Number(id))) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid invitation ID' })
  }

  const userClient = await serverSupabaseClient(event)
  const { data: { user }, error: authError } = await userClient.auth.getUser()

  if (authError || !user) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  // Fetch wedding (RLS + explicit owner check)
  const { data: wedding, error: weddingError } = await userClient
    .from('weddings')
    .select('*')
    .eq('id', Number(id))
    .eq('user_id', user.id)
    .single()

  if (weddingError || !wedding) {
    throw createError({ statusCode: 404, statusMessage: 'Invitation not found or access denied' })
  }

  // Fetch audio metadata if the invitation has audio
  let audioInfo: {
    source_type: string
    title: string
    artist: string | null
    url: string | null
  } | null = null

  if (wedding.audio_id) {
    const { data: audio } = await userClient
      .from('audios')
      .select('title, artist, source_type, url')
      .eq('id', wedding.audio_id)
      .single()

    if (audio) {
      audioInfo = {
        source_type: audio.source_type,
        title: audio.title,
        artist: audio.artist,
        // Include the URL only for user-uploaded audio so it can be re-downloaded on import.
        // System audio is matched by title during import.
        url: audio.source_type === 'user' ? audio.url : null,
      }
    }
  }

  // Fetch all wishes for this invitation
  const { data: wishes } = await userClient
    .from('wishes')
    .select('guest_name, message, attendance, guest_count, created_at')
    .eq('wedding_id', String(wedding.id))
    .order('created_at', { ascending: true })

  // Strip identity fields from the wedding record before exporting
  const { id: _id, user_id: _userId, created_at: _createdAt, ...weddingData } = wedding

  const exportPayload = {
    version: '1.0',
    exported_at: new Date().toISOString(),
    wedding: weddingData,
    audio: audioInfo,
    wishes: wishes ?? [],
  }

  setResponseHeader(event, 'Content-Type', 'application/json')
  setResponseHeader(
    event,
    'Content-Disposition',
    `attachment; filename="invitation-${wedding.slug}.alwan.json"`,
  )

  return exportPayload
})
