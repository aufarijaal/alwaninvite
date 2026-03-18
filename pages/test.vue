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
    <div id="islamic-white-theme-page" class="w-full min-h-screen bg-gray-50">

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