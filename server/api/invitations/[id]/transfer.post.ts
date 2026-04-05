import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  const targetEmail: string = (body?.email || '').trim().toLowerCase()

  if (!id || isNaN(Number(id))) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid invitation ID' })
  }

  if (!targetEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(targetEmail)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid email address' })
  }

  const userClient = await serverSupabaseClient(event)
  const { data: { user }, error: authError } = await userClient.auth.getUser()

  if (authError || !user) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  if (user.email?.toLowerCase() === targetEmail) {
    throw createError({ statusCode: 400, statusMessage: 'You cannot transfer to yourself' })
  }

  // Verify current user owns this invitation
  const { data: wedding, error: weddingError } = await userClient
    .from('weddings')
    .select('id, title, slug, user_id')
    .eq('id', Number(id))
    .eq('user_id', user.id)
    .single()

  if (weddingError || !wedding) {
    throw createError({ statusCode: 404, statusMessage: 'Invitation not found or access denied' })
  }

  // Look up target user's profile by email using the user-scoped client.
  // The profiles table must be readable by authenticated users (standard RLS setup).
  const { data: targetProfile, error: profileError } = await userClient
    .from('profiles')
    .select('id, email, full_name')
    .eq('email', targetEmail)
    .single()

  if (profileError || !targetProfile) {
    throw createError({ statusCode: 404, statusMessage: 'No account found with that email address' })
  }

  // Transfer ownership — the current user owns this wedding so the update is allowed by RLS
  const { error: updateError } = await userClient
    .from('weddings')
    .update({ user_id: targetProfile.id })
    .eq('id', Number(id))

  if (updateError) {
    throw createError({ statusCode: 500, statusMessage: 'Failed to transfer ownership' })
  }

  return {
    success: true,
    transferredTo: {
      email: targetProfile.email,
      name: targetProfile.full_name,
    },
  }
})
