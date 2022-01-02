import { createApp } from 'vue'
import mars3dPlugin from '@/plugins/index'
import Application from './App.vue'

// 加载全局样式
import './styles/index.scss'

const app = createApp(Application)

app.use(mars3dPlugin)
app.mount('#app')
