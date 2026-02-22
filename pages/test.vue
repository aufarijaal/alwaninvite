<script setup lang="ts">
import { CalendarDays, MapPinned } from 'lucide-vue-next'

useHead({
    title: 'Islamic Green Theme Page',
    meta: [
        {
            name: 'description',
            content: 'This is a test page for the Islamic Green theme.'
        }
    ],
    // load Luxurious Script and Inter fonts from Google Fonts
    link: [
        {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Luxurious+Script&family=Inter:wght@100..900&display=swap'
        },
        // Playfair Display for headings
        {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap'
        },
        // Inter font
        {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap'
        },
        // AOS CSS
        {
            rel: 'stylesheet',
            href: 'https://unpkg.com/aos@2.3.1/dist/aos.css'
        }
    ],
    script: [
        {
            src: 'https://unpkg.com/aos@2.3.1/dist/aos.js',
            defer: true
        }
    ]
})

onMounted(() => {
    // Wait for AOS to load
    const initAOS = () => {
        if (typeof window !== 'undefined' && (window as any).AOS) {
            (window as any).AOS.init({
                duration: 1000,
                easing: 'ease-in-out',
                once: false,
                mirror: true,
                offset: 100
            })
        } else {
            setTimeout(initAOS, 100)
        }
    }
    initAOS()
})

definePageMeta({
    layout: undefined
})
</script>

<template>
    <div id="islamic-green-theme-page" class="w-full min-h-screen bg-green-50">
        <!-- Hero Section -->
        <div class="hero h-screen flex flex-col items-center" :style="{
            // backgroundImage: 'url(/img/rose.png)',
            // backgroundSize: '1000px',
            // backgroundPosition: '-200px -300px',
            // backgroundRepeat: 'no-repeat'
        }">

            <div class="relative w-full mt-4 flex flex-col items-center" data-aos="zoom-in">
                <img class="scale-[0.7] inset-0" src="/img/frame-1.png" alt="">
                <div class="hero--initial-names flex flex-col absolute top-[300px]">
                    <div class="text-8xl font-bold text-gray-600 -tracking-[0.02em]">A&R</div>
                </div>
            </div>

            <div class="flex flex-col items-center gap-6">
                <div class="hero--the-wedding-of text-lg tracking-[.5em] font-bold text-green-700" data-aos="fade-up">
                    THE WEDDING OF
                </div>

                <div class="hero--bride-groom-names">
                    <h1 class="text-6xl md:text-8xl text-gray-600 tracking-wide" data-aos="fade-up"
                        data-aos-delay="200">
                        Aulia &amp; Refa
                    </h1>
                </div>

                <div>
                    <img class="w-44" src="/img/divider-6.png" alt="">
                </div>

                <div class="hero--date-and-location">
                    <div class="flex items-center gap-6 text-green-700" data-aos="fade-up" data-aos-delay="400">
                        <div class="flex flex-col items-center gap-2">
                            <CalendarDays :size="32" />
                            <span class="text-lg">Selasa, 17 Oktober 2000</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Bride and Groom detail section -->
        <div class="bride-groom-details h-screen flex flex-col md:flex-row justify-center items-center gap-8" :style="{
            backgroundImage: 'url(/img/couple-illustration-with-nature.png)',
            backgroundPositionX: 'center',
            backgroundPositionY: '300px',
            backgroundSize: '600px',
            backgroundRepeat: 'no-repeat'
        }">
            <!-- Bride Detail -->
            <div class="bride-detail flex flex-col items-center" data-aos="fade-right">
                <div class="w-48 h-48 rounded-full mb-4 border-4 border-green-300"
                    style="background-image: url('/img/green_bride.png'); background-size: cover; background-position: center 20px; background-repeat: no-repeat; background-size: 280px;"
                    role="img" aria-label="Bride"></div>
                <h2 class="text-2xl font-semibold text-green-800">Aulia Salsabila</h2>
                <p class="text-green-600">Daughter of Mr. Ahmad & Mrs. Siti</p>
            </div>
            <!-- Groom Detail -->
            <div class="groom-detail flex flex-col items-center" data-aos="fade-left">
                <div class="w-48 h-48 rounded-full mb-4 border-4 border-green-300"
                    style="background-image: url('/img/green_groom.png'); background-size: cover; background-position: center 40px; background-repeat: no-repeat; background-size: 150px;"
                    role="img" aria-label="Groom"></div>
                <h2 class="text-2xl font-semibold text-green-800">Refa Pratama</h2>
                <p class="text-green-600">Son of Mr. Budi & Mrs. Ani</p>
            </div>
        </div>

        <div class="h-screen">
            <!-- Additional content can go here -->
            test
        </div>
    </div>
</template>

<style scoped>
.hero--the-wedding-of {
    font-family: 'Playfair Display', serif;
}

.hero--bride-groom-names,
.hero--initial-names div {
    font-family: 'Luxurious Script', cursive;
}
</style>