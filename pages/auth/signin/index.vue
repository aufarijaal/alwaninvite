<script setup lang="ts">
import { ref } from 'vue';

const supabase = useSupabaseClient()
const { t } = useI18n()
const loading = ref(false)
const errorMsg = ref("")

const signInWithOAuth = async () => {
    try {
        loading.value = true
        errorMsg.value = ""

        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: 'http://localhost:3000/auth/callback',
                queryParams: {
                    prompt: 'select_account'
                }
            },
        })

        if (error) {
            errorMsg.value = error.message || "Failed to sign in with Google"
        }
    } catch (err: any) {
        errorMsg.value = err.message || "An unexpected error occurred"
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <div class="min-h-screen bg-base-200">
        <div class="container mx-auto px-4 py-8 flex flex-col lg:flex-row items-center justify-center gap-12">
            <!-- Left Side: Sign In Form -->
            <div class="w-full max-w-md">
                <div class="card bg-base-100 shadow-xl">
                    <div class="card-body space-y-6">
                        <!-- Logo -->
                        <NuxtLink to="/" class="flex justify-center">
                            <div class="w-16 h-16 bg-primary rounded-xl flex items-center justify-center">
                                <img src="#" alt="">
                            </div>
                        </NuxtLink>

                        <div class="text-center">
                            <h2 class="text-2xl font-bold">{{ t('auth.signin.title') }}</h2>
                            <p class="text-base-content/70 mt-2">
                                {{ t('auth.signin.subtitle') }}
                            </p>
                        </div>

                        <!-- Sign In Button -->
                        <div class="space-y-4">
                            <button @click="signInWithOAuth" :disabled="loading" class="btn btn-primary w-full">
                                <div class="flex items-center justify-center gap-2">
                                    <!-- Using @nuxt/icon for Google branding as Lucide doesn't include brand icons -->
                                    <Icon name="flat-color-icons:google" size="24px" />
                                    <span v-if="loading">{{ t('auth.signin.authenticating') }}</span>
                                    <span v-else>{{ t('auth.signin.signInWithGoogle') }}</span>
                                </div>
                            </button>

                            <!-- Error Message -->
                            <div v-if="errorMsg" class="alert alert-error">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>{{ errorMsg }}</span>
                            </div>
                        </div>

                        <!-- Terms and Privacy -->
                        <p class="text-sm text-center text-base-content/70">
                            {{ t('auth.signin.termsPrefix') }}
                            <a href="#" class="link link-primary">{{ t('auth.signin.termsAndConditions') }}</a>
                            {{ t('auth.signin.and') }}
                            <a href="#" class="link link-primary">{{ t('auth.signin.privacyPolicy') }}</a>
                            kami
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
