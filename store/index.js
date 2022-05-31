import Vuex from "vuex";
import Vue from "vue";
import sample from "./modules/sample";
import axios from "@nuxtjs/axios";

Vue.use(Vuex);
export const state = () => ({
  // キーワード検索・ページ情報
  pageInfo: {},
  // キーワード検索・ホテル一覧
  hotelList: [],
});

export const actions = {
  test2() {
    console.log("call2");
    this.dispatch("sample/getData", { root: true });
  },
  /**
   * キーワード検索結果のホテルを取得する.
   * @param {*} context - コンテキスト
   * @param {*} keyword - キーワード
   */
  async getHotelList(context, keyword) {
    const response = await this.$axios.$get(
      `https://app.rakuten.co.jp/services/api/Travel/KeywordHotelSearch/20170426?applicationId=1098541415969458249&format=json&keyword=${keyword}`
    );
    console.dir(JSON.stringify(response));
    context.commit("showHotelList", response);
  },
}; // end actions

export const mutations = {
  /**
   * キーワード検索結果のホテルをstateに格納.
   * @param {*} state
   * @param {*} payload
   */
  showHotelList(state, payload) {
    state.pageInfo = payload.pagingInfo;
    state.hotelList = payload.hotels;
  },
};

export const modules = {
  sample,
};
