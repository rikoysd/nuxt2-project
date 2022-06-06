export default {
  namespaced: true,

  state: {},

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
      // context.commit("showHotelList", response);
    },
  },

  mutations: {},

  getters: {},
};
