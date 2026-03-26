<script setup lang="ts">
import { ref } from 'vue'
import { Heart, AlertCircle } from 'lucide-vue-next'

const supabase = useSupabaseClient()
const { t } = useI18n()
const loading = ref(false)
const errorMsg = ref('')

const signInWithOAuth = async () => {
    try {
        loading.value = true
        errorMsg.value = ''

        const redirectTo = `${window.location.origin}/auth/callback`

        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo,
                queryParams: {
                    prompt: 'select_account'
                }
            },
        })

        if (error) {
            errorMsg.value = error.message || 'Failed to sign in with Google'
        }
    } catch (err: any) {
        errorMsg.value = err.message || 'An unexpected error occurred'
    } finally {
        loading.value = false
    }
}

useHead({ title: 'Sign In – Alwan Invite' })
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

        <div class="w-full max-w-sm flex flex-col items-center">
            <!-- Logo / Back link -->
            <NuxtLink to="/" class="flex items-center gap-2 mb-10 group w-fit">
                <div
                    class="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                    <Heart :size="16" class="text-white" fill="white" />
                </div>
                <span class="font-semibold text-gray-900">Alwan Invite</span>
            </NuxtLink>

            <!-- Card -->
            <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                <div class="mb-8">
                    <h1 class="text-2xl font-bold text-gray-900 mb-2">{{ t('auth.signin.title') }}</h1>
                    <p class="text-sm text-gray-500 leading-relaxed">{{ t('auth.signin.subtitle') }}</p>
                </div>

                <!-- Google Sign In -->
                <button @click="signInWithOAuth" :disabled="loading"
                    class="w-full flex items-center justify-center gap-3 px-5 py-3 rounded-xl border border-gray-200 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 hover:border-gray-300 transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-sm">
                    <svg v-if="!loading" xmlns="http://www.w3.org/2000/svg" width="19.55px" height="20px"
                        viewBox="0 0 256 262">
                        <path fill="#4285f4"
                            d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" />
                        <path fill="#34a853"
                            d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" />
                        <path fill="#fbbc05"
                            d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z" />
                        <path fill="#eb4335"
                            d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" />
                    </svg>
                    <svg v-if="loading" class="w-5 h-5 animate-spin text-gray-400" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    <span>{{ loading ? t('auth.signin.authenticating') : t('auth.signin.signInWithGoogle') }}</span>
                </button>

                <!-- Error -->
                <div v-if="errorMsg"
                    class="mt-4 flex items-start gap-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl px-4 py-3">
                    <AlertCircle :size="16" class="mt-0.5 shrink-0" />
                    <span>{{ errorMsg }}</span>
                </div>

                <!-- Terms -->
                <p class="mt-6 text-xs text-center text-gray-400">
                    {{ t('auth.signin.termsPrefix') }}
                    <a href="#" class="text-gray-600 underline underline-offset-2 hover:text-gray-900">{{
                        t('auth.signin.termsAndConditions') }}</a>
                    {{ t('auth.signin.and') }}
                    <a href="#" class="text-gray-600 underline underline-offset-2 hover:text-gray-900">{{
                        t('auth.signin.privacyPolicy') }}</a>
                </p>
            </div>
        </div>
    </div>
</template>
