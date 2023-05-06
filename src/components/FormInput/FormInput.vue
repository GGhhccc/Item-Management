<template>
  <view class="formInputItem">
    <u-row>
      <u-col span="2" customStyle="position: relative;">
        <u-text :bold="true" :text="name" />
        <slot name="icon" />
      </u-col>
      <u-col span="10">
        <u-input
          :placeholder="placeHolder"
          border="none"
          :maxlength="maxLength"
          :readonly="isDetail"
          :type="type"
          v-model="tempInput"
        />
      </u-col>
    </u-row>
  </view>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue'
const props = defineProps(['input', 'maxLength', 'isDetail', 'placeHolder', 'name', 'type'])
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
