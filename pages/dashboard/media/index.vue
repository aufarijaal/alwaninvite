<script setup lang="ts">
import { Upload, Trash2, Play, Pause, Music, Image, Copy, Check } from 'lucide-vue-next'
import type { Database } from '~/types/database.types'

definePageMeta({
    middleware: 'auth',
    layout: 'dashboard'
})

const { t } = useI18n()
const supabase = useSupabaseClient<Database>()
const user = useSupabaseUser()

// Active tab
const activeTab = ref<'audio' | 'images'>('audio')

// ─── Audio State ───────────────────────────────────────────────────────────────
const userAudios = ref<Database['public']['Tables']['audios']['Row'][]>([])
const audioLoading = ref(false)
const audioUploading = ref(false)
const audioSearchInput = ref('')
const audioSearchQuery = ref('')
const selectedAudioFile = ref<File | null>(null)
const audioTitle = ref('')
const audioArtist = ref('')
const currentlyPlaying = ref<number | null>(null)
const audioElements = ref<{ [key: number]: HTMLAudioElement }>({})

// ─── Image State ───────────────────────────────────────────────────────────────
const userImages = ref<Database['public']['Tables']['user_images']['Row'][]>([])
const imageLoading = ref(false)
const imageUploading = ref(false)
const imageSearchInput = ref('')
const imageSearchQuery = ref('')
const selectedImageFile = ref<File | null>(null)
const copiedImageId = ref<number | null>(null)

// ─── Debounce helpers ──────────────────────────────────────────────────────────
let audioSearchTimeout: NodeJS.Timeout | null = null
watch(audioSearchInput, (v) => {
    if (audioSearchTimeout) clearTimeout(audioSearchTimeout)
    audioSearchTimeout = setTimeout(() => { audioSearchQuery.value = v }, 300)
})

let imageSearchTimeout: NodeJS.Timeout | null = null
watch(imageSearchInput, (v) => {
    if (imageSearchTimeout) clearTimeout(imageSearchTimeout)
    imageSearchTimeout = setTimeout(() => { imageSearchQuery.value = v }, 300)
})

// ─── Audio: fetch ──────────────────────────────────────────────────────────────
const fetchUserAudios = async () => {
    if (!user.value?.sub) return
    audioLoading.value = true
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
        audioLoading.value = false
    }
}

const filteredAudios = computed(() => {
    if (!audioSearchQuery.value) return userAudios.value
    const q = audioSearchQuery.value.toLowerCase()
    return userAudios.value.filter(a =>
        a.title.toLowerCase().includes(q) || a.artist?.toLowerCase().includes(q)
    )
})

// ─── Audio: select & upload ────────────────────────────────────────────────────
const handleAudioFileSelect = (event: Event) => {
    const target = event.target as HTMLInputElement
    if (!target.files?.length) return
    const file = target.files[0]
    if (file.size > 5 * 1024 * 1024) {
        alert(t('media.fileSizeError'))
        target.value = ''
        return
    }
    if (!file.type.startsWith('audio/')) {
        alert(t('media.fileTypeError'))
        target.value = ''
        return
    }
    selectedAudioFile.value = file
    audioTitle.value = file.name.replace(/\.[^/.]+$/, '')
}

const uploadAudio = async () => {
    if (!selectedAudioFile.value || !user.value?.sub || !audioTitle.value.trim()) return
    audioUploading.value = true
    try {
        const fileExt = selectedAudioFile.value.name.split('.').pop()
        const fileName = `${user.value.sub}/${Date.now()}.${fileExt}`
        const { error: uploadError } = await supabase.storage
            .from('system_audios')
            .upload(fileName, selectedAudioFile.value)
        if (uploadError) throw uploadError

        const { data: { publicUrl } } = supabase.storage
            .from('system_audios')
            .getPublicUrl(fileName)

        const { error: dbError } = await supabase.from('audios').insert({
            title: audioTitle.value.trim(),
            artist: audioArtist.value.trim() || null,
            url: publicUrl,
            source_type: 'user',
            is_premium: false,
            is_active: true,
        })
        if (dbError) throw dbError

        selectedAudioFile.value = null
        audioTitle.value = ''
        audioArtist.value = ''
        const fileInput = document.getElementById('audio-upload') as HTMLInputElement
        if (fileInput) fileInput.value = ''
        await fetchUserAudios()
    } catch (err) {
        console.error('Error uploading audio:', err)
        alert(t('media.uploadError'))
    } finally {
        audioUploading.value = false
    }
}

