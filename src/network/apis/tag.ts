import service from '..'
import type { GetAllItemsParams } from '@/utils/typings'

// 查看空间列表
export function getAllTags({ offset, limit = 100 }: GetAllItemsParams): Promise<any> {
  return service({
    url: `/labels?offset=${offset}&limit=${limit}`,
    method: 'GET'
  })
}

// 添加标签
export function addTag(name: string, color: string): Promise<any> {
  return service({
    url: '/labels',
    method: 'POST',
    data: {
      name,
      color
    }
  })
}

// 删除标签
export function deleteTag(id: number): Promise<any> {
  return service({
    url: `/labels/${id}`,
    method: 'DELETE'
  })
}

// 更改标签
export function changeTag(id: number, name: string, color: string): Promise<any> {
  return service({
    url: `/labels/${id}`,
    method: 'PUT',
    data: {
      id,
      name,
      color
    }
  })
}
