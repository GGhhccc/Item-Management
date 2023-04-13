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

