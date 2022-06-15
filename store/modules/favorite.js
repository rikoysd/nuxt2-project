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
      const response = await this.$axios.$get(
        `https://app.rakuten.co.jp/services/api/Travel/HotelDetailSearch/20170426?applicationId=1098541415969458249&format=json&responseType=large&hotelNo=${number}`
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
    },
    /**
     * お気に入り一覧からホテルを削除しstateに格納.
     * @param {*} state - ステート
     * @param {*} payload - ホテル番号
     */
    deleteFavorite(state, payload) {
      for (let i = 0; i < state.favoriteList.length; i++) {
        console.log(state.favoriteList[i][0].hotelBasicInfo.hotelNo);
        if (payload === state.favoriteList[i][0].hotelBasicInfo.hotelNo) {
          state.favoriteList.splice(i, 1);
        }
      }
    },
  },

  getters: {
    /**
     * お気に入り一覧を取得.
     * @param {*} state - ステート
     * @returns お気に入り一覧
     */
    getFavoriteList(state) {
      return state.favoriteList;
    },
  },
};
