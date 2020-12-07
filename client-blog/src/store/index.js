import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentId: -1,
    closeAreMethod: "",
    resetMethod: "",
  },
  mutations: {
    chanageCurrentId(state, id) {
      state.currentId = id;
    },
    chanageCurrentHeight(state, method) {
      state.closeAreMethod = method;
    },
    setResetMethod(state, payload) {
      state.resetMethod = payload;
    },
  },
  actions: {},
  modules: {},
});
