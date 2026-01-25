<script setup lang="ts">
import { Edit, Eye, Trash2, Globe, Users } from 'lucide-vue-next'
import type { Database } from '~/types/database.types'

const { t } = useI18n()

interface Props {
    invitation: Database['public']['Tables']['weddings']['Row']
}

const props = defineProps<Props>()
const emit = defineEmits<{
    delete: [id: number]
}>()

// Format date
const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}

const handleDelete = () => {
    emit('delete', props.invitation.id)
}
</script>

<template>
    <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
        <div class="card-body">
            <!-- Header -->
            <div class="flex justify-between items-start mb-3">
                <div class="flex-1">
                    <h2 class="card-title text-xl mb-1">
                        {{ invitation.title || invitation.slug }}
                    </h2>
                    <div class="text-sm text-base-content/60">
                        {{ formatDate(invitation.created_at) }}
                    </div>
                </div>
                <div :class="[
                    'badge',
                    invitation.published ? 'badge-success' : 'badge-ghost'
                ]">
                    {{ invitation.published ? t('invitation.status.active') : t('invitation.status.draft') }}
                </div>
            </div>

            <!-- Info -->
            <div class="space-y-2 mb-4">
                <div class="flex items-center gap-2 text-sm">
                    <Globe :size="16" class="text-base-content/60" />
                    <span class="font-mono text-primary">{{ invitation.slug }}</span>
                </div>
                <div class="flex items-center gap-2 text-sm">
                    <Users :size="16" class="text-base-content/60" />
                    <span>{{ t(`invitation.languages.${invitation.language}`) }}</span>
                    <span class="text-base-content/40" v-if="(invitation as any).themes?.name">•</span>
                    <span v-if="(invitation as any).themes?.name">{{ (invitation as any).themes.name }}</span>
                </div>
            </div>

            <!-- Actions -->
            <div class="card-actions justify-end">
                <NuxtLink :to="`/invite/${invitation.slug}`" target="_blank" class="btn btn-ghost btn-sm">
                    <Eye :size="16" />
                    {{ t('invitation.preview') }}
                </NuxtLink>
                <NuxtLink :to="`/dashboard/invitations/${invitation.id}/edit`" class="btn btn-primary btn-sm">
                    <Edit :size="16" />
                    {{ t('common.edit') }}
                </NuxtLink>
                <button @click="handleDelete" class="btn btn-error btn-sm">
                    <Trash2 :size="16" />
                </button>
            </div>
        </div>
    </div>
</template>
