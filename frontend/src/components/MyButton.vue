<!-- src/components/MyDialog.vue -->
<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-card-title class="headline">Dialog Title</v-card-title>
      <v-card-text>
        This is a simple dialog component using Vuetify.
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <MainButton color="blue darken-1" @click="dialog = false" label="Close"></MainButton>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import MainButton from './buttons/MainButton.vue'

defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

const dialog = ref(false)
const emit = defineEmits(['update:modelValue'])

watch(() => modelValue, (val) => {
  dialog.value = val
})

watch(dialog, (val) => {
  emit('update:modelValue', val)
})
</script>
