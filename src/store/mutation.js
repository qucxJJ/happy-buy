import * as types from './mutation-types';

const mutations = {
  [types.SET_USER_NAME] (state, userName) {
    state.userName = userName;
  },
  [types.SET_USER_ID] (state, userId) {
    state.userId = userId;
  }
};

export default mutations;
