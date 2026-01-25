<template>
    <div class="grid grid-cols-1 lg:grid-cols-[auto_407px] min-h-screen">
        <div class="bg-red-500 hidden lg:block">left side</div>
        <div class="bg-blue-500">actual invitation</div>
    </div>
</template>

<script setup>
defineProps({ invitation: Object })
</script>
