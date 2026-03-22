<script setup lang="ts">
import { Download, Trash2, Calendar, Users, MessageSquare, CheckCircle, XCircle, Clock, Plus, UserPlus, ClipboardList, Copy, Check, ArrowUp, ArrowDown, ArrowUpDown, Settings2, RotateCcw } from 'lucide-vue-next'
import { useVueTable, getCoreRowModel, getSortedRowModel, createColumnHelper, FlexRender, type SortingState, type RowSelectionState } from '@tanstack/vue-table'
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
    const weddingData = (wish as any).weddings as { id?: number | string; groom_callname?: string; bride_callname?: string; slug?: string } | null
    const groomName = weddingData?.groom_callname ?? ''
    const brideName = weddingData?.bride_callname ?? ''
    const slug = weddingData?.slug ?? ''
    const inviteUrl = `${window.location.origin}/invite/${slug}?to=${encodeURIComponent(wish.guest_name).replace(/%20/g, '+')}`

    const wedding = weddings.value.find(w => String(w.id) === String(weddingData?.id))
    const customTemplate = (wedding as any)?.wa_message_template as string | null | undefined

    const message = customTemplate
        ? customTemplate
            .replace(/\[guest\]/g, wish.guest_name)
            .replace(/\[link\]/g, inviteUrl)
        : `Assalamu'alaikum Wr. Wb.\n\n` +
        `Kepada Yth.\n*${wish.guest_name}*\n\n` +
        `Dengan penuh kebahagiaan, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam pernikahan kami:\n\n` +
        `💍 *${groomName}* & *${brideName}*\n\n` +
        `Untuk detail acara, silakan buka undangan digital kami:\n${inviteUrl}\n\n` +
        `Merupakan suatu kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir.\n\n` +
        `Wassalamu'alaikum Wr. Wb.`

    await navigator.clipboard.writeText(message)
    copiedWishId.value = wish.id
    setTimeout(() => { copiedWishId.value = null }, 3000)
}

// ── WA Message Template dialog ───────────────────────────
const waTemplateModal = ref<HTMLDialogElement | null>(null)
const waTemplateTextareaRef = ref<HTMLTextAreaElement | null>(null)
const waTemplateWeddingId = ref('')
const waTemplateText = ref('')
const waTemplateSaving = ref(false)
const waTemplateSaved = ref(false)

const buildDefaultWaTemplate = (groomName: string, brideName: string) =>
    `Assalamu'alaikum Wr. Wb.\n\nKepada Yth.\n*[guest]*\n\nDengan penuh kebahagiaan, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam pernikahan kami:\n\n💍 *${groomName}* & *${brideName}*\n\nUntuk detail acara, silakan buka undangan digital kami:\n[link]\n\nMerupakan suatu kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir.\n\nWassalamu'alaikum Wr. Wb.`

const selectedWaWedding = computed(() =>
    weddings.value.find(w => String(w.id) === String(waTemplateWeddingId.value))
)

watch(waTemplateWeddingId, (wid) => {
    if (!wid) { waTemplateText.value = ''; return }
    const wedding = weddings.value.find(w => String(w.id) === String(wid))
    const existing = (wedding as any)?.wa_message_template as string | null | undefined
    waTemplateText.value = existing ||
        buildDefaultWaTemplate(
            wedding?.groom_callname || t('wishes.waTemplate.groomPlaceholder'),
            wedding?.bride_callname || t('wishes.waTemplate.bridePlaceholder')
        )
})

const waTemplatePreview = computed(() => {
    if (!waTemplateText.value) return ''
    const slug = selectedWaWedding.value?.slug || 'your-wedding'
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://example.com'
    return waTemplateText.value
        .replace(/\[guest\]/g, 'Ahmad Fauzi')
        .replace(/\[link\]/g, `${origin}/invite/${slug}?to=Ahmad+Fauzi`)
})

