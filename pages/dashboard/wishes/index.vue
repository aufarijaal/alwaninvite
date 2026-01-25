<script setup lang="ts">
import { Search, Filter, Download, Trash2, Calendar, Users, MessageSquare, CheckCircle, XCircle, Clock } from 'lucide-vue-next'
import type { Database } from '~/types/database.types'

definePageMeta({
    middleware: 'auth',
    layout: 'dashboard'
})

const { t } = useI18n()
const supabase = useSupabaseClient<Database>()
const user = useSupabaseUser()

// State
const wishes = ref<Database['public']['Tables']['wishes']['Row'][]>([])
const weddings = ref<Database['public']['Tables']['weddings']['Row'][]>([])
const loading = ref(false)
const searchInput = ref('')
const searchQuery = ref('')
const selectedWedding = ref<string>('all')
const selectedAttendance = ref<string>('all')

// Debounce search input
let searchTimeout: NodeJS.Timeout | null = null
watch(searchInput, (newValue) => {
    if (searchTimeout) clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
        searchQuery.value = newValue
    }, 300)
})

// Fetch user's weddings for filter
const fetchWeddings = async () => {
    if (!user.value?.sub) return

    const { data } = await supabase
        .from('weddings')
        .select('*')
        .eq('user_id', user.value.sub)
        .order('created_at', { ascending: false })

    weddings.value = data || []
}

// Fetch wishes
const fetchWishes = async () => {
    if (!user.value?.sub) return

    console.log('Fetching wishes for user:', user.value.sub)

    loading.value = true
    try {
        let query = supabase
            .from('wishes')
            .select(`
                *,
                weddings!inner(
                    id,
                    slug,
                    title,
                    user_id
                )
            `)
            .eq('weddings.user_id', user.value.sub)
            .order('created_at', { ascending: false })

        const { data, error } = await query

        if (error) throw error
        wishes.value = data || []
    } catch (err) {
        console.error('Error fetching wishes:', err)
    } finally {
        loading.value = false
    }
}

// Computed filtered wishes
const filteredWishes = computed(() => {
    let filtered = wishes.value

    // Filter by weddingNumber(selectedWedding.value)
    if (selectedWedding.value !== 'all') {
        filtered = filtered.filter(wish => wish.wedding_id === selectedWedding.value)
    }

    // Filter by attendance
    if (selectedAttendance.value !== 'all') {
        filtered = filtered.filter(wish => wish.attendance === selectedAttendance.value)
    }

    // Filter by search query
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        filtered = filtered.filter(wish =>
            wish.guest_name.toLowerCase().includes(query) ||
            wish.message?.toLowerCase().includes(query)
        )
    }

    return filtered
})

// Statistics
const stats = computed(() => {
    const total = filteredWishes.value.length
    const attending = filteredWishes.value.filter(w => w.attendance === 'yes').length
    const notAttending = filteredWishes.value.filter(w => w.attendance === 'no').length
    const maybe = filteredWishes.value.filter(w => w.attendance === 'maybe').length
    const totalGuests = filteredWishes.value.reduce((sum, w) => sum + (w.guest_count || 0), 0)

    return { total, attending, notAttending, maybe, totalGuests }
})

// Delete wish
const deleteWish = async (id: number) => {
    if (!confirm(t('wishes.confirmDelete'))) return

    try {
        const { error } = await supabase
            .from('wishes')
            .delete()
            .eq('id', id)

        if (error) throw error
        await fetchWishes()
    } catch (err) {
        console.error('Error deleting wish:', err)
        alert(t('error.generic'))
    }
}

