import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { getAllItems } from '@/network/apis/search'
import type { SearchList, TagList } from '@/types/search'

export const useSearchStore = defineStore('search', () => {
  const currentSearchList: SearchList = reactive({
    offset: 0,
    limit: 10,
    tagsList: [
      // {
      //   id: 1,
      //   tag: '帽子'
      // },
      // {
      //   id: 2,
      //   tag: '衣柜'
      // },
      // {
      //   id: 3,
      //   tag: '手包'
      // },
      // {
      //   id: 4,
      //   tag: '牛仔裤'
      // },
      // {
      //   id: 5,
      //   tag: '书柜'
      // }
    ],
    itemList: [
      // {
      //   id: '1',
      //   name: '帽子',
      //   property: 1,
      //   privacy: 1,
      //   state: '在库',
      //   previewImg: '/static/cap.png',
      //   dependentSpace: '房子1->卧室->衣柜'
      // },
      // {
      //   id: '2',
      //   name: '衣柜',
      //   property: 0,
      //   privacy: 1,
      //   state: '五成新',
      //   previewImg: '/static/cap.png',
      //   dependentSpace: '房子1->卧室'
      // },
      // {
      //   id: '3',
      //   name: '手包',
      //   property: 1,
      //   privacy: 0,
      //   previewImg: '/static/cap.png',
      //   dependentSpace: '房子1->卧室->衣柜'
      // }
    ]
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
      offset: currentSearchList.offset
    })
    currentSearchList.itemList = data.records
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