const openWaTemplateDialog = () => {
    waTemplateWeddingId.value = ''
    waTemplateText.value = ''
    waTemplateSaved.value = false
    waTemplateModal.value?.showModal()
}

const insertVariable = (variable: string) => {
    const textarea = waTemplateTextareaRef.value
    if (textarea) {
        const start = textarea.selectionStart ?? waTemplateText.value.length
        const end = textarea.selectionEnd ?? waTemplateText.value.length
        waTemplateText.value = waTemplateText.value.slice(0, start) + variable + waTemplateText.value.slice(end)
        nextTick(() => {
            textarea.selectionStart = textarea.selectionEnd = start + variable.length
            textarea.focus()
        })
    } else {
        waTemplateText.value += variable
    }
}

const resetWaTemplate = () => {
    const wedding = selectedWaWedding.value
    waTemplateText.value = buildDefaultWaTemplate(
        wedding?.groom_callname || t('wishes.waTemplate.groomPlaceholder'),
        wedding?.bride_callname || t('wishes.waTemplate.bridePlaceholder')
    )
}

const waPrebuiltTemplates = computed(() => {
    const g = selectedWaWedding.value?.groom_callname || t('wishes.waTemplate.groomPlaceholder')
    const b = selectedWaWedding.value?.bride_callname || t('wishes.waTemplate.bridePlaceholder')
    return {
        id: [
            {
                label: t('wishes.waTemplate.prebuilt.id1'),
                body: `Assalamu'alaikum Wr. Wb.\n\nKepada Yth.\n*[guest]*\n\nDengan penuh kebahagiaan, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam pernikahan kami:\n\n💍 *${g}* & *${b}*\n\nUntuk detail acara, silakan buka undangan digital kami:\n[link]\n\nMerupakan suatu kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir.\n\nWassalamu'alaikum Wr. Wb.`,
            },
            {
                label: t('wishes.waTemplate.prebuilt.id2'),
                body: `Yth. *[guest]*\n\nKami dengan penuh sukacita mengundang Bapak/Ibu/Saudara/i untuk turut merayakan hari istimewa kami:\n\n💍 Pernikahan *${g}* & *${b}*\n\nKehadiran Anda akan menjadi kebahagiaan tersendiri bagi kami. Untuk informasi lengkap, silakan kunjungi undangan kami:\n[link]\n\nAtas kehadiran dan doa restu Anda, kami ucapkan terima kasih.`,
            },
            {
                label: t('wishes.waTemplate.prebuilt.id3'),
                body: `Halo *[guest]* 👋\n\nAda kabar bahagia nih — kami akan menikah! 🎉\n\n💍 *${g}* & *${b}*\n\nYuk lihat detail acaranya di undangan digital kami:\n[link]\n\nBakal seneng banget kalau kamu bisa hadir! 😊`,
            },
        ],
        en: [
            {
                label: t('wishes.waTemplate.prebuilt.en1'),
                body: `Assalamu'alaikum Wr. Wb.\n\nDear *[guest]*,\n\nWith great joy, we invite you to celebrate the wedding of:\n\n💍 *${g}* & *${b}*\n\nPlease find the complete details in our digital invitation:\n[link]\n\nIt would be our greatest honour to have you with us on our special day.\n\nWassalamu'alaikum Wr. Wb.`,
            },
            {
                label: t('wishes.waTemplate.prebuilt.en2'),
                body: `Dear *[guest]*,\n\nWe joyfully invite you to join us in celebrating our wedding:\n\n💍 *${g}* & *${b}*\n\nFor event details, please open our digital invitation:\n[link]\n\nYour presence would mean the world to us. We look forward to celebrating with you!`,
            },
            {
                label: t('wishes.waTemplate.prebuilt.en3'),
                body: `Hey *[guest]* 👋\n\nExciting news — we're getting married! 🎉\n\n💍 *${g}* & *${b}*\n\nCheck out all the details in our digital invitation:\n[link]\n\nWe'd love to have you there! 😊`,
            },
        ],
    }
})

