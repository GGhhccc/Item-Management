import service from '..'
import type { PagingParams } from '@/utils/typings'
import type { ScreenItemsParams, SearchInputParams } from '@/types/search.d.ts'

// 获取所有物品
export function getAllItems({ offset, limit = 10 }: PagingParams): Promise<any> {
  return service({
    url: `/items/search?offset=${offset}&limit=${limit}`,
    method: 'POST',
    data: {
      type: -1,
      highPrice: -1,
      dateType: -1,
      name: '',
      lowPrice: -1,
      labelId: []
    }
  })
}

// 获取所有标签
export function getAllTags({ offset, limit = 10 }: PagingParams): Promise<any> {
  return service({
    url: `/labels?offset=${offset}&limit=${limit}`,
    method: 'GET'
  })
}

// 筛选后获取物品列表
export function searchByScreen(
  { offset, limit = 10 }: PagingParams,
  { name }: SearchInputParams,
  { type, dateType, highPrice, lowPrice, labelId }: ScreenItemsParams
): Promise<any> {
  return service({
    url: `/items/search?offset=${offset}&limit=${limit}`,
    method: 'POST',
    data: {
      name,
      type,
      highPrice,
      dateType,
      lowPrice,
      labelId
    }
  })
}

// 筛选后获取物品列表
export function searchByInput(
  { offset, limit = 10 }: PagingParams,
  { name }: SearchInputParams
): Promise<any> {
  return service({
    url: `/items/search?offset=${offset}&limit=${limit}`,
    method: 'POST',
    data: {
      name,
      type: -1,
      highPrice: -1,
      dateType: -1,
      lowPrice: -1,
      labelId: []
    }
  })
}
