<template>
    <div id="theme-slate" class="min-h-screen bg-zinc-950 text-white">

        <!-- Hidden Audio Element -->
        <audio v-if="invitation?.audios?.url" ref="audioRef" :src="invitation.audios.url" :loop="invitation.loop"
            preload="none" />

        <!-- ===== HERO / COVER ===== -->
        <section
            class="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-zinc-950 via-slate-900 to-zinc-900 px-6 py-20 text-center">
            <!-- Decorative blobs -->
            <div class="absolute inset-0 pointer-events-none overflow-hidden">
                <div class="absolute -top-32 -left-32 w-96 h-96 bg-slate-600/10 rounded-full blur-3xl"></div>
                <div class="absolute -bottom-32 -right-32 w-96 h-96 bg-sky-600/10 rounded-full blur-3xl"></div>
                <div
                    class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-slate-700/10 rounded-full blur-3xl">
                </div>
            </div>

            <div class="relative z-10 max-w-sm mx-auto w-full">
                <!-- Ornament top -->
                <div class="flex items-center justify-center gap-2 mb-6">
                    <div class="h-px w-10 bg-slate-400/30"></div>
                    <svg class="w-5 h-5 text-slate-400/50" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
                    </svg>
                    <div class="h-px w-10 bg-slate-400/30"></div>
                </div>

                <!-- Bismillah -->
                <p class="text-slate-300/80 text-xl mb-2 tracking-wide" style="font-family: serif;">بِسْمِ اللَّهِ
                    الرَّحْمَنِ الرَّحِيمِ</p>
                <p class="text-slate-400/50 text-xs tracking-[0.3em] uppercase font-sans mb-10">Undangan Pernikahan</p>

                <!-- Names -->
                <div class="space-y-1 mb-8">
                    <h1 class="text-6xl font-bold text-white tracking-tight" style="font-family: Georgia, serif;">
                        {{ invitation?.groom_callname }}
                    </h1>
                    <p class="text-slate-400 text-3xl font-light">&amp;</p>
                    <h1 class="text-6xl font-bold text-white tracking-tight" style="font-family: Georgia, serif;">
                        {{ invitation?.bride_callname }}
                    </h1>
                </div>

                <!-- Date pill -->
                <div
                    class="inline-flex items-center gap-3 bg-slate-800/40 border border-slate-600/30 rounded-full px-5 py-2">
                    <div class="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
                    <p class="text-slate-200/80 text-xs font-sans tracking-widest">{{ formatDate(mainEventDate) }}</p>
                    <div class="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
                </div>

                <!-- Open invitation button -->
                <div class="mt-16 flex flex-col items-center gap-3">
                    <div v-if="props.guest" class="text-center mb-1">
                        <p class="text-slate-400/50 text-xs font-sans tracking-widest uppercase mb-1">Kepada Yth.</p>
                        <p class="text-white font-semibold font-sans text-base">{{ props.guest }}</p>
                    </div>
                    <button @click="openInvitation"
                        class="inline-flex items-center gap-2 bg-amber-400/90 hover:bg-amber-300 active:scale-95 text-slate-900 font-semibold font-sans text-sm px-7 py-3 rounded-full shadow-lg shadow-amber-900/40 transition-all">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Buka Undangan
                    </button>
                </div>
            </div>
        </section>

        <!-- ===== COUPLE SECTION ===== -->
        <section class="bg-zinc-950 py-20 px-6">
            <div class="max-w-sm mx-auto text-center">
                <p class="text-slate-400/50 text-xs tracking-[0.3em] uppercase font-sans mb-12">Yang Berbahagia</p>

                <!-- Groom -->
                <div class="mb-10">
                    <div
                        class="w-20 h-20 rounded-full bg-gradient-to-br from-slate-700 to-zinc-950 border-2 border-slate-500/30 mx-auto mb-4 flex items-center justify-center">
                        <svg class="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <p class="text-slate-400/50 text-xs font-sans tracking-widest uppercase mb-2">Mempelai Pria</p>
                    <h2 class="text-xl font-bold text-white mb-1" style="font-family: Georgia, serif;">{{
                        invitation?.groom_fullname }}</h2>
                    <p class="text-slate-300/70 text-sm font-sans">{{ invitation?.groom_info_1 }}</p>
                    <p class="text-slate-400/50 text-xs font-sans mt-0.5">{{ invitation?.groom_info_2 }}</p>
                    <p v-if="invitation?.groom_info_3" class="text-sky-400/60 text-xs font-sans mt-1">{{
                        invitation?.groom_info_3 }}</p>
                </div>

                <!-- Divider -->
                <div class="flex items-center gap-4 mb-10">
                    <div class="h-px flex-1 bg-gradient-to-r from-transparent via-slate-600/40 to-transparent"></div>
                    <span class="text-slate-400 text-xl">♥</span>
                    <div class="h-px flex-1 bg-gradient-to-r from-transparent via-slate-600/40 to-transparent"></div>
                </div>

                <!-- Bride -->
                <div>
                    <div
                        class="w-20 h-20 rounded-full bg-gradient-to-br from-slate-700 to-zinc-950 border-2 border-slate-500/30 mx-auto mb-4 flex items-center justify-center">
                        <svg class="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <p class="text-slate-400/50 text-xs font-sans tracking-widest uppercase mb-2">Mempelai Wanita</p>
                    <h2 class="text-xl font-bold text-white mb-1" style="font-family: Georgia, serif;">{{
                        invitation?.bride_fullname }}</h2>
                    <p class="text-slate-300/70 text-sm font-sans">{{ invitation?.bride_info_1 }}</p>
                    <p class="text-slate-400/50 text-xs font-sans mt-0.5">{{ invitation?.bride_info_2 }}</p>
                    <p v-if="invitation?.bride_info_3" class="text-sky-400/60 text-xs font-sans mt-1">{{
                        invitation?.bride_info_3 }}</p>
                </div>
            </div>
        </section>

        <!-- ===== COUNTDOWN ===== -->
        <section class="bg-gradient-to-b from-zinc-950 to-slate-900 py-16 px-6">
            <div class="max-w-sm mx-auto text-center">
                <p class="text-slate-400/50 text-xs tracking-[0.3em] uppercase font-sans mb-8">Menuju Hari Bahagia</p>
                <div class="grid grid-cols-4 gap-3">
                    <div v-for="unit in countdown" :key="unit.label"
                        class="bg-slate-800/40 border border-slate-600/30 rounded-2xl py-4 px-2">
                        <div class="text-3xl font-bold text-white tabular-nums" style="font-family: Georgia, serif;">{{
                            unit.value }}</div>
                        <div class="text-slate-400/50 text-xs font-sans mt-1 tracking-widest uppercase">{{ unit.label
                        }}</div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ===== EVENTS ===== -->
        <section class="bg-slate-900 py-20 px-6">
            <div class="max-w-sm mx-auto">
                <div class="text-center mb-12">
                    <p class="text-slate-400/50 text-xs tracking-[0.3em] uppercase font-sans mb-3">Rangkaian Acara</p>
                    <h2 class="text-2xl font-bold text-white" style="font-family: Georgia, serif;">Jadwal Acara</h2>
                </div>

                <div class="space-y-5">
                    <div v-for="event in invitation?.events" :key="event.type"
                        class="bg-slate-800/30 border border-slate-600/30 rounded-2xl p-6 backdrop-blur">
                        <div class="flex items-start gap-4">
                            <!-- Icon -->
                            <div
                                class="flex-shrink-0 w-11 h-11 rounded-xl bg-slate-700/60 border border-slate-500/30 flex items-center justify-center">
                                <svg v-if="event.type === 'ceremony'" class="w-5 h-5 text-slate-300" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                                <svg v-else class="w-5 h-5 text-slate-300" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>

                            <!-- Details -->
                            <div class="flex-1 min-w-0">
                                <h3 class="text-base font-bold text-white mb-1">{{ event.title }}</h3>
                                <p class="text-slate-300/70 text-xs font-sans mb-0.5">{{
                                    formatEventDate(event.start_time) }}</p>
                                <p class="text-slate-400/50 text-xs font-sans mb-3">
                                    {{ formatTime(event.start_time) }} – {{ formatTime(event.end_time) }} WIB
                                </p>
                                <p class="text-white/90 text-sm font-semibold mb-0.5">{{ event.location_name }}</p>
                                <p class="text-slate-400/50 text-xs font-sans leading-relaxed mb-3">{{
                                    event.location_address }}</p>
                                <a :href="event.map_url" target="_blank" rel="noopener noreferrer"
                                    class="inline-flex items-center gap-1.5 text-xs text-sky-400 hover:text-sky-300 font-sans transition-colors">
                                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    Buka di Google Maps
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ===== LIVESTREAM ===== -->
        <section v-if="invitation?.livestream_is_active" class="bg-zinc-950 py-16 px-6">
            <div class="max-w-sm mx-auto text-center">
                <p class="text-slate-400/50 text-xs tracking-[0.3em] uppercase font-sans mb-3">Saksikan Secara Langsung
                </p>
                <h2 class="text-2xl font-bold text-white mb-4" style="font-family: Georgia, serif;">Live Streaming</h2>
                <p class="text-slate-300/60 text-sm font-sans mb-8">
                    Bagi yang tidak dapat hadir, saksikan melalui
                    <span class="text-white capitalize font-medium">{{ invitation.livestream_platform }}</span>
                </p>

                <div class="bg-slate-800/30 border border-slate-600/30 rounded-2xl p-6 mb-6">
                    <div class="flex items-center justify-center gap-3 mb-4">
                        <div v-if="invitation.livestream_platform === 'instagram'"
                            class="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 flex items-center justify-center">
                            <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path
                                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                        </div>
                        <div v-else class="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">
                            <svg class="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                    d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <span class="text-white font-semibold capitalize">{{ invitation.livestream_platform }}</span>
                    </div>
                    <p class="text-slate-300/60 text-sm font-sans">{{
                        formatLivestreamDate(invitation.livestream_event_date) }}</p>
                    <p class="text-slate-300/60 text-sm font-sans mt-0.5">Pukul {{
                        invitation.livestream_start_time?.slice(0, 5) }} WIB</p>
                </div>

                <a :href="invitation.livestream_url" target="_blank" rel="noopener noreferrer"
                    class="inline-flex items-center gap-2 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white px-8 py-3 rounded-full font-sans font-medium text-sm transition-all shadow-lg shadow-slate-900/60">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Tonton Live Streaming
                </a>
            </div>
        </section>

        <!-- ===== GIFTS ===== -->
        <section v-if="invitation?.gifts?.length" class="bg-gradient-to-b from-zinc-950 to-slate-900 py-16 px-6">
            <div class="max-w-sm mx-auto">
                <div class="text-center mb-10">
                    <p class="text-slate-400/50 text-xs tracking-[0.3em] uppercase font-sans mb-3">Hadiah Pernikahan</p>
                    <h2 class="text-2xl font-bold text-white mb-2" style="font-family: Georgia, serif;">Kirim Hadiah
                    </h2>
                    <p class="text-slate-300/50 text-sm font-sans">Doa restu Anda adalah hadiah terbaik. Namun bagi yang
                        ingin mengirimkan hadiah:</p>
                </div>

                <div class="space-y-4">
                    <div v-for="gift in invitation.gifts" :key="gift.account_number"
                        class="bg-slate-800/30 border border-slate-600/30 rounded-2xl p-5">
                        <div class="flex items-center gap-3 mb-3">
                            <div
                                class="w-10 h-10 rounded-xl bg-slate-700/60 border border-slate-500/30 flex items-center justify-center">
                                <svg v-if="gift.type === 'bank'" class="w-5 h-5 text-slate-300" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                </svg>
                                <svg v-else class="w-5 h-5 text-slate-300" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <p class="text-slate-400/50 text-xs font-sans capitalize">{{ gift.type === 'bank' ?
                                    'Rekening Bank' : 'Dompet Digital' }}</p>
                                <p class="text-white font-semibold text-sm">{{ gift.provider }}</p>
                            </div>
                        </div>
                        <div class="bg-zinc-950/60 rounded-xl p-3 flex items-center justify-between gap-3">
                            <div class="min-w-0">
                                <p class="text-slate-400/50 text-xs font-sans mb-0.5 truncate">{{ gift.account_name
                                }}</p>
                                <p class="text-white font-mono font-bold tracking-wider text-sm">{{ gift.account_number
                                }}</p>
                            </div>
                            <button @click="copyToClipboard(gift.account_number)"
                                class="flex-shrink-0 text-xs text-slate-300 hover:text-white font-sans border border-slate-600/50 hover:border-slate-400/50 rounded-lg px-3 py-1.5 transition-colors">
                                Salin
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ===== WISHES / RSVP ===== -->
        <section class="bg-slate-900 py-20 px-6">
            <div class="max-w-sm mx-auto">
                <div class="text-center mb-10">
                    <p class="text-slate-400/50 text-xs tracking-[0.3em] uppercase font-sans mb-3">Ucapan &amp; Doa</p>
                    <h2 class="text-2xl font-bold text-white mb-2" style="font-family: Georgia, serif;">Kirim Ucapan
                    </h2>
                    <p class="text-slate-300/50 text-sm font-sans">Sampaikan doa dan ucapan terbaik untuk kedua
                        mempelai</p>
                </div>

                <!-- Form -->
                <form v-if="guestValidated === true" @submit.prevent="submitWish"
                    class="bg-slate-800/30 border border-slate-600/30 rounded-2xl p-6 mb-8">
                    <div class="space-y-4">
                        <div>
                            <label class="block text-xs text-slate-400/60 font-sans mb-1.5">Nama</label>
                            <input v-model="wishForm.guest_name" type="text" placeholder="Nama Anda" required
                                maxlength="100" :readonly="!!props.guest"
                                class="w-full bg-zinc-950/60 border border-slate-600/40 rounded-xl px-4 py-2.5 text-white placeholder-slate-400/30 font-sans text-sm focus:outline-none focus:border-slate-400/60 transition-colors"
                                :class="{ 'opacity-60 cursor-not-allowed select-none': !!props.guest }" />
                        </div>
                        <div>
                            <label class="block text-xs text-slate-400/60 font-sans mb-1.5">Kehadiran</label>
                            <select v-model="wishForm.attendance" required
                                class="w-full bg-zinc-950/60 border border-slate-600/40 rounded-xl px-4 py-2.5 text-white font-sans text-sm focus:outline-none focus:border-slate-400/60 transition-colors">
                                <option value="" disabled>Pilih kehadiran</option>
                                <option value="hadir">Hadir</option>
                                <option value="tidak_hadir">Tidak Hadir</option>
                                <option value="mungkin">Mungkin Hadir</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-xs text-slate-400/60 font-sans mb-1.5">Ucapan &amp; Doa</label>
                            <textarea v-model="wishForm.message" placeholder="Tuliskan doa dan ucapan Anda..." rows="3"
                                required maxlength="500"
                                class="w-full bg-zinc-950/60 border border-slate-600/40 rounded-xl px-4 py-2.5 text-white placeholder-slate-400/30 font-sans text-sm focus:outline-none focus:border-slate-400/60 transition-colors resize-none"></textarea>
                        </div>
                        <button type="submit" :disabled="submitting"
                            class="w-full bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 disabled:opacity-50 text-white py-3 rounded-xl font-sans font-medium text-sm transition-all">
                            {{ submitting ? 'Mengirim...' : 'Kirim Ucapan' }}
                        </button>
                    </div>
                </form>

                <!-- Wish List -->
                <div v-if="wishes.length" class="space-y-4">
                    <div v-for="wish in paginatedWishes" :key="wish.id"
                        class="bg-slate-800/20 border border-slate-600/20 rounded-2xl p-5">
                        <div class="flex items-start gap-3">
                            <div
                                class="w-8 h-8 rounded-full bg-slate-700/50 border border-slate-500/30 flex items-center justify-center flex-shrink-0">
                                <span class="text-slate-200 text-xs font-bold">{{ wish.guest_name?.[0]?.toUpperCase()
                                }}</span>
                            </div>
                            <div class="flex-1 min-w-0">
                                <div class="flex flex-wrap items-center gap-2 mb-1">
                                    <p class="text-white text-sm font-semibold">{{ wish.guest_name }}</p>
                                    <span class="text-xs px-2 py-0.5 rounded-full font-sans"
                                        :class="attendanceBadgeClass(wish.attendance)">
                                        {{ attendanceLabel(wish.attendance) }}
                                    </span>
                                </div>
                                <p class="text-slate-300/70 text-sm font-sans leading-relaxed">{{ wish.message }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Pagination -->
                <div v-if="wishTotalPages > 1" class="flex items-center justify-center gap-3 mt-6">
                    <button @click="wishPage--" :disabled="wishPage === 1"
                        class="w-8 h-8 rounded-full border border-slate-600/40 text-slate-400/70 disabled:opacity-30 hover:bg-slate-800/40 transition-colors flex items-center justify-center">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <span class="text-slate-400/50 text-xs font-sans">{{ wishPage }} / {{ wishTotalPages }}</span>
                    <button @click="wishPage++" :disabled="wishPage === wishTotalPages"
                        class="w-8 h-8 rounded-full border border-slate-600/40 text-slate-400/70 disabled:opacity-30 hover:bg-slate-800/40 transition-colors flex items-center justify-center">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>

        <!-- ===== FOOTER ===== -->
        <footer class="bg-zinc-950 py-10 px-6 text-center border-t border-slate-700/30">
            <p class="text-slate-400/40 text-xs font-sans mb-1">Dibuat dengan ♥ menggunakan</p>
            <p class="text-slate-400/70 text-sm font-semibold font-sans">Alwan Invite</p>
        </footer>

        <!-- ===== AUDIO FAB ===== -->
        <button v-if="invitation?.audios?.url" @click="toggleAudio"
            class="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-slate-700 hover:bg-slate-600 text-white shadow-xl shadow-slate-900/60 flex items-center justify-center z-50 transition-all active:scale-95"
            :title="isPlaying ? 'Hentikan Musik' : 'Putar Musik'">
            <svg v-if="isPlaying" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
            <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
            </svg>
        </button>

        <!-- ===== COPY TOAST ===== -->
        <Transition name="toast">
            <div v-if="showCopied"
                class="fixed bottom-20 right-6 bg-slate-700 text-white text-xs font-sans px-4 py-2 rounded-full shadow-lg z-50 pointer-events-none">
                Tersalin!
            </div>
        </Transition>

    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    invitation: any
    guest?: string
}>()

