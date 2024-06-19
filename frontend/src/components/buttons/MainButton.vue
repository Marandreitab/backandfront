<template>
    <v-btn class="ma-1" elevation="0" :color="color">{{ label }}</v-btn>
    
</template>

<script setup>
import { ref } from 'vue';

defineProps({
    label: {
        type: String,
        default() {
            return ''
        }
    },
    color: {
        type: String,
        default() {
            return 'primary'
        }
    }
})
</script>