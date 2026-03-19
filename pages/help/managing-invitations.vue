<template>
    <div class="min-h-screen bg-base-200/40">
        <div class="max-w-6xl mx-auto px-4 py-10">
            <div class="mb-8">
                <NuxtLink to="/help"
                    class="text-sm text-base-content/50 hover:text-primary flex items-center gap-1 mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Help
                </NuxtLink>
                <h1 class="text-3xl font-bold text-base-content">Managing Invitations</h1>
                <p class="text-base-content/60 mt-1">How to view, edit, publish, and delete your invitations.</p>
            </div>

            <div class="flex gap-8 items-start">
                <HelpSidebar />

                <div class="flex-1 min-w-0 space-y-6">

                    <!-- Finding your invitations -->
                    <div class="bg-base-100 rounded-2xl border border-base-300 p-6 shadow-sm">
                        <h2 class="text-lg font-bold text-base-content mb-3 flex items-center gap-2">
                            <span class="text-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                </svg>
                            </span>
                            Where to Find Your Invitations
                        </h2>
                        <p class="text-base-content/70 leading-relaxed mb-4">
                            From your Dashboard, click <strong>"Invitations"</strong> in the left menu, or go directly
                            to <strong>Dashboard → Invitations</strong>. You'll see all your invitations displayed as
                            cards.
                        </p>
                        <p class="text-sm text-base-content/70 leading-relaxed">
                            Each card shows you at a glance:
                        </p>
                        <ul class="mt-3 space-y-2">
                            <li v-for="item in cardInfo" :key="item"
                                class="flex gap-3 items-start text-sm text-base-content/70">
                                <div class="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0"></div>
                                {{ item }}
                            </li>
                        </ul>
                    </div>

                    <!-- Actions on each card -->
                    <div class="bg-base-100 rounded-2xl border border-base-300 shadow-sm overflow-hidden">
                        <div class="bg-base-200 px-6 py-4 border-b border-base-300">
                            <h2 class="font-bold text-base-content">What You Can Do</h2>
                        </div>
                        <div class="p-6 space-y-4">
                            <div v-for="action in actions" :key="action.title"
                                class="flex gap-4 p-4 rounded-xl border border-base-300/40" :class="action.bgClass">
                                <div class="shrink-0 mt-0.5" v-html="action.icon"></div>
                                <div>
                                    <p class="font-semibold text-sm text-base-content mb-1">{{ action.title }}</p>
                                    <p class="text-sm text-base-content/65 leading-relaxed">{{ action.desc }}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Publishing -->
                    <div class="bg-base-100 rounded-2xl border border-base-300 shadow-sm overflow-hidden">
                        <div class="bg-base-200 px-6 py-4 border-b border-base-300">
                            <h2 class="font-bold text-base-content">Publishing & Unpublishing</h2>
                        </div>
                        <div class="p-6">
                            <p class="text-sm text-base-content/70 leading-relaxed mb-4">
                                You control whether guests can see your invitation by toggling its publish status.
                                Think of it like a light switch:
                            </p>
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                                <div class="p-5 rounded-xl bg-base-200/60 border border-base-300/50">
                                    <div class="flex items-center gap-2 mb-2">
                                        <div class="w-3 h-3 rounded-full bg-base-content/30"></div>
                                        <span class="font-semibold text-sm text-base-content">Draft (Off)</span>
                                    </div>
                                    <p class="text-xs text-base-content/60 leading-relaxed">Guests visiting your
                                        invitation link will not see anything — the page is hidden. You can edit freely
                                        without anyone noticing changes.</p>
                                </div>
                                <div class="p-5 rounded-xl bg-success/10 border border-success/20">
                                    <div class="flex items-center gap-2 mb-2">
                                        <div class="w-3 h-3 rounded-full bg-success"></div>
                                        <span class="font-semibold text-sm text-base-content">Published (On)</span>
                                    </div>
                                    <p class="text-xs text-base-content/60 leading-relaxed">Your invitation is live and
                                        accessible to anyone with the link. Good time to start sharing!</p>
                                </div>
                            </div>
                            <p class="text-sm text-base-content/60">
                                You can switch between Draft and Published at any time by opening the invitation's edit
                                page and toggling the <strong>Publish</strong> switch.
                            </p>
                        </div>
                    </div>

                    <!-- Previewing -->
                    <div class="bg-base-100 rounded-2xl border border-base-300 p-6 shadow-sm">
                        <h2 class="text-lg font-bold text-base-content mb-3 flex items-center gap-2">
                            <span class="text-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </span>
                            Previewing Your Invitation
                        </h2>
                        <p class="text-base-content/70 leading-relaxed mb-3">
                            On each invitation card in the list, there's a <strong>Preview</strong> button (eye icon).
                            Clicking it opens your invitation in a new tab — exactly as your guests will see it.
                            This works even when your invitation is still in Draft mode.
                        </p>
                        <div class="p-4 bg-primary/5 border border-primary/20 rounded-xl text-sm text-base-content/70">
                            💡 Always preview your invitation on a mobile phone view before sharing it, since most
                            guests will open it on their phone.
                        </div>
                    </div>

                    <!-- Deleting -->
                    <div class="bg-base-100 rounded-2xl border border-base-300 shadow-sm overflow-hidden">
                        <div class="bg-base-200 px-6 py-4 border-b border-base-300">
                            <h2 class="font-bold text-base-content flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-error" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Deleting an Invitation
                            </h2>
                        </div>
                        <div class="p-6">
                            <p class="text-sm text-base-content/70 leading-relaxed mb-4">
                                Click the <strong>Delete</strong> button (trash icon) on the invitation card.
                                A confirmation dialog will appear — you must confirm before the invitation is
                                permanently
                                removed.
                            </p>
                            <div
                                class="p-4 bg-error/10 border border-error/20 rounded-xl text-sm text-base-content flex gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-error shrink-0 mt-0.5"
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                <span class="text-error/80">
                                    <strong>Warning:</strong> Deleting an invitation is permanent. All associated
                                    guest wishes and RSVP responses will also be deleted. This cannot be undone.
                                </span>
                            </div>
                        </div>
                    </div>

                    <!-- Themes info -->
                    <div class="bg-base-100 rounded-2xl border border-base-300 p-6 shadow-sm">
                        <h2 class="text-lg font-bold text-base-content mb-3 flex items-center gap-2">
                            <span class="text-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                                </svg>
                            </span>
                            Available Themes
                        </h2>
                        <p class="text-base-content/70 leading-relaxed mb-4">
                            You can change your invitation's theme at any time. There are 6 themes to choose from:
                        </p>
                        <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            <div v-for="theme in themes" :key="theme.name"
                                class="p-3 rounded-xl bg-base-200/50 border border-base-300/40 text-center">
                                <div class="w-6 h-6 rounded-full mx-auto mb-2"
                                    :style="{ backgroundColor: theme.color }"></div>
                                <p class="font-medium text-sm text-base-content">{{ theme.name }}</p>
                                <p class="text-xs text-base-content/50 mt-0.5">{{ theme.vibe }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Pagination Buttons -->
                    <div class="flex gap-3 justify-between">
                        <NuxtLink to="/help/creating-invitation" class="btn btn-ghost btn-sm gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                            Creating an Invitation
                        </NuxtLink>
                        <NuxtLink to="/help/guests-wishes" class="btn btn-primary btn-sm gap-2">
                            Guests & Wishes
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </NuxtLink>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })

