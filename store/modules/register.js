export default {
  namespaced: true,

  state: {
    // ユーザー一覧
    userList: [],
  },

  actions: {},

  mutations: {
    /**
     * ユーザー情報をstateに格納.
     * @param {*} state - ステート
     * @param {*} payload - ユーザー情報のオブジェクト
     */
    registerUser(state, payload) {
      state.userList.push(payload);
    },
  },

  getters: {
    /**
     * ユーザー一覧を取得.
     * @param {*} state - ステート
     * @returns ユーザー一覧
     */
    getUserList(state) {
      return state.userList;
    },
  },
};
