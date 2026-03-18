<script setup lang="ts">
import { Download, Trash2, Calendar, Users, MessageSquare, CheckCircle, XCircle, Clock, Plus, UserPlus, ClipboardList, Copy, Check } from 'lucide-vue-next'
import type { Database } from '~/types/database.types'

definePageMeta({
    middleware: 'auth',
    layout: 'dashboard'
})

const { t } = useI18n()
const supabase = useSupabaseClient<Database>()
const user = useSupabaseUser()

const GUEST_LIMIT = 500

// ── Main state ──────────────────────────────────────────
const wishes = ref<Database['public']['Tables']['wishes']['Row'][]>([])
const weddings = ref<Database['public']['Tables']['weddings']['Row'][]>([])
const loading = ref(false)
const searchInput = ref('')
const searchQuery = ref('')
const selectedWedding = ref<string>('all')
const selectedAttendance = ref<string>('all')

// ── Add Guests panel ────────────────────────────────────
const showAddGuests = ref(false)
const addGuestsWeddingId = ref<string>('')
const inputMethod = ref<'textarea' | 'fields'>('textarea')
const guestTextarea = ref('')
const guestFields = ref<string[]>([''])
const savingGuests = ref(false)
const savedMessage = ref('')

// Current total for the selected wedding (drives the counter)
const weddingGuestCount = computed(() => {
    if (!addGuestsWeddingId.value) return 0
    return wishes.value.filter(w => w.wedding_id === addGuestsWeddingId.value).length
})

const parsedTextareaNames = computed(() =>
    guestTextarea.value
        .split('\n')
        .map(l => l.trim())
        .filter(Boolean)
)

const newGuestNames = computed(() =>
    inputMethod.value === 'textarea'
        ? parsedTextareaNames.value
        : guestFields.value.map(f => f.trim()).filter(Boolean)
)

const totalAfterAdd = computed(() => weddingGuestCount.value + newGuestNames.value.length)
const overLimit = computed(() => totalAfterAdd.value > GUEST_LIMIT)

const addGuestField = () => { guestFields.value.push('') }
const removeGuestField = (i: number) => { guestFields.value.splice(i, 1) }

const saveGuests = async () => {
    if (!addGuestsWeddingId.value || newGuestNames.value.length === 0 || overLimit.value) return
    savingGuests.value = true
    savedMessage.value = ''
    try {
        const rows = newGuestNames.value.map(name => ({
            wedding_id: addGuestsWeddingId.value,
            guest_name: name,
            attendance: null,
            guest_count: 1,
            message: null,
        }))
        const { error } = await supabase.from('wishes').insert(rows)
        if (error) throw error
        savedMessage.value = t('wishes.guestsSaved', { count: rows.length })
        guestTextarea.value = ''
        guestFields.value = ['']
        await fetchWishes()
    } catch (err) {
        console.error('Error saving guests:', err)
    } finally {
        savingGuests.value = false
    }
}

// ── WhatsApp copy ───────────────────────────────────────
const copiedWishId = ref<number | null>(null)

const copyWhatsapp = async (wish: Database['public']['Tables']['wishes']['Row']) => {
    const weddingData = (wish as any).weddings as { groom_callname?: string; bride_callname?: string; slug?: string } | null
    const groomName = weddingData?.groom_callname ?? ''
    const brideName = weddingData?.bride_callname ?? ''
    const slug = weddingData?.slug ?? ''
    const inviteUrl = `${window.location.origin}/invite/${slug}`

    const message =
        `Assalamu'alaikum Wr. Wb.\n\n` +
        `Kepada Yth.\n*${wish.guest_name}*\n\n` +
        `Dengan penuh kebahagiaan, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam pernikahan kami:\n\n` +
        `💍 *${groomName}* & *${brideName}*\n\n` +
        `Untuk detail acara, silakan buka undangan digital kami:\n${inviteUrl}\n\n` +
        `Merupakan suatu kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir.\n\n` +
        `Wassalamu'alaikum Wr. Wb.`

    await navigator.clipboard.writeText(message)
    copiedWishId.value = wish.id
    setTimeout(() => { copiedWishId.value = null }, 2000)
}

