<!-- src/components/Mydialog/MyDialog.vue -->
<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-card-title class="headline d-flex justify-space-between align-center">
        <span>{{ isEditMode ? 'Edit User' : 'Create login' }}</span>
        <MainButton icon @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </MainButton>
      </v-card-title>
      <v-card-text>
        <v-form ref="formRef" :disabled="loading">
          <v-text-field v-model="form.name"  :rules="nameRules" label="First name"></v-text-field>
          <v-text-field v-model="form.email" :rules="emailRules" label="Email address" placeholder="johndoe@gmail.com"
            type="email"></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <MainButton elevated color="error" @click="dialog = false">cancel</MainButton>
        <MainButton color="primary" @click="handleSubmit" :loading="loading">save</MainButton>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-snackbar :color="snackbar.color" v-model="snackbar.isOpen">
    {{ snackbar.message }}
    <template v-slot:actions>
      <v-btn color="blue" variant="text" @click="snackbar.isOpen = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
import { ref, watch } from 'vue'
import MainButton from '../buttons/MainButton.vue'
import axios from 'axios';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  user: {
    type: Object,
    default: () => ({
      name: item,
      email: item
    })
  },
  isEditMode: {
    type: Boolean,
    default: false
  }
})

// methods
const populateForm =() =>{
    form.value.name = props.user.name
    form.value.email = props.user.email
}

const test = () => {
  console.log('test')
}

const handleSubmit = async () => {
  try {
    const { valid } = await formRef.value.validate();
    if (valid) {
      const params = {
        name: form.value.name,
        email: form.value.email

      }
      loading.value = true;
      
      if(props.isEditMode){
        const { data } = await axios.patch(`/api/users/${props.user.id}`, params);
        snackbar.value = {
          message: data?.message,
          color: 'green',
          isOpen: true
        }
  
        form.value = {
          name: "",
          email: ""
        }
  
        dialog.value = false
        emit('userUpdated', data.data)

      }else{
        const { data } = await axios.post('/api/users', params)
  
        snackbar.value = {
          message: data?.message,
          color: 'green',
          isOpen: true
        }
  
        form.value = {
          name: "",
          email: ""
        }
  
        dialog.value = false
  
        emit('userCreated', data.data)
      }
    }
  } catch (error) {
    console.error(error);

    if (error?.response?.status === 400) {
      return snackbar.value = {
        message: error?.response?.data?.message,
        color: 'red',
        isOpen: true
      }
    }

    snackbar.value = {
      message: 'Something went wrong',
      color: 'red',
      isOpen: true
    }

  } finally {
    loading.value = false;
  }

}

// initial value
const snackbar = ref({
  message: '',
  color: '',
  isOpen: false
})

const loading = ref(false)

const dialog = ref(props.modelValue)
const formRef = ref('')

const nameRules = ref([
  (v) => !!v || "This field is required",
  (v) => (v?.length > 6) || "Min character 6",
])
const emailRules = ref([
  (v) => !!v || "This field is required",
  (v) => /[A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z0-9]+/.test(v) || "Invalid email format",
])

const form = ref({
  name: "",
  email: ""
});

//dis is for function password
//const password = ref('')
//const showPassword = ref(false)

///const toggleShowPassword = () => {
// showPassword.value = !showPassword.value
//}

// open dialog
watch(() => props.modelValue, (val) => {
  if(props.isEditMode){
    populateForm();
  }
  dialog.value = val
})

const emit = defineEmits(['update:modelValue', 'userCreated', 'userUpdated']);

watch(dialog, (val) => {
  emit('update:modelValue', val)
})


</script>

<style scoped>
/* Add any scoped styles here */
</style>
