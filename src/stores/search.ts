import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import { getAllItems, getAllTags, searchByScreen, searchByInput } from '@/network/apis/search'
import type {
  SearchList,
  TagList,
  TagItem,
  ExtendCurrentScreen,
  ExtendCurrentSearchInput,
  ItemList
} from '@/types/search'

export const useSearchStore = defineStore('search', () => {
  // 搜索页的主体列表
  const currentSearchList = ref<SearchList>({
    offset: 0,
    total: 0,
    limit: 10,
    itemList: []
  })

  // 筛选页中的标签列表
  const currentTagList: TagList = reactive({
    offset: 0,
    total: 0,
    limit: 10,
    tagsList: []
  })

  // 筛选页中的筛选条件
  const currentScreenData: ExtendCurrentScreen = reactive({
    offset: 0,
    total: 0,
    limit: 10,
    screenData: {
      // 1 空间 | 2 物品
      type: -1,
      lowPrice: -1,
      highPrice: -1,
      // 0 | 1
      dateType: -1,
      labelId: []
    }
  })

  // 输入框文字搜索
  const currentSearchInputData: ExtendCurrentSearchInput = reactive({
    offset: 0,
    total: 0,
    limit: 10,
    inputData: {
      name: ''
    }
  })

  // 给列表的每一项添加 checked 属性用于多选
  function setTagsList(tagList: TagItem[]) {
    tagList.forEach((value) => {
      value.checked = false
    })
  }
  function setItemList(itemList: ItemList[]) {
    itemList.forEach((value) => {
      value.isChecked = false
    })
  }

  // 获取搜索初始全部物品列表
  async function fetchNewSearchList() {
    const data = await getAllItems({
      offset: currentSearchList.value.offset + 1
    })
    currentSearchList.value.offset = data.current
    currentSearchList.value.itemList.push(...data.records)
  }

  // 获取筛选中的标签列表
  async function fetchTagList() {
    const data = await getAllTags({
      offset: currentTagList.offset + 1
    })
    currentTagList.offset = data.current
    currentTagList.tagsList.push(...data.records)
  }

  // 筛选后获取新的物品列表
  async function fetchScreenSearchList() {
    const data = await searchByScreen(
      {
        offset: currentScreenData.offset + 1
      },
      currentSearchInputData.inputData,
      currentScreenData.screenData
    )

    // 获取总数更新 searchList
    currentSearchList.value.total = data.total

    // 筛选第一页则替换整个列表，否则追加
    if (currentScreenData.offset === 0) {
      currentSearchList.value.itemList = data.records
    } else {
      currentSearchList.value.itemList.push(...data.records)
    }
    // 更新当前页数
    currentScreenData.offset = data.current

    // 为新列表重新添加 checked 属性
    setItemList(currentSearchList.value.itemList)
  }

  // 输入框搜索物品
  async function searchItemByInput() {
    const data = await searchByInput(
      {
        offset: currentSearchInputData.offset + 1
      },
      currentSearchInputData.inputData
    )

    // 获取总数更新 searchList
    currentSearchList.value.total = data.total

    // 筛选第一页则替换整个列表，否则追加
    if (currentSearchInputData.offset === 0) {
      currentSearchList.value.itemList = data.records
    } else {
      currentSearchList.value.itemList.push(...data.records)
    }
    // 更新当前页数
    currentSearchInputData.offset = data.current

    // 为新列表重新添加 checked 属性
    setItemList(currentSearchList.value.itemList)
  }

  return {
    currentSearchList,
    currentTagList,
    currentScreenData,
    currentSearchInputData,
    setTagsList,
    setItemList,
    fetchNewSearchList,
    fetchScreenSearchList,
    fetchTagList,
    searchItemByInput
  }
})
