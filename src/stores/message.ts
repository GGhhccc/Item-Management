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
        avatar: '/static/avatar.png',
        username: '数小智',
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
              id: '1234',
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
              id: '1234',
              types: 0,
              time: '',
              content: '好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好'
            },
            {
              id: '1234',
              types: 0,
              time: '',
              content: '不好不好不好不好不好不好不好不好不好不好不好不好不好不好不好不好'
            },
            {
              id: '1234',
              types: 0,
              time: '',
              content: '不好不好不好不好不好不好不好不好不好不好不好不好不好不好不好不好'
            },
            {
              id: '1234',
              types: 0,
              time: '',
              content: '不好不好不好不好不好不好不好不好不好不好不好不好不好不好不好不好'
            },
            {
              id: '1234',
              types: 0,
              time: '',
              content: '不好不好不好不好不好不好不好不好不好不好不好不好不好不好不好不好'
            },
            {
              id: '1234',
              types: 0,
              time: '',
              content: '不好不好不好不好不好不好不好不好不好不好不好不好不好不好不好不好'
            },
            {
              id: '1234',
              types: 0,
              time: '',
              content: '不好不好不好不好不好不好不好不好不好不好不好不好不好不好不好不好'
            },
            {
              id: '1234',
              types: 0,
              time: '',
              content: '不好不好不好不好不好不好不好不好不好不好不好不好不好不好不好不好'
            },
            {
              id: '1234',
              types: 0,
              time: '',
              content: '不好不好不好不好不好不好不好不好不好不好不好不好不好不好不好不好'
            },
            {
              id: '1234',
              types: 0,
              time: '',
              content: '不好不好不好不好不好不好不好不好不好不好不好不好不好不好不好不好'
            }
          ]
        }
      },
      {
        id: 2,
        username: '数小智2',
        lastTime: '2021-05-01 12:00:00',
        avatar: '/static/avatar.png',
        message: {
          userId: 112,
          chatLogList: [
            {
              id: '112',
              types: 0,
              time: '2023.8.8 12:00:00',
              content: '你好啊'
            },
            {
              id: '1234',
              types: 0,
              time: '',
              content: '好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好'
            },
            {
              id: '1234',
              types: 0,
              time: '',
              content: '不好不好不好不好不好不好不好不好不好不好不好不好不好不好不好不好'
            }
          ]
        }
      },
      {
        id: 2,
        username: '数小智2',
        lastTime: '2021-05-01 12:00:00',
        avatar: '/static/avatar.png',
        message: {
          userId: 112,
          chatLogList: [
            {
              id: '112',
              types: 0,
              time: '2023.8.8 12:00:00',
              content: '你好啊'
            },
            {
              id: '1234',
              types: 0,
              time: '',
              content: '好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好'
            },
            {
              id: '1234',
              types: 0,
              time: '',
              content: '不好不好不好不好不好不好不好不好不好不好不好不好不好不好不好不好'
            }
          ]
        }
      },
      {
        id: 2,
        username: '数小智2',
        lastTime: '2021-05-01 12:00:00',
        avatar: '/static/avatar.png',
        message: {
          userId: 112,
          chatLogList: [
            {
              id: '112',
              types: 0,
              time: '2023.8.8 12:00:00',
              content: '你好啊'
            },
            {
              id: '1234',
              types: 0,
              time: '',
              content: '好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好'
            },
            {
              id: '1234',
              types: 0,
              time: '',
              content: '不好不好不好不好不好不好不好不好不好不好不好不好不好不好不好不好'
            }
          ]
        }
      },
      {
        id: 2,
        username: '数小智2',
        lastTime: '2021-05-01 12:00:00',
        avatar: '/static/avatar.png',
        message: {
          userId: 112,
          chatLogList: [
            {
              id: '112',
              types: 0,
              time: '2023.8.8 12:00:00',
              content: '你好啊'
            },
            {
              id: '1234',
              types: 0,
              time: '',
              content: '好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好'
            },
            {
              id: '1234',
              types: 0,
              time: '',
              content: '不好不好不好不好不好不好不好不好不好不好不好不好不好不好不好不好'
            }
          ]
        }
      },
      {
        id: 2,
        username: '数小智2',
        lastTime: '2021-05-01 12:00:00',
        avatar: '/static/avatar.png',
        message: {
          userId: 112,
          chatLogList: [
            {
              id: '112',
              types: 0,
              time: '2023.8.8 12:00:00',
              content: '你好啊'
            },
            {
              id: '1234',
              types: 0,
              time: '',
              content: '好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好'
            },
            {
              id: '1234',
              types: 0,
              time: '',
              content: '不好不好不好不好不好不好不好不好不好不好不好不好不好不好不好不好'
            }
          ]
        }
      },
      {
        id: 2,
        username: '数小智2',
        lastTime: '2021-05-01 12:00:00',
        avatar: '/static/avatar.png',
        message: {
          userId: 112,
          chatLogList: [
            {
              id: '112',
              types: 0,
              time: '2023.8.8 12:00:00',
              content: '你好啊'
            },
            {
              id: '1234',
              types: 0,
              time: '',
              content: '好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好'
            },
            {
              id: '1234',
              types: 0,
              time: '',
              content: '不好不好不好不好不好不好不好不好不好不好不好不好不好不好不好不好'
            }
          ]
        }
      },
      {
        id: 2,
        username: '数小智2',
        lastTime: '2021-05-01 12:00:00',
        avatar: '/static/avatar.png',
        message: {
          userId: 112,
          chatLogList: [
            {
              id: '112',
              types: 0,
              time: '2023.8.8 12:00:00',
              content: '你好啊'
            },
            {
              id: '1234',
              types: 0,
              time: '',
              content: '好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好'
            },
            {
              id: '1234',
              types: 0,
              time: '',
              content: '不好不好不好不好不好不好不好不好不好不好不好不好不好不好不好不好'
            }
          ]
        }
      },
      {
        id: 9,
        username: '数小智9',
        lastTime: '2021-05-01 12:00:00',
        avatar: '/static/avatar.png',
        message: {
          userId: 112,
          chatLogList: [
            {
              id: '112',
              types: 0,
              time: '2023.8.8 12:00:00',
              content: '你好啊'
            },
            {
              id: '1234',
              types: 0,
              time: '',
              content: '好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好'
            },
            {
              id: '1234',
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
