//照片
interface PhotoData {
  /**
   * 链接
   */
  url: string
}
//通用类型
interface T1 {
  /**
   * 名字
   */
  name: string
  /**
   * id
   */
  id: number
}
//标签类型
interface Tag extends T1 {
  checked: boolean
}
//从属空间类型
interface SubordinateSpaceData extends T1 {
  /**
   * 父空间id
   */
  parent: number
}
//管理人类型
interface AdministratorData extends T1 {
  /**
   * 头像链接
   */
  avatar: string
}
//历史记录类型
interface HistoryData {
  /**
   * 名字
   */
  userName: string
  /**
   * 具体内容
   */
  content: string
  /**
   * 日期
   */
  date: number
}
//备注类型
interface CommentData {
  /**
   * 照片链接
   */
  url: PhotoData[]
  /**
   * 内容
   */
  content: string
}
export interface ItemData {
  /**
   * id
   */
  id: number
  /**
   * 照片
   */
  photo: PhotoData[]
  /**
   * 属性
   */
  attribute: number
  /**
   * 名字
   */
  name: string
  /**
   * 二维码
   */
  code: string
  /**
   * 隐私
   */
  privary: boolean
  /**
   * 标签
   */
  tag: Tag[]
  /**
   * 金额
   */
  amount: number
  /**
   * 数量
   */
  mount: number
  /**
   * 日期
   */
  date: number
  /**
   * 链接
   */
  url: string
  /**
   * 状态
   */
  state: string
  /**
   * 关联物品
   */
  associatedItem: T1[]
  /**
   * 从属空间
   */
  subordinateSpace: SubordinateSpaceData[[]]
  /**
   * 管理人
   */
  administrator: AdministratorData[]
  /**
   * 备注
   */
  comment: CommentData
  /**
   * 历史记录
   */
  history: historyData[]
}
