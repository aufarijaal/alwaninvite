<script setup lang="ts">
import { ref } from 'vue'
import { Menu, Languages, User, Settings, LogOut, LayoutDashboard, Mails, Calendar, Users, FileText, HelpCircle, Heart, ChevronLeft, ChevronRight } from 'lucide-vue-next'

const { t, locale, setLocale } = useI18n()
const localeCodes = ['en', 'id'] as const
const localeNames: Record<string, string> = {
    en: 'English',
    id: 'Indonesia'
}
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const sidebarOpen = ref(true)

const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value
    // Persist sidebar state
    if (process.client) {
        localStorage.setItem('sidebarOpen', String(sidebarOpen.value))
    }
}

// Restore sidebar state on mount
onMounted(() => {
    if (process.client) {
        const saved = localStorage.getItem('sidebarOpen')
        if (saved !== null) {
            sidebarOpen.value = saved === 'true'
        }
    }
})

const handleLogout = async () => {
    await supabase.auth.signOut()
    navigateTo('/auth/signin')
}

const changeLocale = (newLocale: string) => {
    setLocale(newLocale as 'en' | 'id')
}

const navigationItems = [
    { name: 'dashboard', icon: LayoutDashboard, route: '/dashboard' },
    { name: 'invitations', icon: Mails, route: '/dashboard/invitations' },
    { name: 'wishes', icon: Heart, route: '/dashboard/wishes' },
    { name: 'media', icon: FileText, route: '/dashboard/media' }
]
</script>

<template>
    <div class="min-h-screen bg-base-200">
        <div class="flex">
            <!-- Mobile Overlay -->
            <div v-if="sidebarOpen" class="fixed inset-0 bg-black/50 lg:hidden z-40" @click="toggleSidebar"></div>

            <!-- Sidebar -->
            <aside :class="[
                'bg-base-100 min-h-screen flex flex-col transition-all duration-300 ease-in-out z-50 shadow-lg',
                'fixed lg:sticky lg:top-0 lg:h-screen',
                sidebarOpen ? 'w-64 translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-20'
            ]">
                <!-- Logo Area -->
                <div class="h-[64px] flex justify-center items-center border-b border-base-300 flex-shrink-0">
                    <NuxtLink to="/dashboard" class="flex items-center gap-3" :class="!sidebarOpen && 'justify-center'">
                        <div class="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                            <Heart :size="24" class="text-primary-content" />
                        </div>
                        <span v-if="sidebarOpen" class="text-lg font-bold whitespace-nowrap">{{ t('common.appName')
                            }}</span>
                    </NuxtLink>
                </div>

                <!-- Navigation -->
                <nav class="flex-1 p-2 overflow-y-auto">
                    <ul class="menu gap-1">
                        <li v-for="item in navigationItems" :key="item.name">
                            <NuxtLink :to="item.route" :class="[
                                'flex items-center gap-3 rounded-lg',
                                !sidebarOpen ? 'px-3 justify-center' : 'px-4'
                            ]" :title="!sidebarOpen ? t(`navigation.${item.name}`) : undefined">
                                <component :is="item.icon" :size="20" class="flex-shrink-0" />
                                <span v-if="sidebarOpen" class="whitespace-nowrap">{{ t(`navigation.${item.name}`)
                                    }}</span>
                            </NuxtLink>
                        </li>
                    </ul>
                </nav>

                <!-- Bottom Section -->
                <div class="p-2 border-t border-base-300 flex-shrink-0">
                    <NuxtLink to="/help" :class="[
                        'btn btn-ghost w-full flex',
                        !sidebarOpen ? 'tooltip tooltip-right px-0' : 'justify-start items-center'
                    ]" :data-tip="!sidebarOpen ? t('navigation.help') : undefined">
                        <HelpCircle :size="20" class="flex-shrink-0" />
                        <span v-if="sidebarOpen" class="ml-2 whitespace-nowrap">{{ t('navigation.help') }}</span>
                    </NuxtLink>
                </div>
            </aside>

            <!-- Main Content Area -->
            <div class="flex-1 flex flex-col min-h-screen w-full lg:w-auto">
                <!-- Header -->
                <header class="sticky top-0 z-30 bg-base-100 shadow-sm">
                    <div class="navbar px-4">
                        <div class="flex-1">
                            <button @click="toggleSidebar" class="btn btn-ghost btn-circle">
                                <ChevronRight v-if="!sidebarOpen" :size="24" />
                                <ChevronLeft v-else :size="24" class="hidden lg:block" />
                            </button>
                            <h1 class="text-xl font-bold ml-2">{{ t('common.appName') }}</h1>
                        </div>
                        <div class="flex-none gap-2">
                            <!-- Language Switcher -->
                            <div class="dropdown dropdown-end">
                                <label tabindex="0" class="btn btn-ghost btn-circle">
                                    <Languages :size="24" />
                                </label>
                                <ul tabindex="0"
                                    class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-40">
                                    <li v-for="loc in localeCodes" :key="loc">
                                        <a @click="changeLocale(loc)" :class="{ 'active': locale === loc }">
                                            {{ localeNames[loc] }}
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <!-- Theme Controller -->
                            <ThemeController />

                            <!-- User Menu -->
                            <div class="dropdown dropdown-end">
                                <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                                    <div
                                        class="w-10 rounded-full bg-primary text-primary-content flex items-center justify-center">
                                        <span class="text-lg">{{ user?.email?.charAt(0).toUpperCase() || 'U' }}</span>
                                    </div>
                                </label>
                                <ul tabindex="0"
                                    class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                    <li class="menu-title">
                                        <span>{{ user?.email }}</span>
                                    </li>
                                    <li><a>
                                            <User :size="18" class="mr-2" />{{ t('common.profile') }}
                                        </a></li>
                                    <li><a>
                                            <Settings :size="18" class="mr-2" />{{ t('common.settings') }}
                                        </a></li>
                                    <li><a @click="handleLogout">
                                            <LogOut :size="18" class="mr-2" />{{ t('common.logout') }}
                                        </a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </header>

                <!-- Main Content -->
                <main class="flex-1 p-6">
                    <slot />
                </main>
            </div>
        </div>
    </div>
</template>
