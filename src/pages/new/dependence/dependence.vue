<template>
  <view class="dependence" :style="{ paddingTop: navBarHeight + 'px' }">
    <u-navbar title="关联物品" autoBack titleStyle="font-weight:bold"></u-navbar>

    <SearchInput :search-list-data="currentSearchList.itemList" @reset-input="resetInput" />

    <SearchScreen />

    <SearchList />
  </view>
</template>

<script setup lang="ts">
import { onShow } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { useSearchStore } from '@/stores/search'
import { storeToRefs } from 'pinia'

const searchStore = useSearchStore()
const { currentSearchList } = storeToRefs(searchStore)
const { setTagsList, setItemList } = searchStore

// 重置搜索状态
const resetInput = () => {
  // isSearch.value = false
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
  setTagsList(currentSearchList.value.tagsList)
  setItemList(currentSearchList.value.itemList)
})
</script>

<style lang="scss" scoped></style>
