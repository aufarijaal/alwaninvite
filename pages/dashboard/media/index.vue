<script setup lang="ts">
import { Upload, Trash2, Play, Pause, Music, Search, ImageOff } from 'lucide-vue-next'
import type { Database } from '~/types/database.types'

definePageMeta({
    middleware: 'auth',
    layout: 'dashboard'
})

const { t } = useI18n()
const supabase = useSupabaseClient<Database>()
const user = useSupabaseUser()

// State
const userAudios = ref<Database['public']['Tables']['audios']['Row'][]>([])
const loading = ref(false)
const uploading = ref(false)
const searchInput = ref('')
const searchQuery = ref('')
const selectedFile = ref<File | null>(null)
const audioTitle = ref('')
const audioArtist = ref('')
const currentlyPlaying = ref<number | null>(null)
const audioElements = ref<{ [key: number]: HTMLAudioElement }>({})

// Debounce search input
let searchTimeout: NodeJS.Timeout | null = null
watch(searchInput, (newValue) => {
    if (searchTimeout) clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
        searchQuery.value = newValue
    }, 300)
})

// Fetch user's audio files
const fetchUserAudios = async () => {
    if (!user.value?.sub) return

    loading.value = true
    try {
        const { data, error } = await supabase
            .from('audios')
            .select('*')
            .eq('source_type', 'user')
            .eq('user_id', user.value.sub)
            .order('created_at', { ascending: false })

        if (error) throw error
        userAudios.value = data || []
    } catch (err) {
        console.error('Error fetching audio files:', err)
    } finally {
        loading.value = false
    }
}

// Filtered audios
const filteredAudios = computed(() => {
    if (!searchQuery.value) return userAudios.value

    const query = searchQuery.value.toLowerCase()
    return userAudios.value.filter(audio =>
        audio.title.toLowerCase().includes(query) ||
        audio.artist?.toLowerCase().includes(query)
    )
})

// Handle file selection
const handleFileSelect = (event: Event) => {
    const target = event.target as HTMLInputElement
    if (target.files && target.files.length > 0) {
        const file = target.files[0]

        // Validate file size (5 MB max)
        const maxSize = 5 * 1024 * 1024 // 5 MB in bytes
        if (file.size > maxSize) {
            alert(t('media.fileSizeError'))
            target.value = ''
            return
        }

        // Validate file type
        if (!file.type.startsWith('audio/')) {
            alert(t('media.fileTypeError'))
            target.value = ''
            return
        }

        selectedFile.value = file
        // Auto-fill title from filename (without extension)
        audioTitle.value = file.name.replace(/\.[^/.]+$/, '')
    }
}

// Upload audio file
const uploadAudio = async () => {
    if (!selectedFile.value || !user.value?.sub || !audioTitle.value.trim()) return

    uploading.value = true
    try {
        // Upload file to Supabase Storage
        const fileExt = selectedFile.value.name.split('.').pop()
        const fileName = `${user.value.sub}/${Date.now()}.${fileExt}`
        const { data: uploadData, error: uploadError } = await supabase.storage
            .from('system_audios')
            .upload(fileName, selectedFile.value)

        if (uploadError) throw uploadError

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
            .from('system_audios')
            .getPublicUrl(fileName)

        // Create database entry
        const { error: dbError } = await supabase
            .from('audios')
            .insert({
                title: audioTitle.value.trim(),
                artist: audioArtist.value.trim() || null,
                url: publicUrl,
                source_type: 'user',
                is_premium: false,
                is_active: true
            })

        if (dbError) throw dbError

        // Reset and refresh
        selectedFile.value = null
        audioTitle.value = ''
        audioArtist.value = ''
        const fileInput = document.getElementById('audio-upload') as HTMLInputElement
        if (fileInput) fileInput.value = ''

        await fetchUserAudios()
    } catch (err) {
        console.error('Error uploading audio:', err)
        alert(t('media.uploadError'))
    } finally {
        uploading.value = false
    }
}

// Delete audio file
const deleteAudio = async (audio: Database['public']['Tables']['audios']['Row']) => {
    if (!confirm(t('media.confirmDelete'))) return

    try {
        // Extract file path from URL
        const urlParts = audio.url.split('system_audios/')
        if (urlParts.length > 1) {
            const filePath = urlParts[1]

            // Delete from storage
            await supabase.storage
                .from('system_audios')
                .remove([filePath])
        }

        // Delete from database
        const { error } = await supabase
            .from('audios')
            .delete()
            .eq('id', audio.id)

        if (error) throw error

        await fetchUserAudios()
    } catch (err) {
        console.error('Error deleting audio:', err)
        alert(t('media.deleteError'))
    }
}

// Play/pause audio
const togglePlay = (audioId: number, url: string) => {
    if (currentlyPlaying.value === audioId) {
        // Pause current audio
        audioElements.value[audioId]?.pause()
        currentlyPlaying.value = null
    } else {
        // Stop any currently playing audio
        if (currentlyPlaying.value !== null) {
            audioElements.value[currentlyPlaying.value]?.pause()
        }

        // Create or get audio element
        if (!audioElements.value[audioId]) {
            audioElements.value[audioId] = new Audio(url)
            audioElements.value[audioId].addEventListener('ended', () => {
                currentlyPlaying.value = null
            })
        }

        // Play new audio
        audioElements.value[audioId].play()
        currentlyPlaying.value = audioId
    }
}

