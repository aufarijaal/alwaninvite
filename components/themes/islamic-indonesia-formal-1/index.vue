<template>
  <div
    id="theme-islamic-indonesia-formal-1"
    class="min-h-screen text-stone-800"
    style="background-color: #fdf6ec"
  >
    <!-- Hidden Audio Element -->
    <audio
      v-if="invitation?.audios?.url"
      ref="audioRef"
      :src="invitation.audios.url"
      :loop="invitation.loop"
      preload="none"
    />

    <!-- ===== HERO / COVER ===== -->
    <section
      class="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 py-20 text-center"
      style="background: linear-gradient(160deg, #f5ede0 0%, #fdf6ec 45%, #eef5ed 100%)"
    >
      <!-- Corner ornaments -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden">
        <!-- top-left vine -->
        <svg class="absolute top-0 left-0 w-40 h-40 opacity-20" viewBox="0 0 160 160" fill="none">
          <path d="M0 0 Q40 20 20 60 Q0 100 40 120 Q80 140 60 160" stroke="#1e4a32" stroke-width="2" fill="none"/>
          <circle cx="20" cy="60" r="5" fill="#b8960c" opacity="0.6"/>
          <circle cx="40" cy="120" r="4" fill="#b8960c" opacity="0.5"/>
          <path d="M20 60 Q35 50 30 35" stroke="#1e4a32" stroke-width="1.5" fill="none"/>
          <path d="M40 120 Q55 110 50 95" stroke="#1e4a32" stroke-width="1.5" fill="none"/>
        </svg>
        <!-- top-right vine -->
        <svg class="absolute top-0 right-0 w-40 h-40 opacity-20 scale-x-[-1]" viewBox="0 0 160 160" fill="none">
          <path d="M0 0 Q40 20 20 60 Q0 100 40 120 Q80 140 60 160" stroke="#1e4a32" stroke-width="2" fill="none"/>
          <circle cx="20" cy="60" r="5" fill="#b8960c" opacity="0.6"/>
          <circle cx="40" cy="120" r="4" fill="#b8960c" opacity="0.5"/>
          <path d="M20 60 Q35 50 30 35" stroke="#1e4a32" stroke-width="1.5" fill="none"/>
          <path d="M40 120 Q55 110 50 95" stroke="#1e4a32" stroke-width="1.5" fill="none"/>
        </svg>
        <!-- bottom-left vine -->
        <svg class="absolute bottom-0 left-0 w-40 h-40 opacity-20 scale-y-[-1]" viewBox="0 0 160 160" fill="none">
          <path d="M0 0 Q40 20 20 60 Q0 100 40 120 Q80 140 60 160" stroke="#1e4a32" stroke-width="2" fill="none"/>
          <circle cx="20" cy="60" r="5" fill="#b8960c" opacity="0.6"/>
          <circle cx="40" cy="120" r="4" fill="#b8960c" opacity="0.5"/>
        </svg>
        <!-- bottom-right vine -->
        <svg class="absolute bottom-0 right-0 w-40 h-40 opacity-20 scale-x-[-1] scale-y-[-1]" viewBox="0 0 160 160" fill="none">
          <path d="M0 0 Q40 20 20 60 Q0 100 40 120 Q80 140 60 160" stroke="#1e4a32" stroke-width="2" fill="none"/>
          <circle cx="20" cy="60" r="5" fill="#b8960c" opacity="0.6"/>
          <circle cx="40" cy="120" r="4" fill="#b8960c" opacity="0.5"/>
        </svg>
      </div>

      <div class="relative z-10 max-w-sm mx-auto w-full">
        <!-- Islamic ornament top -->
        <div
          v-motion
          :initial="{ opacity: 0, y: -20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.1 } }"
          class="flex items-center justify-center gap-3 mb-5"
        >
          <div class="h-px w-10" style="background: linear-gradient(to right, transparent, #b8960c)"></div>
          <!-- 8-pointed Islamic star -->
          <svg class="w-6 h-6" viewBox="0 0 24 24" fill="#b8960c" opacity="0.8">
            <path d="M12 2l1.5 3.5L17 4l-1.5 3.5L19 9l-3.5 1.5L17 14l-3.5-1.5L12 16l-1.5-3.5L7 14l1.5-3.5L5 9l3.5-1.5L7 4l3.5 1.5z"/>
          </svg>
          <div class="h-px w-10" style="background: linear-gradient(to left, transparent, #b8960c)"></div>
        </div>

        <!-- Bismillah -->
        <div
          v-motion
          :initial="{ opacity: 0 }"
          :enter="{ opacity: 1, transition: { duration: 0.9, delay: 0.2 } }"
          class="mb-1"
        >
          <SvgBismillahWord class="mx-auto w-36" style="color: #1e4a32" />
        </div>
        <p
          v-motion
          :initial="{ opacity: 0 }"
          :enter="{ opacity: 1, transition: { duration: 0.7, delay: 0.35 } }"
          class="text-xs tracking-[0.3em] uppercase font-sans mb-8"
          style="color: #1e4a32; opacity: 0.6"
        >
          Undangan Pernikahan
        </p>

        <!-- Names -->
        <div
          v-motion
          :initial="{ opacity: 0, scale: 0.88 }"
          :enter="{ opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 80, damping: 14, delay: 0.45 } }"
          class="space-y-1 mb-4"
        >
          <h1 class="text-5xl font-bold tracking-tight" style="font-family: Georgia, 'Times New Roman', serif; color: #1e4a32">
            {{ invitation?.groom_callname }}
          </h1>
          <!-- gold ampersand -->
          <p class="text-3xl font-light" style="color: #b8960c; font-family: Georgia, serif">&amp;</p>
          <h1 class="text-5xl font-bold tracking-tight" style="font-family: Georgia, 'Times New Roman', serif; color: #1e4a32">
            {{ invitation?.bride_callname }}
          </h1>
        </div>

        <!-- Thin horizontal rule with diamond -->
        <div class="flex items-center justify-center gap-2 mb-5">
          <div class="h-px flex-1" style="background: #b8960c; opacity: 0.35"></div>
          <div class="w-2 h-2 rotate-45" style="background: #b8960c; opacity: 0.6"></div>
          <div class="h-px flex-1" style="background: #b8960c; opacity: 0.35"></div>
        </div>

        <!-- Date pill -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 15 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.6 } }"
          class="inline-flex items-center gap-3 rounded-full px-5 py-2 shadow-sm"
          style="background: rgba(255,255,255,0.75); border: 1px solid rgba(184,150,12,0.3); backdrop-filter: blur(6px)"
        >
          <div class="w-1.5 h-1.5 rounded-full" style="background: #b8960c"></div>
          <p class="text-xs font-sans tracking-widest" style="color: #2d2d2d">
            {{ formatDate(mainEventDate) }}
          </p>
          <div class="w-1.5 h-1.5 rounded-full" style="background: #b8960c"></div>
        </div>

        <!-- Guest greeting + open button -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 25 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.75 } }"
          class="mt-14 flex flex-col items-center gap-3"
        >
          <div v-if="props.guest" class="text-center mb-1">
            <p class="text-xs font-sans tracking-widest uppercase mb-1" style="color: #1e4a32; opacity: 0.55">
              Kepada Yth.
            </p>
            <p class="font-semibold font-sans text-base" style="color: #1e4a32">
              {{ props.guest }}
            </p>
          </div>
          <button
            @click="openInvitation"
            class="inline-flex items-center gap-2 font-semibold font-sans text-sm px-7 py-3 rounded-full shadow-lg transition-all active:scale-95 text-white"
            style="background: linear-gradient(135deg, #1e4a32 0%, #2d6b47 100%); box-shadow: 0 4px 14px rgba(30,74,50,0.35)"
          >
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
    <section data-aos="fade-up" class="py-20 px-6" style="background-color: #fff9f3">
      <div class="max-w-sm mx-auto text-center">
        <!-- Section header -->
        <div class="flex items-center justify-center gap-3 mb-3">
          <div class="h-px w-8" style="background: #b8960c; opacity: 0.4"></div>
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="#b8960c" opacity="0.7">
            <path d="M12 2l1.5 3.5L17 4l-1.5 3.5L19 9l-3.5 1.5L17 14l-3.5-1.5L12 16l-1.5-3.5L7 14l1.5-3.5L5 9l3.5-1.5L7 4l3.5 1.5z"/>
          </svg>
          <div class="h-px w-8" style="background: #b8960c; opacity: 0.4"></div>
        </div>
        <p class="text-xs tracking-[0.3em] uppercase font-sans mb-10" style="color: #1e4a32; opacity: 0.6">
          Yang Berbahagia
        </p>

        <!-- Groom -->
        <div data-aos="fade-right" data-aos-delay="100" class="mb-10">
          <div
            class="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center shadow-md"
            style="background: linear-gradient(135deg, #d4edda 0%, #b8e0c3 100%); border: 2px solid rgba(30,74,50,0.2)"
          >
            <svg class="w-8 h-8" fill="none" stroke="#1e4a32" viewBox="0 0 24 24" opacity="0.6">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <p class="text-xs font-sans tracking-widest uppercase mb-2" style="color: #1e4a32; opacity: 0.55">
            Mempelai Pria
          </p>
          <h2 class="text-xl font-bold mb-1" style="font-family: Georgia, serif; color: #1e4a32">
            {{ invitation?.groom_fullname }}
          </h2>
          <p class="text-sm font-sans" style="color: #4a4a4a">{{ invitation?.groom_info_1 }}</p>
          <p class="text-xs font-sans mt-0.5" style="color: #7a7a7a">{{ invitation?.groom_info_2 }}</p>
          <p v-if="invitation?.groom_info_3" class="text-xs font-sans mt-1" style="color: #b8960c">
            {{ invitation?.groom_info_3 }}
          </p>
        </div>

        <!-- Divider -->
        <div class="flex items-center gap-3 mb-10">
          <div class="h-px flex-1" style="background: linear-gradient(to right, transparent, #b8960c); opacity: 0.4"></div>
          <span class="text-xl" style="color: #b8960c">♥</span>
          <div class="h-px flex-1" style="background: linear-gradient(to left, transparent, #b8960c); opacity: 0.4"></div>
        </div>

        <!-- Bride -->
        <div data-aos="fade-left" data-aos-delay="200">
          <div
            class="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center shadow-md"
            style="background: linear-gradient(135deg, #fde8d8 0%, #f8cdb0 100%); border: 2px solid rgba(184,150,12,0.25)"
          >
            <svg class="w-8 h-8" fill="none" stroke="#b8960c" viewBox="0 0 24 24" opacity="0.7">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <p class="text-xs font-sans tracking-widest uppercase mb-2" style="color: #1e4a32; opacity: 0.55">
            Mempelai Wanita
          </p>
          <h2 class="text-xl font-bold mb-1" style="font-family: Georgia, serif; color: #1e4a32">
            {{ invitation?.bride_fullname }}
          </h2>
          <p class="text-sm font-sans" style="color: #4a4a4a">{{ invitation?.bride_info_1 }}</p>
          <p class="text-xs font-sans mt-0.5" style="color: #7a7a7a">{{ invitation?.bride_info_2 }}</p>
          <p v-if="invitation?.bride_info_3" class="text-xs font-sans mt-1" style="color: #b8960c">
            {{ invitation?.bride_info_3 }}
          </p>
        </div>
      </div>
    </section>

    <!-- ===== QURANIC VERSE ===== -->
    <section
      data-aos="fade-up"
      class="py-14 px-8 text-center relative overflow-hidden"
      style="background: linear-gradient(160deg, #1e4a32 0%, #163826 100%)"
    >
      <!-- Geometric Islamic background pattern -->
      <div class="absolute inset-0 pointer-events-none opacity-5">
        <svg width="100%" height="100%" viewBox="0 0 200 200">
          <defs>
            <pattern id="islamic-geo" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <polygon points="20,2 38,11 38,29 20,38 2,29 2,11" fill="none" stroke="#b8960c" stroke-width="0.8"/>
              <polygon points="20,8 32,14 32,26 20,32 8,26 8,14" fill="none" stroke="#b8960c" stroke-width="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#islamic-geo)"/>
        </svg>
      </div>
      <div class="relative z-10 max-w-sm mx-auto">
        <p class="text-xs tracking-[0.3em] uppercase font-sans mb-5 opacity-50 text-amber-200">
          Firman Allah SWT
        </p>
        <p
          class="text-lg leading-loose mb-4 text-amber-100 font-serif"
          style="font-family: 'Times New Roman', serif; direction: rtl; unicode-bidi: bidi-override; font-size: 1.1rem"
        >
          وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا
        </p>
        <p class="text-sm font-sans italic opacity-70 text-amber-200 leading-relaxed">
          "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu merasa tenteram kepadanya."
        </p>
        <p class="text-xs font-sans mt-3 opacity-50 text-amber-200">
          Q.S. Ar-Rum: 21
        </p>
      </div>
    </section>

    <!-- ===== COUNTDOWN ===== -->
    <section
      data-aos="fade-up"
      class="py-16 px-6 relative overflow-hidden"
      style="background-color: #fdf6ec"
    >
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute -top-16 -right-16 w-56 h-56 rounded-full blur-3xl" style="background: rgba(184,150,12,0.08)"></div>
        <div class="absolute -bottom-16 -left-16 w-56 h-56 rounded-full blur-3xl" style="background: rgba(30,74,50,0.06)"></div>
      </div>
      <div class="relative z-10 max-w-sm mx-auto text-center">
        <p class="text-xs tracking-[0.3em] uppercase font-sans mb-8" style="color: #1e4a32; opacity: 0.6">
          Menuju Hari Bahagia
        </p>
        <div class="grid grid-cols-4 gap-3">
          <div
            v-for="unit in countdown"
            :key="unit.label"
            class="rounded-2xl py-4 px-2 shadow-sm"
            style="background: rgba(255,255,255,0.85); border: 1px solid rgba(184,150,12,0.2)"
          >
            <div
              class="text-3xl font-bold tabular-nums"
              style="font-family: Georgia, serif; color: #1e4a32"
            >
              {{ unit.value }}
            </div>
            <div class="text-xs font-sans mt-1 tracking-widest uppercase" style="color: #7a7a7a">
              {{ unit.label }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== EVENTS ===== -->
    <section data-aos="fade-up" class="py-20 px-6" style="background-color: #fff9f3">
      <div class="max-w-sm mx-auto">
        <div class="text-center mb-12">
          <div class="flex items-center justify-center gap-3 mb-3">
            <div class="h-px w-8" style="background: #b8960c; opacity: 0.4"></div>
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="#b8960c" opacity="0.7">
              <path d="M12 2l1.5 3.5L17 4l-1.5 3.5L19 9l-3.5 1.5L17 14l-3.5-1.5L12 16l-1.5-3.5L7 14l1.5-3.5L5 9l3.5-1.5L7 4l3.5 1.5z"/>
            </svg>
            <div class="h-px w-8" style="background: #b8960c; opacity: 0.4"></div>
          </div>
          <p class="text-xs tracking-[0.3em] uppercase font-sans mb-3" style="color: #1e4a32; opacity: 0.6">
            Rangkaian Acara
          </p>
          <h2 class="text-2xl font-bold" style="font-family: Georgia, serif; color: #1e4a32">
            Jadwal Acara
          </h2>
        </div>

        <div class="space-y-5">
          <div
            v-for="event in invitation?.events"
            :key="event.type"
            data-aos="fade-up"
            data-aos-delay="100"
            class="rounded-3xl p-6 shadow-sm"
            style="background: #fff; border: 1px solid rgba(184,150,12,0.2)"
          >
            <div class="flex items-start gap-4">
              <!-- Event icon -->
              <div
                class="flex-shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center shadow-sm"
                style="background: linear-gradient(135deg, #d4edda, #b8e0c3); border: 1px solid rgba(30,74,50,0.15)"
              >
                <!-- Akad / ceremony -->
                <svg
                  v-if="event.type === 'ceremony'"
                  class="w-5 h-5"
                  fill="none"
                  stroke="#1e4a32"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                </svg>
                <!-- Reception -->
                <svg
                  v-else
                  class="w-5 h-5"
                  fill="none"
                  stroke="#1e4a32"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <!-- Details -->
              <div class="flex-1 min-w-0">
                <h3 class="text-lg font-bold mb-1" style="color: #1e4a32; font-family: Georgia, serif">
                  {{ event.title }}
                </h3>
                <p class="text-sm font-medium font-sans mb-0.5" style="color: #b8960c">
                  {{ formatEventDate(event.start_time) }}
                </p>
                <p class="text-sm font-medium font-sans mb-3" style="color: rgba(184,150,12,0.8)">
                  {{ formatTime(event.start_time) }}{{ event.type !== 'ceremony' ? ` – ${event.end_time ? formatTime(event.end_time) : 'Selesai'}` : '' }} WIB
                </p>
                <p class="text-base font-semibold mb-0.5" style="color: #2d2d2d">
                  {{ event.location_name }}
                </p>
                <p class="text-sm font-sans leading-relaxed mb-3" style="color: #7a7a7a">
                  {{ event.location_address }}
                </p>
                <a
                  :href="event.map_url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-1.5 text-xs font-sans transition-colors"
                  style="color: #1e4a32"
                >
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
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
    <section
      v-if="invitation?.livestream_is_active"
      data-aos="fade-up"
      class="py-16 px-6"
      style="background-color: #fdf6ec"
    >
      <div class="max-w-sm mx-auto text-center">
        <p class="text-xs tracking-[0.3em] uppercase font-sans mb-3" style="color: #1e4a32; opacity: 0.6">
          Saksikan Secara Langsung
        </p>
        <h2 class="text-2xl font-bold mb-4" style="font-family: Georgia, serif; color: #1e4a32">
          Live Streaming
        </h2>
        <p class="text-sm font-sans mb-8" style="color: #7a7a7a">
          Bagi yang tidak dapat hadir, saksikan melalui
          <span class="font-medium capitalize" style="color: #2d2d2d">{{ invitation.livestream_platform }}</span>
        </p>

        <div class="rounded-3xl p-6 mb-6 shadow-sm" style="background: #fff; border: 1px solid rgba(184,150,12,0.2)">
          <div class="flex items-center justify-center gap-3 mb-4">
            <div
              class="w-10 h-10 rounded-full flex items-center justify-center"
              style="background: linear-gradient(135deg, #1e4a32, #2d6b47)"
            >
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                  d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
              </svg>
            </div>
            <span class="font-semibold capitalize" style="color: #2d2d2d">{{ invitation.livestream_platform }}</span>
          </div>
          <p class="text-sm font-sans" style="color: #7a7a7a">
            {{ formatLivestreamDate(invitation.livestream_event_date) }}
          </p>
          <p class="text-sm font-sans mt-0.5" style="color: #7a7a7a">
            Pukul {{ invitation.livestream_start_time?.slice(0, 5) }} WIB
          </p>
        </div>

        <a
          :href="invitation.livestream_url"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-8 py-3 rounded-full font-sans font-medium text-sm transition-all shadow-md text-white"
          style="background: linear-gradient(135deg, #1e4a32 0%, #2d6b47 100%); box-shadow: 0 4px 14px rgba(30,74,50,0.3)"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
          </svg>
          Tonton Live Streaming
        </a>
      </div>
    </section>

    <!-- ===== GIFTS ===== -->
    <section
      v-if="invitation?.gifts?.length"
      data-aos="fade-up"
      class="py-16 px-6"
      style="background-color: #fff9f3"
    >
      <div class="max-w-sm mx-auto">
        <div class="text-center mb-10">
          <div class="flex items-center justify-center gap-3 mb-3">
            <div class="h-px w-8" style="background: #b8960c; opacity: 0.4"></div>
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="#b8960c" opacity="0.7">
              <path d="M12 2l1.5 3.5L17 4l-1.5 3.5L19 9l-3.5 1.5L17 14l-3.5-1.5L12 16l-1.5-3.5L7 14l1.5-3.5L5 9l3.5-1.5L7 4l3.5 1.5z"/>
            </svg>
            <div class="h-px w-8" style="background: #b8960c; opacity: 0.4"></div>
          </div>
          <p class="text-xs tracking-[0.3em] uppercase font-sans mb-3" style="color: #1e4a32; opacity: 0.6">
            Hadiah Pernikahan
          </p>
          <h2 class="text-2xl font-bold mb-2" style="font-family: Georgia, serif; color: #1e4a32">
            Kirim Hadiah
          </h2>
          <p class="text-sm font-sans" style="color: #7a7a7a">
            Doa restu Anda adalah hadiah terbaik. Namun bagi yang ingin mengirimkan hadiah:
          </p>
        </div>

        <div class="space-y-4">
          <div
            v-for="gift in invitation.gifts"
            :key="gift.account_number"
            data-aos="zoom-in"
            data-aos-delay="100"
            class="rounded-3xl p-5 shadow-sm"
            style="background: #fff; border: 1px solid rgba(184,150,12,0.2)"
          >
            <div class="flex items-center gap-3 mb-3">
              <div
                class="w-10 h-10 rounded-2xl flex items-center justify-center"
                style="background: linear-gradient(135deg, #d4edda, #b8e0c3); border: 1px solid rgba(30,74,50,0.15)"
              >
                <svg
                  v-if="gift.type === 'bank'"
                  class="w-5 h-5"
                  fill="none"
                  stroke="#1e4a32"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
                </svg>
                <svg
                  v-else
                  class="w-5 h-5"
                  fill="none"
                  stroke="#1e4a32"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                </svg>
              </div>
              <div>
                <p class="text-xs font-sans capitalize" style="color: #1e4a32; opacity: 0.6">
                  {{ gift.type === 'bank' ? 'Rekening Bank' : 'Dompet Digital' }}
                </p>
                <p class="font-semibold text-sm" style="color: #2d2d2d">{{ gift.provider }}</p>
              </div>
            </div>
            <div
              class="rounded-2xl p-3 flex items-center justify-between gap-3"
              style="background: linear-gradient(135deg, #fdf6ec, #fff9f3); border: 1px solid rgba(184,150,12,0.2)"
            >
              <div class="min-w-0">
                <p class="text-xs font-sans mb-0.5 truncate" style="color: #7a7a7a">
                  {{ gift.account_name }}
                </p>
                <p class="font-mono font-bold tracking-wider text-sm" style="color: #2d2d2d">
                  {{ gift.account_number }}
                </p>
              </div>
              <button
                @click="copyToClipboard(gift.account_number)"
                class="flex-shrink-0 text-xs font-sans rounded-lg px-3 py-1.5 transition-all"
                style="color: #1e4a32; border: 1px solid rgba(30,74,50,0.25)"
              >
                Salin
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== WISHES / RSVP ===== -->
    <section data-aos="fade-up" class="py-20 px-6" style="background-color: #fdf6ec">
      <div class="max-w-sm mx-auto">
        <div class="text-center" :class="guestValidated === true ? 'mb-10' : 'mb-6'">
          <div class="flex items-center justify-center gap-3 mb-3">
            <div class="h-px w-8" style="background: #b8960c; opacity: 0.4"></div>
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="#b8960c" opacity="0.7">
              <path d="M12 2l1.5 3.5L17 4l-1.5 3.5L19 9l-3.5 1.5L17 14l-3.5-1.5L12 16l-1.5-3.5L7 14l1.5-3.5L5 9l3.5-1.5L7 4l3.5 1.5z"/>
            </svg>
            <div class="h-px w-8" style="background: #b8960c; opacity: 0.4"></div>
          </div>
          <p class="text-xs tracking-[0.3em] uppercase font-sans" style="color: #1e4a32; opacity: 0.6"
            :class="guestValidated === true ? 'mb-3' : ''"
          >
            Ucapan &amp; Doa
          </p>
          <template v-if="guestValidated === true">
            <h2 class="text-2xl font-bold mb-2" style="font-family: Georgia, serif; color: #1e4a32">
              Kirim Ucapan
            </h2>
            <p class="text-sm font-sans" style="color: #7a7a7a">
              Sampaikan doa dan ucapan terbaik untuk kedua mempelai
            </p>
          </template>
        </div>

        <!-- Form -->
        <form
          v-if="guestValidated === true"
          @submit.prevent="submitWish"
          class="rounded-3xl p-6 mb-8 shadow-sm"
          style="background: #fff; border: 1px solid rgba(184,150,12,0.2)"
        >
          <div class="space-y-4">
            <div>
              <label class="block text-xs font-sans mb-1.5" style="color: #7a7a7a">Nama</label>
              <input
                v-model="wishForm.guest_name"
                type="text"
                placeholder="Nama Anda"
                required
                maxlength="100"
                :readonly="!!props.guest"
                class="w-full rounded-xl px-4 py-2.5 text-sm font-sans focus:outline-none transition-colors"
                style="background: #fdf6ec; border: 1px solid rgba(184,150,12,0.25); color: #2d2d2d"
                :class="{ 'opacity-60 cursor-not-allowed select-none': !!props.guest }"
              />
            </div>
            <div>
              <label class="block text-xs font-sans mb-1.5" style="color: #7a7a7a">Kehadiran</label>
              <select
                v-model="wishForm.attendance"
                required
                class="w-full rounded-xl px-4 py-2.5 text-sm font-sans focus:outline-none transition-colors"
                style="background: #fdf6ec; border: 1px solid rgba(184,150,12,0.25); color: #2d2d2d"
              >
                <option value="" disabled>Pilih kehadiran</option>
                <option value="hadir">Hadir</option>
                <option value="tidak_hadir">Tidak Hadir</option>
                <option value="mungkin">Mungkin Hadir</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-sans mb-1.5" style="color: #7a7a7a">Ucapan &amp; Doa</label>
              <textarea
                v-model="wishForm.message"
                placeholder="Tuliskan doa dan ucapan Anda..."
                rows="3"
                required
                maxlength="500"
                class="w-full rounded-xl px-4 py-2.5 text-sm font-sans focus:outline-none transition-colors resize-none"
                style="background: #fdf6ec; border: 1px solid rgba(184,150,12,0.25); color: #2d2d2d"
              ></textarea>
            </div>
            <button
              type="submit"
              :disabled="submitting"
              class="w-full py-3 rounded-xl font-sans font-medium text-sm transition-all shadow-md text-white disabled:opacity-50"
              style="background: linear-gradient(135deg, #1e4a32 0%, #2d6b47 100%)"
            >
              {{ submitting ? 'Mengirim...' : 'Kirim Ucapan' }}
            </button>
          </div>
        </form>

        <!-- Auto-reply -->
        <div
          v-if="wishAutoReply"
          class="rounded-xl p-4 mb-6 text-center shadow-sm"
          style="background: #eef5ed; border: 1px solid rgba(30,74,50,0.2)"
        >
          <p class="text-sm font-sans leading-relaxed" style="color: #1e4a32">
            {{ wishAutoReply }}
          </p>
        </div>

        <!-- Wish list -->
        <div
          v-if="wishes.length"
          class="rounded-2xl overflow-hidden shadow-sm"
          style="background: #fff; border: 1px solid rgba(184,150,12,0.15)"
        >
          <div
            v-for="(wish, index) in paginatedWishes"
            :key="wish.id"
            class="px-5 py-4"
            :class="index < paginatedWishes.length - 1 ? 'border-b' : ''"
            :style="index < paginatedWishes.length - 1 ? 'border-color: rgba(184,150,12,0.15)' : ''"
          >
            <div class="flex flex-wrap items-center gap-2 mb-1">
              <p class="text-sm font-semibold" style="color: #2d2d2d">{{ wish.guest_name }}</p>
              <span
                class="text-xs px-2 py-0.5 rounded-full font-sans"
                :class="attendanceBadgeClass(wish.attendance)"
              >
                {{ attendanceLabel(wish.attendance) }}
              </span>
            </div>
            <p class="text-sm font-sans leading-relaxed" style="color: #7a7a7a">{{ wish.message }}</p>
          </div>
        </div>

        <!-- Empty state -->
        <div v-else class="text-center py-10">
          <p class="text-sm font-sans" style="color: #b0b0b0">
            Belum ada ucapan. Jadilah yang pertama memberikan doa dan ucapan! 🤍
          </p>
        </div>

        <!-- Pagination -->
        <div v-if="wishTotalPages > 1" class="flex items-center justify-center gap-3 mt-6">
          <button
            @click="wishPage--"
            :disabled="wishPage === 1"
            class="w-8 h-8 rounded-full flex items-center justify-center transition-colors disabled:opacity-30"
            style="border: 1px solid rgba(184,150,12,0.3); color: #b8960c"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
          <span class="text-xs font-sans" style="color: #7a7a7a">{{ wishPage }} / {{ wishTotalPages }}</span>
          <button
            @click="wishPage++"
            :disabled="wishPage === wishTotalPages"
            class="w-8 h-8 rounded-full flex items-center justify-center transition-colors disabled:opacity-30"
            style="border: 1px solid rgba(184,150,12,0.3); color: #b8960c"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </section>

    <!-- ===== FOOTER ===== -->
    <footer
      data-aos="fade-up"
      class="py-10 px-6 text-center"
      style="background: linear-gradient(160deg, #1e4a32 0%, #163826 100%); border-top: 1px solid rgba(184,150,12,0.25)"
    >
      <div class="flex items-center justify-center gap-3 mb-4">
        <div class="h-px w-8" style="background: rgba(184,150,12,0.5)"></div>
        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="#b8960c" opacity="0.7">
          <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/>
        </svg>
        <div class="h-px w-8" style="background: rgba(184,150,12,0.5)"></div>
      </div>
      <p class="text-xs font-sans mb-1 opacity-50 text-amber-100">Dibuat dengan ♥ menggunakan</p>
      <p class="text-sm font-semibold font-sans text-amber-300">Alwan Invite</p>
    </footer>

    <!-- ===== AUDIO FAB ===== -->
    <button
      v-if="invitation?.audios?.url"
      @click="toggleAudio"
      class="fixed bottom-6 right-6 w-12 h-12 rounded-full text-white shadow-xl flex items-center justify-center z-50 transition-all active:scale-95"
      style="background: linear-gradient(135deg, #1e4a32 0%, #2d6b47 100%); box-shadow: 0 4px 14px rgba(30,74,50,0.4)"
      :title="isPlaying ? 'Hentikan Musik' : 'Putar Musik'"
    >
      <svg v-if="isPlaying" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
      </svg>
      <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M8 5v14l11-7z"/>
      </svg>
    </button>

    <!-- ===== COPY TOAST ===== -->
    <Transition name="toast">
      <div
        v-if="showCopied"
        class="fixed bottom-20 right-6 text-white text-xs font-sans px-4 py-2 rounded-full shadow-lg z-50 pointer-events-none"
        style="background: linear-gradient(135deg, #1e4a32 0%, #2d6b47 100%)"
      >
        Tersalin!
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  invitation: any;
  guest?: string;
}>();

