import Vue from "vue";
import Vuex from "vuex";
import { getNewGoods,getAllGoods } from "@/api/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    newGoods: null,
    userInfo: null,
    token: null,
    allGoods: null,
  },
  mutations: {
    setNewGoods(state, payload) {
      state.newGoods = payload;
    },
    setUserInfo(state, payload) {
      state.userInfo = payload;
    },
    setToken(state, payload) {
      state.token = payload;
    },
    setAllGoods(state, payload) {
      state.allGoods = payload;
    },
  },
  actions: {
    getNewsGoods(content) {
      getNewGoods().then((res) => {
        content.commit("setNewGoods", res.data);
      });
    },
    getAllsGoods(content) {
      getAllGoods().then((res) => {
        content.commit("setAllGoods", res.data);
      });
    },
  },
  modules: {},
});
