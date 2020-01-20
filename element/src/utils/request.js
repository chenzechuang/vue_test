import axios from 'axios'
import { Message } from 'element-ui'
/* import store from '@/store'
import { getToken } from '@/utils/auth' */

const services = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  withCredentials: true,
  timeout: 5000
})

services.interceptors.request.use(
  config => {
/*     if (store.gettters.token) {
      config.headers['user-Token'] = getToken()
    } */
    return config
  },
  error => {
    return Promise.reject(error);
  }
)
services.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.status !== 0) {
      return res
    } else {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(res.message || 'Error'))
    }
  },

  error => {
    console.log('err' + error);
    return Promise.reject(error);
  }
)
export default services