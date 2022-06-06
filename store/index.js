import Vuex from "vuex";
import Vue from "vue";
import searchInstitution from "./modules/searchInstitution";
import axios1 from "axios";
import axios from "@nuxtjs/axios";
import register from "./modules/register";

Vue.use(Vuex);
export const state = () => ({
  rankings: [],
  // キーワード検索・ページ情報
  pageInfo: {},
  // キーワード検索・ホテル一覧
  hotelList: [],
  // 空室情報
  // hotels[i].hotel[0]:基本情報
  //          .hotel[1]:詳細情報
  //          .hotel[2]:予約情報(料金)
  //          .hotel[3]:部屋情報(プラン１)
  //          .hotel[4]:部屋情報(プラン２)
  vacantList: [],
  // 施設情報
  instituionInfo: [],
});

export const actions = {
  /**
   * 総合ランキング情報の取得.
   * @param {*} context
   * @returns
   */
  async getRankingList(context) {
    console.log("getRankingList");
    const response = await axios1.get(
      "https://app.rakuten.co.jp/services/api/Travel/HotelRanking/20170426?applicationId=1098541415969458249&format=json&carrier=0&genre=all"
    );
    console.dir("response:" + JSON.stringify(response));
    const payload = response.data.Rankings[0].Ranking.hotels;
    context.commit("getHotelList", payload);
    return payload;
  },
  /**
   * 施設情報をAPIから取得.
   * @param {*} context
   */
  async searchInstitution(context, paramsNo) {
    // console.log("call3");
    try {
      const response = await axios1.get(
        `https://app.rakuten.co.jp/services/api/Travel/HotelDetailSearch/20170426?applicationId=1098541415969458249&format=json&hotelNo=${paramsNo}`
      );

      const payload = response.data;
      context.commit("setInstitutionInfo", payload);
      console.log(payload);
    } catch (error) {
      alert("該当する宿泊施設が存在しません");
      console.log(error);
    }
  },
  /**
   * 空室検索.
   * @param {*} context
   */
  async searchVacantList(context) {
    // console.log("call");
    const vacantResponce = await axios1.get(
      `https://app.rakuten.co.jp/services/api/Travel/VacantHotelSearch/20170426?applicationId=1098541415969458249&format=json&largeClassCode=japan&middleClassCode=akita&smallClassCode=tazawa&checkinDate=2022-12-01&checkoutDate=2022-12-02&adultNum=2&responseType=large`
    );
    // console.dir("response" + JSON.stringify(vacantResponce.data.hotels));
    context.commit("setVacantList", vacantResponce.data.hotels);
  },
  /**
   * 一件空室検索.
   * @param {*} context
   */
  async searchVacant(context, params) {
    try {
      console.log(params);
      const vacantResponce = await axios1.get(
        `https://app.rakuten.co.jp/services/api/Travel/VacantHotelSearch/20170426?applicationId=1098541415969458249&format=json&checkinDate=${params.checkinDate}&checkoutDate=${params.checkoutDate}&adultNum=${params.adultNum}&hotelNo=${params.hotelNo}&responseType=large`
      );
      // console.dir("response" + JSON.stringify(vacantResponce.data.hotels));
      context.commit("setVacantList", vacantResponce.data.hotels);
    } catch (error) {
      alert("該当する施設が存在しません");
      console.log(error);
    }
  },
  // /**
  //  * 施設検索(モジュール:searchInstitution).
  //  */
  // searchInstitution() {
  //   // console.log("call");
  //   this.dispatch("searchInstitution/searchInstitution", { root: true });
  // },

  /**
   * キーワード検索結果のホテルを取得する.
   * @param {*} context - コンテキスト
   * @param {*} keyword - キーワード
   */
  async getHotelList(context, keyword) {
    const response = await this.$axios.$get(
      `https://app.rakuten.co.jp/services/api/Travel/KeywordHotelSearch/20170426?applicationId=1098541415969458249&format=json&responseType=large&keyword=${keyword}`
    );
    // console.dir(JSON.stringify(response));
    context.commit("showHotelList", response);
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
  /**
   * キーワード検索結果のホテルをstateに格納.
   * @param {*} state
   * @param {*} payload
   */
  showHotelList(state, payload) {
    state.pageInfo = payload.pagingInfo;
    state.hotelList = payload.hotels;
  },
  /**
   * 空室検索の結果をstateにセット.
   * @param {*} state - ステート
   * @param {*} payload - ペイロード
   */
  setVacantList(state, payload) {
    state.vacantList = { hotels: payload };
    // console.log(state.vacantList);
  },
  /**

   * 施設情報をステートにセット.
   * @param {*} state - ステート
   * @param {*} payload - ペイロード
   */
  setInstitutionInfo(state, payload) {
    state.instituionInfo = { hotels: payload };
    // console.log(state.instituionInfo);
  },
  /** register.jsにユーザー情報を渡す.
   * @param {*} state - ステート
   * @param {*} object - ユーザー情報のオブジェクト
   */
  register(state, object) {
    this.commit("register/registerUser", object);
  },
};

export const getters = {
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
    // return state.searchInstitution;
    return state.instituionInfo;
  },
  getHotels(state) {
    return state.rankings;
  },
  /**
   * vacantListの取得.
   */
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
  searchInstitution,
  register,
};
