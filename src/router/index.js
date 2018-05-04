import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/pages/index/index.vue';
import Login from '@/pages/login/login.vue';
import Register from '@/pages/register/register.vue';
import ResetPassword from '@/pages/reset-password/reset-password.vue';
import ProductList from '@/pages/product-list/product-list.vue';
import ProductDetail from '@/pages/product-detail/product-detail.vue';
import UserCenter from '@/pages/user-center/user-center.vue';
import UserCenterContent from '@/pages/user-center/center.vue';
import UserInfo from '@/pages/user-center/info.vue';
import UserSafe from '@/pages/user-center/safe.vue';
import UserAddress from '@/pages/user-center/address.vue';
import ModifyPassword from '@/pages/user-center/modify-password.vue';
import ModifyPhone from '@/pages/user-center/modify-phone.vue';
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
    },
    {
      path: '/user-center',
      component: UserCenter,
      redirect: '/user-center/center',
      children: [
        {
          path: 'center',
          component: UserCenterContent
        },
        {
          path: 'info',
          component: UserInfo
        },
        {
          path: 'safe',
          component: UserSafe
        },
        {
          path: 'address',
          component: UserAddress
        },
        {
          path: 'modify-password',
          component: ModifyPassword
        },
        {
          path: 'modify-phone',
          component: ModifyPhone
        }
      ]
    }
  ]
});
