import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { getAllTags, addTag, deleteTag, changeTag } from '@/network/apis/tag'

export const useTagStore = defineStore('tag', () => {
  const tagInfo = reactive<any>({
    current: 0,
    total: 10,
    pages: 0,
    size: 0,
    tagData: []
  })

  //获取所有标签
  async function fetchAllTags() {
    const data = await getAllTags({
      offset: tagInfo.current
    })
    tagInfo.tagData = data.records
  }

  //添加标签
  async function fetchAddTag(name: string, color: string) {
    const data = await addTag(name, color)
    console.log(data)
  }

  //删除标签
  async function fetchDeleteTag(id: number) {
    await deleteTag(id)
  }

  //删除标签
  async function fetchChangeTag(id: number, name: string, color: string) {
    const data = await changeTag(id, name, color)
    console.log(data)
  }

  return {
    tagInfo,
    fetchDeleteTag,
    fetchAddTag,
    fetchAllTags,
    fetchChangeTag
  }
})
