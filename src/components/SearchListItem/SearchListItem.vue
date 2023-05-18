<template>
  <view
    class="search-list-item"
    @longpress="showOperate"
    @click="onClick"
    :style="itemData.isChecked ? 'background-color: rgb(236, 244, 255);' : ''"
  >
    <view class="search-list-item__content">
      <view class="search-list-item__content__img-wrapper">
        <view class="search-list-item__content__img-wrapper__img">
          <u-image :src="itemData.previewImg" width="65px" height="65px" radius="4px"></u-image>
        </view>
        <view class="search-list-item__content__img-wrapper__property">
          <u-icon size="36rpx" color="#4d94ff" :name="itemData.property ? 'grid' : 'home'" />
        </view>
      </view>

      <view class="search-list-item__content__info-wrapper">
        <view class="search-list-item__content__info-wrapper__info">
          <view class="search-list-item__content__info-wrapper__info__text">
            {{ itemData.name }}
          </view>
          <view class="search-list-item__content__info-wrapper__info__icon iconfont">&#xe605;</view>
          <view
            v-if="itemData.privacy"
            class="search-list-item__content__info-wrapper__info__icon iconfont"
          >
            &#xe601;
          </view>
        </view>

        <!-- 多选 -->
        <view v-if="isChecking" class="search-list-item__content__info-wrapper__checkbox">
          <u-icon
            v-if="isChecking && !itemData.isChecked"
            name="checkmark-circle"
            color="#3988ff"
          ></u-icon>
          <u-icon v-if="itemData.isChecked" name="checkmark-circle-fill" color="#3988ff"></u-icon>
        </view>

        <view class="search-list-item__content__info-wrapper__dependent-space">
          <u-text :text="itemData.dependentSpace" color="#898A8D"></u-text>
        </view>
      </view>
      <u-divider line-color="#DAE1FF"></u-divider>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  options: { styleIsolation: 'shared' }
})
</script>

<script setup lang="ts">
import type { ExtendItemList } from '@/types/search'

const props = defineProps<{
  // 当前物品
  itemData: ExtendItemList
  // 是否处于多选模式
  isChecking: boolean
}>()

const emits = defineEmits<{
  // 长按操作
  (e: 'longpress'): void
  (e: 'onClick'): void
}>()

const showOperate = () => {
  emits('longpress')
}

const onClick = () => {
  emits('onClick')
}
</script>

<style lang="scss" scoped>
.search-list-item {
  width: 100vw;
  padding: 18px 30px 20px 30px;

  &__content {
    position: relative;
    display: flex;
    width: 86%;

    &__img-wrapper {
      position: relative;

      &__img {
        margin-right: 20px;
        border: 1px solid #c4dcff;
        border-radius: 4px;
      }

      &__property {
        position: absolute;
        left: 10rpx;
        top: 8rpx;
        background-color: #fff;
        border-radius: 10rpx;
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
          font-size: 12px;
          margin-right: 5px;
          border-radius: 4px;
          color: $uni-theme-color;
          background-color: $uni-icon-bg-color;
        }
      }

      &__checkbox {
        position: absolute;
        right: 0;
        top: 40%;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 20rpx;
        height: 20rpx;
        margin-right: 15rpx;
        color: $uni-theme-color;
      }

      &__dependent-space {
        position: absolute;
        bottom: 0;
      }
    }
  }
}
:deep(.u-divider) {
  position: absolute;
  bottom: -35px;
  width: 100%;
}
</style>