const cardInfo = [
    'The invitation title',
    'Date it was created',
    'The language it\'s written in',
    'Which theme is applied',
    'Whether it\'s a Draft or Published',
]

const actions = [
    {
        title: '👁️ Preview',
        desc: 'Opens your invitation in a new browser tab so you can see exactly what your guests will see.',
        bgClass: 'bg-base-200/50',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-info mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>`,
    },
    {
        title: '✏️ Edit',
        desc: 'Opens the full form so you can update any detail — names, events, theme, music, gifts, and more.',
        bgClass: 'bg-base-200/50',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>`,
    },
    {
        title: '🗑️ Delete',
        desc: 'Permanently removes the invitation and all its guest responses. A confirmation is required before deletion.',
        bgClass: 'bg-base-200/50',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-error mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>`,
    },
]

const themes = [
    { name: 'Default', color: '#a78bfa', vibe: 'Clean & simple' },
    { name: 'Blue', color: '#3b82f6', vibe: 'Classic & elegant' },
    { name: 'Green', color: '#22c55e', vibe: 'Fresh & natural' },
    { name: 'Brown', color: '#92400e', vibe: 'Warm & traditional' },
    { name: 'Slate', color: '#64748b', vibe: 'Modern & minimal' },
    { name: 'Islamic Green', color: '#166534', vibe: 'Sacred & refined' },
]
</script>

<style scoped></style>
