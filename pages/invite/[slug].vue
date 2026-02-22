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
    <div class="min-h-screen bg-base-100">

    </div>
</template>

<style scoped></style>