<script setup lang="ts">
import type { Database } from '~/types/database.types'

const route = useRoute()
const supabase = useSupabaseClient<Database>()
const slug = route.params.slug as string
const toGuest = route.query.to as string | undefined

const { data: wedding, error: fetchError, pending: loading } = await useAsyncData(
    `wedding-${slug}`,
    async () => {
        const { data, error } = await supabase
            .from('weddings')
            .select(`
                *,
                themes (
                    id,
                    name,
                    slug,
                    is_premium
                ),
                audios (
                    id,
                    title,
                    artist,
                    url
                )
            `)
            .eq('slug', slug)
            .eq('is_active', true)
            .eq('published', true)
            .single()

        if (error) throw error
        return data
    }
)

const error = computed(() => fetchError.value?.message ?? null)

// Build absolute base URL (works on both server and client)
const requestUrl = useRequestURL()
const baseUrl = `${requestUrl.protocol}//${requestUrl.host}`

const ogImageUrl = computed(() => {
    if (!wedding.value) return `${baseUrl}/api/og`
    const params = new URLSearchParams({
        groom: wedding.value.groom_callname ?? '',
        bride: wedding.value.bride_callname ?? '',
    })
    return `${baseUrl}/api/og?${params.toString()}`
})

const pageTitle = computed(() =>
    wedding.value
        ? `${wedding.value.groom_callname ?? ''} & ${wedding.value.bride_callname ?? ''} — Wedding Invitation`
        : 'Wedding Invitation'
)

const pageDescription = computed(() =>
    `You are cordially invited to the wedding of ${wedding.value?.groom_callname ?? ''} & ${wedding.value?.bride_callname ?? ''}.`
)

useSeoMeta({
    title: pageTitle,
    ogTitle: pageTitle,
    description: pageDescription,
    ogDescription: pageDescription,
    ogImage: ogImageUrl,
    ogImageWidth: 500,
    ogImageHeight: 500,
    ogType: 'website',
    ogUrl: () => `${baseUrl}/invite/${slug}`,
    twitterCard: 'summary_large_image',
    twitterTitle: pageTitle,
    twitterDescription: pageDescription,
    twitterImage: ogImageUrl,
})

onMounted(() => {
    // dump guest to console for debugging
    if (toGuest) {
        console.log('Invitation for guest:', toGuest)
    }
})
</script>

<template>
    <div class="min-h-screen">
        <div v-if="loading" class="flex items-center justify-center min-h-screen bg-slate-900">
            <p class="text-blue-300/60 font-sans text-sm animate-pulse">Memuat undangan...</p>
        </div>

        <div v-else-if="error" class="flex items-center justify-center min-h-screen bg-slate-900">
            <p class="text-red-400 font-sans text-sm">Undangan tidak ditemukan.</p>
        </div>

        <template v-else-if="wedding">
            <ThemesBlue v-if="wedding.themes?.slug === 'blue'" :invitation="wedding" :guest="toGuest" />
            <ThemesGreen v-else-if="wedding.themes?.slug === 'green'" :invitation="wedding" :guest="toGuest" />
            <ThemesBrown v-else-if="wedding.themes?.slug === 'brown'" :invitation="wedding" :guest="toGuest" />
            <ThemesSlate v-else-if="wedding.themes?.slug === 'slate'" :invitation="wedding" :guest="toGuest" />
        </template>
    </div>
</template>