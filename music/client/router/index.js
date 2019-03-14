import Vue from 'vue';
import Router from 'vue-router';
//一个个link对象 - 分类
import Home from '../pages/home/home';
import Cart from '../pages/cart/cart';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    components: {
      default: Home,
      cart: Cart,
    }
  }]
});
