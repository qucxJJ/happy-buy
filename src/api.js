import { factory } from '@/common/http-methods';

let obj = {
  get: {
    get_user_info: '/users/get_user_info',
    get_category_list: '/categories/get_category_list',
    get_product_list: '/products/get_product_list',
    get_product_detail: '/products/get_product_detail',
    get_address_list: '/users/get_address_list',
    get_user_extra_data: '/users/get_user_extra_data',
    get_email_phone: '/users/get_email_phone'
  },
  post: {
    login: '/users/login',
    logout: '/users/logout',
    check_name_avail: '/users/check_name_avail',
    check_phone_avail: '/users/check_phone_avail',
    check_email_avail: '/users/check_email_avail',
    register: '/users/register',
    get_reset_question: '/users/get_reset_question',
    check_reset_answer: '/users/check_reset_answer',
    reset_password: '/users/reset_password',
    set_user_extra_data: '/users/set_user_extra_data',
    check_old_password: '/users/check_old_password',
    modify_password: '/users/modify_password',
    check_old_phone: '/users/check_old_phone',
    modify_phone: '/users/modify_phone'
  }
};

export default factory(obj);
