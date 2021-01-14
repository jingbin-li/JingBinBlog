import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentId: -1,
    closeAreMethod: "",
    resetMethod: "",
    currentArticleId: "",
    getCommentsMothod: "",
    commentType: "",
    isOpenMobileMenuList: false,
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
    setCurrentArticleId(state, id) {
      state.currentArticleId = id;
    },
    setCommentsListMonthd(state, method) {
      state.getCommentsMothod = method;
    },
    setCommentType(state, type) {
      state.commentType = type;
    },
    setIsOpenMobileMenuList(state, tag) {
      state.isOpenMobileMenuList = tag;
    },
  },
  actions: {},
  modules: {},
});
