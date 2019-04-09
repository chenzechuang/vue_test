import Vue from 'vue';
import Router from 'vue-router';
import Cart from '../pages/cart/cart';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    components: {
      cart: Cart,
    }
  }]
});