const supabase = useSupabaseClient()

// ── Audio ──────────────────────────────────────────────
const audioRef = ref<HTMLAudioElement | null>(null)
const isPlaying = ref(false)

const openInvitation = () => {
    if (audioRef.value && !isPlaying.value) {
        audioRef.value.play().then(() => { isPlaying.value = true }).catch(() => { })
    }
    const next = document.getElementById('theme-slate')?.querySelector('section:nth-child(2)')
    next?.scrollIntoView({ behavior: 'smooth' })
}

const toggleAudio = () => {
    if (!audioRef.value) return
    if (isPlaying.value) {
        audioRef.value.pause()
        isPlaying.value = false
    } else {
        audioRef.value.play()
        isPlaying.value = true
    }
}

onMounted(() => {
    if (props.invitation?.autoplay && audioRef.value) {
        audioRef.value.play().then(() => {
            isPlaying.value = true
        }).catch(() => {
            // autoplay blocked by browser — user can tap the FAB
        })
    }
})

// ── Date helpers ───────────────────────────────────────
const formatDate = (dateStr: string | null | undefined) => {
    if (!dateStr) return ''
    return new Date(dateStr).toLocaleDateString('id-ID', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    })
}

const formatEventDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('id-ID', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    })

const formatTime = (dateStr: string) =>
    new Date(dateStr).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })

