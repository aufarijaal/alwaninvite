<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { themeChange } from 'theme-change'
import 'vue-sonner/style.css'

onMounted(() => {
  themeChange(false)
})
</script>
