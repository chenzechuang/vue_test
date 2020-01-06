import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from "@/utils/auth"
import nProgress from 'nprogress'

NProgress.configure({
  showSpinner: false
})

const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  NProgress.start();
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      if (store.getters.roles.length === 0) {
        store.dispatch('GetUserInfo').then(res => {
          const roles = res.data.roles;
          store.dispatch('GenerateRoutes', {roles}).then(accessRoutes => {
            router.addRoutes(accessRoutes);
            next({replace: true});
          })
        }).catch(err => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err)
            next({ path: '/' })
          })
        })
      }
    }
  } else {
    if (whiteList.indexOf(to.path) != -1) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
      nProgress.done();
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})