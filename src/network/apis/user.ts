import service from '..'

export function getUserInfo(): Promise<any> {
  return service({
    url: '/users',
    method: 'GET'
  })
}
