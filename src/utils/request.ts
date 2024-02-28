import axios, { AxiosError } from 'axios'
const BASE_URL = 'https://frckqy.laf.run'
export const TOKEN_KEY = 'json_web_token'

const service = axios.create({
  timeout: 5000,
  baseURL: BASE_URL
})

service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError) => {
    console.log(error)
    return Promise.reject()
  }
)

service.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      if (response.config.url === '/admin/login') {
        localStorage.setItem(TOKEN_KEY, response.data?.token || '')
      }
      return response.data
    } else {
      Promise.reject()
    }
  },
  (error: AxiosError) => {
    console.log(error)
    return Promise.reject()
  }
)

export default service
