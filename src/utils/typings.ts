export interface Pages<T> {
  /**
   * 当前页
   */
  current: number
  /**
   * 总共页
   */
  pages: number
  /**
   * 列表数组
   */
  records: T[]
  /**
   * 每页显示数量
   */
  size: number
  /**
   * 总共数量
   */
  total: number
}

export interface FullUserInfo {
  /**
   * 地址
   */
  address: string
  /**
   * 个人简介
   */
  brief: string
  /**
   * 创建时间
   */
  createTime: string
  /**
   * 邮箱
   */
  email: string
  /**
   * 头像
   */
  headPhoto: string
  /**
   * 用户id
   */
  id: string
  /**
   * 积分
   */
  integral: number
  /**
   * 手机号
   */
  phone: string
  /**
   * 性别，0 保密，1 男，2 女
   */
  sex: 0 | 1 | 2
  /**
   * 更新时间
   */
  updateTime: string
  /**
   * 用户名
   */
  username: string
  /**
   * 状态，0 黑名单，1 正常
   */
  state: 0 | 1
}

export interface FullItemInfo {
  /**
   * 物品 id
   */
  id: string
  /**
   * 物品名称
   */
  name: string
  /**
   * 隐私
   */
  privacy: 0 | 1
  /**
   * 预览图
   */
  previewImg: string
  /**
   * 物品属性，0表示空间，1表示物品
   */
  properties: 1
  /**
   * 物品数量
   */
  quantity: number
  /**
   * 物品金额
   */
  price: number
  /**
   * 物品状态
   */
  state: string
  /**
   * 物品标签
   */
  tags: string[]
  /**
   * 入库日期时间戳
   */
  storageTime: number
  /**
   * 关联物品
   */
  relatedItems: string[]
  /**
   * 从属空间
   */
  dependentSpace: string
  /**
   * 管理人
   */
  manager: string[]
  /**
   * 物品备注
   */
  notes: string
}
