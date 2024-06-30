// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import axios from './plugins/axios'
// main.js or App.vue
import '@mdi/font/css/materialdesignicons.css' 
const app = createApp(App)

app.use(vuetify).use(axios);

app.mount('#app')
