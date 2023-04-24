<template>
	<view class="empty">
		<view class="empty__text">
			<view>空空如也</view>
			<view>快去添加物品吧 !</view>
		</view>
		<u-image src="/static/isEmpty.png" mode="aspectFit" width="200px" height="200px"></u-image>
	</view>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.empty {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding-top: 50px;
	color: #3988ff;

	&__text {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-weight: bold;
		font-size: 18px;
		margin-bottom: 10px;
	}
}
</style>
