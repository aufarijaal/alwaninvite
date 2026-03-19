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
                <h1 class="text-3xl font-bold text-base-content">Creating an Invitation</h1>
                <p class="text-base-content/60 mt-1">A full walkthrough of every section in the invitation form.</p>
            </div>

            <div class="flex gap-8 items-start">
                <HelpSidebar />

                <div class="flex-1 min-w-0 space-y-6">

                    <!-- Intro -->
                    <div class="bg-base-100 rounded-2xl border border-base-300 p-6 shadow-sm">
                        <p class="text-base-content/70 leading-relaxed">
                            When you click <strong>"Create New Invitation"</strong> from your Dashboard, you'll see a
                            form split into several sections. Fill them in from top to bottom — you don't have to
                            complete everything in one go, you can save as a draft and come back later.
                        </p>
                        <div
                            class="mt-4 p-4 bg-info/10 border border-info/20 rounded-xl text-sm text-base-content/70 flex gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-info shrink-0 mt-0.5"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Only the fields marked with a <strong class="text-error">*</strong> are required.
                                Everything else is optional and can be added or changed later.</span>
                        </div>
                    </div>

                    <!-- Section 1: Basic Info -->
                    <div class="bg-base-100 rounded-2xl border border-base-300 shadow-sm overflow-hidden">
                        <div class="bg-base-200 px-6 py-4 border-b border-base-300 flex items-center gap-3">
                            <div
                                class="w-7 h-7 rounded-full bg-primary text-primary-content flex items-center justify-center font-bold text-sm">
                                1</div>
                            <h2 class="font-bold text-base-content">Basic Information</h2>
                        </div>
                        <div class="p-6 space-y-4">
                            <div v-for="field in basicFields" :key="field.name"
                                class="flex gap-4 p-4 rounded-xl bg-base-200/50 border border-base-300/40">
                                <div class="min-w-0 flex-1">
                                    <div class="flex items-center gap-2 mb-1">
                                        <span class="font-semibold text-sm text-base-content">{{ field.name }}</span>
                                        <span v-if="field.required"
                                            class="text-xs bg-error/10 text-error px-1.5 py-0.5 rounded font-medium">Required</span>
                                        <span v-if="field.optional"
                                            class="text-xs bg-base-300 text-base-content/60 px-1.5 py-0.5 rounded font-medium">Optional</span>
                                    </div>
                                    <p class="text-sm text-base-content/65 leading-relaxed">{{ field.desc }}</p>
                                    <div v-if="field.tip"
                                        class="mt-2 text-xs text-primary bg-primary/5 px-3 py-1.5 rounded-lg">
                                        💡 {{ field.tip }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Section 2: Couple Info -->
                    <div class="bg-base-100 rounded-2xl border border-base-300 shadow-sm overflow-hidden">
                        <div class="bg-base-200 px-6 py-4 border-b border-base-300 flex items-center gap-3">
                            <div
                                class="w-7 h-7 rounded-full bg-primary text-primary-content flex items-center justify-center font-bold text-sm">
                                2</div>
                            <h2 class="font-bold text-base-content">Couple Information</h2>
                        </div>
                        <div class="p-6">
                            <p class="text-sm text-base-content/70 mb-4 leading-relaxed">
                                This section is filled out for both the <strong>Groom</strong> and the
                                <strong>Bride</strong>. Each person has the same fields:
                            </p>
                            <div class="space-y-3">
                                <div v-for="field in coupleFields" :key="field.name"
                                    class="flex gap-4 p-4 rounded-xl bg-base-200/50 border border-base-300/40">
                                    <div class="min-w-0 flex-1">
                                        <div class="flex items-center gap-2 mb-1">
                                            <span class="font-semibold text-sm text-base-content">{{ field.name
                                            }}</span>
                                            <span v-if="field.required"
                                                class="text-xs bg-error/10 text-error px-1.5 py-0.5 rounded font-medium">Required</span>
                                            <span v-else
                                                class="text-xs bg-base-300 text-base-content/60 px-1.5 py-0.5 rounded font-medium">Optional</span>
                                        </div>
                                        <p class="text-sm text-base-content/65 leading-relaxed">{{ field.desc }}</p>
                                        <p v-if="field.example" class="text-xs text-base-content/40 mt-1 italic">e.g.
                                            "{{ field.example }}"
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Section 3: Events -->
                    <div class="bg-base-100 rounded-2xl border border-base-300 shadow-sm overflow-hidden">
                        <div class="bg-base-200 px-6 py-4 border-b border-base-300 flex items-center gap-3">
                            <div
                                class="w-7 h-7 rounded-full bg-primary text-primary-content flex items-center justify-center font-bold text-sm">
                                3</div>
                            <h2 class="font-bold text-base-content">Events</h2>
                            <span class="text-xs bg-error/10 text-error px-2 py-0.5 rounded-lg font-medium">At least 1
                                required</span>
                        </div>
                        <div class="p-6">
                            <p class="text-sm text-base-content/70 mb-4 leading-relaxed">
                                Add one event or multiple (e.g. Akad Nikah + Resepsi + Brunch the next day).
                                Each event has its own details. Click <strong>"Add Event"</strong> to add more.
                            </p>
                            <div class="space-y-3">
                                <div v-for="field in eventFields" :key="field.name"
                                    class="flex gap-4 p-4 rounded-xl bg-base-200/50 border border-base-300/40">
                                    <div class="min-w-0 flex-1">
                                        <div class="flex items-center gap-2 mb-1">
                                            <span class="font-semibold text-sm text-base-content">{{ field.name
                                                }}</span>
                                            <span v-if="field.required"
                                                class="text-xs bg-error/10 text-error px-1.5 py-0.5 rounded font-medium">Required</span>
                                            <span v-else
                                                class="text-xs bg-base-300 text-base-content/60 px-1.5 py-0.5 rounded font-medium">Optional</span>
                                        </div>
                                        <p class="text-sm text-base-content/65 leading-relaxed">{{ field.desc }}</p>
                                    </div>
                                </div>
                            </div>
                            <div
                                class="mt-4 p-4 bg-warning/10 border border-warning/20 rounded-xl text-sm text-base-content/70 flex gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-warning shrink-0 mt-0.5"
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>For the <strong>Map URL</strong>, open Google Maps, find your venue, click
                                    "Share", and paste the link here. This adds a map button on your invitation so
                                    guests can navigate easily.</span>
                            </div>
                        </div>
                    </div>

                    <!-- Section 4: Gifts -->
                    <div class="bg-base-100 rounded-2xl border border-base-300 shadow-sm overflow-hidden">
                        <div class="bg-base-200 px-6 py-4 border-b border-base-300 flex items-center gap-3">
                            <div
                                class="w-7 h-7 rounded-full bg-primary text-primary-content flex items-center justify-center font-bold text-sm">
                                4</div>
                            <h2 class="font-bold text-base-content">Gifts</h2>
                            <span
                                class="text-xs bg-base-300 text-base-content/60 px-2 py-0.5 rounded-lg font-medium">Optional</span>
                        </div>
                        <div class="p-6">
                            <p class="text-sm text-base-content/70 mb-4 leading-relaxed">
                                If you'd like guests to send gifts digitally, you can add one or more payment options
                                here. Guests will see a "Send a Gift" section on your invitation page.
                            </p>
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div v-for="type in giftTypes" :key="type.name"
                                    class="p-4 rounded-xl bg-base-200/50 border border-base-300/40">
                                    <p class="font-semibold text-sm text-base-content mb-1">{{ type.name }}</p>
                                    <p class="text-xs text-base-content/55 leading-relaxed">{{ type.desc }}</p>
                                </div>
                            </div>
                            <p class="mt-4 text-sm text-base-content/60">
                                For each gift option, you'll enter the <strong>Provider</strong> (e.g. BCA, GoPay),
                                <strong>Account Name</strong>, and <strong>Account Number</strong>.
                                You can add multiple gift options — for example, one bank account and one e-wallet.
                            </p>
                        </div>
                    </div>

                    <!-- Section 5: Livestream -->
                    <div class="bg-base-100 rounded-2xl border border-base-300 shadow-sm overflow-hidden">
                        <div class="bg-base-200 px-6 py-4 border-b border-base-300 flex items-center gap-3">
                            <div
                                class="w-7 h-7 rounded-full bg-primary text-primary-content flex items-center justify-center font-bold text-sm">
                                5</div>
                            <h2 class="font-bold text-base-content">Livestream</h2>
                            <span
                                class="text-xs bg-base-300 text-base-content/60 px-2 py-0.5 rounded-lg font-medium">Optional</span>
                        </div>
                        <div class="p-6">
                            <p class="text-sm text-base-content/70 mb-4 leading-relaxed">
                                If you'll be live-streaming your wedding ceremony, fill in this section so guests can
                                watch from home. They'll see a button on your invitation that links directly to the
                                stream.
                            </p>
                            <div class="space-y-3 mb-4">
                                <div v-for="field in livestreamFields" :key="field.name"
                                    class="flex gap-4 p-4 rounded-xl bg-base-200/50 border border-base-300/40">
                                    <div class="min-w-0 flex-1">
                                        <p class="font-semibold text-sm text-base-content mb-1">{{ field.name }}</p>
                                        <p class="text-sm text-base-content/65 leading-relaxed">{{ field.desc }}</p>
                                    </div>
                                </div>
                            </div>
                            <div
                                class="p-4 bg-info/10 border border-info/20 rounded-xl text-sm text-base-content/70 flex gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-info shrink-0 mt-0.5"
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>Use the <strong>Active toggle</strong> to show or hide the livestream section on
                                    your invitation without deleting the details.</span>
                            </div>
                        </div>
                    </div>

                    <!-- Section 6: Background Music -->
                    <div class="bg-base-100 rounded-2xl border border-base-300 shadow-sm overflow-hidden">
                        <div class="bg-base-200 px-6 py-4 border-b border-base-300 flex items-center gap-3">
                            <div
                                class="w-7 h-7 rounded-full bg-primary text-primary-content flex items-center justify-center font-bold text-sm">
                                6</div>
                            <h2 class="font-bold text-base-content">Background Music</h2>
                            <span
                                class="text-xs bg-base-300 text-base-content/60 px-2 py-0.5 rounded-lg font-medium">Optional</span>
                        </div>
                        <div class="p-6">
                            <p class="text-sm text-base-content/70 mb-4 leading-relaxed">
                                Add a song that plays in the background when guests open your invitation. You can
                                choose from our built-in music collection or upload your own.
                            </p>
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                <div class="p-4 rounded-xl bg-base-200/50 border border-base-300/40">
                                    <p class="font-semibold text-sm text-base-content mb-1">🎵 System Audio</p>
                                    <p class="text-xs text-base-content/60 leading-relaxed">Ready-to-use tracks we've
                                        provided. Browse and preview before selecting.</p>
                                </div>
                                <div class="p-4 rounded-xl bg-base-200/50 border border-base-300/40">
                                    <p class="font-semibold text-sm text-base-content mb-1">📁 My Uploads</p>
                                    <p class="text-xs text-base-content/60 leading-relaxed">Your own uploaded songs.
                                        Upload them first in the <NuxtLink to="/help/media-library"
                                            class="text-primary underline">Media Library</NuxtLink>.</p>
                                </div>
                            </div>
                            <div class="space-y-2">
                                <div
                                    class="flex gap-3 items-center p-3 rounded-xl bg-base-200/50 text-sm text-base-content/70">
                                    <div class="w-2 h-2 rounded-full bg-primary shrink-0"></div>
                                    <span><strong>Autoplay</strong> — music starts automatically when the invitation
                                        opens.</span>
                                </div>
                                <div
                                    class="flex gap-3 items-center p-3 rounded-xl bg-base-200/50 text-sm text-base-content/70">
                                    <div class="w-2 h-2 rounded-full bg-primary shrink-0"></div>
                                    <span><strong>Loop</strong> — music repeats from the beginning when it
                                        finishes.</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Saving -->
                    <div class="bg-base-100 rounded-2xl border border-base-300 p-6 shadow-sm">
                        <h2 class="text-lg font-bold text-base-content mb-3 flex items-center gap-2">
                            <span class="text-success">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </span>
                            Saving Your Invitation
                        </h2>
                        <p class="text-sm text-base-content/70 leading-relaxed mb-3">
                            When you're ready, click <strong>"Save"</strong>. Your invitation is saved as a
                            <strong>Draft</strong> by default, which means guests can't see it yet.
                            When you're happy with everything, toggle <strong>"Publish"</strong> to make it live.
                        </p>
                        <div class="flex flex-col sm:flex-row gap-3 mt-4">
                            <div class="flex-1 p-4 rounded-xl bg-base-200/50 border border-base-300/40 text-center">
                                <span class="badge badge-ghost text-xs mb-2">Draft</span>
                                <p class="text-xs text-base-content/60">Only you can see it. Safe to edit without guests
                                    noticing.</p>
                            </div>
                            <div class="flex-1 p-4 rounded-xl bg-success/10 border border-success/20 text-center">
                                <span class="badge badge-success text-xs mb-2">Published</span>
                                <p class="text-xs text-base-content/60">Your invitation is live! Guests can open it via
                                    the link.</p>
                            </div>
                        </div>
                    </div>

                    <!-- Next Steps -->
                    <div class="flex gap-3 justify-between">
                        <NuxtLink to="/help" class="btn btn-ghost btn-sm gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                            Getting Started
                        </NuxtLink>
                        <NuxtLink to="/help/managing-invitations" class="btn btn-primary btn-sm gap-2">
                            Managing Invitations
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

const basicFields = [
    {
        name: 'Title',
        required: true,
        desc: 'The name of your invitation. This appears at the top of your invitation page. You can use the couple\'s names or a short description like "The Wedding of Budi & Ani".',
        tip: null,
    },
    {
        name: 'URL Slug',
        required: true,
        desc: 'The unique web address for your invitation (e.g. alwaninvite.com/invite/budi-and-ani). This is automatically created from your title, but you can change it. Use only lowercase letters, numbers, and hyphens.',
        tip: 'Keep it short and memorable — you\'ll be sharing this link with your guests.',
    },
    {
        name: 'Language',
        required: true,
        desc: 'Choose whether your invitation is displayed in English or Indonesian. This affects all the text labels on the invitation page (like "RSVP", "Venue", etc.).',
        tip: null,
    },
    {
        name: 'Theme',
        required: true,
        desc: 'The visual design of your invitation. Click "Choose Theme" to see a preview of all available themes and pick the one that matches your wedding style.',
        tip: 'You can change your theme at any time, even after publishing.',
    },
    {
        name: 'Publish',
        optional: true,
        desc: 'Toggle this on when you\'re ready for guests to see your invitation. While it\'s off (Draft), the invitation link won\'t work for guests.',
        tip: null,
    },
]

const coupleFields = [
    { name: 'Call Name', required: true, desc: 'The short name shown prominently on the invitation (e.g. the first name only).', example: 'Budi' },
    { name: 'Full Name', required: false, desc: 'The complete legal or formal name. Often shown in a smaller font below the call name.', example: 'Budi Santoso, S.T.' },
    { name: 'Additional Info 1', required: false, desc: 'A free-text line for extra details. Commonly used for parent names.', example: 'Son of Mr. Hasan & Mrs. Siti' },
    { name: 'Additional Info 2', required: false, desc: 'Another free-text line. Often used for birth order.', example: 'The first son' },
    { name: 'Additional Info 3', required: false, desc: 'A third free-text line. Often used for an Instagram handle.', example: '@budi.santoso' },
]

const eventFields = [
    { name: 'Event Type', required: true, desc: 'Choose from Ceremony, Reception, or Other. This helps label the event on the invitation.' },
    { name: 'Event Title', required: true, desc: 'The name of this event, e.g. "Akad Nikah", "Resepsi", or "Brunch".' },
    { name: 'Start Time', required: true, desc: 'The date and time the event begins.' },
    { name: 'End Time', required: false, desc: 'When the event ends. If left empty, the invitation will show an open end time.' },
    { name: 'Location Name', required: true, desc: 'The name of the venue, e.g. "Ballroom Grand Hyatt Jakarta".' },
    { name: 'Location Address', required: false, desc: 'The full address of the venue so guests know where to go.' },
    { name: 'Map URL', required: false, desc: 'A Google Maps link to the venue. Guests can tap this to open directions on their phone.' },
]

const giftTypes = [
    { name: '🏦 Bank Transfer', desc: 'A regular bank account. Enter the bank name, account holder name, and account number.' },
    { name: '📱 E-Wallet', desc: 'Mobile wallets like GoPay, OVO, or PayPal. Enter the provider name and your registered phone number or ID.' },
    { name: '₿ Cryptocurrency', desc: 'For crypto wallets. Enter the coin name and your wallet address.' },
    { name: '🎁 Gift Registry', desc: 'A wishlist on a shopping site. Enter the store name and a link to your registry.' },
]

const livestreamFields = [
    { name: 'Platform', desc: 'Choose where you\'ll be streaming: YouTube, Instagram Live, or Zoom.' },
    { name: 'Stream URL', desc: 'The direct link to your live stream. Guests will click this button to watch.' },
    { name: 'Event Date', desc: 'The date of the live stream.' },
    { name: 'Start Time', desc: 'What time the broadcast begins.' },
    { name: 'Active', desc: 'Toggle on to show the livestream section, or off to hide it without deleting the details.' },
]
</script>

<style scoped></style>
