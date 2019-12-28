import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRoutes = [
  {
    path: '',
    component: () => import('@/views/home'),
  },
  {
    path: '/item',
    component: () => import('@/views/item'),
  },
  {
    path: '/score',
    component: () => import('@/views/score'),
  }
]

export default new Router({
  mode:'history', // 默认为'hash'模式
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
