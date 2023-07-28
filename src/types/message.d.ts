export interface MessageList {
  /**
   * 当前所在页
   */
  currentPage: number
  /**
   * 总页数
   */
  total: number
  /**
   * 消息框数组
   */
  messageList: MessageItem[]
}

export interface MessageItem {
  /**
   * 消息id
   */
  id: number
  /**
   * 用户头像
   */
  avatar: string
  /**
   * 用户名
   */
  username: string
  /**
   * 最后交流时间
   */
  lastTime: string
  /**
   * 聊天记录界面
   */
  message: MessageDetail
}

// 聊天界面
export interface MessageDetail {
  /**
   * 当前聊天的用户id
   */
  userId: number
  /**
   * 与当前用户的聊天记录
   */
  chatLogList: MessageDetailLogs[]
}

// 聊天记录
export interface MessageDetailLogs {
  /**
   * 当条消息发送者的id
   */
  id: string
  /**
   * 类型
   */
  types: number
  /**
   * 时间
   */
  time: string
  /**
   * 内容
   */
  content: string
}
