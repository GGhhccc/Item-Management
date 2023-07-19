<template>
  <view class="empty">
    <image class="empty__emptyItem" :src="emptyUrl"></image>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  type: 'space' | 'search' | 'deleted' | 'history'
}>()

const emptyUrl = ref('../../static/empty.png')

switch (props.type) {
  case 'space':
    emptyUrl.value = '../../static/empty.png'
    break
  case 'search':
    emptyUrl.value = '../../static/searchEmpty.png'
    break
  case 'deleted':
    emptyUrl.value = '../../static/deletedEmpty.png'
    break
  case 'history':
    emptyUrl.value = '../../static/historyEmpty.png'
    break
}
</script>

<style lang="scss">
.empty {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 32%;

  &__emptyItem {
    width: 350rpx;
    height: 440rpx;
  }
}
</style>
