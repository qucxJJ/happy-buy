import { factory } from '@/common/http-methods';

let obj = {
  get: {
    get_user_info: '/users/get_user_info',
    get_category_list: '/categories/get_category_list',
    get_product_list: '/products/get_product_list',
    get_product_detail: '/products/get_product_detail'
  },
  post: {
    login: '/users/login',
    logout: '/users/logout',
    check_name_avail: '/users/check_name_avail',
    check_phone_avail: '/users/check_phone_avail',
    check_email_avail: '/users/check_email_avail',
    register: '/users/register'
  }
};

export default factory(obj);
