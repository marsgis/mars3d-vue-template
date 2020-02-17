import Vue from 'vue'
import Router from 'vue-router'
import cesiumContainer from './components/cesiumContainer.vue'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'cesiumContainer',
      component: cesiumContainer
    }
  ]
})
