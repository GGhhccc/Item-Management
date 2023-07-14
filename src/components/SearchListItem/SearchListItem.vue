<template>
  <view
    class="search-list-item"
    @longpress="showOperate"
    @click="onClick"
    :style="searchItemData.isChecked ? 'background-color: rgb(236, 244, 255);' : ''"
  >
    <view class="search-list-item__content">
      <view class="search-list-item__content__img-wrapper">
        <view class="search-list-item__content__img-wrapper__img">
          <u-image :src="searchItemData.cover" width="65px" height="65px" radius="4px"></u-image>
        </view>
        <view class="search-list-item__content__img-wrapper__property">
          <u-icon size="36rpx" color="#4d94ff" :name="searchItemData.type ? 'grid' : 'home'" />
        </view>
      </view>

      <view class="search-list-item__content__info-wrapper">
        <view class="search-list-item__content__info-wrapper__info">
          <view class="search-list-item__content__info-wrapper__info__text">
            {{ searchItemData.name }}
          </view>
          <view class="search-list-item__content__info-wrapper__info__icon iconfont">&#xe605;</view>
          <view
            v-if="searchItemData.privacy"
            class="search-list-item__content__info-wrapper__info__icon iconfont"
          >
            &#xe601;
          </view>
        </view>

        <!-- 多选 -->
        <view v-if="isChecking" class="search-list-item__content__info-wrapper__checkbox">
          <u-icon
            v-if="isChecking && !searchItemData.isChecked"
            name="checkmark-circle"
            color="#3988ff"
          ></u-icon>
          <u-icon
            v-if="searchItemData.isChecked"
            name="checkmark-circle-fill"
            color="#3988ff"
          ></u-icon>
        </view>

        <view class="search-list-item__content__info-wrapper__dependent-space">
          <u-text :text="searchItemData.path" color="#898A8D"></u-text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import type { ItemList, ItemPath, ExtendItemListPath } from '@/types/search'

const props = defineProps<{
  // 当前物品
  itemData: ItemList
  // 是否处于多选模式
  isChecking: boolean
}>()

// 处理 path
const formatPath = (path: ItemPath[]) => {
  const arr: string[] = []
  // 倒序遍历
  for (let i = path.length - 1; i >= 0; i--) {
    arr.push(path[i].name)
  }
  return arr.join('->')
}

// 接收 props 数据的响应式变量
const searchItemData = reactive<ExtendItemListPath>({
  id: props.itemData.id,
  name: props.itemData.name,
  type: props.itemData.type,
  privacy: props.itemData.privacy,
  cover: props.itemData.cover,
  isChecked: props.itemData.isChecked,
  path: formatPath(props.itemData.path)
})

watch(props.itemData, (val) => {
  ;({
    id: searchItemData.id,
    name: searchItemData.name,
    type: searchItemData.type,
    privacy: searchItemData.privacy,
    cover: searchItemData.cover
  } = val)
  const path = formatPath(val.path)
  searchItemData.path = path
})

// 由于部分数据在筛选前已经加载过，所以上面的 watch 无法监听到变化，这部分数据需要重新监听多选属性
watch(
  () => props.itemData.isChecked,
  () => {
    searchItemData.isChecked = props.itemData.isChecked
  }
)

const emits = defineEmits<{
  // 长按操作
  (e: 'longpress'): void
  (e: 'onClick'): void
}>()

const showOperate = () => {
  emits('longpress')
}

const onClick = () => {
  emits('onClick')
}
</script>

<style lang="scss" scoped>
.search-list-item {
  width: 100vw;
  padding: 30rpx 30rpx 0 55rpx;
  height: 168rpx;

  &__content {
    position: relative;
    display: flex;
    width: 86%;
    height: 100%;
    border-bottom: 1px solid #dae1ff;

    &__img-wrapper {
      position: relative;

      &__img {
        margin-right: 38rpx;
        border: 1px solid #c4dcff;
        border-radius: 4px;
      }

      &__property {
        position: absolute;
        left: 10rpx;
        top: 8rpx;
        background-color: #fff;
        border-radius: 10rpx;
      }
    }

    &__info-wrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 135rpx;

      &__info {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        color: #666;

        &__text {
          color: $uni-text-color;
          margin-right: 26rpx;
          font-size: 32rpx;
        }

        &__icon {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 42rpx;
          height: 40rpx;
          font-size: 22rpx;
          margin-right: 18rpx;
          border-radius: 4px;
          color: $uni-theme-color;
          background-color: $uni-icon-bg-color;
        }
      }

      &__checkbox {
        position: absolute;
        right: 0;
        top: 40%;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 20rpx;
        height: 20rpx;
        margin-right: 15rpx;
        color: $uni-theme-color;
      }

      &__dependent-space {
        position: absolute;
        bottom: 0;
      }
    }
  }
}
</style>
