import Vuex from "vuex";
import Vue from "vue";
import sample from "./modules/sample";
import axios from "axios";

Vue.use(Vuex);
export const state = { rankings: [] };

export const actions = {
  /**
   * 総合ランキング情報の取得.
   * @param {*} context
   * @returns
   */
  async getRankingList(context) {
    console.log("getRankingList");
    const response = await axios.get(
      "https://app.rakuten.co.jp/services/api/Travel/HotelRanking/20170426?applicationId=1098541415969458249&format=json&carrier=0&genre=all"
    );
    console.dir("response:" + JSON.stringify(response));
    const payload = response.data.Rankings[0].Ranking.hotels;
    context.commit("getHotelList", payload);
    return payload;
  },
}; // end actions

export const mutations = {
  /**
   * 総合ランキング情報をstateに格納する.
   */
  getHotelList(state, payload) {
    for (const hotel of payload) {
      state.rankings.push(hotel);
    }
  },
};
export const getters = {
  getHotels(state) {
    return state.rankings;
  },
};

export const modules = {
  sample,
};
