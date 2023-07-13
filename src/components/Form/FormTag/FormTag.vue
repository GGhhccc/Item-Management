<template>
  <view class="formTag" :style="tagSize(tag.name.length)">
    <u-tag
      :shape="shape"
      :color="color"
      :borderColor="bgColor"
      :bgColor="bgColor"
      :text="tag.name"
      :plain="!checked"
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
    //是否被选中
    checked: boolean
  }>(),
  {
    tag: () => ({
      name: '',
      id: 0,
      checked: false,
      parent: 0,
      floor: 0
    }),
    bgColor: '',
    color: '',
    shape: '',
    checked: false
  }
)
const emits = defineEmits<{
  //触发点击事件
  (e: 'click', name: number): void
}>()
const tagClick = (name: number): void => {
  emits('click', name)
}
//标签大小
const tagSize = (length: number): string => {
  return `width:${length * 15 + 18}px;`
}
</script>

<style lang="scss">
.formTag {
  margin: 0 10rpx 10rpx 0;
}
</style>
