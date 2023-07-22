import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { PathData, T1, SpaceInfo } from '@/types/space'
import { getAllRooms, getRoomItems, getAllPath, moveItem } from '@/network/apis/space'

export const useSpaceStore = defineStore('space', () => {
  const spaceInfo = ref<SpaceInfo>({
    current: 0,
    total: 10,
    pages: 0,
    size: 0,
    spaceData: []
  })
  // 获取所有空间
  async function fetchAllRooms(): Promise<void> {
    const data = await getAllRooms({
      offset: 0
    })
    spaceInfo.value.spaceData = data.records
  }

  // 获取某个空间中的物品
  async function fetchRoomItems(id: number): Promise<void> {
    const data = await getRoomItems(id, {
      offset: spaceInfo.value.current
    })
    if (data) spaceInfo.value.spaceData = data.records
    else spaceInfo.value.spaceData = []
  }

  //所有路径信息
  const pathInfo = ref<PathData[][]>([[]])
  //当前路径信息
  const spaces = ref<PathData[]>([])
  // 获取所有路径
  async function fetchAllPath(): Promise<void> {
    pathInfo.value = await getAllPath()
  }
  // 批量移动物品
  function move(fatherId: number, ids: number[], path: T1[]): void {
    moveItem(fatherId, ids, path)
  }

  return {
    spaceInfo,
    fetchAllRooms,
    fetchRoomItems,
    pathInfo,
    spaces,
    fetchAllPath,
    move
  }
})
