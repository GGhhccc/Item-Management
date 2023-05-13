<template>
  <view>
    <Form :itemData="useFormStore().itemFormData" />
  </view>
</template>

<script setup lang="ts">
import { useFormStore } from '@/stores/form'
</script>

<style lang="scss"></style>