const formatLivestreamDate = (dateStr: string | null | undefined) => {
    if (!dateStr) return ''
    return new Date(dateStr).toLocaleDateString('id-ID', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    })
}

// ── Derived values ─────────────────────────────────────
const mainEventDate = computed<string | null>(() => {
    const events = props.invitation?.events
    if (Array.isArray(events) && events.length > 0) return events[0].start_time
    return null
})

// ── Countdown ──────────────────────────────────────────
const countdown = ref([
    { label: 'Hari', value: '00' },
    { label: 'Jam', value: '00' },
    { label: 'Mnt', value: '00' },
    { label: 'Dtk', value: '00' },
])

let countdownTimer: ReturnType<typeof setInterval> | null = null

const updateCountdown = () => {
    const target = mainEventDate.value ? new Date(mainEventDate.value).getTime() : null
    if (!target) return
    const diff = target - Date.now()
    if (diff <= 0) {
        countdown.value = [
            { label: 'Hari', value: '00' },
            { label: 'Jam', value: '00' },
            { label: 'Mnt', value: '00' },
            { label: 'Dtk', value: '00' },
        ]
        return
    }
    countdown.value = [
        { label: 'Hari', value: String(Math.floor(diff / 86400000)).padStart(2, '0') },
        { label: 'Jam', value: String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0') },
        { label: 'Mnt', value: String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0') },
        { label: 'Dtk', value: String(Math.floor((diff % 60000) / 1000)).padStart(2, '0') },
    ]
}

onMounted(() => {
    updateCountdown()
    countdownTimer = setInterval(updateCountdown, 1000)
})

onUnmounted(() => {
    if (countdownTimer) clearInterval(countdownTimer)
})

// ── Copy to clipboard ──────────────────────────────────
const showCopied = ref(false)

const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text)
    showCopied.value = true
    setTimeout(() => { showCopied.value = false }, 2000)
}