// ── Debounce search ─────────────────────────────────────
let searchTimeout: ReturnType<typeof setTimeout> | null = null
watch(searchInput, (val) => {
    if (searchTimeout) clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => { searchQuery.value = val }, 300)
})

// ── Fetches ─────────────────────────────────────────────
const fetchWeddings = async () => {
    if (!user.value?.sub) return
    const { data } = await supabase
        .from('weddings')
        .select('id, slug, title, groom_callname, bride_callname, user_id')
        .eq('user_id', user.value.sub)
        .order('created_at', { ascending: false })
    weddings.value = (data as any) || []
}

const fetchWishes = async () => {
    if (!user.value?.sub) return
    loading.value = true
    try {
        const { data, error } = await supabase
            .from('wishes')
            .select(`*, weddings!inner(id, slug, title, groom_callname, bride_callname, user_id)`)
            .eq('weddings.user_id', user.value.sub)
            .order('created_at', { ascending: false })
        if (error) throw error
        wishes.value = data || []
    } catch (err) {
        console.error('Error fetching wishes:', err)
    } finally {
        loading.value = false
    }
}

// ── Filtered wishes ─────────────────────────────────────
const filteredWishes = computed(() => {
    let filtered = wishes.value
    if (selectedWedding.value !== 'all')
        filtered = filtered.filter(w => w.wedding_id === selectedWedding.value)
    if (selectedAttendance.value !== 'all') {
        if (selectedAttendance.value === 'null')
            filtered = filtered.filter(w => w.attendance == null)
        else
            filtered = filtered.filter(w => w.attendance === selectedAttendance.value)
    }
    if (searchQuery.value) {
        const q = searchQuery.value.toLowerCase()
        filtered = filtered.filter(w =>
            w.guest_name.toLowerCase().includes(q) ||
            w.message?.toLowerCase().includes(q)
        )
    }
    return filtered
})

// ── Statistics ──────────────────────────────────────────
const stats = computed(() => {
    const total = filteredWishes.value.length
    const attending = filteredWishes.value.filter(w => w.attendance === 'hadir' || w.attendance === 'yes').length
    const notAttending = filteredWishes.value.filter(w => w.attendance === 'tidak_hadir' || w.attendance === 'no').length
    const maybe = filteredWishes.value.filter(w => w.attendance === 'mungkin' || w.attendance === 'maybe').length
    const pending = filteredWishes.value.filter(w => w.attendance == null).length
    const totalGuests = filteredWishes.value.reduce((sum, w) => sum + (w.guest_count || 0), 0)
    return { total, attending, notAttending, maybe, pending, totalGuests }
})

// ── Helpers ─────────────────────────────────────────────
const deleteWish = async (id: number) => {
    if (!confirm(t('wishes.confirmDelete'))) return
    try {
        const { error } = await supabase.from('wishes').delete().eq('id', id)
        if (error) throw error
        await fetchWishes()
    } catch (err) {
        console.error('Error deleting wish:', err)
    }
}

