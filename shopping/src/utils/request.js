import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

const services = axios.create({
    baseURL: baseURL,
    timeout: timeout,
    headers: headers
})