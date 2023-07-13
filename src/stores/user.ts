import type { UserInfo } from '../types/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getUserInfo } from '@/network/apis/user'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref<UserInfo>({
    avatar: '',
    id: '',
    name: '',
    qrCode: ''
  })

  async function fetchUserInfo() {
    // getUserInfo().then((res) => {
    //   userInfo.value = res
    // })
    userInfo.value = await getUserInfo()
    // const { id, avatar, name, qrCode } = await getUserInfo()
    // userInfo.value.id = id
    // userInfo.value.avatar = avatar
    // userInfo.value.name = name
    // userInfo.value.qrCode = qrCode
  }

  return {
    userInfo,
    fetchUserInfo
  }
})
