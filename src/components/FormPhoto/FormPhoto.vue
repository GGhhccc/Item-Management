<template>
  <u-upload
    @afterRead="photoAfterRead"
    @delete="deletePhoto"
    :fileList="tempPhoto"
    accept="image"
    multiple
    :maxCount="isDetail ? tempPhoto.length : 5"
    :width="size"
    :height="size"
    :previewImage="true"
    :disabled="isDetail"
    :deletable="!isDetail"
  />
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue'
const props = defineProps(['size', 'photoList', 'isDetail'])
const tempPhoto = ref(props.photoList)
const emits = defineEmits(['update:photoList'])
watch(
  () => tempPhoto.value,
  () => {
    emits('update:photoList', tempPhoto.value)
  }
)
//新增图片的回调
const photoAfterRead = (event: any) => {
  for (let index = 0; index < event.file.length; index++) {
    tempPhoto.value.push({
      url: event.file[index].url
    })
  }
}
//删除图片的回调
const deletePhoto = (event: any) => {
  tempPhoto.value.splice(event.index, 1)
}
</script>
