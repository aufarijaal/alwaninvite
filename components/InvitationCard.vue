<script setup lang="ts">
import { Edit, Eye, Trash2, Globe, Users, Image as ImageIcon, X } from 'lucide-vue-next'
import type { Database } from '~/types/database.types'

const { t } = useI18n()
const supabase = useSupabaseClient()

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

const thumbnailUrl = computed(() => {
    const { data } = supabase.storage
        .from('images')
        .getPublicUrl(`invitations/${props.invitation.slug}/og.png`)
    return data.publicUrl
})

const imgError = ref(false)
const showOgModal = ref(false)
</script>

<template>
    <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
        <!-- OG Thumbnail -->
        <figure class="relative h-40 bg-base-200 overflow-hidden rounded-t-2xl">
            <img v-if="!imgError" :src="thumbnailUrl" :alt="invitation.title || invitation.slug"
                class="w-full h-full object-cover" @error="imgError = true" />
            <div v-else class="w-full h-full flex flex-col items-center justify-center gap-1 opacity-30">
                <Eye :size="32" />
                <span class="text-xs">No preview</span>
            </div>
            <div :class="[
                'absolute top-2 right-2 badge badge-sm',
                invitation.published ? 'badge-success' : 'badge-ghost'
            ]">
                {{ invitation.published ? t('invitation.status.active') : t('invitation.status.draft') }}
            </div>
        </figure>
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
                <button @click="showOgModal = true" class="btn btn-ghost btn-sm" :title="t('invitation.viewOgImage')">
                    <ImageIcon :size="16" />
                </button>
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

    <!-- OG Image Modal -->
    <Teleport to="body">
        <div v-if="showOgModal" class="modal modal-open" @click.self="showOgModal = false">
            <div class="modal-box max-w-2xl">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="font-bold text-lg">{{ t('invitation.viewOgImage') }}</h3>
                    <button @click="showOgModal = false" class="btn btn-ghost btn-sm btn-circle">
                        <X :size="18" />
                    </button>
                </div>
                <div class="w-full aspect-[1200/630] bg-base-200 rounded-lg overflow-hidden">
                    <img :src="thumbnailUrl" :alt="invitation.title || invitation.slug" class="w-full h-full object-contain" />
                </div>
                <div class="modal-action">
                    <a :href="thumbnailUrl" target="_blank" rel="noopener noreferrer" class="btn btn-ghost btn-sm">
                        <Eye :size="16" />
                        {{ t('invitation.openInNewTab') }}
                    </a>
                    <button @click="showOgModal = false" class="btn btn-sm">{{ t('common.close') }}</button>
                </div>
            </div>
        </div>
    </Teleport>
</template>
