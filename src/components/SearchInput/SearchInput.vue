<template>
  <view class="search-input">
    <view class="search-input__content">
      <view class="search-input__content__mic">
        <view class="iconfont" style="font-size: 18px">&#xe656;</view>
      </view>
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
import { useSearchStore } from '@/stores/search'

const searchStore = useSearchStore()
const { fetchNewSearchList } = searchStore

const emits = defineEmits<{
  (e: 'resetInput'): void
}>()

const inputBox = ref('')

const submitSearch = () => {
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
      right: -23px;
      width: 50px;
      height: 102.6%;
      border-radius: 0 10px 10px 0;
      font-size: 14px;
      color: #fff;
      background-color: #3988ff;
      transform: translateX(-50%);
    }

    &__mic {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 44px;
      height: 104%;
      margin-right: 8px;
      border-radius: 10px;
      color: #3988ff;
      background-color: #f8f9fd;
    }
  }
}
:deep(.u-search__content) {
  border-radius: 10px !important;
}
</style>