const supabase = useSupabaseClient();

// ── Audio ──────────────────────────────────────────────
const audioRef = ref<HTMLAudioElement | null>(null);
const isPlaying = ref(false);

const openInvitation = () => {
  if (audioRef.value && !isPlaying.value) {
    audioRef.value
      .play()
      .then(() => { isPlaying.value = true; })
      .catch(() => {});
  }
  const next = document
    .getElementById('theme-islamic-indonesia-formal-1')
    ?.querySelector('section:nth-child(2)');
  next?.scrollIntoView({ behavior: 'smooth' });
};

const toggleAudio = () => {
  if (!audioRef.value) return;
  if (isPlaying.value) {
    audioRef.value.pause();
    isPlaying.value = false;
  } else {
    audioRef.value.play();
    isPlaying.value = true;
  }
};

onMounted(() => {
  if (props.invitation?.autoplay && audioRef.value) {
    audioRef.value
      .play()
      .then(() => { isPlaying.value = true; })
      .catch(() => {});
  }
});

// ── Date helpers ───────────────────────────────────────
const sundayAsAhad = computed(
  () => !!(props.invitation?.user_config as any)?.sunday_as_ahad,
);
const applyAhad = (str: string) =>
  sundayAsAhad.value ? str.replace(/\bMinggu\b/g, 'Ahad') : str;

