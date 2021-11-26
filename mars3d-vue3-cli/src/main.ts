import { createApp } from "vue"
import mars3dPlugin from "@/plugins/mars3d-plugin"
import Application from "./App.vue"
import "./styles/index.less"// 加载全局样式


const app = createApp(Application)

app.use(mars3dPlugin)

app.mount("#app")
