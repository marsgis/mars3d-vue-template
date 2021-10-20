import { createApp } from 'vue'
import Application from './App.vue'
import mars3dPlugin from '@/plugins/index'

// 加载全局样式
import './styles/index.scss'

const app = createApp(Application)

app.use(mars3dPlugin)
app.mount('#app')
