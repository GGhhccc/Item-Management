<template>
  <view class="message">
    <u-navbar leftIcon="" title="广场" placeholder titleStyle="font-weight:bold"></u-navbar>
  </view>
  <u-switch v-model="popup"></u-switch>
  <PasswordPopup
    :popup="popup"
    @close="popup = false"
    @confirmGesture="confirmGesture"
    @confirmNumber="confirmNumber"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const popup = ref(false)

const confirmGesture = (password: number) => {
  if (password === 123456789) {
    uni.showToast({
      title: '验证成功',
      icon: 'success'
    })
    console.log(password)
    popup.value = false
  } else {
    uni.showToast({
      title: '密码错误',
      icon: 'error'
    })
  }
}

const confirmNumber = (password: number) => {
  console.log(password)
  if (password === 1234) {
    uni.showToast({
      title: '验证成功',
      icon: 'success'
    })
    console.log(password)
    popup.value = false
  } else {
    uni.showToast({
      title: '密码错误',
      icon: 'error'
    })
  }
}
</script>

<style lang="scss">
.message {
  overflow-x: hidden;
}
</style>
