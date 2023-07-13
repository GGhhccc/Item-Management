<template>
  <Space />
</template>

<script setup lang="ts">
import { useFormStore } from '@/stores/form'
useFormStore().currentFloor = 0
</script>