const formatDate = (dateStr: string | null | undefined) => {
  if (!dateStr) return '';
  return applyAhad(
    new Date(dateStr).toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
  );
};

const formatEventDate = (dateStr: string) =>
  applyAhad(
    new Date(dateStr).toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
  );

const formatTime = (dateStr: string) =>
  new Date(dateStr).toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
  });

const formatLivestreamDate = (dateStr: string | null | undefined) => {
  if (!dateStr) return '';
  return applyAhad(
    new Date(dateStr).toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
  );
};

// ── Derived values ─────────────────────────────────────
const mainEventDate = computed<string | null>(() => {
  const events = props.invitation?.events;
  if (Array.isArray(events) && events.length > 0) return events[0].start_time;
  return null;
});

// ── Countdown ──────────────────────────────────────────
const countdown = ref([
  { label: 'Hari', value: '00' },
  { label: 'Jam', value: '00' },
  { label: 'Mnt', value: '00' },
  { label: 'Dtk', value: '00' },
]);

let countdownTimer: ReturnType<typeof setInterval> | null = null;

const updateCountdown = () => {
  const target = mainEventDate.value
    ? new Date(mainEventDate.value).getTime()
    : null;
  if (!target) return;
  const diff = target - Date.now();
  if (diff <= 0) {
    countdown.value = [
      { label: 'Hari', value: '00' },
      { label: 'Jam', value: '00' },
      { label: 'Mnt', value: '00' },
      { label: 'Dtk', value: '00' },
    ];
    return;
  }
  countdown.value = [
    { label: 'Hari', value: String(Math.floor(diff / 86400000)).padStart(2, '0') },
    { label: 'Jam', value: String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0') },
    { label: 'Mnt', value: String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0') },
    { label: 'Dtk', value: String(Math.floor((diff % 60000) / 1000)).padStart(2, '0') },
  ];
};

onMounted(() => {
  updateCountdown();
  countdownTimer = setInterval(updateCountdown, 1000);
});

onUnmounted(() => {
  if (countdownTimer) clearInterval(countdownTimer);
});

// ── Copy to clipboard ──────────────────────────────────
const showCopied = ref(false);

const copyToClipboard = async (text: string) => {
  await navigator.clipboard.writeText(text);
  showCopied.value = true;
  setTimeout(() => { showCopied.value = false; }, 2000);
};

// ── Wishes ─────────────────────────────────────────────
const wishes = ref<any[]>([]);
const submitting = ref(false);
const wishAutoReply = ref('');
const guestValidated = ref<boolean | null>(props.guest ? null : false);
const wishForm = reactive({
  guest_name: props.guest ?? '',
  attendance: '',
  message: '',
});
const wishPage = ref(1);
const wishPageSize = 5;
const wishTotalPages = computed(() =>
  Math.ceil(wishes.value.length / wishPageSize),
);
const paginatedWishes = computed(() => {
  const start = (wishPage.value - 1) * wishPageSize;
  return wishes.value.slice(start, start + wishPageSize);
});

const fetchWishes = async () => {
  if (!props.invitation?.id) return;
  const { data } = await supabase
    .from('wishes')
    .select('*')
    .eq('wedding_id', String(props.invitation.id))
    .not('attendance', 'is', null)
    .order('created_at', { ascending: false });
  if (data) wishes.value = data;
};

const checkGuestAccess = async () => {
  if (!props.guest || !props.invitation?.id) {
    guestValidated.value = false;
    return;
  }
  const { data } = await supabase
    .from('wishes')
    .select('id')
    .eq('wedding_id', String(props.invitation.id))
    .ilike('guest_name', props.guest)
    .is('attendance', null)
    .limit(1);
  guestValidated.value = !!(data && data.length > 0);
  if (guestValidated.value) {
    wishForm.guest_name = props.guest;
  }
};

const fireConfetti = async () => {
  if (!import.meta.client) return;
  const { confetti } = await import('@tsparticles/confetti');
  const emoji1 = (props.invitation?.user_config as any)?.confetti_emoji_1 || '🙏';
  const emoji2 = (props.invitation?.user_config as any)?.confetti_emoji_2 || '❤️';
  const base = {
    shapes: ['emoji'],
    shapeOptions: { emoji: { value: [emoji1, emoji2].filter(Boolean) } },
    disableForReducedMotion: false,
    scalar: 2,
    flat: true,
  };
  await confetti({ count: 80, angle: 60, spread: 60, startVelocity: 65, gravity: 0.2, decay: 0.93, ticks: 300, position: { x: 0, y: 65 }, ...base });
  await confetti({ count: 80, angle: 120, spread: 60, startVelocity: 65, gravity: 0.2, decay: 0.93, ticks: 300, position: { x: 100, y: 65 }, ...base });
  await confetti({ count: 120, spread: 100, startVelocity: 60, gravity: 0.25, decay: 0.94, ticks: 350, position: { x: 50, y: 60 }, ...base });
};

const submitWish = async () => {
  if (!props.invitation?.id || !props.guest) return;
  submitting.value = true;
  wishAutoReply.value = '';
  const { error } = await supabase
    .from('wishes')
    .update({
      attendance: wishForm.attendance,
      message: wishForm.message,
    })
    .eq('wedding_id', String(props.invitation.id))
    .ilike('guest_name', String(props.guest));
  submitting.value = false;
  if (!error) {
    guestValidated.value = false;
    wishPage.value = 1;
    await fetchWishes();
    if ((props.invitation?.user_config as any)?.confetti_on_wish !== false) {
      fireConfetti();
    }
    const autoReply = (props.invitation?.user_config as any)?.wish_auto_reply;
    if (autoReply) wishAutoReply.value = autoReply;
  }
};

onMounted(() => {
  fetchWishes();
  checkGuestAccess();
});

const attendanceLabel = (val: string) =>
  (({ hadir: 'Hadir', tidak_hadir: 'Tidak Hadir', mungkin: 'Mungkin' }) as Record<string, string>)[val] ?? val;

const attendanceBadgeClass = (val: string) =>
  (({
    hadir: 'bg-green-100 text-green-700',
    tidak_hadir: 'bg-red-100 text-red-500',
    mungkin: 'bg-amber-100 text-amber-600',
  }) as Record<string, string>)[val] ?? 'bg-stone-100 text-stone-500';
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
