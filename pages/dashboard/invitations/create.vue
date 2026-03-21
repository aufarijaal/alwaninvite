<script setup lang="ts">
import { Plus, Trash2, Save, Music, Play, Pause, X, ImageOff, Eye } from 'lucide-vue-next'
import type { Database } from '~/types/database.types'
import { mockInvitations } from '~/utils/mockInvitationData'

definePageMeta({
    middleware: 'auth',
    layout: 'dashboard'
})

const { t } = useI18n()
const supabase = useSupabaseClient<Database>()
const user = useSupabaseUser()
const router = useRouter()

// Form State
const form = ref({
    slug: '',
    title: '',
    language: 'en' as 'en' | 'id',
    theme_id: null as number | null,
    published: false,
    bride_callname: '',
    bride_fullname: '',
    bride_info_1: '',
    bride_info_2: '',
    bride_info_3: '',
    groom_callname: '',
    groom_fullname: '',
    groom_info_1: '',
    groom_info_2: '',
    groom_info_3: '',
    events: [] as Array<{
        type: string
        title: string
        start_time: string
        end_time: string
        location_name: string
        location_address: string
        map_url: string
    }>,
    gifts: [] as Array<{
        type: string
        provider: string
        account_name: string
        account_number: string
    }>,
    livestream_platform: null as string | null,
    livestream_url: '',
    livestream_event_date: '',
    livestream_start_time: '',
    livestream_is_active: true,
    audio_id: null as number | null,
    autoplay: true,
    loop: true,
    is_active: true
})

// State
const loading = ref(false)
const saving = ref(false)
const themes = ref<Database['public']['Tables']['themes']['Row'][]>([])
const audios = ref<Database['public']['Tables']['audios']['Row'][]>([])
const errors = ref<Record<string, string>>({})
const showThemeModal = ref(false)

// Audio selection modal state
const showAudioModal = ref(false)
const audioTab = ref<'system' | 'user'>('system')
const playingAudioId = ref<number | null>(null)
const audioElement = ref<HTMLAudioElement | null>(null)

// Fetch themes
const fetchThemes = async () => {
    const { data } = await supabase
        .from('themes')
        .select('*')
        .eq('is_active', true)
        .order('name')

    themes.value = data || []
}

// Fetch audios
const fetchAudios = async () => {
    // Fetch system audios (default) and user's own uploaded audios
    const { data } = await supabase
        .from('audios')
        .select('*')
        .eq('is_active', true)
        .or(`source_type.eq.default,user_id.eq.${user.value?.sub}`)
        .order('title')

    audios.value = data || []
}

// Event Management
const addEvent = () => {
    form.value.events.push({
        type: 'ceremony',
        title: '',
        start_time: '',
        end_time: '',
        location_name: '',
        location_address: '',
        map_url: ''
    })
}

const removeEvent = (index: number) => {
    form.value.events.splice(index, 1)
}

// Gift Management
const addGift = () => {
    form.value.gifts.push({
        type: 'bank',
        provider: '',
        account_name: '',
        account_number: ''
    })
}

const removeGift = (index: number) => {
    form.value.gifts.splice(index, 1)
}

// Validation
const validateForm = () => {
    errors.value = {}

    // Basic Info
    if (!form.value.slug) errors.value.slug = 'Slug is required'
    else if (form.value.slug.length < 3) errors.value.slug = t('validation.slug.min')
    else if (!/^[a-z0-9-]+$/.test(form.value.slug)) errors.value.slug = t('validation.slug.format')

    if (!form.value.title) errors.value.title = 'Title is required'
    else if (form.value.title.length < 3) errors.value.title = t('validation.title.min')

    // Couple Info
    if (!form.value.bride_callname) errors.value.bride_callname = 'Bride call name is required'
    if (!form.value.bride_fullname) errors.value.bride_fullname = 'Bride full name is required'
    if (!form.value.groom_callname) errors.value.groom_callname = 'Groom call name is required'
    if (!form.value.groom_fullname) errors.value.groom_fullname = 'Groom full name is required'

    // Events
    if (form.value.events.length === 0) {
        errors.value.events = t('validation.events.min')
    } else {
        form.value.events.forEach((event, index) => {
            if (!event.title) errors.value[`event_title_${index}`] = 'Event title is required'
            if (!event.start_time) errors.value[`event_start_${index}`] = 'Start time is required'
            if (!event.location_name) errors.value[`event_location_${index}`] = 'Location is required'
        })
    }

    return Object.keys(errors.value).length === 0
}

