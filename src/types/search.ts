import type { FullItemInfo } from '@/utils/typings'

export interface SearchList {
	/**
	 * 当前所在页
	 */
	currentPage: number
	/**
	 * 总页数
	 */
	total: number
	/**
	 * 标签数组
	 */
	tagsList: TagList[]
	/**
	 * 物品数组
	 */
	// searchList: FullItemInfo[]
	searchList: any[]
}

export interface TagList {
	/**
	 * id
	 */
	id: number
	/**
	 * 标签名
	 */
	tag: string
	/**
	 * 是否选中
	 */
	checked?: boolean
}

export interface ShowControl {
	/**
	 * 是否展开属性列表
	 */
	showProperties: boolean
	/**
	 * 是否展开金额列表
	 */
	showPrice: boolean
	/**
	 * 是否展开标签列表
	 */
	showTags: boolean
	/**
	 * 是否展开日期列表
	 */
	showDate: boolean
}
