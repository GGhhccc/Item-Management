<template>
  <!-- 多选状态的弹出框 -->
  <view
    v-if="checkboxOperate"
    class="checkbox-opertation animate__animated"
    :class="{ animate__fadeInUp: checkboxOperate, animate__bounceOutDown: !checkboxOperate }"
  >
    <view v-if="isNeedEdit">
      <u-icon size="60rpx" name="edit-pen-fill" color="#3988ff" @click="toEdit"></u-icon>
      <u-text size="30rpx" color="#88898c" align="center" text="编辑" />
    </view>
    <view v-if="isNeedMove">
      <view class="iconfont" style="font-size: 60rpx; color: #3988ff" @click="move">
        &#xe6c4;
      </view>
      <u-text size="30rpx" color="#88898c" align="center" text="移动" />
    </view>
    <view>
      <u-icon size="50rpx" name="trash" color="#898a8d" @click="deleteItem"></u-icon>
      <u-text size="30rpx" color="#88898c" align="center" text="删除" />
    </view>
    <view v-if="isDeleted">
      <u-icon size="50rpx" name="reload" color="#898a8d" @click="recoveringItem"></u-icon>
      <u-text size="30rpx" color="#88898c" align="center" text="恢复" />
    </view>
    <view>
      <u-icon size="50rpx" name="close" color="#898a8d" @click="cancelBtn"></u-icon>
      <u-text size="30rpx" color="#88898c" align="center" text="取消" />
    </view>
  </view>
  <u-modal :show="showModal"></u-modal>
</template>

<script setup lang="ts">
import { useSearchStore } from '@/stores/search'
import { storeToRefs } from 'pinia'
import { ref, watch, inject } from 'vue'

const searchStore = useSearchStore()
const { currentSearchList } = storeToRefs(searchStore)

// 是否显示编辑按钮
const isNeedEdit = inject<boolean>('isNeedEdit', true)
// 是否显示移动按钮
const isNeedMove = inject<boolean>('isNeedMove', false)
// 是否是删除页面
const isDeleted = inject<boolean>('isDetele', false)

const props = defineProps<{
  // 是否长按
  isLongpressing: boolean
  // 选中的 id
  checkedId: number[]
}>()

const emits = defineEmits<{
  (e: 'cancel'): void
  (e: 'delete'): void
  (e: 'recover'): void
}>()

const showModal = ref(false)

// 多选操作
const checkboxOperate = ref(false)
watch(
  () => props.isLongpressing,
  (newVal) => {
    checkboxOperate.value = newVal
  }
)

const toEdit = () => {
  console.log('编辑')
}

const move = () => {
  console.log('移动')
}

// 多选恢复已删除物品
const recoveringItem = () => {
  currentSearchList.value.checkedItemList = currentSearchList.value.itemList
    .filter((item) => item.isChecked)
    .map((item) => item.id)

  uni.showLoading({
    title: '恢复中',
    mask: true
  })

  emits('recover')
  cancelBtn()
}

// 多选删除
const deleteItem = () => {
  currentSearchList.value.checkedItemList = currentSearchList.value.itemList
    .filter((item) => item.isChecked)
    .map((item) => item.id)

  uni.showLoading({
    title: '删除中',
    mask: true
  })

  emits('delete')
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
