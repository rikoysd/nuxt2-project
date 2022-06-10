export default {
  namespaced: true,

  state: {
    // 閲覧履歴
    watchedList: [],
  },

  actions: {
    /**
     * 施設情報をAPIから取得.
     * @param {*} context
     */
    async searchHotel(context, number) {
      const response = await this.$axios.$get(
        `https://app.rakuten.co.jp/services/api/Travel/HotelDetailSearch/20170426?applicationId=1098541415969458249&format=json&responseType=large&hotelNo=${number}`
      );
      // console.dir(JSON.stringify(response));
      const payload = response.hotels[0].hotel;
      context.commit("setWatchedList", payload);
    },
  },

  mutations: {
    /**
     * ホテル情報をstateに格納.
     * @param {*} state - ステート
     * @param {*} payload - ホテル情報（配列）
     */
    setWatchedList(state, payload) {
      state.watchedList.push(payload);
    },
  },

  getters: {
    /**
     * 閲覧履歴を取得.
     * @param {*} state - ステート
     * @returns 閲覧履歴
     */
    getWatchedList(state) {
      return state.watchedList;
    },
  },
};
