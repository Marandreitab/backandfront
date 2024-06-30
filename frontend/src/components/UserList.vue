<!-- src/components/UserList.vue -->
<template>
  <v-card>
    <v-card-item>
      <v-card-title>
        User List
      </v-card-title>
      <v-row>
        <v-col cols="6">
          <v-card-subtitle>
            list of all users
          </v-card-subtitle>
        </v-col>
        <v-col cols="6" class="text-right">
          <div>
            <MainButton prepend-icon="mdi-plus" variant="text" color="primary" @click="openAddDialog">
              add user
            </MainButton>
            <MyDialog v-model:modelValue="showDialog" :user="formUserData" :isEditMode="isEditMode"
              @userCreated="(v) => userCreated(v)"
              @userUpdated="(v) => userUpdated(v)">
            </MyDialog>
          </div>
        </v-col>
      </v-row>
    </v-card-item>
    <v-dialog v-model="dialogDelete.isOpen" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">{{ dialogDelete.message }}</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="dialogDelete.isOpen = false">Cancel</v-btn>
          <v-btn color="error" variant="text" @click="deleteItemConfirm">OK</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card-item>
      <v-row>
        <v-col cols="12">
          <v-data-table :headers="headers" :items="items">
            <template v-slot:item.actions="{ item }">
              <v-icon class="me-2" size="small" @click="editItem(item)">
                mdi-pencil
              </v-icon>
              <v-icon size="small" @click="deleteItem(item)"> mdi-delete </v-icon>
            </template>
          </v-data-table>

          {{ items }}
        </v-col>
      </v-row>

    </v-card-item>
  </v-card>
</template>

<script setup>
// main import
import { ref, onMounted } from 'vue'
import MainButton from './buttons/MainButton.vue'
import MyDialog from './myDialog/MyDialog.vue'

import axios from 'axios';

// initial data
const showDialog = ref(false);
const formUserData = ref({});
const isEditMode = ref(false)
const items = ref([]);
const dialogDelete = ref({
  message: '',
  isOpen: false
})

const headers = ref([
  {
    title: 'Name',
    key: 'name',
  },
  {
    title: 'Email',
    key: 'email'
  },
  {
    title: 'Actions',
    key: 'actions',
    sortable: false
  },
])

// Methods
const openAddDialog = () => {
  isEditMode.value = false
  formUserData.value = {
    name: '',
    email: ''
  }
  showDialog.value = {
    isOpen: true,
  }
}

const getUsers = async () => {
  try {
    const { data } = await axios.get('/api/users')

    items.value = data.data;

  } catch (error) {
    console.error(error)
  }
}

const editItem = (item) => {
  formUserData.value = item
  isEditMode.value = true
  showDialog.value = {
    isOpen: true,
  }
}

const deleteItem = (item) => {
  dialogDelete.value = {
    message: `Are you sure you want to delete ${item.name}?`,
    isOpen: true,
    item: item
  }
}

const deleteItemConfirm = async () => {
  const item = dialogDelete.value.item
  if (item) {
    try {
      await axios.delete(`/api/users/${item.id}`)
      items.value = items.value.filter(user => user.id !== item.id)
      dialogDelete.value = {
        isOpen: false,
      }
    } catch (error) {
      console.error(error)
    }
  }
}
const userCreated = (v) => {
  items.value.push(v);
}
const userUpdated = (v) => {
  const index = items.value.findIndex((item) => item.id == v.id)

  
  items.value[index] = v;
}

// on mounted
onMounted(() => {
  getUsers();
})
</script>