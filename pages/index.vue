<script setup lang="ts">
import {
    Heart,
    Mail,
    Sparkles,
    Users,
    BarChart3,
    ImageIcon,
    ArrowRight,
    Zap,
    Globe,
    Shield,
} from 'lucide-vue-next'

const { t, setLocale: _setLocale, locale } = useI18n()
const localeOptions = [{ code: 'en' as const }, { code: 'id' as const }]
const currentLocale = computed(() => locale.value)

const availableLocales = computed(() => localeOptions)

async function setLocale(code: 'en' | 'id') {
    await _setLocale(code)
}

const features = computed(() => [
    {
        icon: Sparkles,
        title: t('homepage.features.templates.title'),
        description: t('homepage.features.templates.description'),
    },
    {
        icon: Users,
        title: t('homepage.features.guests.title'),
        description: t('homepage.features.guests.description'),
    },
    {
        icon: BarChart3,
        title: t('homepage.features.analytics.title'),
        description: t('homepage.features.analytics.description'),
    },
    {
        icon: ImageIcon,
        title: t('homepage.features.media.title'),
        description: t('homepage.features.media.description'),
    },
    {
        icon: Globe,
        title: t('homepage.features.shareable.title'),
        description: t('homepage.features.shareable.description'),
    },
    {
        icon: Shield,
        title: t('homepage.features.secure.title'),
        description: t('homepage.features.secure.description'),
    },
])

const steps = computed(() => [
    { number: '01', title: t('homepage.howItWorks.choose.title'), description: t('homepage.howItWorks.choose.description') },
    { number: '02', title: t('homepage.howItWorks.customize.title'), description: t('homepage.howItWorks.customize.description') },
    { number: '03', title: t('homepage.howItWorks.share.title'), description: t('homepage.howItWorks.share.description') },
])
</script>

