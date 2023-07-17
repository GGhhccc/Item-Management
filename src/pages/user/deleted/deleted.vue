<template>
  <view class="deleted" :style="{ paddingTop: navBarHeight + 'px' }">
    <u-navbar title="最近删除" autoBack titleStyle="font-weight:bold"></u-navbar>

    <view style="display: flex">
      <SearchInput />
      <SearchScreen />
    </view>

    <SearchList v-if="!isEmpty" :isLoading="isLoading" :manualDisable="manualDisable" />

    <!-- 空 -->
    <Empty v-if="isEmpty" />
  </view>
</template>

<script setup lang="ts">
import { onShow } from '@dcloudio/uni-app'
import { ref, provide, watch } from 'vue'
import { useSearchStore } from '@/stores/search'
import { storeToRefs } from 'pinia'

const searchStore = useSearchStore()
const { currentSearchList } = storeToRefs(searchStore)
const { fetchDeletedItem } = searchStore

provide('isNeedEdit', false)
provide('isDetele', true)

// 是否正在加载
const isLoading = ref(false)

// 手动控制禁用加载
const manualDisable = ref(false)

// 是否为空
const isEmpty = ref(true)
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
async function loadDeletedList() {
  manualDisable.value = false
  currentSearchList.value.itemList.length = 0
  currentSearchList.value.offset = 0
  isLoading.value = true

  try {
    await fetchDeletedItem()
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
  loadDeletedList()
})
</script>

<style lang="scss" scoped></style>
