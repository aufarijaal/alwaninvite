<script setup lang="ts">
import flatpickr from 'flatpickr'
import 'flatpickr/dist/flatpickr.min.css'
import type { Instance } from 'flatpickr/dist/types/instance'

const props = withDefaults(defineProps<{
    modelValue?: string
    dateFormat?: string
    time24hr?: boolean
}>(), {
    modelValue: '',
    dateFormat: 'd M Y H:i',
    time24hr: true
})

const emit = defineEmits<{
    'update:modelValue': [value: string]
}>()

const containerRef = ref<HTMLDivElement | null>(null)
let fp: Instance | null = null

onMounted(() => {
    if (!containerRef.value) return
    fp = flatpickr(containerRef.value, {
        inline: true,
        enableTime: true,
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
            <div class="flex items-start justify-between flex-wrap gap-3">
                <div>
                    <h2 class="card-title text-base">5. Inline Calendar (Date + Time)</h2>
                    <p class="text-xs text-base-content/60 mt-0.5">
                        inline: true, enableTime: true — always visible, no input needed
                    </p>
                </div>
                <div v-if="modelValue" class="bg-success/10 border border-success/30 rounded-lg px-4 py-2 text-right">
                    <p class="text-xs text-base-content/50 mb-0.5">Selected value</p>
                    <p class="font-mono font-semibold text-success">{{ modelValue }}</p>
                </div>
                <div v-else class="bg-base-200 rounded-lg px-4 py-2">
                    <p class="text-xs text-base-content/40 italic">No datetime selected yet</p>
                </div>
            </div>
            <!-- flatpickr renders inline into this div -->
            <div ref="containerRef"></div>
        </div>
    </div>
</template>

<style scoped>
:deep(.flatpickr-calendar) {
    box-shadow: none;
    border: none;
    background: transparent;
}
</style>