// ─── Audio: delete ─────────────────────────────────────────────────────────────
const deleteAudio = async (audio: Database['public']['Tables']['audios']['Row']) => {
    if (!confirm(t('media.confirmDelete'))) return
    try {
        const urlParts = audio.url.split('system_audios/')
        if (urlParts.length > 1) {
            await supabase.storage.from('system_audios').remove([urlParts[1]])
        }
        const { error } = await supabase.from('audios').delete().eq('id', audio.id)
        if (error) throw error
        await fetchUserAudios()
    } catch (err) {
        console.error('Error deleting audio:', err)
        alert(t('media.deleteError'))
    }
}

// ─── Image: fetch ──────────────────────────────────────────────────────────────
const fetchUserImages = async () => {
    if (!user.value?.sub) return
    imageLoading.value = true
    try {
        const { data, error } = await supabase
            .from('user_images')
            .select('*')
            .eq('user_id', user.value.sub)
            .order('created_at', { ascending: false })
        if (error) throw error
        userImages.value = data || []
    } catch (err) {
        console.error('Error fetching images:', err)
    } finally {
        imageLoading.value = false
    }
}

const filteredImages = computed(() => {
    if (!imageSearchQuery.value) return userImages.value
    const q = imageSearchQuery.value.toLowerCase()
    return userImages.value.filter(img =>
        img.metadata?.original_name?.toLowerCase().includes(q)
    )
})

// ─── Image: select & upload ────────────────────────────────────────────────────
const handleImageFileSelect = (event: Event) => {
    const target = event.target as HTMLInputElement
    if (!target.files?.length) return
    const file = target.files[0]
    if (file.size > 1 * 1024 * 1024) {
        alert(t('media.imageFileSizeError'))
        target.value = ''
        return
    }
    if (!file.type.startsWith('image/')) {
        alert(t('media.imageFileTypeError'))
        target.value = ''
        return
    }
    selectedImageFile.value = file
}

// Read image dimensions from a File
const getImageDimensions = (file: File): Promise<{ width: number; height: number }> => {
    return new Promise((resolve) => {
        const url = URL.createObjectURL(file)
        const img = new window.Image()
        img.onload = () => {
            resolve({ width: img.naturalWidth, height: img.naturalHeight })
            URL.revokeObjectURL(url)
        }
        img.onerror = () => {
            resolve({ width: 0, height: 0 })
            URL.revokeObjectURL(url)
        }
        img.src = url
    })
}

const uploadImage = async () => {
    if (!selectedImageFile.value || !user.value?.sub) return
    imageUploading.value = true
    try {
        const file = selectedImageFile.value
        const fileExt = file.name.split('.').pop()
        const storagePath = `user-uploads/${user.value.sub}/${Date.now()}.${fileExt}`

        const { error: uploadError } = await supabase.storage
            .from('images')
            .upload(storagePath, file, { contentType: file.type })
        if (uploadError) throw uploadError

        const { data: { publicUrl } } = supabase.storage
            .from('images')
            .getPublicUrl(storagePath)

        const { width, height } = await getImageDimensions(file)

        const { error: dbError } = await supabase.from('user_images').insert({
            url: publicUrl,
            user_id: user.value.sub,
            metadata: {
                original_name: file.name,
                size: file.size,
                type: file.type,
                width: width || null,
                height: height || null,
            },
        })
        if (dbError) throw dbError

        selectedImageFile.value = null
        const fileInput = document.getElementById('image-upload') as HTMLInputElement
        if (fileInput) fileInput.value = ''
        await fetchUserImages()
    } catch (err) {
        console.error('Error uploading image:', err)
        alert(t('media.imageUploadError'))
    } finally {
        imageUploading.value = false
    }
}

// ─── Image: delete ─────────────────────────────────────────────────────────────
const deleteImage = async (img: Database['public']['Tables']['user_images']['Row']) => {
    if (!confirm(t('media.confirmDeleteImage'))) return
    try {
        const urlParts = img.url.split('/images/')
        if (urlParts.length > 1) {
            await supabase.storage.from('images').remove([urlParts[1]])
        }
        const { error } = await supabase.from('user_images').delete().eq('id', img.id)
        if (error) throw error
        await fetchUserImages()
    } catch (err) {
        console.error('Error deleting image:', err)
        alert(t('media.imageDeleteError'))
    }
}

// ─── Image: copy URL ───────────────────────────────────────────────────────────
const copyImageUrl = async (img: Database['public']['Tables']['user_images']['Row']) => {
    try {
        await navigator.clipboard.writeText(img.url)
        copiedImageId.value = img.id
        setTimeout(() => { copiedImageId.value = null }, 2000)
    } catch {
        // fallback: do nothing
    }
}

