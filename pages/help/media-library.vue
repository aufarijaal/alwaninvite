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
                <h1 class="text-3xl font-bold text-base-content">Media Library</h1>
                <p class="text-base-content/60 mt-1">Upload and manage background music for your invitations.</p>
            </div>

            <div class="flex gap-8 items-start">
                <HelpSidebar />

                <div class="flex-1 min-w-0 space-y-6">

                    <!-- What is it -->
                    <div class="bg-base-100 rounded-2xl border border-base-300 p-6 shadow-sm">
                        <h2 class="text-lg font-bold text-base-content mb-3 flex items-center gap-2">
                            <span class="text-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                                </svg>
                            </span>
                            What is the Media Library?
                        </h2>
                        <p class="text-base-content/70 leading-relaxed mb-3">
                            The Media Library is where you manage your own audio files that can be used as background
                            music on your invitation. Go to <strong>Dashboard → Media</strong> to open it.
                        </p>
                        <p class="text-base-content/70 leading-relaxed">
                            You don't have to upload anything — we also provide a collection of <strong>System
                                Audio</strong> tracks that are ready to use for free. But if you have a special song
                            in mind, you can upload it here.
                        </p>
                    </div>

                    <!-- System Audio vs Your Uploads -->
                    <div class="bg-base-100 rounded-2xl border border-base-300 shadow-sm overflow-hidden">
                        <div class="bg-base-200 px-6 py-4 border-b border-base-300">
                            <h2 class="font-bold text-base-content">System Audio vs. Your Uploads</h2>
                        </div>
                        <div class="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div class="p-5 rounded-xl bg-base-200/50 border border-base-300/40 space-y-2">
                                <p class="font-semibold text-base-content text-sm flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-primary" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 3l14 9-14 9V3z" />
                                    </svg>
                                    System Audio
                                </p>
                                <p class="text-xs text-base-content/60 leading-relaxed">Tracks we've included in the
                                    app. You can only listen to them — you cannot delete or edit them. Available for
                                    everyone to use.</p>
                                <p class="text-xs text-base-content/45 italic">Visible in the Media Library for
                                    browsing, and also in the music picker inside the invitation form.</p>
                            </div>
                            <div class="p-5 rounded-xl bg-primary/5 border border-primary/20 space-y-2">
                                <p class="font-semibold text-base-content text-sm flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-primary" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                    </svg>
                                    My Uploads
                                </p>
                                <p class="text-xs text-base-content/60 leading-relaxed">Audio files you've uploaded
                                    yourself. Only you can see and use them. You can play a preview or delete them at
                                    any
                                    time.</p>
                                <p class="text-xs text-base-content/45 italic">Once uploaded, they appear as an option
                                    when setting background music on your invitation.</p>
                            </div>
                        </div>
                    </div>

                    <!-- Uploading -->
                    <div class="bg-base-100 rounded-2xl border border-base-300 shadow-sm overflow-hidden">
                        <div class="bg-base-200 px-6 py-4 border-b border-base-300">
                            <h2 class="font-bold text-base-content">How to Upload an Audio File</h2>
                        </div>
                        <div class="p-6">
                            <ol class="space-y-4">
                                <li v-for="(step, i) in uploadSteps" :key="i" class="flex gap-4 items-start">
                                    <div
                                        class="w-7 h-7 rounded-full bg-primary text-primary-content flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
                                        {{ i + 1 }}
                                    </div>
                                    <div class="flex-1">
                                        <p class="font-semibold text-sm text-base-content mb-0.5">{{ step.title }}</p>
                                        <p class="text-sm text-base-content/60 leading-relaxed">{{ step.desc }}</p>
                                    </div>
                                </li>
                            </ol>

                            <div
                                class="mt-5 p-4 bg-warning/10 border border-warning/20 rounded-xl text-sm text-base-content/70 flex gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-warning shrink-0 mt-0.5"
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                <div>
                                    <strong>File requirements:</strong>
                                    <ul class="mt-1 space-y-1 list-disc list-inside text-xs text-base-content/60">
                                        <li>Accepted formats: MP3, WAV, OGG</li>
                                        <li>Maximum file size: 5 MB per file</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Managing uploads -->
                    <div class="bg-base-100 rounded-2xl border border-base-300 p-6 shadow-sm">
                        <h2 class="text-lg font-bold text-base-content mb-3 flex items-center gap-2">
                            <span class="text-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                </svg>
                            </span>
                            Managing Your Uploaded Files
                        </h2>
                        <div class="space-y-3">
                            <div v-for="action in manageActions" :key="action.title"
                                class="flex gap-3 p-4 rounded-xl bg-base-200/50 border border-base-300/40 items-start">
                                <span class="text-lg shrink-0">{{ action.icon }}</span>
                                <div>
                                    <p class="font-semibold text-sm text-base-content mb-0.5">{{ action.title }}</p>
                                    <p class="text-sm text-base-content/60 leading-relaxed">{{ action.desc }}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- How to use in invitation -->
                    <div class="bg-base-100 rounded-2xl border border-base-300 p-6 shadow-sm">
                        <h2 class="text-lg font-bold text-base-content mb-3 flex items-center gap-2">
                            <span class="text-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                </svg>
                            </span>
                            Using Your Music on an Invitation
                        </h2>
                        <p class="text-base-content/70 leading-relaxed mb-3">
                            To add music to an invitation:
                        </p>
                        <ol class="space-y-2">
                            <li v-for="(step, i) in useInInvitationSteps" :key="i"
                                class="flex gap-3 items-start text-sm text-base-content/70">
                                <span
                                    class="w-5 h-5 rounded-full bg-base-200 border border-base-300 flex items-center justify-center text-xs font-bold text-base-content shrink-0 mt-0.5">
                                    {{ i + 1 }}
                                </span>
                                <span>{{ step }}</span>
                            </li>
                        </ol>
                    </div>

                    <!-- Navigation -->
                    <div class="flex gap-3 justify-between">
                        <NuxtLink to="/help/guests-wishes" class="btn btn-ghost btn-sm gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                            Guests & Wishes
                        </NuxtLink>
                        <NuxtLink to="/help/sharing" class="btn btn-primary btn-sm gap-2">
                            Sharing Your Invitation
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

