import router from './router'
import nProgress from 'nProgress'
import 'nProgress/nprogress.css' // progress bar style
import { getToken } from "@/utils/auth"


nProgress.configure({
  showSpinner: false
})

const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  nProgress.start();
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      next();
        // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        /* if (hasPermission(store.getters.roles, to.meta.roles)) {
          next()
        } else {
          next({ path: '/401', replace: true, query: { noGoBack: true }})
        } */
        // 可删 ↑
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
  nProgress.done() // finish progress bar
})