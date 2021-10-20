<template>
  <div id="mapviewer" />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
// 使用免费开源版本
import 'mars3d/dist/mars3d.css'
import * as mars3d from 'mars3d'

onMounted(() => {
  mars3d.Resource.fetchJson({ url: 'config/config.json' }).then((data: any) => {
    const mapviewer = new mars3d.Map('mapviewer', data.map3d)
    console.log(mapviewer)
  })
})
</script>

<style lang="scss" scoped>
#mapviewer{
  width: 800px;
  height: 600px;
}
</style>
