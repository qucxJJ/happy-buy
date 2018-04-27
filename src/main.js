// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import VueLazyLoad from 'vue-lazyload';
import { Breadcrumb, BreadcrumbItem, Message, Steps, Step, Pagination } from 'element-ui';

Vue.component(Breadcrumb.name, Breadcrumb);
Vue.component(BreadcrumbItem.name, BreadcrumbItem);
Vue.component(Message.name, Message);
Vue.component(Steps.name, Steps);
Vue.component(Step.name, Step);
Vue.component(Pagination.name, Pagination);

Vue.config.productionTip = false;

Vue.use(VueLazyLoad, {
  loading: require('@/assets/logo.png')
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});