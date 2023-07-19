import service from '..'
import { uploadFileService } from '../index'

export function getUserInfo(): Promise<any> {
  return service({
    url: '/users',
    method: 'GET'
  })
}

export function changeUserAvatar(filePath: string): Promise<any> {
  return uploadFileService({
    url: '/users/avatar',
    filePath
  })
}

export function changeUserName(name: string): Promise<any> {
  return service({
    url: `/users/name?name=${name}`,
    method: 'PUT'
  })
}
