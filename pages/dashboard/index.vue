<script setup lang="ts">
import { Mails, MailCheck, Users, CheckCircle, Plus, PlusCircle, MessageSquare } from 'lucide-vue-next'
import type { Database } from '~/types/database.types'

definePageMeta({
    layout: 'dashboard',
    middleware: 'auth'
})

const { t } = useI18n()
const supabase = useSupabaseClient<Database>()
const user = useSupabaseUser()

// ── State ────────────────────────────────────────────────
const loading = ref(true)
const totalInvitations = ref(0)
const publishedInvitations = ref(0)
const totalGuests = ref(0)
const attendingGuests = ref(0)
const recentInvitations = ref<Database['public']['Tables']['weddings']['Row'][]>([])

// ── Fetch ────────────────────────────────────────────────
const fetchDashboardData = async () => {
    if (!user.value?.sub) return
    loading.value = true
    try {
        const [weddingsRes, wishesRes] = await Promise.all([
            supabase
                .from('weddings')
                .select('id, title, slug, published, groom_callname, bride_callname, created_at')
                .eq('user_id', user.value.sub)
                .order('created_at', { ascending: false }),
            supabase
                .from('wishes')
                .select('id, attendance, wedding_id, weddings!inner(user_id)')
                .eq('weddings.user_id', user.value.sub),
        ])

        const weddings = weddingsRes.data || []
        const wishes = wishesRes.data || []

        totalInvitations.value = weddings.length
        publishedInvitations.value = weddings.filter(w => w.published).length
        totalGuests.value = wishes.length
        attendingGuests.value = wishes.filter(
            (w: any) => w.attendance === 'hadir' || w.attendance === 'yes'
        ).length
        recentInvitations.value = weddings.slice(0, 5) as any
    } catch (err) {
        console.error('Error fetching dashboard data:', err)
    } finally {
        loading.value = false
    }
}

const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })

onMounted(() => { fetchDashboardData() })

useHead({ title: 'Dashboard – Alwan Invite' })
</script>

<template>
    <div class="space-y-6">
        <!-- Page Header -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
                <h1 class="text-3xl font-bold">{{ t('dashboard.title') }}</h1>
                <p class="text-base-content/70 mt-1">{{ t('common.welcome') }}, {{ user?.email?.split('@')[0] }}!</p>
            </div>
            <NuxtLink to="/dashboard/invitations/create" class="btn btn-primary">
                <Plus :size="20" />
                {{ t('dashboard.createInvitation') }}
            </NuxtLink>
        </div>

        <!-- Statistics Cards -->
        <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div v-for="i in 4" :key="i" class="stats shadow bg-base-100">
                <div class="stat">
                    <div class="skeleton h-4 w-24 mb-2"></div>
                    <div class="skeleton h-8 w-12"></div>
                </div>
            </div>
        </div>
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="stats shadow bg-base-100">
                <div class="stat">
                    <div class="stat-figure text-primary">
                        <div class="w-12 h-12 rounded-lg flex items-center justify-center bg-primary/10">
                            <Mails :size="24" />
                        </div>
                    </div>
                    <div class="stat-title text-xs">{{ t('dashboard.totalInvitations') }}</div>
                    <div class="stat-value text-2xl text-primary">{{ totalInvitations }}</div>
                </div>
            </div>
            <div class="stats shadow bg-base-100">
                <div class="stat">
                    <div class="stat-figure text-success">
                        <div class="w-12 h-12 rounded-lg flex items-center justify-center bg-success/10">
                            <MailCheck :size="24" />
                        </div>
                    </div>
                    <div class="stat-title text-xs">{{ t('dashboard.publishedInvitations') }}</div>
                    <div class="stat-value text-2xl text-success">{{ publishedInvitations }}</div>
                </div>
            </div>
            <div class="stats shadow bg-base-100">
                <div class="stat">
                    <div class="stat-figure text-info">
                        <div class="w-12 h-12 rounded-lg flex items-center justify-center bg-info/10">
                            <Users :size="24" />
                        </div>
                    </div>
                    <div class="stat-title text-xs">{{ t('dashboard.totalGuests') }}</div>
                    <div class="stat-value text-2xl text-info">{{ totalGuests }}</div>
                </div>
            </div>
            <div class="stats shadow bg-base-100">
                <div class="stat">
                    <div class="stat-figure text-warning">
                        <div class="w-12 h-12 rounded-lg flex items-center justify-center bg-warning/10">
                            <CheckCircle :size="24" />
                        </div>
                    </div>
                    <div class="stat-title text-xs">{{ t('dashboard.attendingGuests') }}</div>
                    <div class="stat-value text-2xl text-warning">{{ attendingGuests }}</div>
                </div>
            </div>
        </div>

        <!-- Quick Actions -->
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
                <h2 class="card-title">{{ t('dashboard.quickActions') }}</h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <NuxtLink to="/dashboard/invitations/create" class="btn btn-primary btn-lg flex-col h-auto py-6">
                        <PlusCircle :size="32" />
                        <span class="text-sm mt-2">{{ t('dashboard.createInvitation') }}</span>
                    </NuxtLink>
                    <NuxtLink to="/dashboard/wishes" class="btn btn-secondary btn-lg flex-col h-auto py-6">
                        <MessageSquare :size="32" />
                        <span class="text-sm mt-2">{{ t('navigation.wishes') }}</span>
                    </NuxtLink>
                </div>
            </div>
        </div>

        <!-- Recent Invitations -->
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
                <div class="flex justify-between items-center">
                    <h2 class="card-title">{{ t('dashboard.recentInvitations') }}</h2>
                    <NuxtLink to="/dashboard/invitations" class="btn btn-ghost btn-sm">{{ t('dashboard.viewAll') }}
                    </NuxtLink>
                </div>
                <div v-if="loading" class="mt-4 space-y-3">
                    <div v-for="i in 3" :key="i" class="skeleton h-12 w-full rounded-lg"></div>
                </div>
                <div v-else-if="recentInvitations.length === 0" class="text-center py-8 text-base-content/50">
                    <Mails :size="48" class="mx-auto mb-3 opacity-30" />
                    <p>{{ t('dashboard.noInvitations') }}</p>
                </div>
                <div v-else class="mt-4 space-y-2">
                    <NuxtLink v-for="inv in recentInvitations" :key="inv.id"
                        :to="`/dashboard/invitations/${inv.id}/edit`"
                        class="flex items-center justify-between p-3 rounded-lg hover:bg-base-200 transition-colors cursor-pointer">
                        <div class="flex items-center gap-3">
                            <div
                                class="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <Mails :size="18" class="text-primary" />
                            </div>
                            <div>
                                <p class="font-medium text-sm">
                                    {{ inv.title || `${(inv as any).groom_callname} & ${(inv as any).bride_callname}` }}
                                </p>
                                <p class="text-xs text-base-content/50">{{ formatDate(inv.created_at) }}</p>
                            </div>
                        </div>
                        <div class="badge" :class="(inv as any).published ? 'badge-success' : 'badge-ghost'">
                            {{ (inv as any).published ? t('invitation.status.active') : t('invitation.status.draft') }}
                        </div>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>
