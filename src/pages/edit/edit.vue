<template>
  <view>
    <Form :detailDeparture="detailDeparture" />
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
const detailDeparture = ref(false)
onLoad((options: any) => {
  detailDeparture.value = options.detail
  console.log(options)
})
</script>

<style lang="scss"></style>
