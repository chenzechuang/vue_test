import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login'),
  },
//   {
//     path: '/auth-redirect',
//     component: () => import('@/views/login/authredirect')
//   },
  {
    path: '',
    component: () => import('@/views/home'),
  }
]

export default new Router({
  mode:'history', // 默认为'hash'模式
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
