export default {
  namespaced: true,

  state: {
    // 予約情報
    reserveInfo: {},
    // ホテル詳細情報
    detailInfo: {},
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
    },
    /**
     * ホテル詳細情報をstateに格納.
     * @param {*} state - ステート
     * @param {*} payload - ホテル詳細情報のオブジェクト
     */
    detailInfo(state, payload) {
      state.detailInfo = payload;
    },
  },

  getters: {
    getReserveInfo(state) {
      return state.reserveInfo;
    },
    getDetailInfo(state) {
      return state.detailInfo;
    },
  },
};
