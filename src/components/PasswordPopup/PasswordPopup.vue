<template>
  <view class="password-popup">
    <u-popup
      :show="isShow"
      mode="center"
      round="16"
      @close="close"
      custom-style="width: 300px; background-color: #F6F5F5;"
    >
      <view v-if="isNumber" class="password-popup__title">请输入数字密码</view>
      <view v-if="isGesture" class="password-popup__title">请输入手势密码</view>
      <u-tabs :list="passwordTypeList" @click="tabClick" :scrollable="false"></u-tabs>
      <!-- 数字密码 -->
      <view v-if="isNumber" class="password-popup__number">
        <view class="password-popup__number__content">
          <template v-for="(item, index) in numberPassword" :key="index">
            <NumberPasswordBox @onFocus="onFocus" :is-active="item.focus" />
          </template>
        </view>
      </view>
      <!-- 手势密码 -->
      <hackout-draw-lock v-if="isGesture" @change="change" @start="start" />
      <view v-show="lineError" class="password-popup__error">手势密码最少经过四个点</view>
      <view class="password-popup__confirmbox">
        <u-button
          @click="close"
          color="#D9D9D9"
          custom-style="width: 200rpx; height: 80rpx; border-radius: 10px"
        >
          取消
        </u-button>
        <u-button
          @click="confirm"
          color="#98BFFA"
          custom-style="width: 200rpx; height: 80rpx; border-radius: 10px"
        >
          确认
        </u-button>
      </view>
    </u-popup>
  </view>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
const props = defineProps<{
  // 是否弹出
  popup: boolean
}>()

const emits = defineEmits<{
  // 关闭
  (e: 'close'): void
  // 确认
  (e: 'confirm', password: number): void
}>()
// 弹出框是否显示
const isShow = ref(false)
// 是否是数字密码
const isNumber = ref(true)
// 是否正在输入
const inputting = ref(false)
// 是否是手势密码
const isGesture = ref(false)
// 数字密码
const numberPassword = ref([
  {
    value: '',
    focus: false
  },
  {
    value: '',
    focus: false
  },
  {
    value: '',
    focus: false
  },
  {
    value: '',
    focus: false
  }
])

const onFocus = (item: any) => {
  item.focus = true
}

// 手势密码
const gesturePassword = ref<number>(0)
// 手势密码错误
const lineError = ref(false)
watch(
  () => props.popup,
  (newVal) => {
    isShow.value = newVal
  }
)

const passwordTypeList = ref([
  {
    name: '数字密码'
  },
  {
    name: '手势密码'
  }
])

const changeBorder = (item: any) => {
  console.log('nmsl')
  inputting.value = true
}

// 切换 tab
const tabClick = (item: any) => {
  if (item.index) {
    isGesture.value = true
    isNumber.value = false
  } else {
    isGesture.value = false
    isNumber.value = true
  }
}

const change = (data: any) => {
  if (data.length < 4) {
    lineError.value = true
  }
  gesturePassword.value = data.join('')
}

const start = () => {
  lineError.value = false
}

const close = () => {
  isShow.value = false
  emits('close')
}
const confirm = () => {
  close()
}
</script>

<style lang="scss">
.password-popup {
  position: relative;

  &__title {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 60rpx 0 30rpx 0;
  }

  &__number {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 150px;
    overflow: hidden;

    &__content {
      display: flex;
      justify-content: space-between;
      width: 80%;
      height: 150rpx;

      &__item {
        width: 100rpx;
        height: 100rpx;
        border-radius: 5px;
        background-color: #fff;
      }
    }
  }

  &__error {
    position: absolute;
    bottom: 170rpx;
    left: 140rpx;
    height: 50rpx;
    font-size: 28rpx;
    color: red;
  }

  &__confirmbox {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
    margin: 20rpx auto 0 auto;
  }
}
</style>
