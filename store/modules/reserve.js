export default {
  namespaced: true,

  state: {
    // 予約情報
    reserveInfo: {},
  },

  actions: {},

  mutations: {
    /**
     * 予約情報をstateに格納.
     * @param {*} state - ステート
     * @param {*} payload - 予約情報のオブジェクト
     */
    reserveInfo(state, payload) {
      state.reserveInfo = payload;
      console.log(state.reserveInfo);
    },
  },
};
