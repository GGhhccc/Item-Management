<template>
  <view class="empty">
    <image class="empty__search-empty" src="../../static/searchEmpty.png"></image>
  </view>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.empty {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 32%;

  &__search-empty {
    width: 350rpx;
    height: 440rpx;
  }
}
</style>
