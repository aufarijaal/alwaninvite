<script setup lang="ts">
import flatpickr from 'flatpickr'
import 'flatpickr/dist/flatpickr.min.css'
import type { Instance } from 'flatpickr/dist/types/instance'

// Emits value in "H:i" format (e.g. "14:30")
// which matches what <input type="time"> produces — compatible with Supabase.

const props = withDefaults(defineProps<{
    modelValue?: string
    placeholder?: string
    hasError?: boolean
}>(), {
    modelValue: '',
    placeholder: 'Select a time…',
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
        enableTime: true,
        noCalendar: true,
        dateFormat: 'H:i',
        time_24hr: true,
        defaultDate: props.modelValue || undefined,
        onChange(_dates, dateStr) {
            emit('update:modelValue', dateStr)
        }
    })
    syncInputState()
})

const syncInputState = () => {
    if (!inputRef.value) return
    inputRef.value.classList.toggle('input-error', props.hasError)
}

watch(() => props.modelValue, (val) => {
    if (!fp) return
    fp.setDate(val || '', false)
})

watch(() => props.hasError, () => {
    syncInputState()
})

onBeforeUnmount(() => fp?.destroy())
</script>

<template>
    <input ref="inputRef" type="text" :placeholder="placeholder" class="input input-bordered w-full"
        :class="{ 'input-error': hasError }" />
</template>
