import { App } from 'vue'
import 'mars3d/dist/mars3d.css'
import * as mars3d from 'mars3d'

export default {
  install: (app: App) => {
    app.config.globalProperties.mars3d = mars3d
    app.config.globalProperties.Cesium = mars3d.Cesium
  }
}
