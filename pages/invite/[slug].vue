<script setup lang="ts">
import type { Database } from '~/types/database.types'
const route = useRoute()
const supabase = useSupabaseClient<Database>()

const slug = route.params.slug as string

// State
const wedding = ref<any>(null)
const loading = ref(true)
const error = ref<string | null>(null)

// Fetch wedding data with all relations
const fetchWedding = async () => {
    loading.value = true
    error.value = null

    const { data, error: fetchError } = await supabase
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

    if (fetchError) {
        error.value = fetchError.message
        console.error('Error fetching wedding:', fetchError)
    } else {
        wedding.value = data
    }

    loading.value = false
}

onMounted(() => {
    fetchWedding()
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
            <ThemesBlue v-if="wedding.themes?.slug === 'blue'" :invitation="wedding" />
            <ThemesGreen v-else-if="wedding.themes?.slug === 'green'" :invitation="wedding" />
            <ThemesBrown v-else-if="wedding.themes?.slug === 'brown'" :invitation="wedding" />
            <ThemesSlate v-else-if="wedding.themes?.slug === 'slate'" :invitation="wedding" />
            <ThemesIslamicGreen v-else-if="wedding.themes?.slug === 'islamic-green'" :invitation="wedding" />
            <ThemesDefault v-else :invitation="wedding" />
        </template>
    </div>
</template>