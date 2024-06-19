<!-- src/components/MyDialog.vue -->
<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-card-title class="headline">Dialog Component</v-card-title>
      <v-card-text>
       <TextField>
       </TextField>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <MainButton color="blue darken-1" @click="dialog = false" label="Close Dialog" ></MainButton>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import TextField from './myText/TextField.vue'
import MainButton from './buttons/MainButton.vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

const dialog = ref(props.modelValue)
const emit = defineEmits(['update:modelValue'])

watch(() => props.modelValue, (val) => {
  dialog.value = val
})

watch(dialog, (val) => {
  emit('update:modelValue', val)
})
</script>
