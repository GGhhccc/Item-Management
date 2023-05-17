<template>
  <view class="search" :style="{ paddingTop: navBarHeight + 'px' }">
    <u-navbar title="搜索" autoBack></u-navbar>

    <SearchInput :search-list-data="currentSearchList.searchList" @reset-input="resetInput" />

    <SearchScreen />

    <view class="search__list">
      <SearchList />
    </view>
  </view>
</template>

<script setup lang="ts">
import { onShow } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { useSearchStore } from '@/stores/search'
import { storeToRefs } from 'pinia'

const searchStore = useSearchStore()
const { currentSearchList } = storeToRefs(searchStore)
const { setTagsList } = searchStore

// 重置搜索状态
const resetInput = () => {
  // isSearch.value = false
}

const navBarHeight = ref<number>(44)
// 获取小程序胶囊按钮
const getCapsule = () => {
  const menuButton = uni.getMenuButtonBoundingClientRect()
  navBarHeight.value = menuButton.bottom + 16
}

onShow(() => {
  getCapsule()
  setTagsList(currentSearchList.value.tagsList)
})
</script>

<style lang="scss" scoped>
.search {
  &__list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 85%;
    margin: 0 auto;
  }
}
</style>
