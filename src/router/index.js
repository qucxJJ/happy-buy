import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/pages/index/index.vue';
import Login from '@/pages/login/login.vue';
import Register from '@/pages/register/register.vue';
import ResetPassword from '@/pages/reset-password/reset-password.vue';
import ProductList from '@/pages/product-list/product-list.vue';
import ProductDetail from '@/pages/product-detail/product-detail.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/reset-password',
      component: ResetPassword
    },
    {
      path: '/product-list',
      component: ProductList
    },
    {
      path: '/product-detail',
      component: ProductDetail
    }
  ]
});
