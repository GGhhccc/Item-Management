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
            @longpress="showOperate()"
          />
        </view>
      </template>
      <!-- 多选状态的弹出框 -->
      <view
        v-if="checkboxOperate"
        class="search-list__operate animate__animated"
        :class="{ animate__fadeInUp: checkboxOperate, animate__bounceOutDown: !checkboxOperate }"
      >
        <view>
          <u-icon @click="toEdit" size="60rpx" name="edit-pen-fill" color="#3988ff"></u-icon>
          <u-text size="30rpx" color="#88898c" align="center" text="编辑" />
        </view>
        <view>
          <view class="iconfont" style="font-size: 60rpx; color: #3988ff" @click="move">
            &#xe6c4;
          </view>
          <u-text size="30rpx" color="#88898c" align="center" text="移动" />
        </view>
        <view>
          <u-icon @click="deleteItem" size="60rpx" name="trash" color="#898a8d"></u-icon>
          <u-text size="30rpx" color="#88898c" align="center" text="删除" />
        </view>
        <view>
          <u-icon @click="cancel" size="60rpx" name="close" color="#898a8d"></u-icon>
          <u-text size="30rpx" color="#88898c" align="center" text="取消" />
        </view>
      </view>
      <!-- 空 -->
      <Empty v-if="isEmpty" />
    </view>
  </u-skeleton>
</template>

<script setup lang="ts">
import { useSearchStore } from '@/stores/search'
import { onReachBottom } from '@dcloudio/uni-app'
import { storeToRefs } from 'pinia'
import { ref, computed } from 'vue'

const searchStore = useSearchStore()
const { currentSearchList, currentScreenData, currentSearchInputData } = storeToRefs(searchStore)
const { fetchNewSearchList, fetchScreenSearchList, searchItemByInput } = searchStore

// 是否正在加载
const isLoading = ref(false)
// 手动控制禁用加载
const manualDisable = ref(false)
// 是否为空
const isEmpty = ref(false)

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
const checkboxOperate = ref<boolean>(false)
// 装多选数据的结果数组
const checkbox = ref<boolean[]>([])

const showOperate = () => {
  checkboxOperate.value = true
}

// 控制多选的属性
const chooseItem = (item: any) => {
  if (checkboxOperate.value) {
    item.isChecked = !item.isChecked
  }
}

// 初始化多选结果数组
if (currentSearchList.value.itemList) {
  for (let i = 0; i < currentSearchList.value.itemList.length; i++) {
    checkbox.value[i] = false
  }
}

const toEdit = () => {
  console.log('编辑')
}

const move = () => {
  console.log('移动')
}

const deleteItem = () => {
  console.log('删除')
}

const cancel = () => {
  checkboxOperate.value = false
  // 取消时将所有属性的 isChecked 重置为 false
  for (let i = 0; i < currentSearchList.value.itemList.length; i++) {
    currentSearchList.value.itemList[i].isChecked = false
  }
}

// 初始化搜索列表
loadSearchList()
</script>

<style lang="scss" scoped>
.search-list {
  &__operate {
    display: flex;
    justify-content: space-around;
    position: fixed;
    align-items: center;
    bottom: 140rpx;
    left: 42rpx;
    width: 630rpx;
    height: 150rpx;
    padding: 0 20rpx 0 20rpx;
    border-radius: 50rpx;
    background-color: $uni-bg-color-grey;
  }
}
.animate__animated {
  --animate-duration: 500ms;
}
</style>
