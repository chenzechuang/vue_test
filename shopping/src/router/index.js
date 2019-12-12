import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'

Vue.use(Router)

export const constantRoutes = [
  {
    path: '/',
    name: 'index',
    component: index
  }
]

export default new Router({
  mode:'history', // 默认为'hash'模式
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
