<script setup lang="ts">
import { Heart, LogIn, LayoutDashboard } from 'lucide-vue-next'

const { t } = useI18n()
</script>

<template>
    <div class="min-h-screen bg-base-200">
        <!-- Hero Section -->
        <div class="hero min-h-screen">
            <div class="hero-content text-center">
                <div class="max-w-2xl">
                    <div class="flex justify-center mb-8">
                        <div class="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center">
                            <Heart :size="48" class="text-primary-content" />
                        </div>
                    </div>
                    <h1 class="text-5xl font-bold">{{ t('common.appName') }}</h1>
                    <p class="py-6 text-lg text-base-content/70">
                        {{ t('auth.signin.subtitle') }}
                    </p>
                    <div class="flex gap-4 justify-center">
                        <NuxtLink to="/auth/signin" class="btn btn-primary btn-lg">
                            <LogIn :size="24" />
                            {{ t('auth.signin.signInWithGoogle') }}
                        </NuxtLink>
                        <NuxtLink to="/dashboard" class="btn btn-outline btn-lg">
                            <LayoutDashboard :size="24" />
                            {{ t('navigation.dashboard') }}
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>