const uploadSteps = [
    {
        title: 'Open the Media Library',
        desc: 'Go to Dashboard → Media in the left sidebar.',
    },
    {
        title: 'Click "Upload Audio"',
        desc: 'A panel will appear on the right side of the screen.',
    },
    {
        title: 'Select your file',
        desc: 'Click the file picker and choose your MP3, WAV, or OGG file (max 5 MB).',
    },
    {
        title: 'Give it a title',
        desc: 'A title is automatically filled from the file name, but you can change it to something more descriptive.',
    },
    {
        title: 'Add an artist name (optional)',
        desc: 'Helpful for identifying the song later, but not required.',
    },
    {
        title: 'Click "Upload"',
        desc: 'The file is saved and will appear in your "My Uploads" list right away.',
    },
]

const manageActions = [
    {
        icon: '▶️',
        title: 'Preview',
        desc: 'Click the play button on any track to listen to a preview directly in your browser.',
    },
    {
        icon: '🔍',
        title: 'Search',
        desc: 'Use the search bar to find a track by title or artist name.',
    },
    {
        icon: '🗑️',
        title: 'Delete',
        desc: 'Click the delete icon to remove a file. This also removes it from any invitations that were using it. A confirmation is required.',
    },
]

const useInInvitationSteps = [
    'Open an invitation to edit (Dashboard → Invitations → Edit).',
    'Scroll down to the "Background Music" section.',
    'Click "Choose Audio" to open the music picker.',
    'Switch to the "My Uploads" tab to see your uploaded files.',
    'Click the play button to preview a track, then click "Select" to use it.',
    'Toggle Autoplay or Loop if you want, then save the invitation.',
]
</script>

<style scoped></style>
