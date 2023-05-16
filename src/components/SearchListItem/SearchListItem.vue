<template>
  <view class="search-list-item" @longpress="showOperate" :bgColor="bgColor">
    <view class="search-list-item__img-wrapper">
      <view class="search-list-item__img-wrapper__img">
        <u-image :src="searchListData.previewImg" width="65px" height="65px" radius="4px"></u-image>
      </view>
    </view>
    <view class="search-list-item__info-wrapper">
      <view class="search-list-item__info-wrapper__info">
        <view class="search-list-item__info-wrapper__info__text">
          {{ searchListData.name }}
        </view>
        <view class="iconfont search-list-item__info-wrapper__info__icon">&#xe605;</view>
        <view class="iconfont search-list-item__info-wrapper__info__icon">&#xe601;</view>
      </view>
      <view class="search-list-item__info-wrapper__dependent-space">
        <u-text :text="searchListData.dependentSpace" color="#666"></u-text>
      </view>
    </view>
    <u-divider line-color="#DAE1FF"></u-divider>
  </view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  options: { styleIsolation: 'shared' }
})
</script>

<script setup lang="ts">
import type { FullItemInfo } from '@/utils/typings'
const props = defineProps<{
  // 所要渲染的通知信息
  searchListData: FullItemInfo
  // 背景颜色
  bgColor: string
}>()

const emits = defineEmits<{
  // 长按操作
  (e: 'longpress'): void
}>()

const showOperate = () => {
  emits('longpress')
}
</script>

<style lang="scss" scoped>
.search-list-item {
  position: relative;
  display: flex;
  width: 86vw;
  margin-bottom: 34px;

  &__img-wrapper {
    &__img {
      margin-right: 20px;
      border: 1px solid #c4dcff;
      border-radius: 4px;
    }
  }

  &__info-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 65px;

    &__info {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      color: #666;

      &__text {
        margin-right: 16px;
        font-size: 18px;
      }

      &__icon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 20px;
        height: 20px;
        font-size: 14px;
        margin-right: 5px;
        border-radius: 4px;
        color: #3988ff;
        background-color: rgba($color: #d8d7db, $alpha: 0.37);
      }
    }

    &__dependent-space {
      position: absolute;
      bottom: 0;
    }
  }
}
:deep(.u-divider) {
  position: absolute;
  bottom: -32px;
  width: 100%;
}
</style>
