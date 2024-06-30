
<template>
  <v-btn class="ma-1" elevation="0" col>
    <slot></slot>
  </v-btn>
</template>

<script setup>
import { ref } from 'vue';

defineOptions({
  inheritAttrs: true,
});

</script>