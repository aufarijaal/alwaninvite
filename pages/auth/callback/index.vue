<script setup lang="ts">
import { ref } from 'vue'
import { Heart, CheckCircle } from 'lucide-vue-next'

const user = useSupabaseUser()
const { t } = useI18n()

const cookieName = useRuntimeConfig().public.supabase.cookieName
const redirectPath = useCookie(`${cookieName}-redirect-path`).value

const status = ref<'authenticating' | 'redirecting'>('authenticating')

watch(user, () => {
    if (user.value) {
        status.value = 'redirecting'
        useCookie(`${cookieName}-redirect-path`).value = null
        setTimeout(() => {
            navigateTo(redirectPath || '/dashboard')
        }, 500)
    }
}, { immediate: true })

useHead({ title: 'Signing In... – Alwan Invite' })
</script>

<template>
    <div class="min-h-screen bg-white flex items-center justify-center px-6 relative overflow-hidden">
        <!-- Background blobs -->
        <div class="absolute inset-0 -z-10">
            <div
                class="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-emerald-50 to-transparent rounded-full blur-3xl opacity-70" />
            <div class="absolute bottom-0 left-0 w-80 h-80 bg-teal-50 rounded-full blur-3xl opacity-60" />
            <div class="absolute top-20 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl opacity-50" />
        </div>

        <div class="w-full max-w-sm text-center">
            <!-- Logo -->
            <div class="flex items-center justify-center gap-2 mb-12">
                <div
                    class="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                    <Heart :size="16" class="text-white" fill="white" />
                </div>
                <span class="font-semibold text-gray-900">Alwan Invite</span>
            </div>

            <!-- Spinner / Check icon -->
            <div class="flex justify-center mb-8">
                <div v-if="status === 'authenticating'" class="relative w-16 h-16">
                    <div class="absolute inset-0 rounded-full border-4 border-gray-100" />
                    <div
                        class="absolute inset-0 rounded-full border-4 border-t-emerald-500 border-r-transparent border-b-transparent border-l-transparent animate-spin" />
                    <div class="absolute inset-0 flex items-center justify-center">
                        <div class="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
                            <Heart :size="14" class="text-emerald-500" fill="currentColor" />
                        </div>
                    </div>
                </div>
                <div v-else
                    class="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center animate-bounce-once">
                    <CheckCircle :size="32" class="text-emerald-500" />
                </div>
            </div>

            <!-- Text -->
            <div class="animate-fade-in">
                <h1 class="text-2xl font-bold text-gray-900 mb-2">
                    {{ status === 'authenticating' ? t('auth.callback.processing') : t('auth.callback.success') }}
                </h1>
                <p class="text-sm text-gray-400">{{ t('common.loading') }}</p>
            </div>

            <!-- Progress bar -->
            <div class="mt-10 w-48 mx-auto">
                <div class="h-1 bg-gray-100 rounded-full overflow-hidden">
                    <div
                        class="h-full bg-gradient-to-r from-emerald-500 to-teal-500 animate-progress-bar rounded-full" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@keyframes fade-in {
    from {
        opacity: 0;
        transform: translateY(8px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes progress-bar {
    0% {
        width: 0%;
    }

    100% {
        width: 100%;
    }
}

@keyframes bounce-once {

    0%,
    100% {
        transform: scale(1);
    }

    40% {
        transform: scale(1.15);
    }

    60% {
        transform: scale(0.95);
    }
}

.animate-fade-in {
    animation: fade-in 0.4s ease-out;
}

.animate-progress-bar {
    animation: progress-bar 2s ease-in-out infinite;
}

.animate-bounce-once {
    animation: bounce-once 0.5s ease-out;
}
</style>