// Submit Form
const submitForm = async () => {
    if (!validateForm()) {
        // Scroll to first error
        const firstErrorKey = Object.keys(errors.value)[0]
        const errorElement = document.querySelector(`[data-field="${firstErrorKey}"]`)
        errorElement?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        return
    }

    saving.value = true
    console.group(`[Create Invitation] slug: "${form.value.slug}"`)

    try {
        // Step 1: Insert wedding record
        console.log('[1/3] Inserting wedding record...')
        const { data, error } = await supabase
            .from('weddings')
            .insert({
                user_id: user.value?.sub,
                slug: form.value.slug,
                title: form.value.title,
                language: form.value.language,
                theme_id: form.value.theme_id,
                published: form.value.published,
                bride_callname: form.value.bride_callname,
                bride_fullname: form.value.bride_fullname,
                bride_info_1: form.value.bride_info_1 || null,
                bride_info_2: form.value.bride_info_2 || null,
                bride_info_3: form.value.bride_info_3 || null,
                groom_callname: form.value.groom_callname,
                groom_fullname: form.value.groom_fullname,
                groom_info_1: form.value.groom_info_1 || null,
                groom_info_2: form.value.groom_info_2 || null,
                groom_info_3: form.value.groom_info_3 || null,
                events: form.value.events as any,
                gifts: form.value.gifts as any,
                livestream_platform: form.value.livestream_platform,
                livestream_url: form.value.livestream_url || null,
                livestream_event_date: form.value.livestream_event_date || null,
                livestream_start_time: form.value.livestream_start_time || null,
                livestream_is_active: form.value.livestream_is_active,
                audio_id: form.value.audio_id,
                autoplay: form.value.autoplay,
                loop: form.value.loop,
                is_active: form.value.is_active
            })
            .select()
            .single()

        if (error) throw error
        console.log('[1/3] ✅ Wedding record created. ID:', data?.id)

        // Step 2: Generate OG image (non-fatal)
        console.log('[2/3] Generating OG thumbnail...')
        try {
            const arrayBuffer = await $fetch<ArrayBuffer>('/api/generate-og', {
                method: 'POST',
                body: { bride: form.value.bride_callname, groom: form.value.groom_callname },
                responseType: 'arrayBuffer',
            })
            console.log('[2/3] OG image generated. Size:', arrayBuffer.byteLength, 'bytes. Uploading...')
            const file = new Blob([arrayBuffer], { type: 'image/png' })
            const { error: uploadError } = await supabase.storage
                .from('images')
                .upload(`invitations/${form.value.slug}/og.png`, file, {
                    contentType: 'image/png',
                    upsert: true,
                })
            if (uploadError) {
                console.warn('[2/3] ❌ OG image upload failed:', uploadError.message)
            } else {
                console.log('[2/3] ✅ OG image uploaded successfully.')
            }
        } catch (ogErr: any) {
            console.warn('[2/3] ❌ OG image generation failed:', ogErr?.message ?? ogErr)
        }

        // Step 3: Redirect
        console.log('[3/3] Redirecting to invitations list...')
        console.groupEnd()
        await router.push('/dashboard/invitations')
    } catch (err: any) {
        console.error('[1/3] ❌ Failed to create wedding record:', err)
        console.groupEnd()
        if (err.code === '23505') {
            errors.value.slug = 'This slug is already taken. Please choose another one.'
        } else {
            alert(err.message || t('error.generic'))
        }
    } finally {
        saving.value = false
    }
}

// Auto-generate slug from title
watch(() => form.value.title, (newTitle) => {
    if (!form.value.slug || form.value.slug === '') {
        form.value.slug = newTitle
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim()
    }
})

// Load data on mount
onMounted(() => {
    fetchThemes()
    fetchAudios()
    // Add one default event
    if (form.value.events.length === 0) {
        addEvent()
    }
})

// Audio Modal Functions
const systemAudios = computed(() =>
    audios.value.filter(audio => audio.source_type === 'default')
)

const userAudios = computed(() =>
    audios.value.filter(audio => audio.source_type === 'user')
)

const selectedAudio = computed(() =>
    audios.value.find(audio => audio.id === form.value.audio_id)
)

const selectedTheme = computed(() =>
    themes.value.find(theme => theme.id === form.value.theme_id)
)

const selectTheme = (themeId: number) => {
    form.value.theme_id = themeId
    showThemeModal.value = false
}

const removeSelectedTheme = () => {
    form.value.theme_id = null
}

const toggleAudioPlay = (audio: Database['public']['Tables']['audios']['Row']) => {
    if (playingAudioId.value === audio.id) {
        // Stop playing
        audioElement.value?.pause()
        playingAudioId.value = null
    } else {
        // Start playing
        if (audioElement.value) {
            audioElement.value.src = audio.url
            audioElement.value.play()
            playingAudioId.value = audio.id
        }
    }
}

const selectAudio = (audioId: number) => {
    form.value.audio_id = audioId
    closeAudioModal()
}

const closeAudioModal = () => {
    showAudioModal.value = false
    if (audioElement.value) {
        audioElement.value.pause()
        playingAudioId.value = null
    }
}