// ─── Audio: play/pause ────────────────────────────────────────────────────────
const togglePlay = (audioId: number, url: string) => {
    if (currentlyPlaying.value === audioId) {
        audioElements.value[audioId]?.pause()
        currentlyPlaying.value = null
    } else {
        if (currentlyPlaying.value !== null) {
            audioElements.value[currentlyPlaying.value]?.pause()
        }
        if (!audioElements.value[audioId]) {
            audioElements.value[audioId] = new Audio(url)
            audioElements.value[audioId].addEventListener('ended', () => {
                currentlyPlaying.value = null
            })
        }
        audioElements.value[audioId].play()
        currentlyPlaying.value = audioId
    }
}

// ─── Shared helpers ────────────────────────────────────────────────────────────
const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}

const formatDate = (date: string | null) => {
    if (!date) return ''
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    })
}

onMounted(() => {
    fetchUserAudios()
    fetchUserImages()
})

onUnmounted(() => {
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
        <div>
            <h1 class="text-3xl font-bold">{{ t('media.title') }}</h1>
            <p class="text-base-content/70 mt-1">{{ t('media.subtitle') }}</p>
        </div>

        <!-- Tabs -->
        <div class="tabs tabs-boxed w-fit">
            <button class="tab" :class="{ 'tab-active': activeTab === 'audio' }" @click="activeTab = 'audio'">
                <Music :size="16" class="mr-2" />
                {{ t('media.tabs.audio') }}
            </button>
            <button class="tab" :class="{ 'tab-active': activeTab === 'images' }" @click="activeTab = 'images'">
                <Image :size="16" class="mr-2" />
                {{ t('media.tabs.images') }}
            </button>
        </div>

        <!-- ══════════════════════ AUDIO TAB ══════════════════════ -->
        <template v-if="activeTab === 'audio'">
            <!-- Upload Audio -->
            <div class="card bg-base-100 shadow-xl">
                <div class="card-body">
                    <h2 class="card-title">{{ t('media.uploadAudio') }}</h2>
                    <p class="text-sm text-base-content/60 mb-4">
                        {{ t('media.supportedFormats') }}: MP3, WAV, OGG ({{ t('media.maxFileSize') }}: 5 MB)
                    </p>
                    <div class="grid grid-cols-1 gap-4">
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">{{ t('media.audioFile') }}</span>
                            </label>
                            <input id="audio-upload" type="file" accept="audio/*" @change="handleAudioFileSelect"
                                class="file-input file-input-bordered w-full" />
                        </div>
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">{{ t('media.audioTitle') }}</span>
                                <span class="label-text-alt text-error"
                                    v-if="selectedAudioFile && !audioTitle.trim()">
                                    {{ t('media.titleRequired') }}
                                </span>
                            </label>
                            <input v-model="audioTitle" type="text" :placeholder="t('media.audioTitlePlaceholder')"
                                class="input input-bordered w-full" :disabled="!selectedAudioFile" />
                        </div>
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">{{ t('media.audioArtist') }}</span>
                                <span class="label-text-alt">{{ t('media.optional') }}</span>
                            </label>
                            <input v-model="audioArtist" type="text" :placeholder="t('media.audioArtistPlaceholder')"
                                class="input input-bordered w-full" :disabled="!selectedAudioFile" />
                        </div>
                        <button @click="uploadAudio" class="btn btn-primary"
                            :disabled="!selectedAudioFile || audioUploading || !audioTitle.trim()">
                            <Upload :size="20" v-if="!audioUploading" />
                            <span class="loading loading-spinner" v-else></span>
                            {{ audioUploading ? t('media.uploading') : t('media.upload') }}
                        </button>
                    </div>
                    <p class="text-xs text-base-content/50 mt-2" v-if="selectedAudioFile">
                        {{ t('media.selectedFile') }}: {{ selectedAudioFile.name }}
                    </p>
                </div>
            </div>

            <!-- Search Audio -->
            <div class="card bg-base-100 shadow-xl">
                <div class="card-body">
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">{{ t('media.search') }}</span>
                        </label>
                        <input v-model="audioSearchInput" type="text" :placeholder="t('media.searchPlaceholder')"
                            class="input input-bordered w-full" />
                    </div>
                </div>
            </div>

            <!-- Audio List -->
            <div class="card bg-base-100 shadow-xl">
                <div class="card-body">
                    <h2 class="card-title">{{ t('media.yourAudioFiles') }}</h2>
                    <div v-if="audioLoading" class="flex justify-center py-12">
                        <span class="loading loading-spinner loading-lg"></span>
                    </div>
                    <div v-else-if="filteredAudios.length === 0" class="text-center py-12">
                        <Music :size="64" class="mx-auto mb-4 opacity-30" />
                        <h3 class="text-lg font-semibold mb-2">{{ t('media.empty.title') }}</h3>
                        <p class="text-base-content/60">{{ t('media.empty.subtitle') }}</p>
                    </div>
                    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                        <div v-for="audio in filteredAudios" :key="audio.id"
                            class="card bg-base-200 shadow-md hover:shadow-lg transition-shadow">
                            <div class="card-body">
                                <div class="flex items-center justify-center h-32 bg-base-300 rounded-lg mb-4">
                                    <Music :size="48" class="opacity-50" />
                                </div>
                                <h3 class="font-semibold truncate" :title="audio.title">{{ audio.title }}</h3>
                                <p class="text-sm text-base-content/60 truncate" v-if="audio.artist">
                                    {{ audio.artist }}
                                </p>
                                <p class="text-xs text-base-content/50 mt-2">{{ formatDate(audio.created_at) }}</p>
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
        </template>

        <!-- ══════════════════════ IMAGES TAB ══════════════════════ -->
        <template v-if="activeTab === 'images'">
            <!-- Upload Image -->
            <div class="card bg-base-100 shadow-xl">
                <div class="card-body">
                    <h2 class="card-title">{{ t('media.uploadImage') }}</h2>
                    <p class="text-sm text-base-content/60 mb-4">
                        {{ t('media.imageSupportedFormats') }}: JPG, PNG, WebP, GIF ({{ t('media.imageMaxFileSize') }}: 1 MB)
                    </p>
                    <div class="grid grid-cols-1 gap-4">
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">{{ t('media.imageFile') }}</span>
                            </label>
                            <input id="image-upload" type="file" accept="image/*" @change="handleImageFileSelect"
                                class="file-input file-input-bordered w-full" />
                        </div>
                        <button @click="uploadImage" class="btn btn-primary"
                            :disabled="!selectedImageFile || imageUploading">
                            <Upload :size="20" v-if="!imageUploading" />
                            <span class="loading loading-spinner" v-else></span>
                            {{ imageUploading ? t('media.uploading') : t('media.upload') }}
                        </button>
                    </div>
                    <p class="text-xs text-base-content/50 mt-2" v-if="selectedImageFile">
                        {{ t('media.selectedFile') }}: {{ selectedImageFile.name }}
                        ({{ formatFileSize(selectedImageFile.size) }})
                    </p>
                </div>
            </div>

            <!-- Search Images -->
            <div class="card bg-base-100 shadow-xl">
                <div class="card-body">
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">{{ t('media.search') }}</span>
                        </label>
                        <input v-model="imageSearchInput" type="text"
                            :placeholder="t('media.imageSearchPlaceholder')" class="input input-bordered w-full" />
                    </div>
                </div>
            </div>

            <!-- Images Grid -->
            <div class="card bg-base-100 shadow-xl">
                <div class="card-body">
                    <h2 class="card-title">{{ t('media.yourImages') }}</h2>
                    <div v-if="imageLoading" class="flex justify-center py-12">
                        <span class="loading loading-spinner loading-lg"></span>
                    </div>
                    <div v-else-if="filteredImages.length === 0" class="text-center py-12">
                        <Image :size="64" class="mx-auto mb-4 opacity-30" />
                        <h3 class="text-lg font-semibold mb-2">{{ t('media.imageEmpty.title') }}</h3>
                        <p class="text-base-content/60">{{ t('media.imageEmpty.subtitle') }}</p>
                    </div>
                    <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                        <div v-for="img in filteredImages" :key="img.id"
                            class="card bg-base-200 shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                            <!-- Thumbnail -->
                            <figure class="relative aspect-square bg-base-300">
                                <img :src="img.url" :alt="img.metadata?.original_name ?? 'image'"
                                    class="w-full h-full object-cover" loading="lazy" />
                            </figure>
                            <div class="card-body p-3">
                                <!-- Filename -->
                                <p class="text-xs font-medium truncate"
                                    :title="img.metadata?.original_name ?? ''">
                                    {{ img.metadata?.original_name ?? '—' }}
                                </p>
                                <!-- Dimensions & size -->
                                <p class="text-xs text-base-content/50" v-if="img.metadata">
                                    <span v-if="img.metadata.width && img.metadata.height">
                                        {{ img.metadata.width }}×{{ img.metadata.height }} ·
                                    </span>
                                    {{ formatFileSize(img.metadata.size) }}
                                </p>
                                <p class="text-xs text-base-content/40">{{ formatDate(img.created_at) }}</p>
                                <!-- Actions -->
                                <div class="flex gap-2 mt-2">
                                    <button @click="copyImageUrl(img)"
                                        class="btn btn-xs flex-1"
                                        :class="copiedImageId === img.id ? 'btn-success' : 'btn-outline'">
                                        <Check :size="12" v-if="copiedImageId === img.id" />
                                        <Copy :size="12" v-else />
                                        {{ copiedImageId === img.id ? t('media.urlCopied') : t('media.copyUrl') }}
                                    </button>
                                    <button @click="deleteImage(img)" class="btn btn-xs btn-error btn-outline">
                                        <Trash2 :size="12" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>
