import Vuex from "vuex";
import Vue from "vue";
import sample from "./modules/sample";
import searchInstitution from "./modules/searchInstitution";
import axios from "axios";

Vue.use(Vuex);
export const state = {
  // 空室情報
  // hotels[i].hotel[0]:基本情報
  //          .hotel[1]:詳細情報
  //          .hotel[2]:予約情報(料金)
  //          .hotel[3]:部屋情報(プラン１)
  //          .hotel[4]:部屋情報(プラン２)
  vacantList: [],
};

export const actions = {
  test2() {
    console.log("call2");
    this.dispatch("sample/getData", { root: true });
  },
  /**
   * 空室検索.
   */
  async searchVacantList() {
    console.log("call");
    const vacantResponce = await axios.get(
      `https://app.rakuten.co.jp/services/api/Travel/VacantHotelSearch/20170426?applicationId=1098541415969458249&format=json&largeClassCode=japan&middleClassCode=akita&smallClassCode=tazawa&checkinDate=2022-12-01&checkoutDate=2022-12-02&adultNum=2&responseType=large`
    );
    console.dir("response" + JSON.stringify(vacantResponce.data.hotels));
    this.commit("setVacantList", vacantResponce.data.hotels);
  },
  /**
   * 施設検索(モジュール:searchInstitution).
   */
  searchInstitution() {
    // console.log("call");
    this.dispatch("searchInstitution/searchInstitution", { root: true });
  },
}; // end actions

export const mutations = {
  /**
   * 空室検索の結果をstateにセット.
   */
  setVacantList(state, payload) {
    state.vacantList = { hotels: payload };
    // console.log(state.vacantList);
  },
};
export const getters = {
  /**
   * @param {*} state - ステート
   * @returns - 空室リスト
   */
  getVacantList(state) {
    return state.vacantList;
  },
  /*
   * @param {*} state - ステート
   * @returns - 施設情報
   */
  getInstitutitonInfo(state) {
    return state.searchInstitution;
  },
};
/**
 * vacantListの取得.
 */
export const modules = {
  sample,
  searchInstitution,
};
