import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getAllRooms, getRoomItems, getItemDetail } from '@/network/apis/space'

export const useSpaceStore = defineStore('space', () => {
  const spaceInfo = ref<any>({
    current: 0,
    total: 10,
    pages: 0,
    size: 0,
    spaceData: []
  })

  // 获取所有空间
  async function fetchAllRooms() {
    const data = await getAllRooms({
      offset: spaceInfo.value.current
    })
    spaceInfo.value.spaceData = data.records
  }

  async function fetchRoomItems(id: number) {
    const data = await getRoomItems(id, {
      offset: spaceInfo.value.current
    })
    spaceInfo.value.spaceData = data.records
  }

  return {
    spaceInfo,
    fetchAllRooms,
    fetchRoomItems
  }
})
