import Vuex from "vuex";
import Vue from "vue";
import searchInstitution from "./modules/searchInstitution";
import axios1 from "axios";
import register from "./modules/register";
import keyword from "./modules/keyword";
import reserve from "./modules/reserve";
import favorite from "./modules/favorite";
import watchedList from "./modules/watchedList";

Vue.use(Vuex);
export const state = () => ({
  //総合ランキング情報
  rankings: [],
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
  // 宿泊プラン表示フラグ
  stayPlanFlag: false,
  // 予約用のパラメータ
  preReserveData: "",
  //検索条件
  searchResult: [],
  // ページ情報（空室検索）
  pageInfo: {},
  // ホテル一覧（空室検索）
  hotelList: [],
  // 空室検索のエラーフラグ
  searchErrorFlag: false,
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
   * @param {*} params - ホテル番号
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
   * @param {*} params - 検索条件のオブジェクト
   */
  async searchVacantList(context, vacantData) {
    try {
      const vacantResponce = await axios1.get(
        `https://app.rakuten.co.jp/services/api/Travel/VacantHotelSearch/20170426?applicationId=1098541415969458249&format=json&largeClassCode=japan&middleClassCode=${vacantData.middleClassCode}&smallClassCode=${vacantData.smallClassCode}&detailClassCode=${vacantData.detailClassCode}&checkinDate=${vacantData.checkinDate}&checkoutDate=${vacantData.checkoutDate}&adultNum=${vacantData.adultNum}&roomNum=${vacantData.roomNum}&responseType=large&page=${vacantData.page}`
      );
      // console.dir("response" + JSON.stringify(vacantResponce.data));

      context.commit("setVacantData", vacantResponce.data);
    } catch (error) {
      console.log(error);
      context.commit("setErrorFlag");
    }
  },
  /**
   * 一件空室検索.
   * @param {*} context
   * @param {*} params - 検索条件のオブジェクト
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
      context.commit("setVacantList", "");
      alert("該当する宿泊プランが存在しません");
      console.log(error.response.status);
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
   * 地区コードの取得.
   *  @param {*} context - コンテキスト
   */
  async getAreaCode(context) {
    const response = await axios1.get(
      "https://app.rakuten.co.jp/services/api/Travel/GetAreaClass/20131024?applicationId=1098541415969458249&format=json"
    );
    // console.dir("response:" + JSON.stringify(response));
    const payload = response.data.areaClasses.largeClasses[0].largeClass[1];
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
  /**
   * favorite.jsにホテル番号を渡す（お気に入り一覧）.
   * @param {*} context - コンテキスト
   * @param {*} number - ホテル番号
   */
  searchHotel(context, number) {
    context.dispatch("favorite/searchInstitution", number, { root: true });
  },
  /**
   * watchedList.jsにホテル番号を渡す（閲覧履歴）.
   * @param {*} context - コンテキスト
   * @param {*} number - ホテル番号
   */
  searchHotel2(context, number) {
    context.dispatch("watchedList/searchHotel", number, { root: true });
  },
  /** register.jsにユーザー情報を渡す.
   * @param {*} context - コンテキスト
   * @param {*} object - ユーザー情報のオブジェクト
   */
  register(context, object) {
    context.dispatch("register/registerUser", object, { root: true });
  },
  /**
   * ユーザー一覧を取得する.
   * @param {*} context - コンテキスト
   */
  getUserList(context) {
    context.dispatch("register/getUser");
  },
}; // end actions

export const mutations = {
  /**
   * 総合ランキング情報をstateに格納.
   * @param {*} state - ステート
   * @param {*} payload - ペイロード
   */
  getHotelList(state, payload) {
    for (const hotel of payload) {
      state.rankings.push(hotel);
    }
  },
  /**
   * 空室検索の結果をstateにセット.
   * @param {*} state - ステート
   * @param {*} payload - ペイロード
   */
  setVacantList(state, payload) {
    state.vacantList = "";
    state.vacantList = { hotels: payload };
    console.log("state.vacantList", state.vacantList);
  },
  /**
   * 空室検索の結果をstateにセット.
   * @param {*} state - ステート
   * @param {*} payload - ページ情報とホテル一覧
   */
  setVacantData(state, payload) {
    state.pageInfo = payload.pagingInfo;
    state.hotelList = payload.hotels;
  },
  /**
   * 検索条件をステートに格納.
   * @param {*} state - ステート
   * @param {*} payload  - ペイロード
   */
  searchResultList(state, payload) {
    state.searchResult = payload;
  },
  /**
   * setPreReserveDataにセットする.
   * @param {*} state - ステート
   * @param {*} payload  - ペイロード
   */
  setPreReserveData(state, payload) {
    state.preReserveData = payload;
  },
  /**
   * stayFlagをtrueにする.
   * @param {*} state - ステート
   */
  changeErrorStayFlag(state) {
    state.stayPlanFlag = false;
  },
  /**
   * stayFlagをfalseにする.
   * @param {*} state - ステート
   */
  changeStayFlag(state) {
    state.stayPlanFlag = true;
  },
  /**
   *地区コード情報をstateに格納.
   * @param {*} state - ステート
   * @param {*} payload - ペイロード
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
  /**
   * reserve.jsにホテル詳細情報を渡す.
   * @param {*} state - ステート
   * @param {*} object - ホテル詳細情報のオブジェクト
   */
  reserve2(state, detailObject) {
    this.commit("reserve/detailInfo", detailObject);
  },
  /**
   * keyword.jsにエラー判定を渡す.
   * @param {*} state - ステート
   * @param {*} payload - エラー判定
   */
  changeFlag(state, payload) {
    this.commit("keyword/changeErrorFlag", payload);
  },
  /**
   * favorite.jsにホテル番号を渡す.
   * @param {*} state - ステート
   * @param {*} payload - ホテル番号
   */
  deleteFavorite(state, payload) {
    this.commit("favorite/deleteFavorite", payload);
  },
  /**
   * register.jsのregisterLoginUserを呼び出す.
   * @param {*} state - ステート
   */
  registerLoginUser(state) {
    this.commit("register/registerLoginUser");
  },
  /**
   * register.jsのdeleteLoginUserを呼び出す.
   * @param {*} state - ステート
   */
  deleteUser(state) {
    this.commit("register/deleteLoginUser");
  },
  /**
   * 空室検索のエラーをstateに格納.
   * @param {*} state - ステート
   */
  setErrorFlag(state) {
    state.searchErrorFlag = true;
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
   * 空室検索結果を取得.
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
   *総合ランキング情報を取得.
   * @param {*} state - ステート
   * @returns - 総合ランキング情報
   */
  getHotels(state) {
    return state.rankings;
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
   * 地区コード情報を取得.
   * @param {*} state - ステート
   * @returns - 地区コード情報
   */
  getAreaList(state) {
    return state.areaList;
  },
  /**
   * 宿泊リスト表示フラグを取得.
   * @param {*} state - ステート
   * @returns - 宿泊リスト表示フラグ
   */
  getStayFlag(state) {
    return state.stayPlanFlag;
  },
  /**
   * 検索条件を取得.
   * @param {*} state - ステート
   * @returns - 検索条件
   */
  getSearchResult(state) {
    return state.searchResult;
  },
  /**
   * 空室検索のエラーフラグを取得する.
   * @param {*} state - ステート
   * @returns 空室検索のエラーフラグ
   */
  getSearchError(state) {
    return state.searchErrorFlag;
  },
  /**
   * 予約情報入力フォームに反映させる詳細情報.
   */
  getPreReserveData(state) {
    return state.preReserveData;
  },
};

export const modules = {
  searchInstitution,
  register,
  keyword,
  reserve,
  favorite,
  watchedList,
};
