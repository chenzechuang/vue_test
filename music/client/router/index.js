import Vue from 'vue';
import Router from 'vue-router';
import cart from '../pages/cart/cart';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    components: {
        cart: cart,
    }
  }]
});
