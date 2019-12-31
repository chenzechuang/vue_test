import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from "@/utils/auth"

NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/auth-redirect']

router.beforeEach((to, from, next) => {
    NProgress.start();
    if (getToken()) {

    } else {
        if (whiteList.indexOf(to.path) != -1) {
            
        }
    }
})