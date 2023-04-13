<template>
	<view>
		user 界面
		<new />
	</view>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user';
const user = useUserStore()
</script>

<style>

</style>