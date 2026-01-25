<script setup lang="ts">
import { Mails, MailCheck, Users, Calendar, Plus, PlusCircle, UserPen, BarChart3, Send, CalendarPlus, UserPlus, Info, FileText } from 'lucide-vue-next'
import {Toaster, toast} from 'vue-sonner'

definePageMeta({
    layout: 'dashboard',
    middleware: 'auth'
})

const { t } = useI18n()
const user = useSupabaseUser()

// Mock data for statistics
const stats = ref([
    {
        title: 'dashboard.totalInvitations',
        value: 12,
        icon: Mails,
        color: 'text-primary',
        bgColor: 'bg-primary/10',
    },
    {
        title: 'dashboard.activeInvitations',
        value: 8,
        icon: MailCheck,
        color: 'text-success',
        bgColor: 'bg-success/10',
    },
    {
        title: 'dashboard.totalGuests',
        value: 245,
        icon: Users,
        color: 'text-info',
        bgColor: 'bg-info/10',
    },
    {
        title: 'dashboard.totalEvents',
        value: 5,
        icon: Calendar,
        color: 'text-warning',
        bgColor: 'bg-warning/10',
    },
])

const quickActions = ref([
    {
        title: 'dashboard.createInvitation',
        icon: PlusCircle,
        color: 'btn-primary',
        route: '/dashboard/invitations/create',
    },
    {
        title: 'dashboard.manageGuests',
        icon: UserPen,
        color: 'btn-secondary',
        route: '/dashboard/guests',
    },
    {
        title: 'dashboard.viewReports',
        icon: BarChart3,
        color: 'btn-accent',
        route: '/dashboard/analytics',
    },
])

// Mock recent activity
const recentActivity = ref([
    {
        type: 'invitation',
        title: 'Wedding Invitation - Sarah & John',
        description: 'Sent to 50 guests',
        time: '2 hours ago',
        icon: Send,
    },
    {
        type: 'event',
        title: 'Birthday Party Event',
        description: 'Created new event',
        time: '5 hours ago',
        icon: CalendarPlus,
    },
    {
        type: 'guest',
        title: 'Guest List Updated',
        description: 'Added 15 new guests',
        time: '1 day ago',
        icon: UserPlus,
    },
])
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
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div v-for="stat in stats" :key="stat.title" class="stats shadow bg-base-100">
                <div class="stat">
                    <div class="stat-figure" :class="stat.color">
                        <div :class="['w-12 h-12 rounded-lg flex items-center justify-center', stat.bgColor]">
                            <component :is="stat.icon" :size="24" />
                        </div>
                    </div>
                    <div class="stat-title text-xs">{{ t(stat.title) }}</div>
                    <div class="stat-value text-2xl">{{ stat.value }}</div>
                </div>
            </div>
        </div>

        <!-- Quick Actions -->
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
                <h2 class="card-title">{{ t('dashboard.quickActions') }}</h2>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                    <NuxtLink v-for="action in quickActions" :key="action.title" :to="action.route"
                        :class="['btn btn-lg', action.color, 'flex-col h-auto py-6']">
                        <component :is="action.icon" :size="32" />
                        <span class="text-sm mt-2">{{ t(action.title) }}</span>
                    </NuxtLink>
                </div>
            </div>
        </div>

        <!-- Content Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Recent Activity -->
            <div class="card bg-base-100 shadow-xl">
                <div class="card-body">
                    <div class="flex justify-between items-center">
                        <h2 class="card-title">{{ t('dashboard.recentActivity') }}</h2>
                        <button class="btn btn-ghost btn-sm">{{ t('dashboard.viewAll') }}</button>
                    </div>
                    <div class="mt-4 space-y-4">
                        <div v-for="activity in recentActivity" :key="activity.title"
                            class="flex items-start gap-4 p-3 rounded-lg hover:bg-base-200 transition-colors">
                            <div class="flex-shrink-0">
                                <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                    <component :is="activity.icon" :size="20" class="text-primary" />
                                </div>
                            </div>
                            <div class="flex-1 min-w-0">
                                <p class="font-semibold text-sm">{{ activity.title }}</p>
                                <p class="text-xs text-base-content/70">{{ activity.description }}</p>
                                <p class="text-xs text-base-content/50 mt-1">{{ activity.time }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Overview -->
            <div class="card bg-base-100 shadow-xl">
                <div class="card-body">
                    <h2 class="card-title">{{ t('dashboard.overview') }}</h2>
                    <div class="mt-4 space-y-4">
                        <div class="flex items-center justify-between p-4 rounded-lg bg-base-200">
                            <div class="flex items-center gap-3">
                                <Mails :size="24" class="text-primary" />
                                <span class="font-medium">{{ t('dashboard.myInvitations') }}</span>
                            </div>
                            <span class="badge badge-lg badge-primary">12</span>
                        </div>
                        <div class="flex items-center justify-between p-4 rounded-lg bg-base-200">
                            <div class="flex items-center gap-3">
                                <Calendar :size="24" class="text-success" />
                                <span class="font-medium">{{ t('dashboard.myEvents') }}</span>
                            </div>
                            <span class="badge badge-lg badge-success">5</span>
                        </div>
                        <div class="flex items-center justify-between p-4 rounded-lg bg-base-200">
                            <div class="flex items-center gap-3">
                                <Users :size="24" class="text-info" />
                                <span class="font-medium">{{ t('dashboard.guestList') }}</span>
                            </div>
                            <span class="badge badge-lg badge-info">245</span>
                        </div>
                        <div class="flex items-center justify-between p-4 rounded-lg bg-base-200">
                            <div class="flex items-center gap-3">
                                <FileText :size="24" class="text-warning" />
                                <span class="font-medium">{{ t('dashboard.templates') }}</span>
                            </div>
                            <span class="badge badge-lg badge-warning">8</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Additional Info Banner -->
        <div class="alert alert-info shadow-lg">
            <Info :size="24" />
            <div>
                <h3 class="font-bold">{{ t('dashboard.title') }}</h3>
                <div class="text-xs">{{ t('dashboard.overview') }}</div>
            </div>
            <button class="btn btn-sm btn-ghost">{{ t('common.settings') }}</button>
        </div>
    </div>
</template>
