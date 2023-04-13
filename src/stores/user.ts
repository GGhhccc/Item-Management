import type { UserInfo } from '../types/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
	const userInfo = ref<UserInfo>({
	    address: '',
	    brief: '还没留下个人简介~',
	    createTime: '',
	    email: '',
	    headPhoto: '',
	    id: '',
	    integral: 0,
	    phone: '',
	    sex: 0,
	    updateTime: '',
	    username: '',
	  })
	  
	  return {
		  userInfo,
	  }
})
