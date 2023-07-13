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
    userInfo.value = await getUserInfo()
  }

  return {
    userInfo,
    fetchUserInfo
  }
})
