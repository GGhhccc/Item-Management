<template>
  <u-skeleton rows="10" :loading="isLoading" title animate class="search-list">
    <view v-if="!isLoading">
      <!-- 总列表 -->
      <template v-if="!isSearch && !isSort">
        <view v-for="searchList in currentSearchList.searchList" :key="searchList.id">
          <SearchListItem :search-list-data="searchList" />
        </view>
      </template>
      <!-- 搜索结果 -->
      <template v-if="isSearch">
        <view v-for="searchResult in searchResultList.value" :key="searchResult.id">
          <SearchListItem :search-list-data="searchResult" />
        </view>
      </template>
      <!-- 排序结果 -->
      <template v-if="isSort && !isSearch">
        <view v-for="sortResult in sortResultList" :key="sortResult.id">
          <SearchListItem :search-list-data="sortResult" />
        </view>
      </template>
      <!-- 空 -->
      <Empty v-if="isEmpty" />
    </view>
  </u-skeleton>
</template>

<script setup lang="ts">
import { useSearchStore } from '@/stores/search'
import { storeToRefs } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { FullItemInfo } from '@/utils/typings'

const props = defineProps<{
  sortResultList: FullItemInfo[]
  isClickSort: boolean
}>()

const searchStore = useSearchStore()
const { currentSearchList } = storeToRefs(searchStore)
const { fetchNewSearchList } = searchStore

// 是否正在加载
const isLoading = ref(false)
// 手动控制禁用加载
const manualDisable = ref(false)
// 是否使用搜索
const isSearch = ref(false)
// 是否使用排序
const isSort = ref(false)
// 是否为空
const isEmpty = ref(false)

// 是否正在加载更多通知
const isLoadingMore = ref(false)

// 是否无法加载更多了
const isNoMore = computed(
  () =>
    currentSearchList.value.currentPage === currentSearchList.value.total &&
    currentSearchList.value.searchList.length
)

async function loadSearchList() {
  manualDisable.value = false
  currentSearchList.value.searchList.length = 0
  currentSearchList.value.currentPage = 0
  isLoading.value = true

  try {
    await fetchNewSearchList()
  } catch {
    manualDisable.value = true
  } finally {
    isLoading.value = false
  }
}

async function loadMoreItem() {
  isLoadingMore.value = true
  manualDisable.value = true

  try {
    // await fetchNewPageItem()
    manualDisable.value = false
  } catch {
    manualDisable.value = true
  } finally {
    isLoadingMore.value = false
  }
}

// 搜索结果
let searchResultList = ref<any>([])

watch(
  () => props.isClickSort,
  () => {
    isSort.value = props.isClickSort
    currentSearchList.value.searchList = props.sortResultList
    console.log(currentSearchList.value.searchList)
  }
)

// 初始化搜索列表
// loadSearchList()
fetchNewSearchList()
</script>

<style lang="scss" scoped>
.search-list {
}
</style>
