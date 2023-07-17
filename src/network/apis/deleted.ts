import service from '..'

// 恢复删除物品
export function roloadDeletedItems(itemIds: number[]): Promise<any> {
  return service({
    url: `/items/restore`,
    method: 'PUT',
    data: itemIds
  })
}
