<template>
    <v-text-field label="First name"></v-text-field>
    <v-text-field
        label="Email address"
         placeholder="johndoe@gmail.com"
         type="email"
    ></v-text-field>
    <v-text-field
        v-model="password"
        :label="label"
        :placeholder="placeholder"
        :type="showPassword ? 'text' : 'password'"
        :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
        @click:append="toggleShowPassword"
  
></v-text-field>



</template>

<script setup>
import { ref } from 'vue';

const password = ref('')
const showPassword = ref(false)

const toggleShowPassword = () => {
  showPassword.value = !showPassword.value
}
</script>