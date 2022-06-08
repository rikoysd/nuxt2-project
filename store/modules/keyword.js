export default {
  namespaced: true,

  state: {
    // ページ情報
    pageInfo: {},
    // ホテル一覧
    hotelList: [],
    // エラーフラッグ
    flag: false,
  },

  actions: {
    /**
     * キーワード検索結果のホテルを取得する.
     * @param {*} context - コンテキスト
     * @param {*} keyword - キーワード
     */
    async getPageList(context, object) {
      try {
        const response = await this.$axios.$get(
          `https://app.rakuten.co.jp/services/api/Travel/KeywordHotelSearch/20170426?applicationId=1098541415969458249&format=json&page=${object.page}&responseType=large&keyword=${object.keyword}`
        );
        // console.dir(JSON.stringify(response));
        context.commit("showPageList", response);
      } catch (error) {
        // console.dir(JSON.stringify(error));
        let flag = true;
        context.commit("inputErrorList", flag);
      }
    },
  },

  mutations: {
    /**
     * キーワード検索結果のホテルをstateに格納.
     * @param {*} state - ステート
     * @param {*} payload - ホテル情報
     */
    showPageList(state, payload) {
      state.pageInfo = payload.pagingInfo;
      state.hotelList = payload.hotels;
    },
    /**
     * エラーをstateに格納.
     * @param {*} state - ステート
     * @param {*} payload - エラー情報
     */
    inputErrorList(state, payload) {
      console.log(payload);
      state.flag = payload;
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
    /**
     * エラー情報を取得する.
     * @param {*} state - ステート
     * @returns エラー情報
     */
    getErrorFlag(state) {
      return state.flag;
    },
  },
};
