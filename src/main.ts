import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/main.less'
import { createPinia } from 'pinia'
import { vuetify } from '@/plugins/vuetify.ts'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.min.css'

const pinia = createPinia()

createApp(App)
  .use(pinia)
  .use(vuetify)
  .mount('#app')
