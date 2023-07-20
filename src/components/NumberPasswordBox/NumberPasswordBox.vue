<template>
  <input
    class="number-password-box"
    v-model="password"
    password
    maxlength="1"
    @click="onClick"
    @focus="onFocus"
    :style="{
      border: isActive ? '1px solid #8CBAFF' : ''
    }"
  />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
const password = ref('')

const props = defineProps<{
  isActive: boolean
}>()

const emits = defineEmits<{
  (e: 'onClick'): void
  (e: 'onFocus'): void
  (e: 'changeShow', showProperties: boolean): void
}>()
const isActive = ref(false)

const onClick = () => {
  emits('onClick')
}

const onFocus = () => {
  emits('onFocus')
}

const activeShow = () => {
  isActive.value = props.isActive
}

watch(
  () => props.isActive,
  () => {
    activeShow()
  }
)

// 初始化
const initial = () => {
  activeShow()
}

initial()
</script>

<style lang="scss" scoped>
.number-password-box {
  width: 100rpx;
  height: 100rpx;
  border-radius: 5px;
  background-color: #fff;
}
</style>
