import type { FullUserInfo } from '../utils/typings'

export type UserInfo = Pick<FullUserInfo, 'id' | 'avatar' | 'name' | 'qrCode'>
