<template>
  <view class="tags">
    <u-navbar bgColor="#f6f6f6" title="管理标签" :autoBack="true" />
    <view v-show="!showNew" v-for="(item, index) in tabList" :key="index" class="tags-unit">
      {{ item.name }}
      <view class="tags-unit__icon">
        <view class="tags-unit__icon-color" />
        <view class="tags-unit__icon-close">
          <u-icon @click="deleteTag(index)" size="30rpx" color="#fff" name="close"></u-icon>
        </view>
      </view>
    </view>
    <view v-show="!showNew" @click="showNew = true" class="tags-plus">
      <u-icon size="70rpx" color="#fff" name="plus" />
    </view>
    <view v-if="showNew" class="tags__new">
      <view class="tags__new-label"> 名称 </view>
      <view class="tags__new-input">
        <u-input v-model="name" fontSize="35rpx" border="none" placeholder="请输入标签名称" />
      </view>
      <view class="tags__new-label"> 颜色 </view>
      <view class="tags__new-colors">
        <view @click="color = 'black'" class="tags__new-colors-unit">
          <view class="tags__new-colors-unit-ball" />
          黑色
          <view v-show="color === 'black'" class="tags__new-colors-unit-tick">
            <u-icon size="25rpx" name="checkmark" color="#fff"></u-icon>
          </view>
        </view>
        <view @click="color = 'orange'" class="tags__new-colors-unit">
          <view style="background-color: #ff9813" class="tags__new-colors-unit-ball" />
          橙色
          <view v-show="color === 'orange'" class="tags__new-colors-unit-tick">
            <u-icon size="25rpx" name="checkmark" color="#fff"></u-icon>
          </view>
        </view>
        <view @click="color = 'blue'" class="tags__new-colors-unit">
          <view style="background-color: #3988ff" class="tags__new-colors-unit-ball" />
          蓝色
          <view v-show="color === 'blue'" class="tags__new-colors-unit-tick">
            <u-icon size="25rpx" name="checkmark" color="#fff"></u-icon>
          </view>
        </view>
        <view @click="color = 'red'" class="tags__new-colors-unit">
          <view style="background-color: #ff6464" class="tags__new-colors-unit-ball" />
          红色
          <view v-show="color === 'red'" class="tags__new-colors-unit-tick">
            <u-icon size="25rpx" name="checkmark" color="#fff"></u-icon>
          </view>
        </view>
        <view @click="color = 'purple'" class="tags__new-colors-unit">
          <view style="background-color: #8439ff" class="tags__new-colors-unit-ball" />
          紫色
          <view v-show="color === 'purple'" class="tags__new-colors-unit-tick">
            <u-icon size="25rpx" name="checkmark" color="#fff"></u-icon>
          </view>
        </view>
        <view @click="color = 'yellow'" class="tags__new-colors-unit">
          <view style="background-color: #ffe600" class="tags__new-colors-unit-ball" />
          黄色
          <view v-show="color === 'yellow'" class="tags__new-colors-unit-tick">
            <u-icon size="25rpx" name="checkmark" color="#fff"></u-icon>
          </view>
        </view>
        <view @click="color = 'green'" class="tags__new-colors-unit">
          <view style="background-color: #b3f09d" class="tags__new-colors-unit-ball" />
          绿色
          <view v-show="color === 'green'" class="tags__new-colors-unit-tick">
            <u-icon size="25rpx" name="checkmark" color="#fff"></u-icon>
          </view>
        </view>
      </view>
      <view class="tags__new-submit">
        <u-button @click="submit" type="primary" text="确认"></u-button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const tabList = [
  { name: '书籍刊物', color: 'blue' },
  { name: '衣物', color: 'red' },
  { name: '电子产品', color: 'orange' },
  { name: '漫画', color: 'black' }
]
const deleteTag = (index: number) => {
  console.log(index)
}
const name = ref('')
const showNew = ref(false)
const submit = () => {
  showNew.value = false
}
const color = ref('black')
</script>

<style lang="scss">
.tags {
  box-sizing: border-box;
  margin-top: 150rpx;
  height: calc(100vh - 150rpx);
  overflow: auto;
  background-color: #f6f6f6;

  &-unit {
    margin-top: 10px;
    box-sizing: border-box;
    position: relative;
    font-size: 30rpx;
    font-weight: 750;
    padding: 30rpx;
    color: #353535;
    margin-bottom: 10rpx;
    background-color: #fff;
    border-radius: 20rpx;
    height: 100rpx;
    width: 750rpx;

    &__icon {
      display: flex;
      justify-content: space-around;
      position: absolute;
      right: 0;
      top: 0;
      align-items: center;
      height: 100rpx;
      width: 180rpx;

      &-color {
        width: 50rpx;
        height: 50rpx;
        background-color: #3988ff;
        border-radius: 25rpx;
      }

      &-close {
        width: 50rpx;
        height: 50rpx;
        border-radius: 25rpx;
        background-color: #979797;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  &-plus {
    position: fixed;
    width: 100rpx;
    height: 100rpx;
    background-color: #3988ff;
    border-radius: 50rpx;
    right: 35rpx;
    bottom: 100rpx;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__new {
    &-label {
      margin-top: 20px;
      padding-left: 40rpx;
      color: #656565;
      font-size: 30rpx;
      margin-bottom: 20rpx;
    }

    &-input {
      padding-left: 50rpx;
      background-color: #fff;
      border-radius: 20rpx;
      height: 100rpx;
      display: flex;
      align-items: center;
      margin-bottom: 20rpx;
    }

    &-colors {
      padding: 50rpx 0 50rpx 40rpx;
      background-color: #fff;
      border-radius: 20rpx;

      &-unit {
        height: 80rpx;
        display: flex;
        line-height: 80rpx;
        align-items: center;
        font-size: 35rpx;

        &-ball {
          background-color: #353535;
          width: 40rpx;
          height: 40rpx;
          border-radius: 20rpx;
          margin-right: 30rpx;
        }

        &-tick {
          background-color: #b3f09d;
          width: 35rpx;
          height: 35rpx;
          border-radius: 17.5rpx;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          left: 500rpx;
          top: 5rpx;
        }
      }
    }

    &-submit {
      position: fixed;
      bottom: 50rpx;
      left: 300rpx;
      width: 200rpx;
    }
  }
}
</style>
