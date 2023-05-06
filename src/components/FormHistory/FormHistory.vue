<template>
  <view class="formHistory">
    <view class="formHistory__user">
      <text class="formHistory__user-username">{{ history.username }}</text>
      <u-text lines="1" size="22rpx" :text="history.content" />
    </view>
    <u-text align="right" color="#aaadb7" :text="changeTime(history.date)" />
  </view>
  <u-line customStyle="margin:0 auto" direction="row" length="80%"></u-line>
</template>

<script setup lang="ts">
defineProps(['history'])
//时间戳转换
const changeTime = (timestamp: number): string => {
  const date = new Date(timestamp)
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay()}`
}
</script>

<style lang="scss">
.formHistory {
  display: flex;

  &__user {
    display: flex;
    width: 70%;

    &-username {
      margin-right: 20rpx;
    }
  }
}
</style>
