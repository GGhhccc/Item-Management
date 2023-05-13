<template>
  <view>
    <Form :isEdit="true" :itemData="useFormStore().itemData" />
  </view>
</template>

<script setup lang="ts">
import { useFormStore } from '@/stores/form'
</script>

<style lang="scss"></style>
