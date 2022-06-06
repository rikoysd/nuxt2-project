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

  getters: {
    /**
     * ユーザー情報を取得.
     * @param {*} state - ステート
     * @returns ユーザー情報
     */
    getUserInfo(state) {
      return state.userInfo;
    },
  },
};
