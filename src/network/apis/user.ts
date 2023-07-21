import service from '..'
import { uploadFileService } from '../index'
import type { PagingParams } from '@/utils/typings'

export function getUserInfo(): Promise<any> {
  return service({
    url: '/users',
    method: 'GET'
  })
}

export function changeUserAvatar(filePath: string): Promise<any> {
  return uploadFileService({
    url: '/users/avatar',
    filePath
  })
}

export function changeUserName(name: string): Promise<any> {
  return service({
    url: `/users/name?name=${name}`,
    method: 'PUT'
  })
}

// 恢复删除物品
export function roloadDeletedItems(itemIds: number[]): Promise<any> {
  return service({
    url: `/items/restore`,
    method: 'PUT',
    data: itemIds
  })
}

// 获取历史记录
export function getAllHistory({ offset, limit = 10 }: PagingParams, name: string): Promise<any> {
  return service({
    url: `/items/logs?name=${name}&offset=${offset}&limit=${limit}`
  })
}
