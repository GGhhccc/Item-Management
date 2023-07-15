<template>
  <view class="search-input">
    <view class="search-input__content">
      <view class="search-input__content__mic">
        <view class="iconfont" style="font-size: 18px">&#xe656;</view>
      </view>
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

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  options: { styleIsolation: 'shared' }
})
</script>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useSearchStore } from '@/stores/search'
import { storeToRefs } from 'pinia'

const searchStore = useSearchStore()
const { currentSearchInputData } = storeToRefs(searchStore)
const { searchItemByInput } = searchStore

const inputBox = ref('')

const submitSearch = async () => {
  // 发送请求获取新的数据
  currentSearchInputData.value.offset = 0
  currentSearchInputData.value.inputData.name = inputBox.value
  uni.showLoading({
    title: '搜索中'
  })
  await searchItemByInput()
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
  justify-content: center;
  width: 100vw;
  margin: 6rpx 0 30rpx 0;

  &__content {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 86vw;
    height: 80rpx;

    &__confirm {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      right: -46rpx;
      width: 100rpx;
      height: 102.5%;
      border-radius: 0 10px 10px 0;
      font-size: 14px;
      color: #fff;
      background-color: #3988ff;
      transform: translateX(-50%);
      z-index: 999;
    }

    &__mic {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 92rpx;
      height: 104%;
      margin-right: 16rpx;
      border-radius: 10px;
      color: #3988ff;
      background-color: #f8f9fd;
    }
  }
}
:deep(.u-search__content) {
  border-radius: 10px !important;
}
</style>
