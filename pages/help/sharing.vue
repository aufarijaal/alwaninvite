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
                <h1 class="text-3xl font-bold text-base-content">Sharing Your Invitation</h1>
                <p class="text-base-content/60 mt-1">How to send your invitation to guests and make it personal.</p>
            </div>

            <div class="flex gap-8 items-start">
                <HelpSidebar />

                <div class="flex-1 min-w-0 space-y-6">

                    <!-- Your Invitation Link -->
                    <div class="bg-base-100 rounded-2xl border border-base-300 p-6 shadow-sm">
                        <h2 class="text-lg font-bold text-base-content mb-3 flex items-center gap-2">
                            <span class="text-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                </svg>
                            </span>
                            Your Invitation Link
                        </h2>
                        <p class="text-base-content/70 leading-relaxed mb-4">
                            Every invitation has its own unique link based on the URL slug you chose when creating it.
                            It looks like this:
                        </p>
                        <div
                            class="bg-base-200 rounded-xl px-4 py-3 font-mono text-sm text-base-content border border-base-300 mb-4">
                            alwaninvite.com/invite/<span class="text-primary font-bold">your-slug</span>
                        </div>
                        <p class="text-sm text-base-content/70 leading-relaxed">
                            You can find this link on your invitation card in the Invitations list, or by clicking the
                            <strong>Preview</strong> button — the URL in the browser is your shareable link.
                        </p>
                    </div>

                    <!-- Personalized Links -->
                    <div class="bg-base-100 rounded-2xl border border-base-300 shadow-sm overflow-hidden">
                        <div class="bg-primary px-6 py-4 border-b border-primary/20">
                            <h2 class="font-bold text-primary-content flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 3l14 9-14 9V3z" />
                                </svg>
                                ✨ Personalized Links — Adding a Guest's Name
                            </h2>
                        </div>
                        <div class="p-6">
                            <p class="text-sm text-base-content/70 leading-relaxed mb-4">
                                You can make each invitation feel personal by adding the guest's name to the link.
                                When a guest opens a link with their name in it, the invitation greets them by name
                                — for example, <em>"Dear Budi, you are invited to our wedding…"</em>
                            </p>
                            <p class="text-sm text-base-content/70 leading-relaxed mb-4">
                                To do this, add <code
                                    class="bg-base-200 px-1.5 py-0.5 rounded text-xs">?to=GuestName</code>
                                at the end of your invitation link:
                            </p>
                            <div
                                class="bg-base-200 rounded-xl px-4 py-3 font-mono text-sm text-base-content border border-base-300 mb-4 break-all">
                                alwaninvite.com/invite/your-slug<span class="text-primary font-bold">?to=Budi</span>
                            </div>
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                <div class="p-4 rounded-xl bg-base-200/50 border border-base-300/40">
                                    <p class="font-semibold text-sm text-base-content mb-1">Without a name</p>
                                    <p class="text-xs text-base-content/60 font-mono break-all">…/invite/budi-and-ani
                                    </p>
                                    <p class="text-xs text-base-content/45 mt-2">Guest sees a generic greeting or their
                                        name field is empty.</p>
                                </div>
                                <div class="p-4 rounded-xl bg-success/10 border border-success/20">
                                    <p class="font-semibold text-sm text-base-content mb-1">With a name</p>
                                    <p class="text-xs text-base-content/60 font-mono break-all">
                                        …/invite/budi-and-ani?to=Pak+Hasan</p>
                                    <p class="text-xs text-base-content/45 mt-2">Guest sees "Dear Pak Hasan" on the
                                        invitation. 🎉</p>
                                </div>
                            </div>
                            <div
                                class="p-4 bg-info/10 border border-info/20 rounded-xl text-sm text-base-content/70 flex gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-info shrink-0 mt-0.5"
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>If you have multiple words in the name, replace spaces with <code
                                        class="bg-base-300 px-1 rounded text-xs">+</code> — for example
                                    <code class="bg-base-300 px-1 rounded text-xs">?to=Pak+Hasan</code>.</span>
                            </div>
                        </div>
                    </div>

                    <!-- WhatsApp Tip -->
                    <div class="bg-base-100 rounded-2xl border border-base-300 shadow-sm overflow-hidden">
                        <div class="bg-base-200 px-6 py-4 border-b border-base-300">
                            <h2 class="font-bold text-base-content flex items-center gap-2">
                                <span>📱</span> Sending via WhatsApp
                            </h2>
                        </div>
                        <div class="p-6">
                            <p class="text-sm text-base-content/70 leading-relaxed mb-5">
                                WhatsApp is the most popular way to share wedding invitations in Indonesia.
                                Here are a few tips for a smooth experience:
                            </p>
                            <div class="space-y-3">
                                <div v-for="tip in whatsappTips" :key="tip.title"
                                    class="flex gap-4 p-4 rounded-xl bg-base-200/50 border border-base-300/40">
                                    <span class="text-lg shrink-0">{{ tip.emoji }}</span>
                                    <div>
                                        <p class="font-semibold text-sm text-base-content mb-0.5">{{ tip.title }}</p>
                                        <p class="text-sm text-base-content/60 leading-relaxed">{{ tip.desc }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Social Media -->
                    <div class="bg-base-100 rounded-2xl border border-base-300 p-6 shadow-sm">
                        <h2 class="text-lg font-bold text-base-content mb-3 flex items-center gap-2">
                            <span class="text-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                </svg>
                            </span>
                            Sharing on Social Media
                        </h2>
                        <p class="text-base-content/70 leading-relaxed mb-3">
                            When you share your invitation link on WhatsApp, Instagram, or Facebook, a
                            <strong>preview card</strong> automatically appears — it shows your names and a nice image.
                            This happens automatically and you don't need to do anything extra.
                        </p>
                        <div
                            class="p-4 bg-base-200/50 border border-base-300/40 rounded-xl text-sm text-base-content/60">
                            The preview card shows the groom and bride's names and a generated image. Make sure you've
                            filled in the couple's names in your invitation so the preview looks great!
                        </div>
                    </div>

                    <!-- Quick Share Checklist -->
                    <div class="bg-base-100 rounded-2xl border border-base-300 shadow-sm overflow-hidden">
                        <div class="bg-base-200 px-6 py-4 border-b border-base-300">
                            <h2 class="font-bold text-base-content">✅ Before You Share — Quick Checklist</h2>
                        </div>
                        <div class="p-6">
                            <div class="space-y-3">
                                <label v-for="item in checklist" :key="item"
                                    class="flex gap-3 items-start p-3 rounded-xl bg-base-200/50 cursor-pointer hover:bg-base-200 transition-colors">
                                    <input type="checkbox"
                                        class="checkbox checkbox-primary checkbox-sm mt-0.5 shrink-0" />
                                    <span class="text-sm text-base-content/70">{{ item }}</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <!-- Navigation -->
                    <div class="flex gap-3 justify-between">
                        <NuxtLink to="/help/media-library" class="btn btn-ghost btn-sm gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                            Media Library
                        </NuxtLink>
                        <NuxtLink to="/help" class="btn btn-ghost btn-sm gap-2">
                            Back to Home
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
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

const whatsappTips = [
    {
        emoji: '🤖',
        title: 'Use the Auto-Generated Message',
        desc: 'In the Guests & Wishes page, each guest has a "Copy WhatsApp Message" button. It generates a complete, ready-to-send message with the personalized link already included.',
    },
    {
        emoji: '👁️',
        title: 'Preview First on Mobile',
        desc: 'Open your invitation link on your own phone before sending. Check that it looks good, loads correctly, and everything is spelled right.',
    },
    {
        emoji: '📋',
        title: 'Pre-Add Guests',
        desc: 'Add your guest list in advance so their names are ready. Then you can quickly copy each personalized message and send one by one.',
    },
    {
        emoji: '✅',
        title: 'Make Sure It\'s Published',
        desc: 'Your invitation must be set to "Published" before guests can open it. Double-check that the Publish toggle is on before sharing the link.',
    },
]

const checklist = [
    'The invitation is set to "Published" (not Draft)',
    'All event details (date, time, venue) are correct',
    'The couple\'s names are spelled correctly',
    'You\'ve previewed the invitation on a mobile phone',
    'Gift information is correct (if included)',
    'Livestream link is working (if applicable)',
    'Background music plays correctly (if added)',
]
</script>

<style scoped></style>
