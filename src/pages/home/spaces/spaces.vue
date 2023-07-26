<template>
  <view class="space">
    <Space />
    <u-navbar @leftClick="back" titleWidth="250rpx" :title="name" :autoBack="true" />
  </view>
</template>

<script setup lang="ts">
import { useFormStore } from '@/stores/form'
import { useSpaceStore } from '@/stores/space'
import { storeToRefs } from 'pinia'

const useSpace = useSpaceStore()
const { spaceInfo } = storeToRefs(useSpace)
const name = useFormStore().currentName
const back = () => {
  useFormStore().currentFloor--
  spaceInfo.value.current = 0
  spaceInfo.value.spaceData.length = 0
}
</script>
