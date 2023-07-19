<template>
  <view class="search" :style="{ paddingTop: navBarHeight + 'px' }">
    <u-navbar title="搜索" autoBack titleStyle="font-weight:bold"></u-navbar>

    <view style="display: flex">
      <SearchInput />
      <SearchScreen />
    </view>

    <view class="search__total">
      <view class="search__total__text">共{{ currentSearchList.total }}件物品</view>
    </view>

    <SearchList v-if="!isEmpty" :isLoading="isLoading" :manualDisable="manualDisable" />

    <!-- 空 -->
    <Empty v-if="isEmpty" type="search" />
  </view>
</template>

<script setup lang="ts">
import { onShow } from '@dcloudio/uni-app'
import { ref, watch } from 'vue'
import { useSearchStore } from '@/stores/search'
import { storeToRefs } from 'pinia'

const searchStore = useSearchStore()
const { currentSearchList } = storeToRefs(searchStore)
const { fetchNewSearchList } = searchStore

// 是否正在加载
const isLoading = ref(false)
// 手动控制禁用加载
const manualDisable = ref(false)
// 是否为空
const isEmpty = ref(false)
watch(
  () => currentSearchList.value.itemList.length,
  (val) => {
    if (val === 0) {
      isEmpty.value = true
    } else {
      isEmpty.value = false
    }
  }
)

// 请求列表
async function loadSearchList() {
  manualDisable.value = false
  currentSearchList.value.itemList.length = 0
  currentSearchList.value.offset = 0
  isLoading.value = true

  try {
    await fetchNewSearchList(0)
  } catch {
    manualDisable.value = true
    console.log('请求失败')
  } finally {
    isLoading.value = false
  }
}

// navbar 高度
const navBarHeight = ref<number>(44)

// 获取小程序胶囊按钮
const getCapsule = () => {
  const menuButton = uni.getMenuButtonBoundingClientRect()
  navBarHeight.value = menuButton.bottom + 16
}

onShow(() => {
  getCapsule()
  loadSearchList()
})
</script>

<style lang="scss" scoped>
.search {
  overflow-x: hidden;

  &__total {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 170rpx;
    height: 60rpx;
    padding: 0 20rpx;
    margin-left: 40rpx;
    border-radius: 10px;
    background-color: #f8f9fd;

    &__text {
      color: #000;
      font-size: 25rpx;
      letter-spacing: 4rpx;
    }
  }
}
</style>
