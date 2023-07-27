export const __PROD__ = import.meta.env.PROD

const productionBaseUrl = 'https://lizhouweb.top/writerApi'
const developmentBaseUrl = 'http://bek75i.natappfree.cc/smart/management/api'

export const __BASE_URL__ = __PROD__ ? productionBaseUrl : developmentBaseUrl

export const __API_TIMEOUT__ = 6000