// Export to CSV
const exportToCSV = () => {
    const headers = ['Date', 'Guest Name', 'Attendance', 'Guest Count', 'Message', 'Wedding']
    const rows = filteredWishes.value.map(wish => [
        new Date(wish.created_at).toLocaleDateString(),
        wish.guest_name,
        wish.attendance,
        wish.guest_count,
        wish.message || '',
        (wish as any).weddings?.title || ''
    ])

    const csv = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `wishes-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
}

// Format date
const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
}

// Get attendance badge class
const getAttendanceBadge = (attendance: string) => {
    switch (attendance) {
        case 'yes':
            return 'badge-success'
        case 'no':
            return 'badge-error'
        case 'maybe':
            return 'badge-warning'
        default:
            return 'badge-ghost'
    }
}

// Get attendance icon
const getAttendanceIcon = (attendance: string) => {
    switch (attendance) {
        case 'yes':
            return CheckCircle
        case 'no':
            return XCircle
        case 'maybe':
            return Clock
        default:
            return MessageSquare
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
            <button @click="exportToCSV" class="btn btn-outline btn-sm" :disabled="filteredWishes.length === 0">
                <Download :size="16" />
                {{ t('wishes.exportCSV') }}
            </button>
        </div>

        <!-- Statistics Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div class="stats shadow">
                <div class="stat">
                    <div class="stat-title">{{ t('wishes.stats.total') }}</div>
                    <div class="stat-value text-primary">{{ stats.total }}</div>
                    <div class="stat-desc">{{ t('wishes.stats.totalDesc') }}</div>
                </div>
            </div>

            <div class="stats shadow">
                <div class="stat">
                    <div class="stat-title">{{ t('wishes.stats.attending') }}</div>
                    <div class="stat-value text-success">{{ stats.attending }}</div>
                    <div class="stat-desc">{{ t('wishes.attendance.yes') }}</div>
                </div>
            </div>

            <div class="stats shadow">
                <div class="stat">
                    <div class="stat-title">{{ t('wishes.stats.notAttending') }}</div>
                    <div class="stat-value text-error">{{ stats.notAttending }}</div>
                    <div class="stat-desc">{{ t('wishes.attendance.no') }}</div>
                </div>
            </div>

            <div class="stats shadow">
                <div class="stat">
                    <div class="stat-title">{{ t('wishes.stats.maybe') }}</div>
                    <div class="stat-value text-warning">{{ stats.maybe }}</div>
                    <div class="stat-desc">{{ t('wishes.attendance.maybe') }}</div>
                </div>
            </div>

            <div class="stats shadow">
                <div class="stat">
                    <div class="stat-title">{{ t('wishes.stats.totalGuests') }}</div>
                    <div class="stat-value">{{ stats.totalGuests }}</div>
                    <div class="stat-desc">{{ t('wishes.stats.guestsDesc') }}</div>
                </div>
            </div>
        </div>

        <!-- Filters -->
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <!-- Search -->
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">{{ t('wishes.search') }}</span>
                        </label>
                        <div class="input-group flex gap-2 items-center">
                            <input v-model="searchInput" type="text" :placeholder="t('wishes.searchPlaceholder')"
                                class="input input-bordered w-full" />
                        </div>
                    </div>

                    <!-- Filter by Wedding -->
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">{{ t('wishes.filterByWedding') }}</span>
                        </label>
                        <select v-model="selectedWedding" class="select select-bordered">
                            <option value="all">{{ t('wishes.allWeddings') }}</option>
                            <option v-for="wedding in weddings" :key="wedding.id" :value="wedding.id">
                                {{ wedding.title }}
                            </option>
                        </select>
                    </div>

                    <!-- Filter by Attendance -->
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">{{ t('wishes.filterByAttendance') }}</span>
                        </label>
                        <select v-model="selectedAttendance" class="select select-bordered">
                            <option value="all">{{ t('wishes.allAttendance') }}</option>
                            <option value="yes">{{ t('wishes.attendance.yes') }}</option>
                            <option value="no">{{ t('wishes.attendance.no') }}</option>
                            <option value="maybe">{{ t('wishes.attendance.maybe') }}</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>

        <!-- Wishes List -->
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
                <!-- Loading State -->
                <div v-if="loading" class="flex justify-center py-12">
                    <span class="loading loading-spinner loading-lg"></span>
                </div>

                <!-- Empty State -->
                <div v-else-if="filteredWishes.length === 0" class="text-center py-12">
                    <MessageSquare :size="64" class="mx-auto mb-4 opacity-30" />
                    <h3 class="text-lg font-semibold mb-2">{{ t('wishes.empty.title') }}</h3>
                    <p class="text-base-content/60">{{ t('wishes.empty.subtitle') }}</p>
                </div>

                <!-- Wishes Table -->
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
                                <td>
                                    <div class="font-medium">{{ wish.guest_name }}</div>
                                </td>
                                <td>
                                    <div class="badge" :class="getAttendanceBadge(wish.attendance)">
                                        <component :is="getAttendanceIcon(wish.attendance)" :size="14" class="mr-1" />
                                        {{ t(`wishes.attendance.${wish.attendance}`) }}
                                    </div>
                                </td>
                                <td>
                                    <div class="flex items-center gap-1">
                                        <Users :size="16" class="opacity-60" />
                                        {{ wish.guest_count }}
                                    </div>
                                </td>
                                <td>
                                    <div class="max-w-xs truncate" :title="wish.message || '-'">
                                        {{ wish.message || '-' }}
                                    </div>
                                </td>
                                <td>
                                    <div class="text-sm">{{ (wish as any).weddings?.title || '-' }}</div>
                                </td>
                                <td>
                                    <button @click="deleteWish(wish.id)"
                                        class="btn btn-ghost btn-sm btn-circle text-error">
                                        <Trash2 :size="16" />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>