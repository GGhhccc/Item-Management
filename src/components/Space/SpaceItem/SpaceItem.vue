<template>
  <view
    @click="toSpace(item.id, item.type, item.name)"
    @longpress="showOperate"
    :style="bgColor"
    class="spaceItem"
  >
    <image class="spaceItem-img" :src="item.cover || '../../../static/szlogo.png'" />
    <view class="spaceItem-type">
      <u-icon size="40rpx" color="#4d94ff" :name="item.type ? 'grid' : 'home'" />
    </view>
    <view v-if="item.privary" class="spaceItem-lock">
      <u-icon size="40rpx" color="#4d94ff" name="lock"></u-icon>
    </view>
    <view class="spaceItem__imformation">
      <view class="spaceItem__imformation-name">
        {{ item.name }}
      </view>
      <view class="spaceItem__imformation-administrator">
        <u-icon size="40rpx" color="#4c92fb" name="account"></u-icon>
      </view>
      <view class="spaceItem__imformation-avatar">
        <u-avatar-group size="40rpx" :urls="item.administrator"></u-avatar-group>
      </view>
      <view class="spaceItem__imformation-list">
        <u-icon @click="toDetail" color="#5096fe" size="40rpx" name="list"></u-icon>
      </view>
      <view class="spaceItem__imformation-time">
        <u-icon size="25rpx" name="clock"></u-icon>
        <u-text margin="0 0 0 10rpx" size="25rpx" color="#979797" text="2018-8-21" />
      </view>
    </view>
    <view class="spaceItem__content">
      <u-avatar
        v-for="(item2, index2) in item.content"
        :key="index2"
        :src="item2"
        customStyle="margin-right:20rpx"
        size="50rpx"
      />
    </view>
  </view>
</template>

<script setup lang="ts">
import { useFormStore } from '@/stores/form'
import type { SpaceData } from '@/types/form'

const props = defineProps<{
  //表单数据类型
  item: SpaceData
  //是否显示操作菜单
  show?: boolean
  //背景颜色
  bgColor?: string
}>()

const emits = defineEmits<{
  //点击事件
  (e: 'click'): void
  //长按事件
  (e: 'longpress'): void
}>()
//表单数据
const useForm = useFormStore()

//进入下一层
const toSpace = (id: number, type: number, name: string): void => {
  if (!props.show && (type === 0 || type === 1)) {
    //修改当前表单数据
    useForm.currentId = id
    useForm.currentFloor++
    useForm.currentName = name
    //跳转
    uni.navigateTo({
      url: `/pages/home/spaces/spaces`
    })
  } else if (!props.show) {
    uni.navigateTo({
      url: `/pages/details/details`
    })
  }
  //触发点击事件
  emits('click')
}
const toDetail = (): void => {
  uni.navigateTo({
    url: `/pages/details/details`
  })
}
//长按回调
const showOperate = () => {
  emits('longpress')
}
</script>

<style lang="scss">
.spaceItem {
  box-shadow: 0 5px 5px #e3ebfe;
  box-sizing: border-box;
  position: relative;
  width: 650rpx;
  margin: 0 auto;
  margin-top: 30rpx;
  border: #eeeef0 solid 2px;
  border-radius: 30rpx;
  height: 200rpx;
  padding: 25rpx;
  &-img {
    width: 150rpx;
    height: 150rpx;
    border-radius: 20rpx;
  }

  &-type {
    position: absolute;
    left: 35rpx;
    top: 35rpx;
    background-color: #fff;
    border-radius: 10rpx;
  }

  &-lock {
    position: absolute;
    left: 80rpx;
    top: 35rpx;
    background-color: #fff;
    border-radius: 10rpx;
  }

  &__imformation {
    position: absolute;
    right: 25rpx;
    top: 25rpx;
    width: 430rpx;
    height: 40rpx;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    &-name {
      line-height: 40rpx;
      white-space: nowrap;
      overflow: hidden;
      width: 120rpx;
      text-overflow: ellipsis;
      font-weight: 1000;
      display: inline-block;
      margin-right: 10rpx;
    }

    &-administrator {
      display: inline-block;
      background-color: #d8d7db;
      border-radius: 10rpx;
      margin-right: 10rpx;
    }

    &-avatar {
      display: inline-block;
    }

    &-list {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 10rpx;
      width: 50rpx;
      height: 50rpx;
      background-color: #f2f2f2;
      position: absolute;
      right: 30rpx;
      top: -5rpx;
    }

    &-time {
      position: absolute;
      left: 10rpx;
      top: 50rpx;
      display: flex;
      align-items: center;
    }
  }

  &__content {
    width: 400rpx;
    overflow: hidden;
    display: inline-flex;
    margin-left: 20rpx;
    justify-content: flex-start;
  }
}
</style>
