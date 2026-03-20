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

const { t } = useI18n()

const features = [
    {
        icon: Sparkles,
        title: 'Beautiful Templates',
        description: 'Choose from dozens of professionally designed invitation templates for every occasion.',
    },
    {
        icon: Users,
        title: 'Guest Management',
        description: 'Track RSVPs, manage your guest list, and send reminders all from one place.',
    },
    {
        icon: BarChart3,
        title: 'Real-time Analytics',
        description: 'See who opened your invitation, RSVP rates, and engagement metrics instantly.',
    },
    {
        icon: ImageIcon,
        title: 'Media Library',
        description: 'Upload photos, videos and memories to make your invitation truly personal.',
    },
    {
        icon: Globe,
        title: 'Shareable Links',
        description: 'Share your invitation with a single link via WhatsApp, email, or social media.',
    },
    {
        icon: Shield,
        title: 'Secure & Private',
        description: 'Your data is protected. Control who can view your invitation with privacy settings.',
    },
]

const steps = [
    { number: '01', title: 'Choose a Template', description: 'Pick from our curated collection of elegant designs.' },
    { number: '02', title: 'Customize Details', description: 'Add your event info, photos, and personal touches.' },
    { number: '03', title: 'Share & Track', description: 'Send your link and watch RSVPs roll in real-time.' },
]
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
                        Dashboard
                    </NuxtLink>
                    <NuxtLink to="/auth/signin"
                        class="text-sm font-medium bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                        Get Started
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
                    Digital Invitations Made Simple
                </div>

                <h1 class="text-6xl sm:text-7xl font-bold tracking-tight leading-tight mb-6">
                    Beautiful invitations
                    <span class="relative">
                        <span
                            class="relative z-10 bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
                            for every moment</span>
                    </span>
                </h1>

                <p class="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
                    Create stunning digital invitations in minutes. Share with a link, track RSVPs, and make every
                    occasion unforgettable.
                </p>

                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <NuxtLink to="/auth/signin"
                        class="inline-flex items-center justify-center gap-2 bg-gray-900 text-white text-base font-medium px-8 py-4 rounded-xl hover:bg-gray-700 transition-all hover:shadow-lg hover:-translate-y-0.5">
                        Start for free
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
                        <div class="text-xs text-gray-400">Total Guests</div>
                        <div class="text-sm font-bold text-gray-900">248 RSVPs</div>
                    </div>
                </div>
                <div
                    class="absolute -right-6 top-1/3 bg-white rounded-xl p-3 shadow-xl border border-gray-100 hidden lg:flex items-center gap-3">
                    <div class="w-9 h-9 bg-teal-100 rounded-lg flex items-center justify-center">
                        <BarChart3 :size="18" class="text-teal-600" />
                    </div>
                    <div>
                        <div class="text-xs text-gray-400">Opened</div>
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
                        Features
                    </div>
                    <h2 class="text-4xl sm:text-5xl font-bold tracking-tight mb-4">Everything you need</h2>
                    <p class="text-lg text-gray-500 max-w-xl mx-auto">
                        From design to delivery, Alwan Invite handles every part of the invitation process.
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
                        How it works
                    </div>
                    <h2 class="text-4xl sm:text-5xl font-bold tracking-tight mb-4">Up and running in minutes</h2>
                    <p class="text-lg text-gray-500 max-w-xl mx-auto">
                        Creating and sharing your invitation has never been this simple.
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
                        <h2 class="text-4xl font-bold text-white mb-4">Ready to create your invitation?</h2>
                        <p class="text-gray-400 text-lg mb-8 max-w-lg mx-auto">
                            Join thousands of people who use Alwan Invite to celebrate life's most important moments.
                        </p>
                        <NuxtLink to="/auth/signin"
                            class="inline-flex items-center gap-2 bg-white text-gray-900 font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition-all hover:shadow-lg hover:-translate-y-0.5 text-base">
                            Get started for free
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
                <p class="text-sm text-gray-400">© {{ new Date().getFullYear() }} Alwan Invite. All rights reserved.</p>
                <div class="flex items-center gap-5 text-sm text-gray-400">
                    <a href="#" class="hover:text-gray-700 transition-colors">Privacy</a>
                    <a href="#" class="hover:text-gray-700 transition-colors">Terms</a>
                    <a href="#" class="hover:text-gray-700 transition-colors">Contact</a>
                </div>
            </div>
        </footer>

    </div>
</template>

<style scoped></style>