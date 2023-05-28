import type { UserInfo } from '../types/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref<UserInfo>({
    // address: '',
    // brief: '还没留下个人简介~',
    // createTime: '',
    // email: '',
    // avatar: '',
    // id: '',
    // integral: 0,
    // phone: '',
    // sex: 0,
    // updateTime: '',
    // username: ''
    address: '',
    brief: '还没留下个人简介~',
    createTime: '',
    email: '',
    avatar: '/static/avatar.png',
    id: '22369874',
    integral: 0,
    phone: '',
    sex: 0,
    updateTime: '',
    username: '用户名1234'
  })

  return {
    userInfo
  }
})
