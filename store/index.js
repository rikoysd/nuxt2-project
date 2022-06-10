import Vuex from "vuex";
import Vue from "vue";
import searchInstitution from "./modules/searchInstitution";
import axios1 from "axios";
import axios from "@nuxtjs/axios";
import register from "./modules/register";
import keyword from "./modules/keyword";
import reserve from "./modules/reserve";

Vue.use(Vuex);
export const state = () => ({
  //総合ランキング情報
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
  //地区情報
  areaList: [],
  // 施設情報
  instituionInfo: [],
  stayPlanFlag: false,
  preReserveData: "",
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
        `https://app.rakuten.co.jp/services/api/Travel/HotelDetailSearch/20170426?applicationId=1098541415969458249&format=json&hotelNo=${paramsNo}&responseType=large`
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
  async searchVacantList(context, vacantData) {
    console.log("call");
    console.log(vacantData.roomNum);
    // console.log("call");
    const vacantResponce = await axios1.get(
      // `https://app.rakuten.co.jp/services/api/Travel/VacantHotelSearch/20170426?applicationId=1098541415969458249&format=json&largeClassCode=japan&middleClassCode=${middleClassCode}&smallClassCode=${smallClassCode}&detailClassCode=${detailClassCode}&checkinDate=${checkinDate}&checkoutDate=${checkoutDate}&adultNum=${adultNum}&roomNum=${roomNum}&responseType=large`
      `https://app.rakuten.co.jp/services/api/Travel/VacantHotelSearch/20170426?applicationId=1098541415969458249&format=json&largeClassCode=japan&middleClassCode=${vacantData.middleClassCode}&smallClassCode=${vacantData.smallClassCode}&checkinDate=${vacantData.checkinDate}&checkoutDate=${vacantData.checkoutDate}&adultNum=${vacantData.adultNum}&roomNum=${vacantData.roomNum}&responseType=large`
    );
    console.dir("response" + JSON.stringify(vacantResponce.data.hotels));
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
      if (vacantResponce !== null) {
        // console.dir("response" + JSON.stringify(vacantResponce));
        context.commit("setVacantList", vacantResponce.data.hotels);
        context.commit("changeStayFlag");
      } else {
        context.commit("changeErrorStayFlag");
      }
    } catch (error) {
      alert("該当する宿泊プランが存在しません");
      console.log(error.response.status);
    }
    // finally {
    //   console.log(errorStatus);
    //   if (errorStaus !== 404) {
    //     context.commit("changeStayFlag");
    //   } else {
    //     context.commit("changeErrorStayFlag");
    //   }
    // }
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
  /**
   * 地区コードの取得.
   *  @param {*} context - コンテキスト
   */
  async getAreaCode(context) {
    const response = await axios1.get(
      "https://app.rakuten.co.jp/services/api/Travel/GetAreaClass/20131024?applicationId=1098541415969458249&format=json"
    );
    console.dir("response:" + JSON.stringify(response));
    const payload = response.data.areaClasses.largeClasses[0].largeClass[1];
    console.log(payload);
    context.commit("showAreaList", payload);
  },
  /**
   * keyword.jsにページ数とキーワードを渡す.
   * @param {*} context - コンテキスト
   * @param {*} object - ページ数、キーワード
   */
  getPageList(context, object) {
    context.dispatch("keyword/getPageList", object, { root: true });
  },
}; // end actions

export const mutations = {
  /**
   * 総合ランキング情報をstateに格納.
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
  setPreReserveData(state, payload) {
    state.preReserveData = payload;
  },
  changeErrorStayFlag(state) {
    state.stayPlanFlag = false;
  },
  changeStayFlag(state) {
    state.stayPlanFlag = true;
  },
  /**
   *地区コード情報をstateに格納.
   */
  showAreaList(state, payload) {
    state.areaList = payload;
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

  /**
   * reserve.jsに予約情報を渡す.
   * @param {*} state - ステート
   * @param {*} object - 予約情報のオブジェクト
   */
  reserve(state, object) {
    this.commit("reserve/reserveInfo", object);
  },
}; //end of mutations

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
  /**
   *
   * @param {*} state - ステート
   * @returns - 総合ランキング情報
   */
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
  /**
   * @param {*} state - ステート
   * @returns - 地区コード情報
   */
  getAreaList(state) {
    return state.areaList;
  },
  getStayFlag(state) {
    return state.stayPlanFlag;
  },
};

export const modules = {
  searchInstitution,
  register,
  keyword,
  reserve,
};
