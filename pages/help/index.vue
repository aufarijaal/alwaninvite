<template>
    <div class="min-h-screen bg-base-200/40">
        <div class="max-w-6xl mx-auto px-4 py-10">
            <!-- Page Header -->
            <div class="mb-8">
                <h1 class="text-3xl font-bold text-base-content">Help & Support</h1>
                <p class="text-base-content/60 mt-1">Everything you need to know about using Alwan Invite.</p>
            </div>

            <div class="flex gap-8 items-start">
                <!-- Sidebar -->
                <HelpSidebar />

                <!-- Content -->
                <div class="flex-1 min-w-0 space-y-6">

                    <!-- Welcome Banner -->
                    <div class="bg-primary text-primary-content rounded-2xl px-8 py-8">
                        <div class="flex items-start gap-4">
                            <div class="bg-primary-content/20 rounded-xl p-3 shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                </svg>
                            </div>
                            <div>
                                <h2 class="text-xl font-bold mb-2">Welcome to Alwan Invite 👋</h2>
                                <p class="text-primary-content/80 leading-relaxed">
                                    Alwan Invite lets you create beautiful digital wedding invitations and share them
                                    with your guests in minutes — no design skills needed. This guide will walk you
                                    through every feature so you can make the most of your experience.
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- What is Alwan Invite -->
                    <div class="bg-base-100 rounded-2xl border border-base-300 p-6 shadow-sm">
                        <h2 class="text-lg font-bold text-base-content mb-3 flex items-center gap-2">
                            <span class="text-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </span>
                            What is Alwan Invite?
                        </h2>
                        <p class="text-base-content/70 leading-relaxed mb-4">
                            Alwan Invite is an online platform for creating and sharing digital wedding invitations.
                            Instead of printing cards, you get a beautiful webpage that you can send to guests via
                            WhatsApp, social media, or any messaging app.
                        </p>
                        <p class="text-base-content/70 leading-relaxed">
                            Your invitation page can include everything your guests need — event details, venue maps,
                            gift information, a live stream link, and even background music. Guests can also
                            RSVP directly through the invitation.
                        </p>
                    </div>

                    <!-- How It Works -->
                    <div class="bg-base-100 rounded-2xl border border-base-300 p-6 shadow-sm">
                        <h2 class="text-lg font-bold text-base-content mb-5 flex items-center gap-2">
                            <span class="text-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </span>
                            How It Works — Quick Overview
                        </h2>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div v-for="(step, i) in steps" :key="i"
                                class="flex gap-4 p-4 rounded-xl bg-base-200/60 border border-base-300/50">
                                <div
                                    class="w-8 h-8 rounded-full bg-primary text-primary-content flex items-center justify-center font-bold text-sm shrink-0">
                                    {{ i + 1 }}
                                </div>
                                <div>
                                    <p class="font-semibold text-base-content text-sm">{{ step.title }}</p>
                                    <p class="text-base-content/60 text-xs mt-0.5 leading-relaxed">{{ step.desc }}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Dashboard Overview -->
                    <div class="bg-base-100 rounded-2xl border border-base-300 p-6 shadow-sm">
                        <h2 class="text-lg font-bold text-base-content mb-3 flex items-center gap-2">
                            <span class="text-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                </svg>
                            </span>
                            Your Dashboard
                        </h2>
                        <p class="text-base-content/70 leading-relaxed mb-4">
                            After signing in, you land on your Dashboard. Think of it as your home base — you can see a
                            summary of everything at a glance:
                        </p>
                        <div class="space-y-3">
                            <div v-for="item in dashboardItems" :key="item.label"
                                class="flex gap-3 items-start p-3 rounded-xl bg-base-200/50">
                                <div class="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0"></div>
                                <div>
                                    <span class="font-semibold text-sm text-base-content">{{ item.label }}:</span>
                                    <span class="text-sm text-base-content/65 ml-1">{{ item.desc }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Signing In -->
                    <div class="bg-base-100 rounded-2xl border border-base-300 p-6 shadow-sm">
                        <h2 class="text-lg font-bold text-base-content mb-3 flex items-center gap-2">
                            <span class="text-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                </svg>
                            </span>
                            Signing In
                        </h2>
                        <p class="text-base-content/70 leading-relaxed mb-3">
                            Alwan Invite uses your Google account to sign in — there's no separate password to remember.
                        </p>
                        <ol class="space-y-2">
                            <li v-for="(step, i) in signinSteps" :key="i"
                                class="flex gap-3 items-start text-sm text-base-content/70">
                                <span
                                    class="w-5 h-5 rounded-full bg-base-200 border border-base-300 flex items-center justify-center text-xs font-bold text-base-content shrink-0 mt-0.5">
                                    {{ i + 1 }}
                                </span>
                                {{ step }}
                            </li>
                        </ol>
                    </div>

                    <!-- Section Links -->
                    <div class="bg-base-100 rounded-2xl border border-base-300 p-6 shadow-sm">
                        <h2 class="text-lg font-bold text-base-content mb-4">Explore the Guides</h2>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <NuxtLink v-for="link in guideLinks" :key="link.path" :to="link.path"
                                class="flex items-center gap-3 p-4 rounded-xl border border-base-300 hover:border-primary hover:bg-primary/5 transition-all group">
                                <span v-html="link.icon" class="w-5 h-5 text-primary shrink-0"></span>
                                <div>
                                    <p
                                        class="font-semibold text-sm text-base-content group-hover:text-primary transition-colors">
                                        {{ link.label }}</p>
                                    <p class="text-xs text-base-content/50 mt-0.5">{{ link.desc }}</p>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    class="w-4 h-4 text-base-content/30 ml-auto group-hover:text-primary transition-colors"
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </NuxtLink>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })

const steps = [
    { title: 'Sign in with Google', desc: 'No separate account needed — just use your existing Google account.' },
    { title: 'Create an Invitation', desc: 'Fill in your wedding details, pick a theme, and set up your events.' },
    { title: 'Share the Link', desc: 'Send your unique invitation link to guests via WhatsApp or social media.' },
    { title: 'Track Responses', desc: 'See who\'s coming, read their wishes, and export the list to a spreadsheet.' },
]

const dashboardItems = [
    { label: 'Total Invitations', desc: 'How many invitations you\'ve created.' },
    { label: 'Published Invitations', desc: 'Invitations that are currently live and accessible to guests.' },
    { label: 'Total Guests', desc: 'The total number of people who have responded to your invitations.' },
    { label: 'Attending Guests', desc: 'How many guests have confirmed they\'re coming.' },
    { label: 'Recent Invitations', desc: 'A quick list of your latest invitations with their current status.' },
]

const signinSteps = [
    'Go to the sign-in page.',
    'Click the "Sign in with Google" button.',
    'Choose your Google account from the list.',
    'You\'ll be taken to your Dashboard automatically.',
]

const guideLinks = [
    {
        path: '/help/creating-invitation',
        label: 'Creating an Invitation',
        desc: 'Step-by-step walkthrough of every field',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" /></svg>`,
    },
    {
        path: '/help/managing-invitations',
        label: 'Managing Invitations',
        desc: 'Edit, publish, and delete your invitations',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>`,
    },
    {
        path: '/help/guests-wishes',
        label: 'Guests & Wishes',
        desc: 'Track attendance, read wishes, export data',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>`,
    },
    {
        path: '/help/media-library',
        label: 'Media Library',
        desc: 'Upload and manage background music',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>`,
    },
    {
        path: '/help/sharing',
        label: 'Sharing Your Invitation',
        desc: 'Send links, add guest names via WhatsApp',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>`,
    },
]
</script>

<style scoped></style>