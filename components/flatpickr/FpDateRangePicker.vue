<script setup lang="ts">
import flatpickr from 'flatpickr'
import 'flatpickr/dist/flatpickr.min.css'
import type { Instance } from 'flatpickr/dist/types/instance'

export interface DateRange {
    start: string
    end: string
}

const props = withDefaults(defineProps<{
    modelValue?: DateRange
    dateFormat?: string
    placeholder?: string
}>(), {
    modelValue: () => ({ start: '', end: '' }),
    dateFormat: 'd M Y',
    placeholder: 'Select a date range…'
})

const emit = defineEmits<{
    'update:modelValue': [value: DateRange]
}>()

const inputRef = ref<HTMLInputElement | null>(null)
let fp: Instance | null = null

onMounted(() => {
    if (!inputRef.value) return
    fp = flatpickr(inputRef.value, {
        mode: 'range',
        dateFormat: props.dateFormat,
        onChange(selectedDates) {
            emit('update:modelValue', {
                start: selectedDates[0]
                    ? selectedDates[0].toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
                    : '',
                end: selectedDates[1]
                    ? selectedDates[1].toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
                    : ''
            })
        }
    })
})

onBeforeUnmount(() => fp?.destroy())

const clear = () => {
    fp?.clear()
    emit('update:modelValue', { start: '', end: '' })
}

defineExpose({ clear })
</script>

<template>
    <div class="card bg-base-100 shadow-sm border border-base-300">
        <div class="card-body gap-4">
            <h2 class="card-title text-base">3. Date Range Picker</h2>
            <div class="form-control">
                <label class="label pb-1">
                    <span class="label-text text-xs text-base-content/60">mode: "range"</span>
                </label>
                <input ref="inputRef" type="text" :placeholder="placeholder" class="input input-bordered w-full"
                    readonly />
            </div>
            <div v-if="modelValue.start || modelValue.end"
                class="bg-success/10 border border-success/30 rounded-lg p-3">
                <p class="text-xs text-base-content/50 mb-1">Selected range</p>
                <div class="flex gap-2 items-center flex-wrap">
                    <span class="font-mono font-semibold text-success text-sm">{{ modelValue.start || '—' }}</span>
                    <span class="text-base-content/40 text-xs">→</span>
                    <span class="font-mono font-semibold text-success text-sm">{{ modelValue.end || '(picking…)'
                        }}</span>
                </div>
            </div>
            <div v-else class="bg-base-200 rounded-lg p-3">
                <p class="text-xs text-base-content/40 italic">No range selected yet</p>
            </div>
        </div>
    </div>
</template>
