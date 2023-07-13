import type { FullItemInfo } from '@/utils/typings'

export interface SearchList {
  /**
   * 当前所在页
   */
  offset: number
  /**
   * 每页个数
   */
  limit: number
  /**
   * 标签数组
   */
  tagsList: TagList[]
  /**
   * 物品数组
   */
  // itemList: ExtendItemList[]
  itemList: any[]
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

// 传入的物品数组
export interface ItemList {
  /**
   * 物品 id
   */
  id: number
  /**
   * 类型，0表示空间，1表示物品
   */
  type: number
  /**
   * 隐私，0 表示公开，1 表示私密
   */
  privacy: 0 | 1
  /**
   * 名称
   */
  name: string
  /**
   * 封面图
   */
  cover: string
  /**
   * 路径
   */
  path: ItemPath[]
  /**
   * 是否选中
   */
  isChecked?: boolean
}

export interface ItemPath {
  /**
   * 路径 id
   */
  id: number
  /**
   * 路径名
   */
  name: string
}

// 展现在界面的物品数组
type ItemListPath = Omit<ItemList, 'path'>
export interface ExtendItemListPath extends ItemListPath {
  /**
   * 物品路径
   */
  path: string
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

// 搜索请求的参数
export interface SearchItemsParams {
  /**
   * 名称
   */
  name: string
  /**
   * 类型
   */
  type: number
  /**
   * 最低价格
   */
  lowPrice: number
  /**
   * 最高价格
   */
  highPrice: number
  /**
   * 日期排序类型
   */
  dateType: number
  /**
   * 标签数组
   */
  labelId: string[]
}
