<template>
  <view class="formInputItem">
    <u-row>
      <u-col span="2" customStyle="position: relative;">
        <u-text color="#353535" :bold="true" :text="name" />
        <slot name="icon" />
      </u-col>
      <u-col :span="span">
        <u-input
          v-if="display"
          :placeholder="placeHolder"
          border="none"
          :maxlength="maxLength"
          :readonly="isDetail"
          :type="type"
          v-model="tempInput"
        />
        <u-link v-if="isDetail && !display" text="点击复制" :href="tempInput"></u-link>
      </u-col>
      <slot name="text" />
    </u-row>
  </view>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue'
const props = withDefaults(
  defineProps<{
    //是否显示输入框
    display?: boolean
    //输入内容
    input: string | number
    //最大长度
    maxLength: number
    //是否为详情页
    isDetail: boolean
    //默认内容
    placeHolder: string
    //名字
    name: string
    //类型
    type: string
    //输入框长度
    span?: number
  }>(),
  {
    display: true,
    input: '',
    maxLength: 0,
    isDetail: false,
    placeHolder: '',
    name: '',
    type: '',
    span: 10
  }
)
const tempInput = ref(props.input)
const emits = defineEmits(['update:input'])
watch(
  () => tempInput.value,
  () => {
    emits('update:input', tempInput.value)
  }
)
</script>

<style scoped lang="scss">
.formInputItem {
  margin-bottom: 10px;
}
</style>
