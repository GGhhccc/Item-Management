<template>
  <view @click="chooseItem" @longpress="showOperate" :style="bgColor" class="spaceItem">
    <image
      @click="toDetail(item.id, item.attribute, item.name, item.floor)"
      class="spaceItem-img"
      :src="item.url"
    />
    <view class="spaceItem-attribute">
      <u-icon size="40rpx" color="#4d94ff" :name="item.attribute ? 'grid' : 'home'" />
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
        <u-icon color="#5096fe" size="40rpx" name="list"></u-icon>
      </view>
      <view class="spaceItem__imformation-time">
        <u-icon size="40rpx" name="clock"></u-icon>
        <u-text margin="0 0 0 10rpx" size="30rpx" color="#979797" text="2018-8-21" />
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
const props = defineProps(['item', 'show', 'bgColor'])
const emits = defineEmits(['click', 'longpress'])
const useForm = useFormStore()
//进入下一层
const toDetail = (id: number, attribute: number, name: string, floor: number) => {
  if (!props.show) {
    useForm.currentId = id
    useForm.currentFloor = floor
    useForm.currentName = name
    useForm.spaces[floor - 1] = name
    uni.navigateTo({
      url: `/pages/details/details?id=${id}&attribute=${attribute}&name=${name}`
    })
  }
}
//长按回调
const showOperate = () => {
  emits('longpress')
}
//点击回调
const chooseItem = () => {
  emits('click')
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

  &-attribute {
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
