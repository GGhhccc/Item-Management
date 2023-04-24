<template>
	<view class="search-list-item">
		<view class="search-list-item__img-wrapper">
			<view class="search-list-item__img-wrapper__img">
				<u-image :src="searchListData.previewImg" width="65px" height="65px" radius="4px"></u-image>
			</view>
		</view>
		<view class="search-list-item__info-wrapper">
			<view class="search-list-item__info-wrapper__info">
				<view class="search-list-item__info-wrapper__info__text">
					{{ searchListData.name }}
				</view>
				<view class="iconfont search-list-item__info-wrapper__info__icon">&#xe605;</view>
				<view class="iconfont search-list-item__info-wrapper__info__icon">&#xe601;</view>
			</view>
			<view class="search-list-item__info-wrapper__dependent-space">
				<u-text :text="searchListData.dependentSpace" color="#666"></u-text>
			</view>
		</view>
		<u-divider class="search-list-item__divider" line-color="#000"></u-divider>
	</view>
</template>

<script setup lang="ts">
import type { FullItemInfo } from '@/utils/typings'
const props = defineProps<{
	// 所要渲染的通知信息
	searchListData: FullItemInfo
}>()
</script>

<style lang="scss" scoped>
.search-list-item {
	position: relative;
	display: flex;
	width: 86vw;
	margin-bottom: 34px;

	&__img-wrapper {
		&__img {
			margin-right: 20px;
			border: 1px solid #c4dcff;
			border-radius: 4px;
		}
	}

	&__info-wrapper {
		position: relative;
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 65px;

		&__info {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			color: #666;

			&__text {
				margin-right: 16px;
				font-size: 18px;
			}

			&__icon {
				font-size: 14px;
				margin-right: 5px;
				color: #3988ff;
			}
		}

		&__dependent-space {
			position: absolute;
			bottom: 0;
		}
	}
	&__divider {
		position: absolute;
		bottom: -32px;
		width: 100%;
	}
}
</style>
