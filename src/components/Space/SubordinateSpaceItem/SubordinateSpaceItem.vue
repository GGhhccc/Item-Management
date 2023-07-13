<template>
  <view class="subordinateSpaceItem">
    <view :style="`padding:${titlePadding}`" class="subordinateSpaceItem__title">
      <view class="subordinateSpaceItem__title__icon">
        <u-icon size="27rpx" name="play-right-fill" color="#3988ff"></u-icon>
      </view>
      <u-text :bold="true" :text="`第${props.floor}层`" />
    </view>
    <view :style="`padding:${tagPadding}`" class="subordinateSpaceItem__tag">
      <FormTag
        v-show="!parent || parent === item.parent"
        :tag="item"
        v-for="(item, index) in props.subordinateSpaces"
        @click="radioClick(item.id, floor)"
        :key="index"
        :checked="id === item.id"
      />
    </view>
  </view>
</template>

<script setup lang="ts">
import type { SubordinateSpaceData } from '@/types/form'
import FormTag from '@/components/Form/FormTag/FormTag.vue'
const props = defineProps<{
  // 从属空间
  subordinateSpaces: SubordinateSpaceData[]
  //层数
  floor: number
  //被选中ID
  id: number
  //父空间
  parent: number
  //标签内边距
  tagPadding: string
  //层级内边距
  titlePadding: string
}>()
const emits = defineEmits<{
  //点击事件回调
  (e: 'radioClick', id: number, floor: number): void
}>()
const radioClick = (id: number, floor: number) => {
  emits('radioClick', id, floor)
}
</script>

<style lang="scss">
.subordinateSpaceItem {
  &__title {
    display: flex;
    &__icon {
      margin-top: 9rpx;
      margin-right: 8rpx;
    }
  }
  &__tag {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