const removeSelectedAudio = () => {
    form.value.audio_id = null
}

// Fill form with mock data
const mockExamples = Object.keys(mockInvitations) as Array<keyof typeof mockInvitations>

const fillWithMockData = (index: number) => {
    const key = mockExamples[index]
    const mock = mockInvitations[key]
    Object.assign(form.value, { ...mock })
}

// Cleanup audio on unmount
onUnmounted(() => {
    if (audioElement.value) {
        audioElement.value.pause()
        audioElement.value = null
    }
})
</script>

<template>
    <div class="max-w-5xl mx-auto space-y-6 pb-10">
        <!-- Page Header -->
        <div>
            <h1 class="text-3xl font-bold">{{ t('invitation.create.title') }}</h1>
            <p class="text-base-content/70 mt-1">{{ t('invitation.create.subtitle') }}</p>
        </div>

        <!-- Mock Data Examples -->
        <div class="flex flex-wrap gap-2 items-center">
            <span class="text-sm text-base-content/60">Fill with example:</span>
            <button v-for="(key, index) in mockExamples" :key="key" type="button" @click="fillWithMockData(index)"
                class="btn btn-xs btn-outline">
                Example {{ index + 1 }}
            </button>
        </div>



        <!-- Theme Selection Modal -->
        <div v-if="showThemeModal" class="modal modal-open">
            <div class="modal-box max-w-4xl">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="font-bold text-lg">{{ t('invitation.actions.selectTheme') }}</h3>
                    <button type="button" @click="showThemeModal = false" class="btn btn-ghost btn-sm btn-circle">
                        <X :size="20" />
                    </button>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto">
                    <div v-for="theme in themes" :key="theme.id" @click="selectTheme(theme.id)"
                        class="card bg-base-100 border-2 cursor-pointer transition-all hover:border-primary"
                        :class="{ 'border-primary bg-primary/5': form.theme_id === theme.id }">
                        <figure class="h-48 bg-base-200">
                            <img v-if="theme.preview_image_url" :src="theme.preview_image_url" :alt="theme.name"
                                class="w-full h-full object-cover" />
                            <div v-else class="w-full h-full flex flex-col items-center justify-center">
                                <ImageOff :size="48" class="opacity-20" />
                                <span class="text-sm text-base-content/30 mt-2">{{ t('invitation.previewUnavailable')
                                    }}</span>
                            </div>
                        </figure>
                        <div class="card-body p-4">
                            <h3 class="card-title text-base">
                                {{ theme.name }}
                                <span v-if="theme.is_premium" class="badge badge-primary badge-sm">Premium</span>
                            </h3>
                            <div v-if="form.theme_id === theme.id" class="badge badge-success badge-sm">{{
                                t('invitation.actions.selected') }}</div>
                        </div>
                    </div>
                </div>

                <div v-if="themes.length === 0" class="text-center py-8 text-base-content/60">
                    <Eye :size="48" class="mx-auto mb-2 opacity-30" />
                    <p>{{ t('invitation.empty.noThemes') }}</p>
                </div>

                <div class="modal-action">
                    <button type="button" @click="showThemeModal = false" class="btn btn-ghost">
                        {{ t('common.close') }}
                    </button>
                </div>
            </div>
            <div class="modal-backdrop" @click="showThemeModal = false"></div>
        </div>



        <!-- Form -->
        <form @submit.prevent="submitForm" class="space-y-6">
            <!-- Basic Information -->
            <div class="card bg-base-100 shadow-xl">
                <div class="card-body">
                    <h2 class="card-title text-xl mb-4">{{ t('invitation.steps.basicInfo') }}</h2>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <!-- Title -->
                        <div class="form-control" data-field="title">
                            <label class="label">
                                <span class="label-text font-medium">{{ t('invitation.fields.title') }} *</span>
                            </label>
                            <input v-model="form.title" type="text" :placeholder="t('invitation.placeholders.title')"
                                class="input input-bordered" :class="{ 'input-error': errors.title }" />
                            <label v-if="errors.title" class="label">
                                <span class="label-text-alt text-error">{{ errors.title }}</span>
                            </label>
                        </div>

                        <!-- Slug -->
                        <div class="form-control" data-field="slug">
                            <label class="label">
                                <span class="label-text font-medium">{{ t('invitation.fields.slug') }} *</span>
                            </label>
                            <input v-model="form.slug" type="text" :placeholder="t('invitation.placeholders.slug')"
                                class="input input-bordered" :class="{ 'input-error': errors.slug }" />
                            <label class="label">
                                <span class="label-text-alt" :class="{ 'text-error': errors.slug }">
                                    {{ errors.slug || t('invitation.helpers.slug') }}
                                </span>
                            </label>
                        </div>

                        <!-- Language -->
                        <div class="form-control md:col-span-2">
                            <label class="label">
                                <span class="label-text font-medium">{{ t('invitation.fields.language') }} *</span>
                            </label>
                            <select v-model="form.language" class="select select-bordered">
                                <option value="en">{{ t('invitation.languages.en') }}</option>
                                <option value="id">{{ t('invitation.languages.id') }}</option>
                            </select>
                        </div>

                        <!-- Theme -->
                        <div class="form-control md:col-span-2">
                            <label class="label">
                                <span class="label-text font-medium">{{ t('invitation.fields.theme') }}</span>
                            </label>

                            <!-- Selected Theme Display -->
                            <div v-if="selectedTheme"
                                class="flex items-center gap-3 p-4 border border-base-300 rounded-lg">
                                <div v-if="selectedTheme.preview_image_url"
                                    class="w-20 h-20 rounded overflow-hidden flex-shrink-0">
                                    <img :src="selectedTheme.preview_image_url" :alt="selectedTheme.name"
                                        class="w-full h-full object-cover" />
                                </div>
                                <div v-else
                                    class="w-20 h-20 rounded bg-base-200 flex flex-col items-center justify-center flex-shrink-0 text-center">
                                    <ImageOff :size="20" class="opacity-30" />
                                    <span class="text-xs text-base-content/40 mt-1">{{
                                        t('invitation.previewUnavailable') }}</span>
                                </div>
                                <div class="flex-1">
                                    <div class="font-medium">{{ selectedTheme.name }}</div>
                                    <div v-if="selectedTheme.is_premium" class="text-sm text-base-content/60">
                                        <span class="badge badge-primary badge-sm">Premium</span>
                                    </div>
                                </div>
                                <button type="button" @click="removeSelectedTheme"
                                    class="btn btn-ghost btn-sm btn-circle">
                                    <X :size="16" />
                                </button>
                            </div>

                            <!-- Select Theme Button -->
                            <button v-else type="button" @click="showThemeModal = true" class="btn btn-outline w-full">
                                <Eye :size="20" />
                                {{ t('invitation.actions.selectTheme') }}
                            </button>

                            <!-- Change Theme Button -->
                            <button v-if="selectedTheme" type="button" @click="showThemeModal = true"
                                class="btn btn-ghost btn-sm mt-2">
                                {{ t('invitation.actions.changeTheme') }}
                            </button>
                        </div>

                        <!-- Published -->
                        <div class="form-control">
                            <label class="label cursor-pointer justify-start gap-4">
                                <input v-model="form.published" type="checkbox" class="checkbox checkbox-primary" />
                                <span class="label-text font-medium">{{ t('invitation.fields.published') }}</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Couple Information -->
            <div class="card bg-base-100 shadow-xl">
                <div class="card-body">
                    <h2 class="card-title text-xl mb-4">{{ t('invitation.steps.coupleInfo') }}</h2>

                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <!-- Bride Info -->
                        <div class="space-y-4">
                            <h3 class="font-semibold text-lg">{{ t('invitation.sections.brideInfo') }}</h3>

                            <div class="form-control" data-field="bride_callname">
                                <label class="label">
                                    <span class="label-text font-medium">{{ t('invitation.fields.callname') }} *</span>
                                </label>
                                <input v-model="form.bride_callname" type="text"
                                    :placeholder="t('invitation.placeholders.brideCallname')"
                                    class="input input-bordered" :class="{ 'input-error': errors.bride_callname }" />
                                <label v-if="errors.bride_callname" class="label">
                                    <span class="label-text-alt text-error">{{ errors.bride_callname }}</span>
                                </label>
                            </div>

                            <div class="form-control" data-field="bride_fullname">
                                <label class="label">
                                    <span class="label-text font-medium">{{ t('invitation.fields.fullname') }} *</span>
                                </label>
                                <input v-model="form.bride_fullname" type="text"
                                    :placeholder="t('invitation.placeholders.brideFullname')"
                                    class="input input-bordered" :class="{ 'input-error': errors.bride_fullname }" />
                                <label v-if="errors.bride_fullname" class="label">
                                    <span class="label-text-alt text-error">{{ errors.bride_fullname }}</span>
                                </label>
                            </div>

                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text font-medium">{{ t('invitation.fields.additionalInfo') }}
                                        1</span>
                                </label>
                                <input v-model="form.bride_info_1" type="text"
                                    :placeholder="t('invitation.placeholders.additionalInfo')"
                                    class="input input-bordered" />
                            </div>

                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text font-medium">{{ t('invitation.fields.additionalInfo') }}
                                        2</span>
                                </label>
                                <input v-model="form.bride_info_2" type="text"
                                    :placeholder="t('invitation.placeholders.additionalInfo')"
                                    class="input input-bordered" />
                            </div>

                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text font-medium">{{ t('invitation.fields.additionalInfo') }}
                                        3</span>
                                </label>
                                <input v-model="form.bride_info_3" type="text"
                                    :placeholder="t('invitation.placeholders.additionalInfo')"
                                    class="input input-bordered" />
                            </div>
                        </div>

                        <!-- Groom Info -->
                        <div class="space-y-4">
                            <h3 class="font-semibold text-lg">{{ t('invitation.sections.groomInfo') }}</h3>

                            <div class="form-control" data-field="groom_callname">
                                <label class="label">
                                    <span class="label-text font-medium">{{ t('invitation.fields.callname') }} *</span>
                                </label>
                                <input v-model="form.groom_callname" type="text"
                                    :placeholder="t('invitation.placeholders.groomCallname')"
                                    class="input input-bordered" :class="{ 'input-error': errors.groom_callname }" />
                                <label v-if="errors.groom_callname" class="label">
                                    <span class="label-text-alt text-error">{{ errors.groom_callname }}</span>
                                </label>
                            </div>

                            <div class="form-control" data-field="groom_fullname">
                                <label class="label">
                                    <span class="label-text font-medium">{{ t('invitation.fields.fullname') }} *</span>
                                </label>
                                <input v-model="form.groom_fullname" type="text"
                                    :placeholder="t('invitation.placeholders.groomFullname')"
                                    class="input input-bordered" :class="{ 'input-error': errors.groom_fullname }" />
                                <label v-if="errors.groom_fullname" class="label">
                                    <span class="label-text-alt text-error">{{ errors.groom_fullname }}</span>
                                </label>
                            </div>

                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text font-medium">{{ t('invitation.fields.additionalInfo') }}
                                        1</span>
                                </label>
                                <input v-model="form.groom_info_1" type="text"
                                    :placeholder="t('invitation.placeholders.additionalInfo')"
                                    class="input input-bordered" />
                            </div>

                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text font-medium">{{ t('invitation.fields.additionalInfo') }}
                                        2</span>
                                </label>
                                <input v-model="form.groom_info_2" type="text"
                                    :placeholder="t('invitation.placeholders.additionalInfo')"
                                    class="input input-bordered" />
                            </div>

                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text font-medium">{{ t('invitation.fields.additionalInfo') }}
                                        3</span>
                                </label>
                                <input v-model="form.groom_info_3" type="text"
                                    :placeholder="t('invitation.placeholders.additionalInfo')"
                                    class="input input-bordered" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Events -->
            <div class="card bg-base-100 shadow-xl" data-field="events">
                <div class="card-body">
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="card-title text-xl">{{ t('invitation.steps.events') }}</h2>
                        <button type="button" @click="addEvent" class="btn btn-primary btn-sm">
                            <Plus :size="16" />
                            {{ t('invitation.actions.addEvent') }}
                        </button>
                    </div>

                    <div v-if="errors.events" class="alert alert-error mb-4">
                        <span>{{ errors.events }}</span>
                    </div>

                    <div class="space-y-4">
                        <div v-for="(event, index) in form.events" :key="index"
                            class="border border-base-300 rounded-lg p-4 space-y-4">
                            <div class="flex justify-between items-center">
                                <h3 class="font-semibold">{{ t('invitation.labels.event') }} {{ index + 1 }}</h3>
                                <button type="button" @click="removeEvent(index)"
                                    class="btn btn-ghost btn-sm btn-circle text-error">
                                    <Trash2 :size="16" />
                                </button>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div class="form-control">
                                    <label class="label">
                                        <span class="label-text font-medium">{{ t('invitation.fields.eventType') }}
                                            *</span>
                                    </label>
                                    <select v-model="event.type" class="select select-bordered">
                                        <option value="ceremony">{{ t('invitation.eventTypes.ceremony') }}</option>
                                        <option value="reception">{{ t('invitation.eventTypes.reception') }}</option>
                                        <option value="other">{{ t('invitation.eventTypes.other') }}</option>
                                    </select>
                                </div>

                                <div class="form-control" :data-field="`event_title_${index}`">
                                    <label class="label">
                                        <span class="label-text font-medium">{{ t('invitation.fields.eventTitle') }}
                                            *</span>
                                    </label>
                                    <input v-model="event.title" type="text"
                                        :placeholder="t('invitation.placeholders.eventTitle')"
                                        class="input input-bordered"
                                        :class="{ 'input-error': errors[`event_title_${index}`] }" />
                                    <label v-if="errors[`event_title_${index}`]" class="label">
                                        <span class="label-text-alt text-error">{{ errors[`event_title_${index}`]
                                        }}</span>
                                    </label>
                                </div>

                                <div class="form-control" :data-field="`event_start_${index}`">
                                    <label class="label">
                                        <span class="label-text font-medium">{{ t('invitation.fields.startTime') }}
                                            *</span>
                                    </label>
                                    <input v-model="event.start_time" type="datetime-local" class="input input-bordered"
                                        :class="{ 'input-error': errors[`event_start_${index}`] }" />
                                    <label v-if="errors[`event_start_${index}`]" class="label">
                                        <span class="label-text-alt text-error">{{ errors[`event_start_${index}`]
                                        }}</span>
                                    </label>
                                </div>

                                <div class="form-control">
                                    <label class="label">
                                        <span class="label-text font-medium">{{ t('invitation.fields.endTime') }}</span>
                                    </label>
                                    <input v-model="event.end_time" type="datetime-local"
                                        class="input input-bordered" />
                                </div>

                                <div class="form-control" :data-field="`event_location_${index}`">
                                    <label class="label">
                                        <span class="label-text font-medium">{{ t('invitation.fields.locationName') }}
                                            *</span>
                                    </label>
                                    <input v-model="event.location_name" type="text"
                                        :placeholder="t('invitation.placeholders.locationName')"
                                        class="input input-bordered"
                                        :class="{ 'input-error': errors[`event_location_${index}`] }" />
                                    <label v-if="errors[`event_location_${index}`]" class="label">
                                        <span class="label-text-alt text-error">{{ errors[`event_location_${index}`]
                                        }}</span>
                                    </label>
                                </div>

                                <div class="form-control">
                                    <label class="label">
                                        <span class="label-text font-medium">{{ t('invitation.fields.locationAddress')
                                        }}</span>
                                    </label>
                                    <input v-model="event.location_address" type="text"
                                        :placeholder="t('invitation.placeholders.locationAddress')"
                                        class="input input-bordered" />
                                </div>

                                <div class="form-control md:col-span-2">
                                    <label class="label">
                                        <span class="label-text font-medium">{{ t('invitation.fields.mapUrl') }}</span>
                                    </label>
                                    <input v-model="event.map_url" type="url"
                                        :placeholder="t('invitation.placeholders.mapUrl')"
                                        class="input input-bordered" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Gifts (Optional) -->
            <div class="card bg-base-100 shadow-xl">
                <div class="card-body">
                    <div class="flex justify-between items-center mb-4">
                        <div>
                            <h2 class="card-title text-xl">{{ t('invitation.steps.gifts') }}</h2>
                            <p class="text-sm text-base-content/60 mt-1">{{ t('invitation.helpers.giftsOptional') }}</p>
                        </div>
                        <button type="button" @click="addGift" class="btn btn-primary btn-sm">
                            <Plus :size="16" />
                            {{ t('invitation.actions.addGift') }}
                        </button>
                    </div>

                    <div v-if="form.gifts.length === 0" class="text-center py-8 text-base-content/60">
                        {{ t('invitation.empty.noGifts') }}
                    </div>

                    <div class="space-y-4">
                        <div v-for="(gift, index) in form.gifts" :key="index"
                            class="border border-base-300 rounded-lg p-4 space-y-4">
                            <div class="flex justify-between items-center">
                                <h3 class="font-semibold">{{ t('invitation.labels.gift') }} {{ index + 1 }}</h3>
                                <button type="button" @click="removeGift(index)"
                                    class="btn btn-ghost btn-sm btn-circle text-error">
                                    <Trash2 :size="16" />
                                </button>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div class="form-control">
                                    <label class="label">
                                        <span class="label-text font-medium">{{ t('invitation.fields.giftType')
                                        }}</span>
                                    </label>
                                    <select v-model="gift.type" class="select select-bordered">
                                        <option value="bank">{{ t('invitation.giftTypes.bank') }}</option>
                                        <option value="ewallet">{{ t('invitation.giftTypes.ewallet') }}</option>
                                        <option value="crypto">{{ t('invitation.giftTypes.crypto') }}</option>
                                        <option value="giftRegistry">{{ t('invitation.giftTypes.giftRegistry') }}
                                        </option>
                                    </select>
                                </div>

                                <div class="form-control">
                                    <label class="label">
                                        <span class="label-text font-medium">{{ t('invitation.fields.provider')
                                        }}</span>
                                    </label>
                                    <input v-model="gift.provider" type="text"
                                        :placeholder="t('invitation.placeholders.provider')"
                                        class="input input-bordered" />
                                </div>

                                <div class="form-control">
                                    <label class="label">
                                        <span class="label-text font-medium">{{ t('invitation.fields.accountName')
                                        }}</span>
                                    </label>
                                    <input v-model="gift.account_name" type="text"
                                        :placeholder="t('invitation.placeholders.accountName')"
                                        class="input input-bordered" />
                                </div>

                                <div class="form-control">
                                    <label class="label">
                                        <span class="label-text font-medium">{{ t('invitation.fields.accountNumber')
                                        }}</span>
                                    </label>
                                    <input v-model="gift.account_number" type="text"
                                        :placeholder="t('invitation.placeholders.accountNumber')"
                                        class="input input-bordered" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Live Stream (Optional) -->
            <div class="card bg-base-100 shadow-xl">
                <div class="card-body">
                    <div class="mb-4">
                        <h2 class="card-title text-xl">{{ t('invitation.steps.liveStream') }}</h2>
                        <p class="text-sm text-base-content/60 mt-1">{{ t('invitation.helpers.liveStream') }}</p>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text font-medium">{{ t('invitation.fields.platform') }}</span>
                            </label>
                            <select v-model="form.livestream_platform" class="select select-bordered">
                                <option :value="null">{{ t('invitation.placeholders.selectPlatform') }}</option>
                                <option value="youtube">YouTube</option>
                                <option value="instagram">Instagram</option>
                                <option value="zoom">Zoom</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div class="form-control">
                            <label class="label">
                                <span class="label-text font-medium">{{ t('invitation.fields.streamUrl') }}</span>
                            </label>
                            <input v-model="form.livestream_url" type="url" class="input input-bordered" />
                        </div>

                        <div class="form-control">
                            <label class="label">
                                <span class="label-text font-medium">{{ t('invitation.fields.eventDate') }}</span>
                            </label>
                            <input v-model="form.livestream_event_date" type="date" class="input input-bordered" />
                        </div>

                        <div class="form-control">
                            <label class="label">
                                <span class="label-text font-medium">{{ t('invitation.fields.streamStartTime') }}</span>
                            </label>
                            <input v-model="form.livestream_start_time" type="time" class="input input-bordered" />
                        </div>

                        <div class="form-control">
                            <label class="label cursor-pointer justify-start gap-4">
                                <input v-model="form.livestream_is_active" type="checkbox"
                                    class="checkbox checkbox-primary" />
                                <span class="label-text font-medium">{{ t('invitation.fields.active') }}</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Audio (Optional) -->
            <div class="card bg-base-100 shadow-xl">
                <div class="card-body">
                    <div class="mb-4">
                        <h2 class="card-title text-xl">{{ t('invitation.steps.audio') }}</h2>
                        <p class="text-sm text-base-content/60 mt-1">{{ t('invitation.helpers.audio') }}</p>
                    </div>

                    <!-- Selected Audio Display -->
                    <div v-if="selectedAudio" class="flex items-center gap-3 p-4 border border-base-300 rounded-lg">
                        <Music :size="24" class="text-primary" />
                        <div class="flex-1">
                            <div class="font-medium">{{ selectedAudio.title }}</div>
                            <div v-if="selectedAudio.artist" class="text-sm text-base-content/60">{{
                                selectedAudio.artist }}</div>
                        </div>
                        <button type="button" @click="removeSelectedAudio" class="btn btn-ghost btn-sm btn-circle">
                            <X :size="16" />
                        </button>
                    </div>

                    <!-- Select Audio Button -->
                    <button v-else type="button" @click="showAudioModal = true" class="btn btn-outline w-full">
                        <Music :size="20" />
                        {{ t('invitation.placeholders.selectAudio') }}
                    </button>

                    <!-- Change Audio Button -->
                    <button v-if="selectedAudio" type="button" @click="showAudioModal = true"
                        class="btn btn-ghost btn-sm mt-2">
                        {{ t('invitation.actions.changeAudio') }}
                    </button>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="form-control">
                            <label class="label cursor-pointer justify-start gap-4">
                                <input v-model="form.autoplay" type="checkbox" class="checkbox checkbox-primary" />
                                <span class="label-text font-medium">{{ t('invitation.fields.autoplay') }}</span>
                            </label>
                        </div>


                        <!-- Audio Selection Modal -->
                        <div v-if="showAudioModal" class="modal modal-open">
                            <div class="modal-box max-w-4xl max-h-[80vh]">
                                <div class="flex justify-between items-center mb-4">
                                    <h3 class="font-bold text-lg">{{ t('invitation.actions.selectAudio') }}</h3>
                                    <button @click="closeAudioModal" class="btn btn-ghost btn-sm btn-circle">
                                        <X :size="20" />
                                    </button>
                                </div>

                                <!-- Tabs -->
                                <div class="tabs tabs-boxed mb-4">
                                    <a class="tab" :class="{ 'tab-active': audioTab === 'system' }"
                                        @click="audioTab = 'system'">
                                        {{ t('invitation.audioTabs.system') }} ({{ systemAudios.length }})
                                    </a>
                                    <a class="tab" :class="{ 'tab-active': audioTab === 'user' }"
                                        @click="audioTab = 'user'">
                                        {{ t('invitation.audioTabs.userUploads') }} ({{ userAudios.length }})
                                    </a>
                                </div>

                                <!-- Audio List -->
                                <div class="overflow-y-auto max-h-96 space-y-2">
                                    <!-- System Audio Tab -->
                                    <template v-if="audioTab === 'system'">
                                        <div v-for="audio in systemAudios" :key="audio.id"
                                            class="flex items-center gap-3 p-3 border border-base-300 rounded-lg hover:bg-base-200 transition-colors"
                                            :class="{ 'border-primary bg-primary/5': form.audio_id === audio.id }">
                                            <button type="button" @click="toggleAudioPlay(audio)"
                                                class="btn btn-circle btn-sm"
                                                :class="playingAudioId === audio.id ? 'btn-primary' : 'btn-ghost'">
                                                <Play v-if="playingAudioId !== audio.id" :size="16" />
                                                <Pause v-else :size="16" />
                                            </button>

                                            <div class="flex-1 cursor-pointer" @click="selectAudio(audio.id)">
                                                <div class="font-medium">{{ audio.title }}</div>
                                                <div class="text-sm text-base-content/60 flex items-center gap-2">
                                                    <span v-if="audio.artist">{{ audio.artist }}</span>
                                                    <span v-if="audio.is_premium"
                                                        class="badge badge-primary badge-sm">Premium</span>
                                                </div>
                                            </div>

                                            <button type="button" @click="selectAudio(audio.id)" class="btn btn-sm"
                                                :class="form.audio_id === audio.id ? 'btn-primary' : 'btn-ghost'">
                                                {{ form.audio_id === audio.id ? t('invitation.actions.selected') :
                                                    t('invitation.actions.select') }}
                                            </button>
                                        </div>

                                        <div v-if="systemAudios.length === 0"
                                            class="text-center py-8 text-base-content/60">
                                            {{ t('invitation.empty.noSystemAudio') }}
                                        </div>
                                    </template>

                                    <!-- User Uploads Tab -->
                                    <template v-if="audioTab === 'user'">
                                        <div v-for="audio in userAudios" :key="audio.id"
                                            class="flex items-center gap-3 p-3 border border-base-300 rounded-lg hover:bg-base-200 transition-colors"
                                            :class="{ 'border-primary bg-primary/5': form.audio_id === audio.id }">
                                            <button type="button" @click="toggleAudioPlay(audio)"
                                                class="btn btn-circle btn-sm"
                                                :class="playingAudioId === audio.id ? 'btn-primary' : 'btn-ghost'">
                                                <Play v-if="playingAudioId !== audio.id" :size="16" />
                                                <Pause v-else :size="16" />
                                            </button>

                                            <div class="flex-1 cursor-pointer" @click="selectAudio(audio.id)">
                                                <div class="font-medium">{{ audio.title }}</div>
                                                <div class="text-sm text-base-content/60">
                                                    <span v-if="audio.artist">{{ audio.artist }}</span>
                                                </div>
                                            </div>

                                            <button type="button" @click="selectAudio(audio.id)" class="btn btn-sm"
                                                :class="form.audio_id === audio.id ? 'btn-primary' : 'btn-ghost'">
                                                {{ form.audio_id === audio.id ? t('invitation.actions.selected') :
                                                    t('invitation.actions.select') }}
                                            </button>
                                        </div>

                                        <div v-if="userAudios.length === 0"
                                            class="text-center py-8 text-base-content/60">
                                            <Music :size="48" class="mx-auto mb-2 opacity-30" />
                                            <p>{{ t('invitation.empty.noUserAudio') }}</p>
                                            <p class="text-sm mt-1">{{ t('invitation.empty.uploadAudioHint') }}</p>
                                        </div>
                                    </template>
                                </div>

                                <!-- Hidden Audio Element -->
                                <audio ref="audioElement" @ended="playingAudioId = null" class="hidden" />
                            </div>
                            <div class="modal-backdrop" @click="closeAudioModal"></div>
                        </div>
                        <div class="form-control">
                            <label class="label cursor-pointer justify-start gap-4">
                                <input v-model="form.loop" type="checkbox" class="checkbox checkbox-primary" />
                                <span class="label-text font-medium">{{ t('invitation.fields.loop') }}</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Form Actions -->
            <div class="card bg-base-100 shadow-xl">
                <div class="card-body">
                    <div class="flex flex-col md:flex-row gap-4 justify-between">
                        <NuxtLink to="/dashboard/invitations" class="btn btn-ghost">
                            {{ t('common.cancel') }}
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </form>
    </div>

    <!-- Floating Save Button -->
    <div class="fixed bottom-6 right-6 z-50">
        <button type="button" @click="submitForm" class="btn btn-primary shadow-lg" :disabled="saving">
            <Save v-if="!saving" :size="20" />
            <span v-if="saving" class="loading loading-spinner"></span>
            {{ saving ? t('common.saving') : t('common.save') }}
        </button>
    </div>
</template>
