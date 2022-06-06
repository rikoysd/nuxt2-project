export default {
  namespaced: true,

  state: {
    pageInfo: {},
    hotelList: [],
  },

  actions: {
    /**
     * キーワード検索結果のホテルを取得する.
     * @param {*} context - コンテキスト
     * @param {*} keyword - キーワード
     */
    async getPageList(context, object) {
      console.log(object);
      const response = await this.$axios.$get(
        `https://app.rakuten.co.jp/services/api/Travel/KeywordHotelSearch/20170426?applicationId=1098541415969458249&format=json&page=${object.page}&responseType=large&keyword=${object.keyword}`
      );
      // console.dir(JSON.stringify(response));
      context.commit("showPageList", response);
    },
  },

  mutations: {
    /**
     * キーワード検索結果のホテルをstateに格納.
     * @param {*} state
     * @param {*} payload
     */
    showPageList(state, payload) {
      state.pageInfo = payload.pagingInfo;
      state.hotelList = payload.hotels;
    },
  },

  getters: {
    /**
   * ページ情報を取得する.
   * @param {*} state - ステート
   * @returns ページ情報
   */
  getPageInfo(state) {
    return state.pageInfo;
  },
  /**
   * ホテル一覧を取得する.
   * @param {*} state - ステート
   * @returns ホテル一覧
   */
  getHotelList(state) {
    return state.hotelList;
  },
  },
};
