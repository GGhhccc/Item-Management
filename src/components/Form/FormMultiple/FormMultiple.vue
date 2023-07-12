<template>
  <view class="formMutiple">
    <FormTag
      @click="checkboxClick(index)"
      :tag="item"
      v-for="(item, index) in props.tags"
      :key="index"
    />
  </view>
</template>

<script setup lang="ts">
import FormTag from '@/components/Form/FormTag/FormTag.vue'
import type { Tag } from '@/types/form'
const props = defineProps<{
  //标签数组
  tags: Tag[]
}>()
const emits = defineEmits<{
  //点击事件回调
  (e: 'checkboxClick', name: number): void
}>()
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
