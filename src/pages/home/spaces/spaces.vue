<template>
  <view>
    <Space :floor="floor" />
    <u-navbar
      @leftClick="useFormStore().currentFloor--"
      titleWidth="250rpx"
      :title="name"
      :autoBack="true"
    />
  </view>
</template>

<script setup lang="ts">
import { useFormStore } from '@/stores/form'
const name = useFormStore().currentName
const floor = useFormStore().currentFloor
</script>
