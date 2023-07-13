import service from '..'
import type { GetAllItemsParams } from '@/utils/typings'

export function getAllItems({ offset, limit = 10 }: GetAllItemsParams): Promise<any> {
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
