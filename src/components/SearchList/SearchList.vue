<template>
  <u-skeleton rows="20" :loading="isLoading" title animate class="search-list">
    <view v-if="!isLoading">
      <!-- 总列表 -->
      <template v-if="!isEmpty">
        <view v-for="item in currentSearchList.itemList" :key="item.id">
          <SearchListItem
            :item-data="item"
            :is-checking="checkboxOperate"
            @onClick="chooseItem(item)"
            @longpress="showOperate"
          />
        </view>
      </template>
      <!-- 多选状态的弹出框 -->
      <CheckboxOperation
        :isLongpressing="checkboxOperate"
        :checkedId="currentSearchList.checkedItemList"
        @cancel="cancelChecking"
        @delete="deleteItem"
      />
      <!-- 空 -->
      <SearchEmpty v-if="isEmpty" />
    </view>
  </u-skeleton>
</template>

<script setup lang="ts">
import { useSearchStore } from '@/stores/search'
import { onReachBottom } from '@dcloudio/uni-app'
import { storeToRefs } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { ItemList } from '@/types/search'

const searchStore = useSearchStore()
const { currentSearchList, currentScreenData, currentSearchInputData } = storeToRefs(searchStore)
const { fetchNewSearchList, fetchScreenSearchList, searchItemByInput } = searchStore

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

// 是否正在加载更多通知
const isLoadingMore = ref(false)

// 是否无法加载更多了
const isNoMore = computed(
  () =>
    currentSearchList.value.itemList.length === currentSearchList.value.total &&
    currentSearchList.value.itemList.length
)

// 请求列表
async function loadSearchList() {
  manualDisable.value = false
  currentSearchList.value.itemList.length = 0
  currentSearchList.value.offset = 0
  isLoading.value = true

  try {
    await fetchNewSearchList()
  } catch {
    manualDisable.value = true
    console.log('请求失败')
  } finally {
    isLoading.value = false
  }
}

// 触底加载更多
onReachBottom(() => {
  if (!isNoMore.value) {
    loadMoreItem()
  }
})

// 请求更多
async function loadMoreItem() {
  isLoadingMore.value = true
  manualDisable.value = true

  try {
    if (currentScreenData.value.offset) {
      await fetchScreenSearchList()
    } else if (currentSearchInputData.value.offset) {
      await searchItemByInput()
    } else {
      await fetchNewSearchList()
    }
    manualDisable.value = false
  } catch {
    manualDisable.value = true
  } finally {
    isLoadingMore.value = false
  }
}

// 多选操作
const checkboxOperate = ref(false)

const showOperate = () => {
  checkboxOperate.value = true
}

// 控制多选的属性
const chooseItem = (item: ItemList) => {
  if (checkboxOperate.value) {
    item.isChecked = !item.isChecked
  }
}

// 删除
const deleteItem = () => {
  currentSearchList.value.checkedItemList = currentSearchList.value.itemList
    .filter((item) => item.isChecked)
    .map((item) => item.id)
}

// 取消多选
const cancelChecking = () => {
  checkboxOperate.value = false
  // 将所有属性的 isChecked 重置为 false
  for (let i = 0; i < currentSearchList.value.itemList.length; i++) {
    currentSearchList.value.itemList[i].isChecked = false
  }
}

// 初始化搜索列表
loadSearchList()
</script>

<style lang="scss" scoped></style>
