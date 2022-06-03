import axios from "axios";
import { state } from "..";

export default {
  namespaced: true,

  state: {
    // 施設情報
    instituionInfo: [],
  },

  actions: {
    /**
     * 施設情報をAPIから取得.
     */
    async searchInstitution() {
      // console.log("call3");
      const response = await axios.get(
        "https://app.rakuten.co.jp/services/api/Travel/HotelDetailSearch/20170426?applicationId=1098541415969458249&format=json&hotelNo=183382"
      );
      const payload = response.data;
      this.commit("searchInstitution/setInstitutionInfo", payload);
      // console.log(payload);
    },
  },

  mutations: {
    /**
     * 施設情報をステートにセット.
     * @param {*} state - ステート
     * @param {*} payload - ペイロード
     */
    setInstitutionInfo(state, payload) {
      state.instituionInfo = { hotels: payload };
      // console.log(state.instituionInfo);
    },
  },
};
