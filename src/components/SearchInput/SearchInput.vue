<template>
  <view class="search-input">
    <view class="search-input__content">
      <u-search
        placeholder="搜索空间物品"
        placeholderColor="#979797"
        searchIconColor="#565b6d"
        v-model="inputBox"
        :showAction="false"
        shape="square"
        height="40px"
        bgColor="#F8F9FD"
      ></u-search>
      <view class="search-input__content__confirm" @click="submitSearch">
        <span>确认</span>
      </view>
      <view class="search-input__content__right-icon">
        <view class="iconfont" style="font-size: 18px">&#xe656;</view>
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
import type { FullItemInfo } from '@/utils/typings'
import { useSearchStore } from '@/stores/search'

const searchStore = useSearchStore()
const { fetchNewSearchList } = searchStore

const props = defineProps<{
  // 当前通知列表
  searchListData: FullItemInfo[]
}>()

const emits = defineEmits<{
  // 搜索框发生改变的回调
  (e: 'submitSearch', searchResult: any): void
  (e: 'resetInput'): void
}>()

const inputBox = ref('')

const submitSearch = () => {
  // let searchResult = ref<any>([])
  // searchListData.value = props.searchListData
  // if (inputBox.value !== '') {
  // 	searchResult.value = searchListData.value.filter((value: any) => {
  // 		return value.name.includes(inputBox.value)
  // 	})
  // 	emits('submitSearch', searchResult)
  // }

  // 发送请求获取新的数据
  fetchNewSearchList()
}

watch(
  () => inputBox.value,
  () => {
    if (inputBox.value === '') {
      emits('resetInput')
    }
  }
)
</script>

<style lang="scss" scoped>
.search-input {
  display: flex;
  justify-content: center;
  width: 100vw;
  margin: 4px 0 14px 0;

  &__content {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 86vw;
    height: 40px;

    &__confirm {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      right: 30px;
      width: 50px;
      height: 102.6%;
      border-radius: 0 10px 10px 0;
      font-size: 14px;
      color: #fff;
      background-color: #3988ff;
      transform: translateX(-50%);
    }

    &__right-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 44px;
      height: 104%;
      margin-left: 58px;
      border-radius: 10px;
      color: #3988ff;
      background-color: #f8f9fd;
    }
  }
}
:deep(.u-search__content) {
  border-radius: 10px 0 0 10px !important;
}
</style>
