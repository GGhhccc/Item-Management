<template>
  <u-skeleton rows="20" :loading="isLoading" title animate class="search-list">
    <view v-if="!isLoading">
      <!-- 总列表 -->
      <template>
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
        @recover="recoverItem"
      />
    </view>
  </u-skeleton>
</template>

<script setup lang="ts">
import { useSearchStore } from '@/stores/search'
import { onReachBottom } from '@dcloudio/uni-app'
import { storeToRefs } from 'pinia'
import { ref, computed, toRefs, inject } from 'vue'
import type { ItemList } from '@/types/search'

const searchStore = useSearchStore()
const { currentSearchList, currentScreenData, currentSearchInputData } = storeToRefs(searchStore)
const {
  fetchNewSearchList,
  fetchScreenSearchList,
  searchItemByInput,
  batchDeteleSearch,
  restoreDeletedItem
} = searchStore

// 是否是删除页面
const isDeleted = inject<boolean>('isDetele', false)

const props = defineProps<{
  isLoading: boolean
  manualDisable: boolean
}>()

const { isLoading } = toRefs(props)
const manualDisable = ref(props.manualDisable)

// 是否正在加载更多通知
const isLoadingMore = ref(false)

// 是否无法加载更多了
const isNoMore = computed(
  () =>
    currentSearchList.value.itemList.length === currentSearchList.value.total &&
    currentSearchList.value.itemList.length
)

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
      isDeleted ? await fetchScreenSearchList(1) : await fetchScreenSearchList(0)
    } else if (currentSearchInputData.value.offset) {
      isDeleted ? await searchItemByInput(1) : await searchItemByInput(0)
    } else {
      isDeleted ? await fetchNewSearchList(1) : await fetchNewSearchList(0)
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

// 点击
const chooseItem = (item: ItemList) => {
  // 控制多选的属性
  if (checkboxOperate.value) {
    item.isChecked = !item.isChecked
  } else {
    // 跳转到详情页
    // uni.navigateTo({
    //   url: `/pages/deleted/deleted`
    // })
  }
}

// 删除
const deleteItem = async () => {
  await batchDeteleSearch(currentSearchList.value.checkedItemList)
  uni.showToast({
    title: '删除成功',
    icon: 'success'
  })
}

// 恢复
const recoverItem = async () => {
  await restoreDeletedItem(currentSearchList.value.checkedItemList)
  uni.showToast({
    title: '恢复成功',
    icon: 'success'
  })
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
// loadSearchList()
</script>

<style lang="scss" scoped></style>
