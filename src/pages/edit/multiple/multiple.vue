<template>
  <view>
    <Form :isMultiple="true" :itemData="useFormStore().multipleItemFormData" />
  </view>
</template>

<script setup lang="ts">
import { useFormStore } from '@/stores/form'
useFormStore().multipleItemFormData.photo[0] = { url: 'https://cdn.seovx.com/d/?mom=302' }
useFormStore().multipleItemFormData.photo[1] = { url: 'https://cdn.seovx.com/d/?mom=302' }
</script>

<style lang="scss"></style>