<template>
    <div class="min-h-screen bg-white text-gray-900 antialiased">

        <!-- Navbar -->
        <nav class="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                <div class="flex items-center gap-2">
                    <div
                        class="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                        <Heart :size="16" class="text-white" fill="white" />
                    </div>
                    <span class="font-semibold text-gray-900 text-lg">Alwan Invite</span>
                </div>
                <div class="flex items-center gap-3">
                    <NuxtLink to="/dashboard"
                        class="text-sm text-gray-600 hover:text-gray-900 transition-colors px-3 py-2 rounded-lg hover:bg-gray-100">
                        {{ t('navigation.dashboard') }}
                    </NuxtLink>
                    <NuxtLink to="/auth/signin"
                        class="text-sm font-medium bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                        {{ t('homepage.startFree') }}
                    </NuxtLink>
                </div>
            </div>
        </nav>

        <!-- Hero Section -->
        <section class="pt-32 pb-24 px-6 relative overflow-hidden">
            <!-- Background decorations -->
            <div class="absolute inset-0 -z-10">
                <div
                    class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-emerald-50 to-transparent rounded-full blur-3xl opacity-60" />
                <div class="absolute top-20 left-10 w-72 h-72 bg-teal-100 rounded-full blur-3xl opacity-40" />
                <div class="absolute top-40 right-10 w-56 h-56 bg-emerald-100 rounded-full blur-3xl opacity-40" />
            </div>

            <div class="max-w-4xl mx-auto text-center">
                <div
                    class="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full px-4 py-1.5 text-sm font-medium mb-8">
                    <Zap :size="14" />
                    {{ t('homepage.badge') }}
                </div>

                <h1 class="text-6xl sm:text-7xl font-bold tracking-tight leading-tight mb-6">
                    {{ t('homepage.heroTitle') }}
                    <span class="relative">
                        <span
                            class="relative z-10 bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
                            {{ t('homepage.heroTitleHighlight') }}</span>
                    </span>
                </h1>

                <p class="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
                    {{ t('homepage.heroSubtitle') }}
                </p>

                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <NuxtLink to="/auth/signin"
                        class="inline-flex items-center justify-center gap-2 bg-gray-900 text-white text-base font-medium px-8 py-4 rounded-xl hover:bg-gray-700 transition-all hover:shadow-lg hover:-translate-y-0.5">
                        {{ t('homepage.startFree') }}
                        <ArrowRight :size="18" />
                    </NuxtLink>
                </div>
            </div>

            <!-- Hero visual -->
            <div class="max-w-5xl mx-auto mt-20 relative">
                <div class="relative rounded-2xl overflow-hidden border border-gray-200 shadow-2xl shadow-gray-200/50">
                    <div
                        class="bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 aspect-[16/7] flex items-center justify-center">
                        <div class="text-center text-white px-8">
                            <div
                                class="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Heart :size="32" class="text-white" fill="white" />
                            </div>
                            <div class="font-bold text-3xl mb-2">Sarah & Ahmad</div>
                            <div class="text-white/80 text-lg">We're getting married · June 15, 2026</div>
                            <div
                                class="mt-6 inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-2.5 rounded-full text-sm font-semibold">
                                <Mail :size="14" />
                                RSVP Now
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Floating cards -->
                <div
                    class="absolute -left-6 top-1/2 -translate-y-1/2 bg-white rounded-xl p-3 shadow-xl border border-gray-100 hidden lg:flex items-center gap-3">
                    <div class="w-9 h-9 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <Users :size="18" class="text-emerald-600" />
                    </div>
                    <div>
                        <div class="text-xs text-gray-400">{{ t('homepage.floatingGuests') }}</div>
                        <div class="text-sm font-bold text-gray-900">248 RSVPs</div>
                    </div>
                </div>
                <div
                    class="absolute -right-6 top-1/3 bg-white rounded-xl p-3 shadow-xl border border-gray-100 hidden lg:flex items-center gap-3">
                    <div class="w-9 h-9 bg-teal-100 rounded-lg flex items-center justify-center">
                        <BarChart3 :size="18" class="text-teal-600" />
                    </div>
                    <div>
                        <div class="text-xs text-gray-400">{{ t('homepage.floatingOpened') }}</div>
                        <div class="text-sm font-bold text-gray-900">96% rate</div>
                    </div>
                </div>
            </div>
        </section>



        <!-- Features Section -->
        <section class="py-24 px-6">
            <div class="max-w-6xl mx-auto">
                <div class="text-center mb-16">
                    <div
                        class="inline-flex items-center gap-2 bg-gray-100 text-gray-600 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
                        {{ t('homepage.features.badge') }}
                    </div>
                    <h2 class="text-4xl sm:text-5xl font-bold tracking-tight mb-4">{{ t('homepage.features.title') }}
                    </h2>
                    <p class="text-lg text-gray-500 max-w-xl mx-auto">
                        {{ t('homepage.features.subtitle') }}
                    </p>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div v-for="feature in features" :key="feature.title"
                        class="group p-6 rounded-2xl border border-gray-100 hover:border-emerald-200 bg-white hover:bg-emerald-50/30 transition-all duration-200 hover:shadow-sm">
                        <div
                            class="w-11 h-11 rounded-xl bg-gray-100 group-hover:bg-emerald-100 flex items-center justify-center mb-4 transition-colors">
                            <component :is="feature.icon" :size="22"
                                class="text-gray-600 group-hover:text-emerald-600 transition-colors" />
                        </div>
                        <h3 class="font-semibold text-gray-900 mb-2">{{ feature.title }}</h3>
                        <p class="text-sm text-gray-500 leading-relaxed">{{ feature.description }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- How it works -->
        <section class="py-24 px-6 bg-gray-50">
            <div class="max-w-5xl mx-auto">
                <div class="text-center mb-16">
                    <div
                        class="inline-flex items-center gap-2 bg-white text-gray-600 border border-gray-200 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
                        {{ t('homepage.howItWorks.badge') }}
                    </div>
                    <h2 class="text-4xl sm:text-5xl font-bold tracking-tight mb-4">{{ t('homepage.howItWorks.title') }}
                    </h2>
                    <p class="text-lg text-gray-500 max-w-xl mx-auto">
                        {{ t('homepage.howItWorks.subtitle') }}
                    </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div v-for="step in steps" :key="step.number" class="relative text-center">
                        <div class="text-7xl font-black text-gray-100 mb-4 leading-none">{{ step.number }}</div>
                        <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ step.title }}</h3>
                        <p class="text-sm text-gray-500 leading-relaxed">{{ step.description }}</p>
                    </div>
                </div>
            </div>
        </section>



        <!-- CTA Section -->
        <section class="py-24 px-6">
            <div class="max-w-3xl mx-auto text-center">
                <div
                    class="relative rounded-3xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-12 overflow-hidden">
                    <!-- Glow effects -->
                    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-emerald-500/20 blur-3xl" />
                    <div class="absolute bottom-0 right-0 w-64 h-64 bg-teal-500/10 blur-3xl" />

                    <div class="relative z-10">
                        <div
                            class="w-14 h-14 bg-white/10 backdrop-blur rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Heart :size="28" class="text-white" fill="white" />
                        </div>
                        <h2 class="text-4xl font-bold text-white mb-4">{{ t('homepage.cta.title') }}</h2>
                        <p class="text-gray-400 text-lg mb-8 max-w-lg mx-auto">
                            {{ t('homepage.cta.subtitle') }}
                        </p>
                        <NuxtLink to="/auth/signin"
                            class="inline-flex items-center gap-2 bg-white text-gray-900 font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition-all hover:shadow-lg hover:-translate-y-0.5 text-base">
                            {{ t('homepage.cta.button') }}
                            <ArrowRight :size="18" />
                        </NuxtLink>

                    </div>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <footer class="py-10 px-6 border-t border-gray-100">
            <div class="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                <div class="flex items-center gap-2">
                    <div
                        class="w-7 h-7 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                        <Heart :size="14" class="text-white" fill="white" />
                    </div>
                    <span class="font-semibold text-gray-900">Alwan Invite</span>
                </div>
                <p class="text-sm text-gray-400">© {{ new Date().getFullYear() }} Alwan Invite. {{
                    t('homepage.footer.rights') }}</p>
                <div class="flex items-center gap-5 text-sm text-gray-400">
                    <a href="#" class="hover:text-gray-700 transition-colors">{{ t('homepage.footer.privacy') }}</a>
                    <a href="#" class="hover:text-gray-700 transition-colors">{{ t('homepage.footer.terms') }}</a>
                    <a href="#" class="hover:text-gray-700 transition-colors">{{ t('homepage.footer.contact') }}</a>
                    <span class="text-gray-200">|</span>
                    <button v-for="locale in availableLocales" :key="locale.code" @click="setLocale(locale.code)"
                        :class="['transition-colors', locale.code === currentLocale ? 'text-gray-900 font-semibold' : 'hover:text-gray-700']">
                        {{ locale.code.toUpperCase() }}
                    </button>
                </div>
            </div>
        </footer>

    </div>
</template>

<style scoped></style>