<!-- src/components/Mydialog/MyDialog.vue -->
<template>
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title class="headline d-flex justify-space-between align-center">
        <span>Create Login</span>
        <v-btn icon @click="dialog = false" color="blue-grey-darken-3">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
          
          <v-text-field label="First name"></v-text-field>
            <v-text-field
           label="Email address"
            placeholder="johndoe@gmail.com"
          type="email"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
        <v-btn  @click="dialog = false" color="blue-grey-darken-3"> Cancel </v-btn>

          <MainButton color="blue darken-1" @click="dialog = false" label="Save"></MainButton>
          
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue'
  import MainButton from '../buttons/MainButton.vue'
  
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    }
  })
  
  const emit = defineEmits(['update:modelValue'])
  
  const dialog = ref(props.modelValue)
  //dis is for function password
  //const password = ref('')
  //const showPassword = ref(false)

  ///const toggleShowPassword = () => {
 // showPassword.value = !showPassword.value
//}
  watch(() => props.modelValue, (val) => {
    dialog.value = val
  })
  
  watch(dialog, (val) => {
    emit('update:modelValue', val)
  })
  </script>
  
  <style scoped>
  /* Add any scoped styles here */
  </style>
  