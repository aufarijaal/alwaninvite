<script setup lang="ts">
import FpBasicDatePicker from '~/components/flatpickr/FpBasicDatePicker.vue'
import FpDateTimePicker from '~/components/flatpickr/FpDateTimePicker.vue'
import FpDateRangePicker from '~/components/flatpickr/FpDateRangePicker.vue'
import FpTimeOnlyPicker from '~/components/flatpickr/FpTimeOnlyPicker.vue'
import FpInlinePicker from '~/components/flatpickr/FpInlinePicker.vue'
import type { DateRange } from '~/components/flatpickr/FpDateRangePicker.vue'

definePageMeta({
    layout: 'dashboard',
    middleware: 'auth'
})

if (!import.meta.dev) {
    throw createError({ statusCode: 404, statusMessage: 'Not Found' })
}

// ── Component refs (for clearAll) ─────────────────────────
const fpBasicRef = ref<{ clear: () => void } | null>(null)
const fpDateTimeRef = ref<{ clear: () => void } | null>(null)
const fpRangeRef = ref<{ clear: () => void } | null>(null)
const fpTimeRef = ref<{ clear: () => void } | null>(null)
const fpInlineRef = ref<{ clear: () => void } | null>(null)

// ── Results ───────────────────────────────────────────────
const basicDate = ref<string>('')
const dateTime = ref<string>('')
const dateRange = ref<DateRange>({ start: '', end: '' })
const timeOnly = ref<string>('')
const inlineDateTime = ref<string>('')

const clearAll = () => {
    fpBasicRef.value?.clear()
    fpDateTimeRef.value?.clear()
    fpRangeRef.value?.clear()
    fpTimeRef.value?.clear()
    fpInlineRef.value?.clear()
}

useHead({ title: 'Component Test – Alwan Invite' })
</script>

<template>
    <div class="p-6 space-y-8 max-w-4xl">
        <!-- Header -->
        <div class="flex items-center justify-between">
            <div>
                <h1 class="text-2xl font-bold">Flatpickr Test Page</h1>
                <p class="text-base-content/60 mt-1 text-sm">
                    Testing <code class="badge badge-ghost badge-sm">flatpickr</code> integration for use in forms.
                </p>
            </div>
            <button class="btn btn-outline btn-sm" @click="clearAll">Clear All</button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FpBasicDatePicker ref="fpBasicRef" v-model="basicDate" />
            <FpDateTimePicker ref="fpDateTimeRef" v-model="dateTime" />
            <FpDateRangePicker ref="fpRangeRef" v-model="dateRange" />
            <FpTimeOnlyPicker ref="fpTimeRef" v-model="timeOnly" />
        </div>

        <FpInlinePicker ref="fpInlineRef" v-model="inlineDateTime" />

        <!-- Config reference -->
        <div class="card bg-base-100 shadow-sm border border-base-300">
            <div class="card-body">
                <h2 class="card-title text-base mb-2">Key Config Options Reference</h2>
                <div class="overflow-x-auto">
                    <table class="table table-sm">
                        <thead>
                            <tr>
                                <th>Option</th>
                                <th>Type</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="font-mono text-xs">enableTime</td>
                                <td><span class="badge badge-ghost badge-sm">boolean</span></td>
                                <td class="text-sm">Show time picker alongside date</td>
                            </tr>
                            <tr>
                                <td class="font-mono text-xs">noCalendar</td>
                                <td><span class="badge badge-ghost badge-sm">boolean</span></td>
                                <td class="text-sm">Time-only mode (hides calendar)</td>
                            </tr>
                            <tr>
                                <td class="font-mono text-xs">mode</td>
                                <td><span class="badge badge-ghost badge-sm">string</span></td>
                                <td class="text-sm">"single" | "multiple" | "range"</td>
                            </tr>
                            <tr>
                                <td class="font-mono text-xs">inline</td>
                                <td><span class="badge badge-ghost badge-sm">boolean</span></td>
                                <td class="text-sm">Always-visible calendar (no input)</td>
                            </tr>
                            <tr>
                                <td class="font-mono text-xs">dateFormat</td>
                                <td><span class="badge badge-ghost badge-sm">string</span></td>
                                <td class="text-sm">Output format tokens (d, m, M, Y, H, i…)</td>
                            </tr>
                            <tr>
                                <td class="font-mono text-xs">time_24hr</td>
                                <td><span class="badge badge-ghost badge-sm">boolean</span></td>
                                <td class="text-sm">Use 24-hour instead of AM/PM</td>
                            </tr>
                            <tr>
                                <td class="font-mono text-xs">minDate / maxDate</td>
                                <td><span class="badge badge-ghost badge-sm">string|Date</span></td>
                                <td class="text-sm">Restrict selectable range</td>
                            </tr>
                            <tr>
                                <td class="font-mono text-xs">defaultDate</td>
                                <td><span class="badge badge-ghost badge-sm">string|Date</span></td>
                                <td class="text-sm">Pre-select a value on open</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
