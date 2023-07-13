import service from '..'
import type { GetAllItemsParams } from '@/utils/typings'

// 查看空间列表
export function getAllRooms({ offset, limit = 10 }: GetAllItemsParams): Promise<any> {
  return service({
    url: `/items/rooms?offset=${offset}&limit=${limit}`,
    method: 'GET'
  })
}

// 查看某个空间中的物品
export function getRoomItems(
  // 要查询的空间 id
  itemId: number,
  { offset, limit = 10 }: GetAllItemsParams
): Promise<any> {
  return service({
    url: `/items/${itemId}/items?offset=${offset}&limit=${limit}`,
    method: 'GET'
  })
}

// 查看物品详情
export function getItemDetail(
  // 要查询的物品 id
  itemId: number
): Promise<any> {
  return service({
    url: `/items/${itemId}`,
    method: 'GET'
  })
}

// 添加房间
export function addRoom({ roomImages, commentImages }: any) {
  return service({
    url: '/items/rooms',
    method: 'POST',
    data: {
      roomImages,
      commentImages
    }
  })
}

// 添加物品
export function addItem(
  // 所要添加到的那个空间的 id
  itemId: number,
  { roomImages, commentImages }: any
) {
  return service({
    url: `/items/${itemId}/items`,
    method: 'POST',
    data: {
      roomImages,
      commentImages
    }
  })
}

// 更新房间
export function updateRoom(itemId: number, { roomImages, commentImages }: any) {
  return service({
    url: `/items/${itemId}/items`,
    method: 'PUT',
    data: {
      roomImages,
      commentImages
    }
  })
}
