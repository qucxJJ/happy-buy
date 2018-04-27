import Vue from 'vue';
import Vuex from 'vuex';
import state from './state.js';
import * as getters from './getters';
import * as actions from './actions';
import mutations from './mutation';
import createLogger from 'vuex/dist/logger';

Vue.use(Vuex);

// 线下调试debug为true，线上不使用debug
const debug = process.env.NODE_ENV !== 'production';
/* eslint-disable */
export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
