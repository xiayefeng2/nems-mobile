import axios from 'axios'
import qs from 'qs'
import i18n  from '@/i18n'

const instance = axios.create({
  // baseURL: 'https://api.example.com'
})

instance.defaults.timeout = 6000
console.log(i18n.$t('app.netError'))
instance.interceptors.request.use(
  config => {
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data'
    } else if (config.data) {
      config.headers['Content-Type'] = 'application/json;charset=UTF-8'
    }
    return config
  },
  error => Promise.reject(error)
)

instance.interceptors.response.use(
  resp => {
    // console.log(resp)
    const res = resp.data
    return Promise.resolve(res)
  },
  error => {
    // console.log(error)
    if (error.message.includes('Network')) {
      error.message = '网络不给力，请稍后再试'
    } else if (error.message.includes('timeout')) {
      error.message = '请求超时，请稍后重试'
    } else {
      error.message = '连接出错，请重试'
    }
    return Promise.reject(error)
  }
)

export default ({ url, method = 'get', params = {}, data = {}, ...rest } = {}) => {
  // console.log(url)
  // console.log(params)
  if (!url) {
    return
  }
  if (/[A-Z]/.test(method)) {
    method = method.toLocaleLowerCase()
  }
  return new Promise((resolve, reject) => {
    instance.request({
      url,
      params,
      data,
      method,
      ...rest
    }).then((res) => {
      return resolve(res)
    }).catch(error => {
      // console.log(error)
      if (axios.isCancel(error)) {
        console.log('Request canceled', error.message)
      }
      return reject(error)
    })
  })
}