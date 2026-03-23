<script setup lang="ts">
import flatpickr from 'flatpickr'
import 'flatpickr/dist/flatpickr.min.css'
import type { Instance } from 'flatpickr/dist/types/instance'

// Emits value in "Y-m-d\TH:i" format (e.g. "2026-03-23T14:30")
// which matches what <input type="datetime-local"> produces — compatible with Supabase.

const props = withDefaults(defineProps<{
    modelValue?: string
    placeholder?: string
    disabled?: boolean
    hasError?: boolean
}>(), {
    modelValue: '',
    placeholder: 'Select date & time…',
    disabled: false,
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
        // Store in ISO-like format matching datetime-local inputs
        dateFormat: 'Y-m-d\\TH:i',
        altInput: true,
        altFormat: 'd M Y, H:i',
        time_24hr: true,
        defaultDate: props.modelValue || undefined,
        clickOpens: !props.disabled,
        onChange(_dates, dateStr) {
            emit('update:modelValue', dateStr)
        }
    })
    syncAltInputState()
})

const syncAltInputState = () => {
    if (!fp?.altInput) return
    fp.altInput.disabled = props.disabled
    fp.altInput.classList.toggle('input-error', props.hasError)
    fp.altInput.classList.toggle('input-disabled', props.disabled)
}

// Sync value changes from parent (e.g. when edit form data loads, or end_time_open clears the value)
watch(() => props.modelValue, (val) => {
    if (!fp) return
    fp.setDate(val || '', false)
})

watch(() => props.disabled, (val) => {
    if (!fp) return
    fp.set('clickOpens', !val)
    syncAltInputState()
})

watch(() => props.hasError, () => {
    syncAltInputState()
})

onBeforeUnmount(() => fp?.destroy())
</script>

<template>
    <!-- flatpickr with altInput replaces this with a visible alt input -->
    <input ref="inputRef" type="text" :placeholder="placeholder" class="input input-bordered w-full"
        :class="{ 'input-error': hasError, 'input-disabled': disabled }" />
</template>
