import * as types from './mutation-types';

const mutations = {
  [types.SET_USER_NAME] (state, userName) {
    state.userName = userName;
  },
  [types.SET_CART_NUM] (state, cartNum) {
    state.cartNum = cartNum;
  },
  [types.SET_AVATAR] (state, avatar) {
    state.avatar = avatar;
  },
  [types.SET_IS_LOGIN] (state, isLogin) {
    state.isLogin = isLogin;
  },
  [types.SET_PAY_LIST] (state, payList) {
    state.payList = payList;
  }
};

export default mutations;
