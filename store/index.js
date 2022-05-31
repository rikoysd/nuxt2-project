import Vuex from "vuex";
import Vue from "vue";
import sample from "./modules/sample";
import axios from "@nuxtjs/axios";

Vue.use(Vuex);
export const state = {};

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
    console.log("call1");
    const response = await this.$axios.$get(
      `https://app.rakuten.co.jp/services/api/Travel/KeywordHotelSearch/20170426?applicationId=1098541415969458249&format=json&keyword=${keyword}`
    );
    console.dir(JSON.stringify(response));
    const payload = response.data;
    context.commit("showHotelList", payload);
  },
}; // end actions

export const mutations = {
  
};

export const modules = {
  sample,
};
