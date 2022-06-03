export default {
  namespaced: true,

  state: {
    // ユーザー情報
    userInfo: {},
  },

  actions: {},

  mutations: {
    /**
     * ユーザー情報をstateに格納.
     * @param {*} state - ステート
     * @param {*} payload - ユーザー情報のオブジェクト
     */
    registerUser(state, payload) {
      state.userInfo = payload;
    },
  },
};