// Format file size
const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}

// Format date
const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
}

onMounted(() => {
    fetchUserAudios()
})

onUnmounted(() => {
    // Cleanup audio elements
    Object.values(audioElements.value).forEach(audio => {
        audio.pause()
        audio.src = ''
    })
})

useHead({ title: 'Media Library – Alwan Invite' })
</script>

<template>
    <div class="space-y-6">
        <!-- Page Header -->
        <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
                <h1 class="text-3xl font-bold">{{ t('media.title') }}</h1>
                <p class="text-base-content/70 mt-1">{{ t('media.subtitle') }}</p>
            </div>
        </div>

        <!-- Upload Section -->
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
                <h2 class="card-title">{{ t('media.uploadAudio') }}</h2>
                <p class="text-sm text-base-content/60 mb-4">
                    {{ t('media.supportedFormats') }}: MP3, WAV, OGG ({{ t('media.maxFileSize') }}: 5 MB)
                </p>
                <div class="grid grid-cols-1 gap-4">
                    <!-- File Input -->
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">{{ t('media.audioFile') }}</span>
                        </label>
                        <input id="audio-upload" type="file" accept="audio/*" @change="handleFileSelect"
                            class="file-input file-input-bordered w-full" />
                    </div>

                    <!-- Title Input -->
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">{{ t('media.audioTitle') }}</span>
                            <span class="label-text-alt text-error" v-if="selectedFile && !audioTitle.trim()">{{
                                t('media.titleRequired') }}</span>
                        </label>
                        <input v-model="audioTitle" type="text" :placeholder="t('media.audioTitlePlaceholder')"
                            class="input input-bordered w-full" :disabled="!selectedFile" />
                    </div>

                    <!-- Artist Input -->
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">{{ t('media.audioArtist') }}</span>
                            <span class="label-text-alt">{{ t('media.optional') }}</span>
                        </label>
                        <input v-model="audioArtist" type="text" :placeholder="t('media.audioArtistPlaceholder')"
                            class="input input-bordered w-full" :disabled="!selectedFile" />
                    </div>

                    <!-- Upload Button -->
                    <button @click="uploadAudio" class="btn btn-primary"
                        :disabled="!selectedFile || uploading || !audioTitle.trim()">
                        <Upload :size="20" v-if="!uploading" />
                        <span class="loading loading-spinner" v-else></span>
                        {{ uploading ? t('media.uploading') : t('media.upload') }}
                    </button>
                </div>
                <p class="text-xs text-base-content/50 mt-2" v-if="selectedFile">
                    {{ t('media.selectedFile') }}: {{ selectedFile.name }}
                </p>
            </div>
        </div>

        <!-- Search Section -->
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">{{ t('media.search') }}</span>
                    </label>
                    <div class="input-group flex gap-2 items-center">
                        <input v-model="searchInput" type="text" :placeholder="t('media.searchPlaceholder')"
                            class="input input-bordered w-full" />
                    </div>
                </div>
            </div>
        </div>

        <!-- Audio Files List -->
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
                <h2 class="card-title">{{ t('media.yourAudioFiles') }}</h2>

                <!-- Loading State -->
                <div v-if="loading" class="flex justify-center py-12">
                    <span class="loading loading-spinner loading-lg"></span>
                </div>

                <!-- Empty State -->
                <div v-else-if="filteredAudios.length === 0" class="text-center py-12">
                    <Music :size="64" class="mx-auto mb-4 opacity-30" />
                    <h3 class="text-lg font-semibold mb-2">{{ t('media.empty.title') }}</h3>
                    <p class="text-base-content/60">{{ t('media.empty.subtitle') }}</p>
                </div>

                <!-- Audio Grid -->
                <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    <div v-for="audio in filteredAudios" :key="audio.id"
                        class="card bg-base-200 shadow-md hover:shadow-lg transition-shadow">
                        <div class="card-body">
                            <!-- Audio Icon/Thumbnail -->
                            <div class="flex items-center justify-center h-32 bg-base-300 rounded-lg mb-4">
                                <Music :size="48" class="opacity-50" />
                            </div>

                            <!-- Audio Info -->
                            <h3 class="font-semibold truncate" :title="audio.title">{{ audio.title }}</h3>
                            <p class="text-sm text-base-content/60 truncate" v-if="audio.artist">
                                {{ audio.artist }}
                            </p>
                            <p class="text-xs text-base-content/50 mt-2">
                                {{ formatDate(audio.created_at) }}
                            </p>

                            <!-- Actions -->
                            <div class="card-actions justify-between mt-4">
                                <button @click="togglePlay(audio.id, audio.url)" class="btn btn-sm btn-primary">
                                    <Play :size="16" v-if="currentlyPlaying !== audio.id" />
                                    <Pause :size="16" v-else />
                                    {{ currentlyPlaying === audio.id ? t('media.pause') : t('media.play') }}
                                </button>
                                <button @click="deleteAudio(audio)" class="btn btn-sm btn-error btn-outline">
                                    <Trash2 :size="16" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
