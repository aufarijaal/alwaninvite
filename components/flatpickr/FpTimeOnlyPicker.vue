<script setup lang="ts">
import flatpickr from 'flatpickr'
import 'flatpickr/dist/flatpickr.min.css'
import type { Instance } from 'flatpickr/dist/types/instance'

const props = withDefaults(defineProps<{
    modelValue?: string
    dateFormat?: string
    placeholder?: string
    time24hr?: boolean
}>(), {
    modelValue: '',
    dateFormat: 'H:i',
    placeholder: 'Select a time…',
    time24hr: true
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
        dateFormat: props.dateFormat,
        time_24hr: props.time24hr,
        onChange(_dates, dateStr) {
            emit('update:modelValue', dateStr)
        }
    })
})

onBeforeUnmount(() => fp?.destroy())

const clear = () => {
    fp?.clear()
    emit('update:modelValue', '')
}

defineExpose({ clear })
</script>

<template>
    <div class="card bg-base-100 shadow-sm border border-base-300">
        <div class="card-body gap-4">
            <h2 class="card-title text-base">4. Time Only Picker</h2>
            <div class="form-control">
                <label class="label pb-1">
                    <span class="label-text text-xs text-base-content/60">
                        noCalendar: true, time_24hr: {{ time24hr }}
                    </span>
                </label>
                <input ref="inputRef" type="text" :placeholder="placeholder" class="input input-bordered w-full"
                    readonly />
            </div>
            <div v-if="modelValue" class="bg-success/10 border border-success/30 rounded-lg p-3">
                <p class="text-xs text-base-content/50 mb-1">Selected value</p>
                <p class="font-mono font-semibold text-success">{{ modelValue }}</p>
            </div>
            <div v-else class="bg-base-200 rounded-lg p-3">
                <p class="text-xs text-base-content/40 italic">No time selected yet</p>
            </div>
        </div>
    </div>
</template>
