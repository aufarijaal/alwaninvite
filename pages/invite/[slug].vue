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

// Extract the akad (ceremony) event and format its date/time
const akadEvent = computed(() => {
    const events = wedding.value?.events
    if (!Array.isArray(events)) return null
    return (events as { type: string; start_time?: string }[]).find(e => e.type === 'ceremony') ?? null
})

const akadDateTime = computed(() => {
    const startTime = akadEvent.value?.start_time
    if (!startTime) return null
    const date = new Date(startTime)
    if (isNaN(date.getTime())) return null
    return date
})

const akadDateFormatted = computed(() => {
    if (!akadDateTime.value) return ''
    return akadDateTime.value.toLocaleDateString('id-ID', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    })
})

const akadTimeFormatted = computed(() => {
    if (!akadDateTime.value) return ''
    return akadDateTime.value.toLocaleTimeString('id-ID', {
        hour: '2-digit', minute: '2-digit', hour12: false
    })
})

const ogImageUrl = computed(() => {
    if (!wedding.value) return `${baseUrl}/api/og`
    const { data } = supabase.storage
        .from('images')
        .getPublicUrl(`invitations/${slug}/og.png`)
    return data.publicUrl
})

const pageTitle = computed(() =>
    wedding.value
        ? `${wedding.value.groom_callname ?? ''} & ${wedding.value.bride_callname ?? ''} — Wedding Invitation`
        : 'Wedding Invitation'
)

const pageDescription = computed(() => {
    const groom = wedding.value?.groom_callname ?? ''
    const bride = wedding.value?.bride_callname ?? ''
    if (!wedding.value) return 'Wedding Invitation'
    if (akadDateFormatted.value && akadTimeFormatted.value) {
        return `Anda dengan hormat diundang ke pernikahan ${groom} & ${bride}. Akad Nikah akan dilaksanakan pada ${akadDateFormatted.value} pukul ${akadTimeFormatted.value} WIB.`
    }
    return `You are cordially invited to the wedding of ${groom} & ${bride}.`
})

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
            <ThemesIslamicLightGradient v-else-if="wedding.themes?.slug === 'islamic-light-gradient'"
                :invitation="wedding" :guest="toGuest" />
            <ThemesIslamicIndonesiaFormal1 v-else-if="wedding.themes?.slug === 'islamic-indonesia-formal-1'"
                :invitation="wedding" :guest="toGuest" />
        </template>
    </div>
</template>