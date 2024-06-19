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
    <MainButton color="primary" label="Open Dialog" @click="showDialog = true"></MainButton>
    <MyDialog v-model:modelValue="showDialog"></MyDialog>
  </div>
            </v-col>
        </v-row>
      </v-card-item>
  
      <v-card-item>
        <v-row>
            <v-col cols="12">
                <v-data-table :headers="headers" :items="items">

                </v-data-table>
            </v-col>
        </v-row>
      </v-card-item>
    </v-card>
  </template>

<script setup>
import { ref } from 'vue'
  import MainButton from './buttons/MainButton.vue'
  import MyDialog from './myDialog/MyDialog.vue'
  
const showDialog = ref(false)
const headers = ref([
    {
        title: 'Name',
        key: 'name',
    },
    {
        title: 'Email',
        key: 'email'
    },
])

const items = ref([
    {
        id: 1,
        name: 'Test 1',
        email: 'test1@test.com'
    },
    {
        id: 2,
        name: 'Test 2',
        email: 'test2@test.com'
    }
])
</script>