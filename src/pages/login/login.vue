<template>
  <view class="login">
    <image src="../../static/loginBg2.png" class="login__bg"></image>
    <view class="login__welcome">
      <view class="login__welcome__text-content">
        <view class="login__welcome__text-content__title1">i收纳</view>
        <view class="login__welcome__text-content__title2">欢迎你 !</view>
      </view>
      <u-button
        class="login__welcome__btn"
        text="登录"
        type="primary"
        customStyle="width: 70vw; height: 100rpx; margin-top: 60rpx; border-radius: 8px;"
        @click="jumpToInput"
      ></u-button>
    </view>
  </view>
</template>

<script setup lang="ts">
// 如果有 token，则重定向到首页
uni.getStorage({
  key: 'token',
  success: function () {
    uni.switchTab({
      url: '/pages/home/home'
    })
  }
})

const jumpToInput = () => {
  uni.redirectTo({
    url: '/pages/login/loginInput'
  })
}
</script>

<style lang="scss" scoped>
.login {
  overflow-y: hidden;
  &__bg {
    position: relative;
    width: 100vw;
    height: 100vh;
  }

  &__welcome {
    position: absolute;
    bottom: 0;
    width: 100vw;
    height: 450rpx;
    border-radius: 35px 35px 0 0;
    background-color: #fff;
    z-index: 999;

    &__text-content {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 80rpx;
      margin-top: 60rpx;

      &__title1 {
        font-size: 38rpx;
        font-weight: bold;
        margin-right: 20rpx;
      }
    }
  }
}
</style>
