import type { FullUserInfo } from '../utils/typings'

export type UserInfo = Omit<FullUserInfo, 'state'>