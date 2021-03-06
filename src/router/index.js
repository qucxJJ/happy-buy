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
import ModifyEmail from '@/pages/user-center/modify-email.vue';
import ModifyQuestion from '@/pages/user-center/modify-question.vue';
import FootList from '@/pages/foot-list/foot-list.vue';
import CollectionList from '@/pages/collection-list/collection-list.vue';
import ShopCart from '@/pages/shop-cart/shop-cart.vue';
import OrderConfirm from '@/pages/order-confirm/order-confirm.vue';
import PaySuccess from '@/pages/pay-success/pay-success.vue';
import OrderList from '@/pages/user-center/order-list.vue';
import OrderDetail from '@/pages/order-detail/order-detail.vue';
import EvalList from '@/pages/user-center/eval-list.vue';
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
          component: UserSafe,
          children: [
            {
              path: 'modify-password',
              component: ModifyPassword
            },
            {
              path: 'modify-phone',
              component: ModifyPhone
            },
            {
              path: 'modify-email',
              component: ModifyEmail
            },
            {
              path: 'modify-question',
              component: ModifyQuestion
            }
          ]
        },
        {
          path: 'address',
          component: UserAddress
        },
        {
          path: 'order-list',
          component: OrderList
        },
        {
          path: 'eval-list',
          component: EvalList
        }
      ]
    },
    {
      path: '/foot-list',
      component: FootList
    },
    {
      path: '/collection-list',
      component: CollectionList
    },
    {
      path: '/shop-cart',
      component: ShopCart
    },
    {
      path: '/order-confirm',
      component: OrderConfirm
    },
    {
      path: '/pay-success',
      component: PaySuccess
    },
    {
      path: '/order-detail',
      component: OrderDetail
    }
  ]
});
