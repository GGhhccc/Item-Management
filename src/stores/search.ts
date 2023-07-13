import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { getAllItems } from '@/network/apis/search'
import type { SearchList, TagList } from '@/types/search'

export const useSearchStore = defineStore('search', () => {
  const currentSearchList: SearchList = reactive({
    offset: 0,
    total: 0,
    limit: 10,
    tagsList: [],
    itemList: []
  })

  function setTagsList(tagList: TagList[]) {
    tagList.forEach((value) => {
      value.checked = false
    })
  }

  function setItemList(itemList: any[]) {
    itemList.forEach((value) => {
      value.isChecked = false
    })
  }

  async function fetchNewSearchList() {
    const data = await getAllItems({
      offset: currentSearchList.offset + 1
    })
    currentSearchList.offset = data.current
    currentSearchList.itemList.push(...data.records)
  }

  function fetchScreenSearchList() {
    // 发送筛选要求，存入 store
  }

  return {
    currentSearchList,
    setTagsList,
    setItemList,
    fetchNewSearchList,
    fetchScreenSearchList
  }
})
