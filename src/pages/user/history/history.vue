<template>
  <view class="history">
    <u-navbar placeholder title="物品修改记录" titleStyle="font-weight:bold" autoBack></u-navbar>

    <view style="display: flex">
      <SearchInput @onFocus="onFocus" @searchEmpty="searchEmpty" />
      <!-- <SearchScreen /> -->
    </view>

    <SearchList
      v-if="!isEmpty"
      :isLoading="isLoading"
      :manualDisable="manualDisable"
      :cancelMultiple="cancelMultiple"
    />

    <!-- <u-button @click="start1">隐私</u-button>
    <PasswordPopup v-if="!isEmpty" :popup="popup" @close="close" /> -->

    <!-- 空 -->
    <Empty v-if="isEmpty" type="history" width="470" height="500" />
  </view>
</template>

<script setup lang="ts">
import { onShow } from '@dcloudio/uni-app'
import { ref, provide } from 'vue'
import { useSearchStore } from '@/stores/search'
import { storeToRefs } from 'pinia'

const searchStore = useSearchStore()
const { currentSearchList } = storeToRefs(searchStore)
const { fetchHistoryItem } = searchStore

provide('isNeedEdit', false)
// 表示当前为历史记录页
provide('isHistory', true)

// 搜索框获取焦点之后取消多选状态
const cancelMultiple = ref(false)
const onFocus = () => {
  cancelMultiple.value = !cancelMultiple.value
}

// 是否正在加载
const isLoading = ref(false)

// 手动控制禁用加载
const manualDisable = ref(false)

// 列表是否为空
const isEmpty = ref(false)

// 判断搜索后是否为空
const searchEmpty = (val: boolean) => {
  val ? (isEmpty.value = true) : (isEmpty.value = false)
}

// 请求列表
async function loadHistoryList() {
  manualDisable.value = false
  currentSearchList.value.itemList.length = 0
  currentSearchList.value.offset = 0
  isLoading.value = true

  try {
    await fetchHistoryItem()
  } catch {
    manualDisable.value = true
    console.log('请求失败')
  } finally {
    isLoading.value = false
    currentSearchList.value.itemList.length ? (isEmpty.value = false) : (isEmpty.value = true)
  }
}

onShow(() => {
  loadHistoryList()
})
</script>

<style lang="scss" scoped>
.history {
  overflow-x: hidden;
}
</style>
