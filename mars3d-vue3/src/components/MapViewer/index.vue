<template>
  <div id="mapviewer" />
</template>
<script>
import { defineComponent, onMounted } from 'vue'

const mars3d = window.mars3d
export default defineComponent({
  setup() {
    onMounted(() => {
      mars3d.Resource.fetchJson({ url: 'config/config.json' }).then((data) => {
        const mapviewer = new mars3d.Map('mapviewer', data.map3d)
        console.log(mapviewer)
      })
    })
  },
})
</script>
<style>
#mapviewer {
  width: 100%;
  height: 100vh;
  position: absolute;
  z-index: -1;
  overflow: hidden;
}
</style>
