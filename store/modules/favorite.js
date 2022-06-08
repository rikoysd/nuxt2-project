export default {
  namespaced: true,

  state: {
    // お気に入り一覧
    favoriteList: [],
  },

  actions: {
    /**
     * 施設情報をAPIから取得.
     * @param {*} context
     */
    async searchInstitution(context, number) {
      console.log(number);
      const response = await this.$axios.$get(
        `https://app.rakuten.co.jp/services/api/Travel/HotelDetailSearch/20170426?applicationId=1098541415969458249&format=json&hotelNo=${number}`
      );
      // console.dir(JSON.stringify(response));
      const payload = response.hotels[0].hotel;
      context.commit("setFavoriteList", payload);
    },
  },

  mutations: {
    /**
     * ホテル情報をstateに格納.
     * @param {*} state - ステート
     * @param {*} payload - ホテル情報（配列）
     */
    setFavoriteList(state, payload) {
      state.favoriteList.push(payload);
      console.log(state);
    },
  },

  getters: {
    /**
     * お気に入り一覧を取得.
     * @param {*} state - ステート
     * @returns ユーザー一覧
     */
    getFavoriteList(state) {
      return state.favoriteList;
    },
  },
};