const exportToCSV = () => {
    const headers = ['Date', 'Guest Name', 'Attendance', 'Guest Count', 'Message', 'Wedding']
    const rows = filteredWishes.value.map(wish => [
        new Date(wish.created_at).toLocaleDateString(),
        wish.guest_name,
        wish.attendance ?? 'pending',
        wish.guest_count,
        wish.message || '',
        (wish as any).weddings?.title || ''
    ])
    const csv = [headers.join(','), ...rows.map(r => r.map(c => `"${c}"`).join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `wishes-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
}

const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })

const getAttendanceBadge = (attendance: string | null) => {
    switch (attendance) {
        case 'hadir': case 'yes': return 'badge-success'
        case 'tidak_hadir': case 'no': return 'badge-error'
        case 'mungkin': case 'maybe': return 'badge-warning'
        default: return 'badge-ghost'
    }
}

const getAttendanceLabel = (attendance: string | null) => {
    switch (attendance) {
        case 'hadir': case 'yes': return t('wishes.attendance.yes')
        case 'tidak_hadir': case 'no': return t('wishes.attendance.no')
        case 'mungkin': case 'maybe': return t('wishes.attendance.maybe')
        default: return t('wishes.attendance.null')
    }
}

const getAttendanceIcon = (attendance: string | null) => {
    switch (attendance) {
        case 'hadir': case 'yes': return CheckCircle
        case 'tidak_hadir': case 'no': return XCircle
        case 'mungkin': case 'maybe': return Clock
        default: return MessageSquare
    }
}

onMounted(() => {
    fetchWeddings()
    fetchWishes()
})
</script>

<template>
    <div class="space-y-6">
        <!-- Page Header -->
        <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
                <h1 class="text-3xl font-bold">{{ t('wishes.title') }}</h1>
                <p class="text-base-content/70 mt-1">{{ t('wishes.subtitle') }}</p>
            </div>
            <div class="flex gap-2">
                <button @click="showAddGuests = !showAddGuests" class="btn btn-primary btn-sm gap-2">
                    <UserPlus :size="16" />
                    {{ t('wishes.addGuests') }}
                </button>
                <button @click="exportToCSV" class="btn btn-outline btn-sm gap-2"
                    :disabled="filteredWishes.length === 0">
                    <Download :size="16" />
                    {{ t('wishes.exportCSV') }}
                </button>
            </div>
        </div>

        <!-- Add Guests Panel -->
        <div v-if="showAddGuests" class="card bg-base-100 shadow-xl border border-primary/20">
            <div class="card-body">
                <div class="flex items-center justify-between mb-4">
                    <div>
                        <h2 class="card-title gap-2">
                            <ClipboardList :size="20" />
                            {{ t('wishes.addGuests') }}
                        </h2>
                        <p class="text-sm text-base-content/60 mt-1">{{ t('wishes.addGuestsSubtitle') }}</p>
                    </div>
                    <!-- Guest counter badge -->
                    <div v-if="addGuestsWeddingId" class="text-right">
                        <div class="badge" :class="overLimit ? 'badge-error' : 'badge-neutral'">
                            {{ t('wishes.guestCounter', { count: totalAfterAdd }) }}
                        </div>
                        <div v-if="overLimit" class="text-xs text-error mt-1">{{ t('wishes.limitReached') }}</div>
                    </div>
                </div>

                <!-- Wedding selector -->
                <div class="form-control max-w-sm mb-4">
                    <label class="label"><span class="label-text font-medium">{{ t('wishes.filterByWedding')
                            }}</span></label>
                    <select v-model="addGuestsWeddingId" class="select select-bordered">
                        <option value="">{{ t('wishes.selectWeddingFirst') }}</option>
                        <option v-for="w in weddings" :key="w.id" :value="w.id">{{ (w as any).title }}</option>
                    </select>
                </div>

                <template v-if="addGuestsWeddingId">
                    <!-- Existing guest count info -->
                    <div class="text-sm text-base-content/60 mb-3">
                        {{ t('wishes.guestCounter', { count: weddingGuestCount }) }} {{ t('wishes.stats.totalDesc') }}
                    </div>

                    <!-- Input method toggle -->
                    <div class="form-control mb-4">
                        <label class="label"><span class="label-text font-medium">{{ t('wishes.inputMethod')
                                }}</span></label>
                        <div class="join">
                            <button class="join-item btn btn-sm"
                                :class="inputMethod === 'textarea' ? 'btn-active' : 'btn-outline'"
                                @click="inputMethod = 'textarea'">{{ t('wishes.methodTextarea') }}</button>
                            <button class="join-item btn btn-sm"
                                :class="inputMethod === 'fields' ? 'btn-active' : 'btn-outline'"
                                @click="inputMethod = 'fields'">{{ t('wishes.methodFields') }}</button>
                        </div>
                    </div>

                    <!-- Textarea mode -->
                    <div v-if="inputMethod === 'textarea'" class="form-control mb-4">
                        <label class="label"><span class="label-text">{{ t('wishes.textareaLabel') }}</span></label>
                        <textarea v-model="guestTextarea" class="textarea textarea-bordered h-36 font-mono text-sm"
                            :placeholder="t('wishes.textareaPlaceholder')"></textarea>
                        <label class="label">
                            <span class="label-text-alt text-base-content/60">{{ newGuestNames.length }} {{
                                t('wishes.stats.totalDesc') }} {{ t('wishes.addGuests').toLowerCase() }}</span>
                        </label>
                    </div>

                    <!-- Fields mode -->
                    <div v-else class="space-y-2 mb-4">
                        <div v-for="(_, i) in guestFields" :key="i" class="flex gap-2 items-center">
                            <input v-model="guestFields[i]" type="text" class="input input-bordered input-sm flex-1"
                                :placeholder="`${t('wishes.table.guestName')} ${i + 1}`" />
                            <button class="btn btn-ghost btn-sm btn-circle text-error" @click="removeGuestField(i)"
                                :disabled="guestFields.length === 1">
                                <XCircle :size="16" />
                            </button>
                        </div>
                        <button class="btn btn-ghost btn-sm gap-1" @click="addGuestField"
                            :disabled="totalAfterAdd >= GUEST_LIMIT">
                            <Plus :size="14" />
                            {{ t('wishes.addRow') }}
                        </button>
                    </div>

                    <!-- Save button -->
                    <div class="flex items-center gap-3">
                        <button class="btn btn-primary btn-sm gap-2"
                            :disabled="newGuestNames.length === 0 || overLimit || savingGuests" @click="saveGuests">
                            <span v-if="savingGuests" class="loading loading-spinner loading-xs"></span>
                            <Check v-else :size="16" />
                            {{ savingGuests ? t('wishes.savingGuests') : t('wishes.saveGuests') }}
                        </button>
                        <span v-if="savedMessage" class="text-sm text-success font-medium">{{ savedMessage }}</span>
                    </div>
                </template>

                <div v-else class="text-sm text-base-content/50 italic">{{ t('wishes.selectWeddingFirst') }}</div>
            </div>
        </div>

        <!-- Statistics Cards -->
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            <div class="stats shadow">
                <div class="stat p-3">
                    <div class="stat-title text-xs">{{ t('wishes.stats.total') }}</div>
                    <div class="stat-value text-primary text-2xl">{{ stats.total }}</div>
                </div>
            </div>
            <div class="stats shadow">
                <div class="stat p-3">
                    <div class="stat-title text-xs">{{ t('wishes.stats.attending') }}</div>
                    <div class="stat-value text-success text-2xl">{{ stats.attending }}</div>
                </div>
            </div>
            <div class="stats shadow">
                <div class="stat p-3">
                    <div class="stat-title text-xs">{{ t('wishes.stats.notAttending') }}</div>
                    <div class="stat-value text-error text-2xl">{{ stats.notAttending }}</div>
                </div>
            </div>
            <div class="stats shadow">
                <div class="stat p-3">
                    <div class="stat-title text-xs">{{ t('wishes.stats.maybe') }}</div>
                    <div class="stat-value text-warning text-2xl">{{ stats.maybe }}</div>
                </div>
            </div>
            <div class="stats shadow">
                <div class="stat p-3">
                    <div class="stat-title text-xs">{{ t('wishes.stats.pending') }}</div>
                    <div class="stat-value text-base-content/60 text-2xl">{{ stats.pending }}</div>
                </div>
            </div>
            <div class="stats shadow">
                <div class="stat p-3">
                    <div class="stat-title text-xs">{{ t('wishes.stats.totalGuests') }}</div>
                    <div class="stat-value text-2xl">{{ stats.totalGuests }}</div>
                </div>
            </div>
        </div>

        <!-- Filters -->
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body py-4">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="form-control">
                        <label class="label"><span class="label-text">{{ t('wishes.search') }}</span></label>
                        <input v-model="searchInput" type="text" :placeholder="t('wishes.searchPlaceholder')"
                            class="input input-bordered" />
                    </div>
                    <div class="form-control">
                        <label class="label"><span class="label-text">{{ t('wishes.filterByWedding') }}</span></label>
                        <select v-model="selectedWedding" class="select select-bordered">
                            <option value="all">{{ t('wishes.allWeddings') }}</option>
                            <option v-for="wedding in weddings" :key="wedding.id" :value="wedding.id">
                                {{ (wedding as any).title }}
                            </option>
                        </select>
                    </div>
                    <div class="form-control">
                        <label class="label"><span class="label-text">{{ t('wishes.filterByAttendance')
                                }}</span></label>
                        <select v-model="selectedAttendance" class="select select-bordered">
                            <option value="all">{{ t('wishes.allAttendance') }}</option>
                            <option value="hadir">{{ t('wishes.attendance.yes') }}</option>
                            <option value="tidak_hadir">{{ t('wishes.attendance.no') }}</option>
                            <option value="mungkin">{{ t('wishes.attendance.maybe') }}</option>
                            <option value="null">{{ t('wishes.attendance.null') }}</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>

        <!-- Wishes Table -->
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
                <div v-if="loading" class="flex justify-center py-12">
                    <span class="loading loading-spinner loading-lg"></span>
                </div>
                <div v-else-if="filteredWishes.length === 0" class="text-center py-12">
                    <MessageSquare :size="64" class="mx-auto mb-4 opacity-30" />
                    <h3 class="text-lg font-semibold mb-2">{{ t('wishes.empty.title') }}</h3>
                    <p class="text-base-content/60">{{ t('wishes.empty.subtitle') }}</p>
                </div>
                <div v-else class="overflow-x-auto">
                    <table class="table table-zebra">
                        <thead>
                            <tr>
                                <th>{{ t('wishes.table.date') }}</th>
                                <th>{{ t('wishes.table.guestName') }}</th>
                                <th>{{ t('wishes.table.attendance') }}</th>
                                <th>{{ t('wishes.table.guestCount') }}</th>
                                <th>{{ t('wishes.table.message') }}</th>
                                <th>{{ t('wishes.table.wedding') }}</th>
                                <th>{{ t('wishes.table.actions') }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="wish in filteredWishes" :key="wish.id">
                                <td>
                                    <div class="flex items-center gap-2 text-sm">
                                        <Calendar :size="16" class="opacity-60" />
                                        {{ formatDate(wish.created_at) }}
                                    </div>
                                </td>
                                <td class="font-medium">{{ wish.guest_name }}</td>
                                <td>
                                    <div class="badge gap-1" :class="getAttendanceBadge(wish.attendance)">
                                        <component :is="getAttendanceIcon(wish.attendance)" :size="12" />
                                        {{ getAttendanceLabel(wish.attendance) }}
                                    </div>
                                </td>
                                <td>
                                    <div class="flex items-center gap-1">
                                        <Users :size="16" class="opacity-60" />
                                        {{ wish.guest_count }}
                                    </div>
                                </td>
                                <td>
                                    <div class="max-w-xs truncate text-sm" :title="wish.message || '-'">
                                        {{ wish.message || '-' }}
                                    </div>
                                </td>
                                <td class="text-sm">{{ (wish as any).weddings?.title || '-' }}</td>
                                <td>
                                    <div class="flex gap-1">
                                        <!-- WhatsApp copy -->
                                        <button class="btn btn-ghost btn-sm btn-circle"
                                            :class="copiedWishId === wish.id ? 'text-success' : 'text-base-content/60'"
                                            :title="t('wishes.copyWhatsapp')" @click="copyWhatsapp(wish)">
                                            <Check v-if="copiedWishId === wish.id" :size="16" />
                                            <Copy v-else :size="16" />
                                        </button>
                                        <!-- Delete -->
                                        <button class="btn btn-ghost btn-sm btn-circle text-error"
                                            @click="deleteWish(wish.id)">
                                            <Trash2 :size="16" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>