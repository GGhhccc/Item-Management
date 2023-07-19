import service from '..'
import type { PasswordLoginForm } from '@/types/auth'

// 密码登录
export function loginByPassword(params: PasswordLoginForm): Promise<any> {
  return service({
    url: '/users/login',
    method: 'POST',
    data: params
  })
}
