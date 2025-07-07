import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'
import 'virtual:uno.css'
import { plugin, defaultConfig } from '@formkit/vue'
import formkitConfig from '../formkit.config.ts'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(plugin, defaultConfig(formkitConfig))

app.mount('#app')
