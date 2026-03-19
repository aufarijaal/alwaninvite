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
                <h1 class="text-3xl font-bold text-base-content">Guests & Wishes</h1>
                <p class="text-base-content/60 mt-1">Track RSVPs, read guest messages, and manage your guest list.</p>
            </div>

            <div class="flex gap-8 items-start">
                <HelpSidebar />

                <div class="flex-1 min-w-0 space-y-6">

                    <!-- Overview -->
                    <div class="bg-base-100 rounded-2xl border border-base-300 p-6 shadow-sm">
                        <h2 class="text-lg font-bold text-base-content mb-3 flex items-center gap-2">
                            <span class="text-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </span>
                            What is the Guests & Wishes Page?
                        </h2>
                        <p class="text-base-content/70 leading-relaxed mb-4">
                            This is where you see every guest who has opened your invitation and submitted an RSVP, as
                            well as any wedding wishes they've written. You can also pre-add guests before your wedding
                            to prepare personalized links.
                        </p>
                        <p class="text-sm text-base-content/70 leading-relaxed">
                            Go to <strong>Dashboard → Guests & Wishes</strong> from the sidebar to open this page.
                        </p>
                    </div>

                    <!-- Stats bar -->
                    <div class="bg-base-100 rounded-2xl border border-base-300 shadow-sm overflow-hidden">
                        <div class="bg-base-200 px-6 py-4 border-b border-base-300">
                            <h2 class="font-bold text-base-content">At-a-Glance Stats</h2>
                        </div>
                        <div class="p-6">
                            <p class="text-sm text-base-content/70 leading-relaxed mb-4">
                                At the top of the page you'll see a summary bar showing:
                            </p>
                            <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                <div v-for="stat in stats" :key="stat.label"
                                    class="p-4 rounded-xl bg-base-200/50 border border-base-300/40 text-center">
                                    <div class="text-xs font-medium text-base-content/50 mb-1">{{ stat.label }}</div>
                                    <div class="text-sm text-base-content/70">{{ stat.desc }}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Attendance Statuses -->
                    <div class="bg-base-100 rounded-2xl border border-base-300 shadow-sm overflow-hidden">
                        <div class="bg-base-200 px-6 py-4 border-b border-base-300">
                            <h2 class="font-bold text-base-content">Attendance Statuses</h2>
                        </div>
                        <div class="p-6">
                            <p class="text-sm text-base-content/70 leading-relaxed mb-4">
                                Each guest's RSVP response will be one of four statuses:
                            </p>
                            <div class="space-y-3">
                                <div v-for="status in attendanceStatuses" :key="status.label"
                                    class="flex items-start gap-4 p-4 rounded-xl bg-base-200/50 border border-base-300/40">
                                    <span class="badge shrink-0 mt-0.5" :class="status.badgeClass">{{ status.label
                                        }}</span>
                                    <p class="text-sm text-base-content/65 leading-relaxed">{{ status.desc }}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Adding guests in advance -->
                    <div class="bg-base-100 rounded-2xl border border-base-300 shadow-sm overflow-hidden">
                        <div class="bg-base-200 px-6 py-4 border-b border-base-300">
                            <h2 class="font-bold text-base-content">Adding Guests in Advance</h2>
                        </div>
                        <div class="p-6">
                            <p class="text-sm text-base-content/70 leading-relaxed mb-4">
                                You can pre-add your guest list before the wedding. This is useful so you can generate
                                personalized invitation links for each guest (e.g. with their name on the card).
                            </p>
                            <div
                                class="p-4 bg-info/10 border border-info/20 rounded-xl text-sm text-base-content/70 flex gap-3 mb-5">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-info shrink-0 mt-0.5"
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>You can add up to <strong>500 guests per invitation</strong>.</span>
                            </div>
                            <h3 class="font-semibold text-sm text-base-content mb-3">Two ways to add guests:</h3>
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div class="p-5 rounded-xl bg-base-200/50 border border-base-300/40">
                                    <p class="font-semibold text-sm text-base-content mb-2">📋 Paste a List</p>
                                    <p class="text-xs text-base-content/60 leading-relaxed">
                                        Type or paste all guest names into a text box — one name per line. Great when
                                        you already have a list ready in a spreadsheet or document.
                                    </p>
                                    <div
                                        class="mt-3 bg-base-300/50 rounded-lg p-2 font-mono text-xs text-base-content/50">
                                        Budi Santoso<br>
                                        Ani Rahayu<br>
                                        Pak Hasan
                                    </div>
                                </div>
                                <div class="p-5 rounded-xl bg-base-200/50 border border-base-300/40">
                                    <p class="font-semibold text-sm text-base-content mb-2">➕ Add Individually</p>
                                    <p class="text-xs text-base-content/60 leading-relaxed">
                                        Add guests one by one using input fields. Useful for small groups or when you
                                        want
                                        to double-check each name as you go.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- WhatsApp Message -->
                    <div class="bg-base-100 rounded-2xl border border-base-300 shadow-sm overflow-hidden">
                        <div class="bg-base-200 px-6 py-4 border-b border-base-300">
                            <h2 class="font-bold text-base-content flex items-center gap-2">
                                <span>📱</span> WhatsApp Message Generator
                            </h2>
                        </div>
                        <div class="p-6">
                            <p class="text-sm text-base-content/70 leading-relaxed mb-4">
                                Next to each guest in the table, there's a <strong>"Copy WhatsApp Message"</strong>
                                button. Clicking it copies a ready-to-paste message to your clipboard that includes:
                            </p>
                            <ul class="space-y-2 mb-4">
                                <li v-for="item in whatsappItems" :key="item"
                                    class="flex gap-3 items-start text-sm text-base-content/70">
                                    <div class="w-2 h-2 rounded-full bg-success mt-1.5 shrink-0"></div>
                                    {{ item }}
                                </li>
                            </ul>
                            <div
                                class="p-4 bg-success/10 border border-success/20 rounded-xl text-sm text-base-content/70">
                                Just open WhatsApp, paste the message on the guest's chat, and send! The invitation link
                                already includes the guest's name, so when they open it they see a personalized
                                greeting.
                            </div>
                        </div>
                    </div>

                    <!-- Search & Filter -->
                    <div class="bg-base-100 rounded-2xl border border-base-300 p-6 shadow-sm">
                        <h2 class="text-lg font-bold text-base-content mb-3 flex items-center gap-2">
                            <span class="text-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                </svg>
                            </span>
                            Filtering & Searching
                        </h2>
                        <p class="text-base-content/70 leading-relaxed mb-4">
                            Use the filters at the top of the table to narrow down your guest list:
                        </p>
                        <div class="space-y-2">
                            <div v-for="filter in filters" :key="filter.label"
                                class="flex gap-3 items-start p-3 rounded-xl bg-base-200/50 text-sm text-base-content/70">
                                <div class="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0"></div>
                                <span><strong>{{ filter.label }}:</strong> {{ filter.desc }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Export & Bulk Delete -->
                    <div class="bg-base-100 rounded-2xl border border-base-300 shadow-sm overflow-hidden">
                        <div class="bg-base-200 px-6 py-4 border-b border-base-300">
                            <h2 class="font-bold text-base-content">Export & Bulk Actions</h2>
                        </div>
                        <div class="p-6 space-y-4">
                            <div class="flex gap-4 p-4 rounded-xl bg-base-200/50 border border-base-300/40">
                                <div>
                                    <p class="font-semibold text-sm text-base-content mb-1">📥 Export to CSV</p>
                                    <p class="text-sm text-base-content/65 leading-relaxed">
                                        Download all your guest and RSVP data as a spreadsheet file (CSV).
                                        The export includes: date, guest name, attendance status, guest count,
                                        message, and which invitation they responded to.
                                        Great for printing a seating chart or sharing with your wedding organizer.
                                    </p>
                                    <p class="text-xs text-base-content/45 mt-2">
                                        The exported file is named <code
                                            class="bg-base-300 px-1 rounded">wishes-[today's date].csv</code>
                                    </p>
                                </div>
                            </div>
                            <div class="flex gap-4 p-4 rounded-xl bg-base-200/50 border border-base-300/40">
                                <div>
                                    <p class="font-semibold text-sm text-base-content mb-1">☑️ Bulk Delete</p>
                                    <p class="text-sm text-base-content/65 leading-relaxed">
                                        Tick the checkboxes next to multiple guests, then click the delete button
                                        to remove them all at once. A confirmation will appear before anything is
                                        deleted.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Navigation -->
                    <div class="flex gap-3 justify-between">
                        <NuxtLink to="/help/managing-invitations" class="btn btn-ghost btn-sm gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                            Managing Invitations
                        </NuxtLink>
                        <NuxtLink to="/help/media-library" class="btn btn-primary btn-sm gap-2">
                            Media Library
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

const stats = [
    { label: 'Total Wishes', desc: 'All responses received' },
    { label: 'Attending', desc: 'Confirmed yes' },
    { label: 'Not Attending', desc: 'Confirmed no' },
    { label: 'Maybe', desc: 'Not sure yet' },
    { label: 'Pending', desc: 'No response yet' },
    { label: 'Total Guests', desc: 'Combined guest count' },
]

const attendanceStatuses = [
    {
        label: 'Attending',
        badgeClass: 'badge-success',
        desc: 'The guest has confirmed they will come to your wedding.',
    },
    {
        label: 'Not Attending',
        badgeClass: 'badge-error',
        desc: 'The guest has let you know they cannot make it.',
    },
    {
        label: 'Maybe',
        badgeClass: 'badge-warning',
        desc: 'The guest is unsure and hasn\'t fully committed yet.',
    },
    {
        label: 'Pending',
        badgeClass: 'badge-ghost',
        desc: 'The guest was added in advance but hasn\'t RSVP\'d yet.',
    },
]

const whatsappItems = [
    'A friendly greeting with the guest\'s name',
    'A brief wedding announcement sentence',
    'The invitation link with the guest\'s name embedded (e.g. .../invite/your-slug?to=Budi)',
]

const filters = [
    { label: 'Filter by Wedding', desc: 'If you have multiple invitations, select which one to view.' },
    { label: 'Filter by Attendance', desc: 'Choose All, Attending, Not Attending, Maybe, or Pending to focus on a specific group.' },
    { label: 'Search', desc: 'Type a guest\'s name or part of their message to find them quickly.' },
]
</script>

<style scoped></style>
