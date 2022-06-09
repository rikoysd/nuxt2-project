export default {
  namespaced: true,

  state: {
    // ユーザー一覧
    userList: [],
    // 現在ログイン中のユーザー
    loginUser: {
      id: 0,
      fullName1: "",
      fullName2: "",
      zipcode: "",
      prefecture: "",
      address: "",
      mailAddress: "",
      telephone: "",
      password: "",
    },
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
    /**
     * ログイン中のユーザー情報をstateに格納.
     * @param {*} state - ステート
     */
    registerLoginUser(state) {
      state.loginUser = state.userList[0];
      console.log(state.loginUser);
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
    getLoginUser(state) {
      return state.loginUser;
    },
  },
};
