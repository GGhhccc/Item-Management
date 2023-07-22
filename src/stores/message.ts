import { defineStore } from 'pinia'
import { reactive } from 'vue'
import type { MessageList } from '@/types/message'

export const useMessageStore = defineStore('message', () => {
  const currentMessageList: MessageList = reactive({
    currentPage: 0,
    total: 10,
    messageList: [
      {
        id: 1,
        avatar: '/static/systemAvatar.png',
        username: '系统通知',
        lastTime: '2021-05-01 12:00:00',
        message: {
          userId: 111,
          chatLogList: [
            {
              id: '111',
              types: 0,
              time: '2023.8.8 12:00:00',
              content: '你好啊'
            },
            {
              id: '399',
              types: 0,
              time: '',
              content: '我不好'
            },
            {
              id: '111',
              types: 0,
              time: '',
              content: '你好啊'
            },
            {
              id: '112',
              types: 0,
              time: '',
              content: '你好啊'
            },
            {
              id: '399',
              types: 0,
              time: '',
              content: '好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好'
            },
            {
              id: '399',
              types: 0,
              time: '',
              content: '不好不好不好不好不好不好不好不好不好不好不好不好不好不好不好不好'
            },
            {
              id: '399',
              types: 0,
              time: '',
              content: '不好不好不好不好不好不好不好不好不好不好不好不好不好不好不好不好'
            },
            {
              id: '399',
              types: 0,
              time: '',
              content: '不好不好不好不好不好不好不好不好不好不好不好不好不好不好不好不好'
            },
            {
              id: '399',
              types: 0,
              time: '',
              content: '不好不好不好不好不好不好不好不好不好不好不好不好不好不好不好不好'
            },
            {
              id: '399',
              types: 0,
              time: '',
              content: '不好不好不好不好不好不好不好不好不好不好不好不好不好不好不好不好'
            },
            {
              id: '399',
              types: 0,
              time: '',
              content: '不好不好不好不好不好不好不好不好不好不好不好不好不好不好不好不好'
            },
            {
              id: '399',
              types: 0,
              time: '',
              content: '不好不好不好不好不好不好不好不好不好不好不好不好不好不好不好不好'
            },
            {
              id: '399',
              types: 0,
              time: '',
              content: '不好不好不好不好不好不好不好不好不好不好不好不好不好不好不好不好'
            },
            {
              id: '399',
              types: 0,
              time: '',
              content: '不好不好不好不好不好不好不好不好不好不好不好不好不好不好不好不好'
            }
          ]
        }
      }
    ]
  })

  function fetchNewMessageList() {
    // 请求新的消息列表，存入 store
  }

  return {
    currentMessageList,
    fetchNewMessageList
  }
})
