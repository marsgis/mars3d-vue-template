import { createApp } from "vue"
import Application from "./App.vue"
import "./styles/index.less" // 加载全局样式

const app = createApp(Application)

app.mount("#app")
