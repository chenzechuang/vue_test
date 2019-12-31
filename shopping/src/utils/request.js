import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken} from '@/utils/auth'

const services = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 5000
})

services.interceptors.request.use(
  config => {
    if (store.gatters.token) {
      config.headers['X-Token'] = getToken();
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
)

services.interceptors.response.use(
  response => response,

  error => {
    Message.error({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error);
  }
)

export default services;