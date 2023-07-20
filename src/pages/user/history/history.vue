<template>
  <view>
    <u-navbar placeholder title="物品修改记录" titleStyle="font-weight:bold" autoBack></u-navbar>

    <view style="display: flex">
      <SearchInput />
      <SearchScreen />
    </view>

    <!-- <u-button @click="start1">隐私</u-button>
    <PasswordPopup v-if="!isEmpty" :popup="popup" @close="close" /> -->

    <!-- 空 -->
    <Empty v-if="isEmpty" type="history" width="470" height="500" />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const popup = ref(false)
const isEmpty = ref(false)
</script>

<style lang="scss" scoped></style>
