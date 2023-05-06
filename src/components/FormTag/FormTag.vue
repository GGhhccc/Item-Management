<template>
  <view class="formTag" :style="tagSize(tag.name.length)">
    <u-tag
      :shape="shape"
      :color="color"
      :borderColor="bgColor"
      :bgColor="bgColor"
      :text="tag.name"
      :plain="!tag.checked"
      @click="tagClick"
    />
  </view>
</template>

<script setup lang="ts">
import type { Tag } from '@/types/form'
withDefaults(
  defineProps<{
    //标签
    tag?: Tag
    //背景颜色
    bgColor?: string
    //文字颜色
    color?: string
    //形状
    shape?: string
  }>(),
  {
    tag: () => ({
      name: '',
      id: 0,
      checked: false
    }),
    bgColor: '',
    color: '',
    shape: ''
  }
)
const emits = defineEmits(['click'])
//标签大小
const tagSize = (length: number) => {
  return `width:${length * 15 + 18}px;`
}
//点击回调
const tagClick = (name: number) => {
  emits('click', name)
}
</script>

<style lang="scss">
.formTag {
  margin: 0 10rpx 20rpx 0;
}
</style>