// ── Wishes ─────────────────────────────────────────────
const wishes = ref<any[]>([])
const submitting = ref(false)
const guestValidated = ref<boolean | null>(props.guest ? null : false)
const wishForm = reactive({ guest_name: props.guest ?? '', attendance: '', message: '' })
const wishPage = ref(1)
const wishPageSize = 5
const wishTotalPages = computed(() => Math.ceil(wishes.value.length / wishPageSize))
const paginatedWishes = computed(() => {
    const start = (wishPage.value - 1) * wishPageSize
    return wishes.value.slice(start, start + wishPageSize)
})

const fetchWishes = async () => {
    if (!props.invitation?.id) return
    const { data } = await supabase
        .from('wishes')
        .select('*')
        .eq('wedding_id', String(props.invitation.id))
        .not('attendance', 'is', null)
        .order('created_at', { ascending: false })
    if (data) wishes.value = data
}

const checkGuestAccess = async () => {
    if (!props.guest || !props.invitation?.id) {
        guestValidated.value = false
        return
    }
    const { data } = await supabase
        .from('wishes')
        .select('id')
        .eq('wedding_id', String(props.invitation.id))
        .ilike('guest_name', props.guest)
        .is('attendance', null)
        .limit(1)
    guestValidated.value = !!(data && data.length > 0)
    if (guestValidated.value) {
        wishForm.guest_name = props.guest
    }
}

const submitWish = async () => {
    if (!props.invitation?.id) return
    submitting.value = true
    const { error } = await supabase.from('wishes').insert({
        wedding_id: String(props.invitation.id),
        guest_name: wishForm.guest_name,
        attendance: wishForm.attendance,
        message: wishForm.message,
        guest_count: 1,
    })
    submitting.value = false
    if (!error) {
        wishForm.guest_name = ''
        wishForm.attendance = ''
        wishForm.message = ''
        wishPage.value = 1
        await fetchWishes()
    }
}

onMounted(() => {
    fetchWishes()
    checkGuestAccess()
})

const attendanceLabel = (val: string) =>
    ({ hadir: 'Hadir', tidak_hadir: 'Tidak Hadir', mungkin: 'Mungkin' } as Record<string, string>)[val] ?? val

const attendanceBadgeClass = (val: string) =>
    ({
        hadir: 'bg-emerald-500/20 text-emerald-300',
        tidak_hadir: 'bg-red-500/20 text-red-300',
        mungkin: 'bg-amber-500/20 text-amber-300',
    } as Record<string, string>)[val] ?? 'bg-slate-500/20 text-slate-300'
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
    opacity: 0;
    transform: translateY(8px);
}
</style>
