<script setup lang="ts">
import { Plus, Calendar } from 'lucide-vue-next'
import type { Database } from '~/types/database.types'

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard'
})

const { t } = useI18n()
const supabase = useSupabaseClient<Database>()
const user = useSupabaseUser()

// State
const invitations = ref<Database['public']['Tables']['weddings']['Row'][]>([])
const loading = ref(true)
const error = ref<string | null>(null)

// Fetch invitations
const fetchInvitations = async () => {
  loading.value = true
  error.value = null

  try {
    const { data, error: fetchError } = await supabase
      .from('weddings')
      .select(`
        *,
        themes (
          id,
          name,
          slug
        )
      `)
      .eq('user_id', user.value?.sub)
      .order('created_at', { ascending: false })

    if (fetchError) throw fetchError

    invitations.value = data || []
  } catch (err: any) {
    error.value = err.message
    console.error('Error fetching invitations:', err)
  } finally {
    loading.value = false
  }
}

// Delete invitation
const deleteInvitation = async (id: number) => {
  if (!confirm(t('invitation.confirmDelete'))) return

  try {
    const { error: deleteError } = await supabase
      .from('weddings')
      .delete()
      .eq('id', id)

    if (deleteError) throw deleteError

    // Remove from list
    invitations.value = invitations.value.filter(inv => inv.id !== id)
  } catch (err: any) {
    alert(err.message || t('error.generic'))
    console.error('Error deleting invitation:', err)
  }
}

// Load invitations on mount
onMounted(() => {
  fetchInvitations()
})
</script>

<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
      <div>
        <h1 class="text-3xl font-bold">{{ t('dashboard.myInvitations') }}</h1>
        <p class="text-base-content/70 mt-1">{{ t('invitation.list.subtitle') }}</p>
      </div>
      <div class="flex gap-2">
        <NuxtLink to="/dashboard/invitations/create" class="btn btn-primary">
          <Plus :size="20" />
          {{ t('dashboard.createInvitation') }}
        </NuxtLink>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-20">
      <span class="loading loading-spinner loading-lg"></span>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="alert alert-error">
      <span>{{ error }}</span>
    </div>

    <!-- Empty State -->
    <div v-else-if="invitations.length === 0" class="card bg-base-100 shadow-xl">
      <div class="card-body text-center py-20">
        <div class="flex justify-center mb-4">
          <Calendar :size="64" class="text-base-content/30" />
        </div>
        <h2 class="text-2xl font-bold mb-2">{{ t('invitation.empty.title') }}</h2>
        <p class="text-base-content/70 mb-6">{{ t('invitation.empty.subtitle') }}</p>
        <div class="flex gap-2 justify-center">
          <NuxtLink to="/dashboard/invitations/create" class="btn btn-primary">
            <Plus :size="20" />
            {{ t('invitation.empty.createFirst') }}
          </NuxtLink>
        </div>
      </div>
    </div>


    <!-- Invitations Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <InvitationCard v-for="invitation in invitations" :key="invitation.id" :invitation="invitation"
        @delete="deleteInvitation" />
    </div>
  </div>
</template>
