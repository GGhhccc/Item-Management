<template>
  <view class="formMutiple">
    <FormTag @click="checkboxClick(index)" :tag="item" v-for="(item, index) in tags" :key="index" />
  </view>
</template>

<script setup lang="ts">
defineProps(['tags'])
const emits = defineEmits(['checkboxClick'])
//单击事件回调
const checkboxClick = (name: number) => {
  emits('checkboxClick', name)
}
</script>

<style lang="scss">
.formMutiple {
  display: flex;
  justify-content: flex-start;
  flex-flow: row wrap;
}
</style>
