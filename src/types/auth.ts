// 密码登录的表单数据
export interface PasswordLoginForm {
  /**
   * 手机号
   */
  account: string
  /**
   * 密码
   */
  password: string
}

// 响应数据
export interface LoginResponse {
  token: string
  id: string
}

// 表单校验类型
export interface FormItemRule {
  // rule 太复杂懒得写
  rule: any
  value: any
  callback: (error?: string | Error) => void
}
