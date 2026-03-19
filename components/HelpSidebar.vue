<template>
    <aside class="w-64 shrink-0">
        <div class="sticky top-6 bg-base-100 border border-base-300 rounded-2xl overflow-hidden shadow-sm">
            <!-- Header -->
            <div class="bg-primary/10 px-5 py-4 border-b border-base-300">
                <div class="flex items-center gap-2">
                    <span class="text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </span>
                    <span class="font-semibold text-base-content text-sm">Help & Guides</span>
                </div>
            </div>

            <!-- Navigation -->
            <nav class="p-3 space-y-1">
                <template v-for="section in sections" :key="section.path">
                    <NuxtLink :to="section.path"
                        class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-150"
                        :class="isActive(section.path)
                            ? 'bg-primary text-primary-content font-medium shadow-sm'
                            : 'text-base-content/70 hover:bg-base-200 hover:text-base-content'">
                        <span v-html="section.icon" class="w-4 h-4 shrink-0"></span>
                        <span>{{ section.label }}</span>
                    </NuxtLink>
                </template>
            </nav>

            <!-- Support Footer -->
            <div class="px-4 py-4 border-t border-base-300 bg-base-200/50">
                <p class="text-xs text-base-content/50 mb-2">Still need help?</p>
                <a href="mailto:alwanstudio@gmail.com"
                    class="flex items-center gap-2 text-xs text-primary hover:underline font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    alwanstudio@gmail.com
                </a>
            </div>
        </div>
    </aside>
</template>

<script setup lang="ts">
const route = useRoute()

const sections = [
    {
        path: '/help',
        label: 'Getting Started',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>`,
    },
    {
        path: '/help/creating-invitation',
        label: 'Creating an Invitation',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" /></svg>`,
    },
    {
        path: '/help/managing-invitations',
        label: 'Managing Invitations',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>`,
    },
    {
        path: '/help/guests-wishes',
        label: 'Guests & Wishes',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>`,
    },
    {
        path: '/help/media-library',
        label: 'Media Library',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>`,
    },
    {
        path: '/help/sharing',
        label: 'Sharing Your Invitation',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>`,
    },
]

function isActive(path: string) {
    if (path === '/help') return route.path === '/help'
    return route.path.startsWith(path)
}
</script>
