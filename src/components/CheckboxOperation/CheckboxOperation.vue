<template>
  <!-- 多选状态的弹出框 -->
  <view
    v-if="checkboxOperate"
    class="checkbox-opertation animate__animated"
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
      <u-icon @click="cancelBtn" size="60rpx" name="close" color="#898a8d"></u-icon>
      <u-text size="30rpx" color="#88898c" align="center" text="取消" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { useSearchStore } from '@/stores/search'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'

const searchStore = useSearchStore()
const { currentSearchList } = storeToRefs(searchStore)
const { batchDeteleSearch } = searchStore

const props = defineProps<{
  // 是否长按
  isLongpressing: boolean
  // 选中的 id
  checkedId: number[]
}>()

const emits = defineEmits<{
  (e: 'cancel'): void
  (e: 'delete'): void
}>()

// 多选操作
const checkboxOperate = ref(false)
watch(
  () => props.isLongpressing,
  (newVal) => {
    checkboxOperate.value = newVal
  }
)

// 装多选数据的结果数组
// const checkbox = ref(props.checkedId)
// const { checkedId } = toRefs(props)

const toEdit = () => {
  console.log('编辑')
}

const move = () => {
  console.log('移动')
}

const deleteItem = async () => {
  emits('delete')
  uni.showLoading({
    title: '删除中',
    mask: true
  })
  await batchDeteleSearch(currentSearchList.value.checkedItemList)
  uni.showToast({
    title: '删除成功',
    icon: 'success'
  })
  cancelBtn()
}

const cancelBtn = () => {
  checkboxOperate.value = false
  currentSearchList.value.checkedItemList = []
  emits('cancel')
}
</script>

<style lang="scss" scoped>
.checkbox-opertation {
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
.animate__animated {
  --animate-duration: 500ms;
}
</style>
