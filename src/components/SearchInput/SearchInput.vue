<template>
  <view class="search-input">
    <view class="search-input__content">
      <u-search
        placeholder="搜索空间物品"
        placeholderColor="#979797"
        searchIconColor="#565b6d"
        searchIconSize="52rpx"
        v-model="inputBox"
        :showAction="false"
        shape="square"
        height="80rpx"
        bgColor="#F8F9FD"
      ></u-search>
      <view class="search-input__content__confirm" @click="submitSearch">
        <span>确认</span>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, watch, inject } from 'vue'
import { useSearchStore } from '@/stores/search'
import { storeToRefs } from 'pinia'

const searchStore = useSearchStore()
const { currentSearchInputData } = storeToRefs(searchStore)
const { searchItemByInput } = searchStore

const isDeleted = inject<boolean>('isDetele', false)

const inputBox = ref('')

const submitSearch = async () => {
  // 发送请求获取新的数据
  currentSearchInputData.value.offset = 0
  currentSearchInputData.value.inputData.name = inputBox.value
  uni.showLoading({
    title: '搜索中'
  })
  isDeleted ? await searchItemByInput(1) : await searchItemByInput(0)
  uni.showToast({
    title: '搜索成功',
    icon: 'success'
  })
}

watch(
  () => inputBox.value,
  () => {
    currentSearchInputData.value.inputData.name = inputBox.value
  }
)
</script>

<style lang="scss" scoped>
.search-input {
  display: flex;
  width: 70vw;
  padding: 0 10rpx 0 40rpx;
  margin: 6rpx 0 30rpx 0;

  &__content {
    position: relative;
    display: flex;
    align-items: center;
    width: 70vw;
    height: 80rpx;

    &__confirm {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      right: -30rpx;
      width: 100rpx;
      height: 72%;
      border-radius: 10px;
      font-size: 14px;
      color: #fff;
      background-color: #76acfc;
      transform: translateX(-50%);
      z-index: 999;
    }
  }
}
:deep(.u-search__content) {
  border-radius: 10px !important;
}
</style>
