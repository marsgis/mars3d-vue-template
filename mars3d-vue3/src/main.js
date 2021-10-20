import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import 'windi.css'
import './style/index.scss'
import 'mars3d/dist/mars3d.css'
import * as mars3d from 'mars3d'

import { routes } from './router'
import App from './App.vue'

window.mars3d = mars3d
const app = createApp(App)
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

app.use(router)

app.mount('#app')
