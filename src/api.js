import { factory } from '@/common/http-methods';

let obj = {
  get: {
    get_user_info: '/users/get_user_info',
    get_category_list: '/categories/get_category_list',
    get_product_list: '/products/get_product_list',
    get_product_detail: '/products/get_product_detail',
    get_address_list: '/users/get_address_list',
    get_user_extra_data: '/users/get_user_extra_data',
    get_email_phone: '/users/get_email_phone',
    get_old_question: '/users/get_old_question',
    get_province_list: '/cities/get_province_list',
    get_cities_list: '/cities/get_cities_list',
    get_county_list: '/cities/get_county_list',
    get_slider_pic: '/products/get_slider_pic',
    get_foot_list: '/users/get_foot_list',
    get_cart_list: '/users/get_cart_list',
    get_express_list: '/express/get_express_list'
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
    modify_phone: '/users/modify_phone',
    check_old_email: '/users/check_old_email',
    modify_email: '/users/modify_email',
    check_old_answer: '/users/check_old_answer',
    modify_question_and_answer: '/users/modify_question_and_answer',
    add_new_address: '/users/add_new_address',
    set_default_address: '/users/set_default_address',
    edit_address_info: '/users/edit_address_info',
    delete_address: '/users/delete_address',
    delete_from_foot_list: '/users/delete_from_foot_list',
    delete_from_collection_list: '/users/delete_from_collection_list',
    toggle_collection_status: '/users/toggle_collection_status',
    add_to_cart: '/users/add_to_cart',
    modify_cart_product_num: '/users/modify_cart_product_num',
    delete_from_cart: '/users/delete_from_cart',
    submit_order: '/orders/submit_order'
  }
};

export default factory(obj);
