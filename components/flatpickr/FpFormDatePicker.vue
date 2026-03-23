<script setup lang="ts">
import flatpickr from 'flatpickr'
import 'flatpickr/dist/flatpickr.min.css'
import type { Instance } from 'flatpickr/dist/types/instance'

// Emits value in "Y-m-d" format (e.g. "2026-03-23")
// which matches what <input type="date"> produces — compatible with Supabase.

const props = withDefaults(defineProps<{
    modelValue?: string
    placeholder?: string
    hasError?: boolean
}>(), {
    modelValue: '',
    placeholder: 'Select a date…',
    hasError: false
})

const emit = defineEmits<{
    'update:modelValue': [value: string]
}>()

const inputRef = ref<HTMLInputElement | null>(null)
let fp: Instance | null = null

onMounted(() => {
    if (!inputRef.value) return
    fp = flatpickr(inputRef.value, {
        dateFormat: 'Y-m-d',
        altInput: true,
        altFormat: 'd M Y',
        defaultDate: props.modelValue || undefined,
        onChange(_dates, dateStr) {
            emit('update:modelValue', dateStr)
        }
    })
    syncAltInputState()
})

const syncAltInputState = () => {
    if (!fp?.altInput) return
    fp.altInput.classList.toggle('input-error', props.hasError)
}

watch(() => props.modelValue, (val) => {
    if (!fp) return
    fp.setDate(val || '', false)
})

watch(() => props.hasError, () => {
    syncAltInputState()
})

onBeforeUnmount(() => fp?.destroy())
</script>

<template>
    <!-- flatpickr with altInput replaces this with a visible alt input -->
    <input ref="inputRef" type="text" :placeholder="placeholder" class="input input-bordered w-full"
        :class="{ 'input-error': hasError }" />
</template>
