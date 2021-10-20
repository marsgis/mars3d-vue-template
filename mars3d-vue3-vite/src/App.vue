<template>
  <MarsMap :url="configUrl" map-key="test" ref="marsMapRef" @onload="marsOnload"/>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MarsMap from '@comp/MarsMap/index.vue'
const configUrl = ref('config/config.json')

const marsOnload = (instance: object) => {
  console.log('地图加载完成')
  console.log(instance)
}
</script>

<style>
</style>