const applyPrebuilt = (body: string) => {
    waTemplateText.value = body
    nextTick(() => waTemplateTextareaRef.value?.focus())
}

const saveWaTemplate = async () => {
    if (!waTemplateWeddingId.value || !waTemplateText.value) return
    waTemplateSaving.value = true
    try {
        const { error } = await supabase
            .from('weddings')
            .update({ wa_message_template: waTemplateText.value } as any)
            .eq('id', waTemplateWeddingId.value)
        if (error) throw error
        const idx = weddings.value.findIndex(w => String(w.id) === String(waTemplateWeddingId.value))
        if (idx !== -1) (weddings.value[idx] as any).wa_message_template = waTemplateText.value
        waTemplateSaved.value = true
        setTimeout(() => { waTemplateSaved.value = false }, 3000)
    } catch (err) {
        console.error('Error saving WA template:', err)
    } finally {
        waTemplateSaving.value = false
    }
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
        .select('id, slug, title, groom_callname, bride_callname, user_id, wa_message_template')
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

// ── TanStack Table ──────────────────────────────────────
type WishWithWedding = Database['public']['Tables']['wishes']['Row'] & {
    weddings?: { id: string; slug: string; title: string; groom_callname?: string | null; bride_callname?: string | null } | null
}

const rowSelection = ref<RowSelectionState>({})
const sorting = ref<SortingState>([])

const columnHelper = createColumnHelper<WishWithWedding>()

const columns = [
    columnHelper.display({ id: 'select', enableSorting: false }),
    columnHelper.accessor('created_at', {
        id: 'date',
        header: () => t('wishes.table.date'),
        enableSorting: true,
    }),
    columnHelper.accessor('guest_name', {
        id: 'guest_name',
        header: () => t('wishes.table.guestName'),
        enableSorting: true,
    }),
    columnHelper.accessor('attendance', {
        id: 'attendance',
        header: () => t('wishes.table.attendance'),
        enableSorting: true,
    }),
    columnHelper.accessor('guest_count', {
        id: 'guest_count',
        header: () => t('wishes.table.guestCount'),
        enableSorting: true,
    }),
    columnHelper.accessor('message', {
        id: 'message',
        header: () => t('wishes.table.message'),
        enableSorting: false,
    }),
    columnHelper.display({ id: 'wedding', header: () => t('wishes.table.wedding'), enableSorting: false }),
    columnHelper.display({ id: 'actions', header: () => t('wishes.table.actions'), enableSorting: false }),
]

const table = useVueTable({
    get data() { return filteredWishes.value as WishWithWedding[] },
    columns,
    state: {
        get rowSelection() { return rowSelection.value },
        get sorting() { return sorting.value },
    },
    enableRowSelection: true,
    onRowSelectionChange: updater => {
        rowSelection.value = typeof updater === 'function' ? updater(rowSelection.value) : updater
    },
    onSortingChange: updater => {
        sorting.value = typeof updater === 'function' ? updater(sorting.value) : updater
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
})

const selectedCount = computed(() => table.getSelectedRowModel().rows.length)

const deleteSelected = async () => {
    const selectedRows = table.getSelectedRowModel().rows
    if (!selectedRows.length) return
    if (!confirm(t('wishes.confirmDeleteSelected', { count: selectedRows.length }))) return
    try {
        const ids = selectedRows.map(row => row.original.id)
        const { error } = await supabase.from('wishes').delete().in('id', ids)
        if (error) throw error
        rowSelection.value = {}
        await fetchWishes()
    } catch (err) {
        console.error('Error deleting wishes:', err)
    }
}

// Clear selection when filters change
watch([searchQuery, selectedWedding, selectedAttendance], () => {
    rowSelection.value = {}
})

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
            <div class="flex gap-2 flex-wrap">
                <button @click="openWaTemplateDialog" class="btn btn-outline btn-sm gap-2">
                    <Settings2 :size="16" />
                    {{ t('wishes.waTemplate.buttonLabel') }}
                </button>
                <button @click="showAddGuests = !showAddGuests" class="btn btn-primary btn-sm gap-2">
                    <UserPlus :size="16" />
                    {{ t('wishes.addGuests') }}
                </button>
                <!-- <button @click="exportToCSV" class="btn btn-outline btn-sm gap-2"
                    :disabled="filteredWishes.length === 0">
                    <Download :size="16" />
                    {{ t('wishes.exportCSV') }}
                </button> -->
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
                <div v-else class="space-y-3">
                    <!-- Bulk actions toolbar -->
                    <div v-if="selectedCount > 0"
                        class="flex items-center gap-3 p-3 bg-base-200 rounded-lg border border-base-300">
                        <span class="text-sm font-medium">
                            {{ t('wishes.selectedCount', { count: selectedCount }) }}
                        </span>
                        <button @click="deleteSelected" class="btn btn-error btn-sm gap-2">
                            <Trash2 :size="14" />
                            {{ t('wishes.deleteSelected') }}
                        </button>
                        <button @click="rowSelection = {}" class="btn btn-ghost btn-sm">
                            {{ t('wishes.clearSelection') }}
                        </button>
                    </div>

                    <!-- Table -->
                    <div class="overflow-x-auto">
                        <table class="table table-zebra">
                            <thead>
                                <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
                                    <th v-for="header in headerGroup.headers" :key="header.id">
                                        <!-- Select-all checkbox -->
                                        <template v-if="header.column.id === 'select'">
                                            <input type="checkbox" class="checkbox checkbox-sm"
                                                :checked="table.getIsAllRowsSelected()"
                                                :indeterminate="table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()"
                                                @change="table.toggleAllRowsSelected()" />
                                        </template>
                                        <!-- Sortable header -->
                                        <template v-else-if="header.column.getCanSort()">
                                            <div class="flex items-center gap-1 cursor-pointer select-none"
                                                @click="header.column.toggleSorting()">
                                                <FlexRender :render="header.column.columnDef.header"
                                                    :props="header.getContext()" />
                                                <component
                                                    :is="header.column.getIsSorted() === 'asc' ? ArrowUp : header.column.getIsSorted() === 'desc' ? ArrowDown : ArrowUpDown"
                                                    :size="14"
                                                    :class="{ 'opacity-40': !header.column.getIsSorted() }" />
                                            </div>
                                        </template>
                                        <!-- Non-sortable header -->
                                        <template v-else>
                                            <FlexRender :render="header.column.columnDef.header"
                                                :props="header.getContext()" />
                                        </template>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="row in table.getRowModel().rows" :key="row.id"
                                    :class="{ 'bg-primary/5': row.getIsSelected() }">
                                    <td v-for="cell in row.getVisibleCells()" :key="cell.id">
                                        <!-- Row checkbox -->
                                        <template v-if="cell.column.id === 'select'">
                                            <input type="checkbox" class="checkbox checkbox-sm"
                                                :checked="row.getIsSelected()" :disabled="!row.getCanSelect()"
                                                @change="row.toggleSelected()" />
                                        </template>
                                        <!-- Date -->
                                        <template v-else-if="cell.column.id === 'date'">
                                            <div class="flex items-center gap-2 text-sm">
                                                <Calendar :size="16" class="opacity-60" />
                                                {{ formatDate(row.original.created_at) }}
                                            </div>
                                        </template>
                                        <!-- Guest Name -->
                                        <template v-else-if="cell.column.id === 'guest_name'">
                                            <span class="font-medium">{{ row.original.guest_name }}</span>
                                        </template>
                                        <!-- Attendance badge -->
                                        <template v-else-if="cell.column.id === 'attendance'">
                                            <div class="badge gap-1"
                                                :class="getAttendanceBadge(row.original.attendance)">
                                                <component :is="getAttendanceIcon(row.original.attendance)"
                                                    :size="12" />
                                                {{ getAttendanceLabel(row.original.attendance) }}
                                            </div>
                                        </template>
                                        <!-- Guest count -->
                                        <template v-else-if="cell.column.id === 'guest_count'">
                                            <div class="flex items-center gap-1">
                                                <Users :size="16" class="opacity-60" />
                                                {{ row.original.guest_count }}
                                            </div>
                                        </template>
                                        <!-- Message -->
                                        <template v-else-if="cell.column.id === 'message'">
                                            <div class="max-w-xs truncate text-sm" :title="row.original.message || '-'">
                                                {{ row.original.message || '-' }}
                                            </div>
                                        </template>
                                        <!-- Wedding -->
                                        <template v-else-if="cell.column.id === 'wedding'">
                                            <span class="text-sm">{{ row.original.weddings?.title || '-' }}</span>
                                        </template>
                                        <!-- Actions -->
                                        <template v-else-if="cell.column.id === 'actions'">
                                            <div class="flex gap-1 items-center">
                                                <div class="tooltip tooltip-left"
                                                    :data-tip="copiedWishId === row.original.id ? t('wishes.whatsappCopied') : t('wishes.copyWhatsapp')">
                                                    <button
                                                        class="btn btn-sm gap-1.5 transition-all duration-200 min-w-[4.5rem]"
                                                        :class="copiedWishId === row.original.id
                                                            ? 'btn-success'
                                                            : 'btn-outline border-green-500 text-green-600 hover:bg-green-500 hover:border-green-500 hover:text-white dark:text-green-400 dark:border-green-500 dark:hover:bg-green-600'"
                                                        @click="copyWhatsapp(row.original)">
                                                        <Check v-if="copiedWishId === row.original.id" :size="14" />
                                                        <Copy v-else :size="14" />
                                                        <span class="text-xs font-medium">
                                                            {{ copiedWishId === row.original.id ?
                                                                t('wishes.whatsappCopied') : 'Copy WA' }}
                                                        </span>
                                                    </button>
                                                </div>
                                                <button class="btn btn-ghost btn-sm btn-circle text-error"
                                                    @click="deleteWish(row.original.id)">
                                                    <Trash2 :size="16" />
                                                </button>
                                            </div>
                                        </template>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- WA Template Dialog -->
    <dialog ref="waTemplateModal" class="modal">
        <div class="modal-box max-w-2xl w-full">
            <div class="flex items-center justify-between mb-4">
                <h3 class="font-bold text-lg flex items-center gap-2">
                    <Settings2 :size="20" />
                    {{ t('wishes.waTemplate.title') }}
                </h3>
                <form method="dialog">
                    <button class="btn btn-ghost btn-sm btn-circle">✕</button>
                </form>
            </div>

            <!-- Wedding selector -->
            <div class="form-control mb-4">
                <label class="label">
                    <span class="label-text font-medium">{{ t('wishes.waTemplate.selectWedding') }}</span>
                </label>
                <select v-model="waTemplateWeddingId" class="select select-bordered">
                    <option value="">{{ t('wishes.selectWeddingFirst') }}</option>
                    <option v-for="w in weddings" :key="w.id" :value="String(w.id)">{{ (w as any).title }}</option>
                </select>
            </div>

            <template v-if="waTemplateWeddingId">
                <!-- Variable chips -->
                <div class="mb-4 p-3 bg-base-200 rounded-xl">
                    <p class="text-sm font-medium mb-2">{{ t('wishes.waTemplate.insertVariable') }}</p>
                    <div class="flex gap-2 flex-wrap mb-2">
                        <button class="btn btn-sm btn-outline gap-1.5" type="button" @click="insertVariable('[guest]')">
                            <Users :size="14" />
                            {{ t('wishes.waTemplate.guestName') }}
                        </button>
                        <button class="btn btn-sm btn-outline gap-1.5" type="button" @click="insertVariable('[link]')">
                            <MessageSquare :size="14" />
                            {{ t('wishes.waTemplate.invitationLink') }}
                        </button>
                    </div>
                    <p class="text-xs text-base-content/50">{{ t('wishes.waTemplate.variableHint') }}</p>
                </div>

                <!-- Pre-built templates -->
                <div class="mb-4 p-3 bg-base-200 rounded-xl">
                    <p class="text-sm font-medium mb-0.5">{{ t('wishes.waTemplate.prebuiltTitle') }}</p>
                    <p class="text-xs text-base-content/50 mb-3">{{ t('wishes.waTemplate.prebuiltHint') }}</p>
                    <div class="space-y-2">
                        <div class="flex items-center gap-2 flex-wrap">
                            <span class="text-xs text-base-content/50 w-20 shrink-0">{{
                                t('wishes.waTemplate.prebuilt.sectionId') }}</span>
                            <button v-for="tpl in waPrebuiltTemplates.id" :key="tpl.label"
                                class="btn btn-xs btn-outline"
                                :class="waTemplateText === tpl.body ? 'btn-active btn-primary' : ''" type="button"
                                @click="applyPrebuilt(tpl.body)">
                                {{ tpl.label }}
                            </button>
                        </div>
                        <div class="flex items-center gap-2 flex-wrap">
                            <span class="text-xs text-base-content/50 w-20 shrink-0">{{
                                t('wishes.waTemplate.prebuilt.sectionEn') }}</span>
                            <button v-for="tpl in waPrebuiltTemplates.en" :key="tpl.label"
                                class="btn btn-xs btn-outline"
                                :class="waTemplateText === tpl.body ? 'btn-active btn-primary' : ''" type="button"
                                @click="applyPrebuilt(tpl.body)">
                                {{ tpl.label }}
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Message textarea -->
                <div class="form-control mb-4">
                    <label class="label">
                        <span class="label-text font-medium">{{ t('wishes.waTemplate.messageLabel') }}</span>
                    </label>
                    <textarea ref="waTemplateTextareaRef" v-model="waTemplateText"
                        class="textarea textarea-bordered h-48 text-sm"
                        :placeholder="t('wishes.waTemplate.messagePlaceholder')"></textarea>
                </div>
                <div v-if="waTemplatePreview" class="mb-4">
                    <p class="text-sm font-medium mb-2">{{ t('wishes.waTemplate.preview') }}</p>
                    <div
                        class="bg-base-200 rounded-lg p-3 text-sm whitespace-pre-wrap font-mono text-base-content/80 max-h-48 overflow-y-auto border border-base-300">
                        {{ waTemplatePreview }}</div>
                </div>

                <!-- Actions -->
                <div class="flex items-center justify-between pt-2">
                    <button class="btn btn-ghost btn-sm gap-2" type="button" @click="resetWaTemplate">
                        <RotateCcw :size="14" />
                        {{ t('wishes.waTemplate.resetDefault') }}
                    </button>
                    <div class="flex items-center gap-2">
                        <span v-if="waTemplateSaved" class="text-sm text-success font-medium">{{
                            t('wishes.waTemplate.saved') }}</span>
                        <button class="btn btn-primary btn-sm gap-2" :disabled="!waTemplateText || waTemplateSaving"
                            type="button" @click="saveWaTemplate">
                            <span v-if="waTemplateSaving" class="loading loading-spinner loading-xs"></span>
                            <Check v-else :size="14" />
                            {{ waTemplateSaving ? t('common.saving') : t('common.save') }}
                        </button>
                    </div>
                </div>
            </template>

            <div v-else class="text-sm text-base-content/50 italic py-2">{{ t('wishes.waTemplate.selectWeddingHint') }}
            </div>
        </div>
        <form method="dialog" class="modal-backdrop">
            <button>close</button>
        </form>
    </dialog>
</template>