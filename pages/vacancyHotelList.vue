<template>
  <div>
    <!-- パンくずリスト -->
    <menu-list
      class="menu"
      :area="area"
      :originalWord="originalWord"
    ></menu-list>
    <div class="d-flex justify-center">
      <div class="whole">
        <vacant-search
          class="vacant-search"
          @getVacantHotel="getVacantHotel"
        ></vacant-search>
        <keywords @search="searchKeyword" @getMenuList="getMenuList"></keywords>
        <drawer-menu
          class="drawer-menu"
          @search="searchKeyword"
          @menuWords="menuWords"
        ></drawer-menu>
        <div class="error-flag">{{ getSearchError }}</div>
        <v-progress-circular
          v-show="loading"
          :value="60"
          color="primary"
        ></v-progress-circular>
        <div class="d-flex justify-center">
          <div v-show="showResult" class="result">
            <!-- ページネーション -->
            <div class="text-center">
              <v-pagination
                v-model="page"
                :length="getPageInfo.pageCount"
                :total-visible="7"
                color="#333c5e"
                @input="getNumber"
              ></v-pagination>
            </div>
            <div class="record-count">
              対象施設：{{ Number(getPageInfo.recordCount).toLocaleString() }}件
            </div>
            <v-row>
              <v-col
                class="d-flex justify-center"
                v-for="(hotel, index) of getHotelList"
                v-bind:key="index"
              >
                <v-card class="card" max-width="399">
                  <v-img
                    class="white--text align-end"
                    height="160px"
                    v-bind:src="hotel.hotel[0].hotelBasicInfo.hotelImageUrl"
                  >
                  </v-img>
                  <v-card-text class="text--primary">
                    <div class="hotel-name">
                      {{ hotel.hotel[0].hotelBasicInfo.hotelName }}
                    </div>
                    <div class="pb-0 sub-title">
                      {{ hotel.hotel[1].hotelDetailInfo.areaName }}
                      <star-rating
                        v-bind:increment="0.01"
                        v-bind:max-rating="5"
                        v-bind:rating="
                          hotel.hotel[0].hotelBasicInfo.reviewAverage
                        "
                        inactive-color="#000"
                        active-color="#fa8000"
                        v-bind:star-size="15"
                        v-bind:read-only="true"
                      >
                      </star-rating>
                    </div>
                    <div class="description">
                      {{ hotel.hotel[0].hotelBasicInfo.hotelSpecial }}
                    </div>
                    <div class="min-charge">
                      最安値<span
                        >&nbsp;{{
                          Number(
                            hotel.hotel[0].hotelBasicInfo.hotelMinCharge
                          ).toLocaleString()
                        }}&nbsp;</span
                      >
                      円(税込)
                    </div>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn
                      color="orange"
                      text
                      @click="
                        showHotelDetail(hotel.hotel[0].hotelBasicInfo.hotelNo)
                      "
                      >詳細を見る</v-btn
                    >
                    <!-- <favorite-button
                      :hotelNum="hotel.hotel[0].hotelBasicInfo.hotelNo"
                      :loginUser="loginUser2"
                    ></favorite-button> -->
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
            <!-- ページネーション -->
            <div class="text-center">
              <v-pagination
                v-model="page"
                :length="getPageInfo.pageCount"
                :total-visible="7"
                @input="getNumber"
                color="#333c5e"
              ></v-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    loginUser2: {},
  },
  data() {
    return {
      // apiに送るリクエストパラメータ
      vacantObject: {
        roomNum: 0, //部屋数
        middleClassCode: "", //都道府県
        smallClassCode: "", //主要な市町村
        detailClassCode: "", //駅や詳細地域
        checkinDate: 0, //チェックイン日
        checkoutDate: 0, //チェックアウト日
        adultNum: 0, //大人人数
        upClassNum: 0, //小学生（高学年）
        lowClassNum: 0, //小学生（低学年）
        infantWithMBNum: 0, //幼児（食事・布団付）
        infantWithMNum: 0, //幼児（食事のみ）
        infantWithBNum: 0, //幼児（布団のみ）
        infantWithoutMBNum: 0, //幼児（食事・布団不要）
        page: 1, // 取得したいページ
      },
      // エラーメッセージ
      errorMessage: "",
      // ローディング
      loading: false,
      // ページ情報
      pageInfo: {},
      // ホテル一覧
      hotelList: [],
      // 検索結果の表示・非表示
      showResult: false,
      // ページ
      page: 1,
      // エリア
      area: "",
      //都道府県のリスト
      areaList: [],
      // エラー判定
      errorFlag: false,
      // APIに渡すオブジェクト
      object: {
        keyword: "",
        page: 1,
      },
      // パンくずリスト
      menu: [],
      // こだわり検索のキーワード
      originalWord: "",
    };
  },
  async mounted() {
    this.showResult = false;

    // リクエストパラメーターをapiにセットする
    let vacantData = this.$store.getters.getSearchResult;

    this.vacantObject.roomNum = vacantData.roomNum;
    this.vacantObject.middleClassCode = vacantData.middleClassCode;
    this.vacantObject.smallClassCode = vacantData.smallClassCode;
    this.vacantObject.detailClassCode = vacantData.detailClassCode;
    this.vacantObject.checkinDate = vacantData.checkinDate;
    this.vacantObject.checkoutDate = vacantData.checkoutDate;
    this.vacantObject.adultNum = vacantData.adultNum;
    this.vacantObject.upClassNum = vacantData.upClassNum;
    this.vacantObject.lowClassNum = vacantData.lowClassNum;
    this.vacantObject.infantWithMBNum = vacantData.infantWithMBNum;
    this.vacantObject.infantWithMNum = vacantData.infantWithMNum;
    this.vacantObject.infantWithBNum = vacantData.infantWithBNum;
    this.vacantObject.infantWithoutMBNum = vacantData.infantWithoutMBNum;
    this.vacantObject.page = 1;

    await this.$store.dispatch("searchVacantList", this.vacantObject);

    // ローディング非表示
    this.loading = false;
  },
  watch: {
    // ホテル一覧の変数を監視する
    hotelList() {
      if (this.hotelList.length !== 0) {
        this.loading = false;
        this.showResult = true;

        // 都道府県を取得
        const areaLists = this.$store.getters.getAreaList.middleClasses;
        for (let area of areaLists) {
          const code = area.middleClass[0].middleClassCode;
          const name = area.middleClass[0].middleClassName;
          this.areaList.push({ code: code, name: name });
        }

        for (let area of this.areaList) {
          if (area.code === this.vacantObject.smallClassCode) {
            this.area = area.name;
          }
        }
      }
    },
  },
  methods: {
    /**
     * キーワードの検索結果を取得する.
     * @param {*} keyword - キーワード
     */
    async searchKeyword(keyword) {
      this.loading = true;

      // エラー判定を初期化
      this.$store.commit("changeFlag", this.errorFlag);

      // 検索結果が出た時点で検索キーワードをstateに格納
      this.$store.commit("setKeyword", keyword);

      // キーワード検索結果ページに遷移
      this.$router.push("keywordHotelList");
    },
    /**
     * ページを切り替える.
     * @param - ページ番号
     */

    async getNumber(number) {
      this.vacantObject.page = number;

      await this.$store.dispatch("searchVacantList", this.vacantObject);
    },
    /**
     * 詳細ページに遷移
     * @param - ホテル番号
     */
    showHotelDetail(number) {
      this.$router.push(`/hotelDetail/${number}`);
    },
    /**
     * emitで受け取ったパンくずリストをdataに格納.
     * @param - パンくずリスト
     */
    getMenuList(item) {
      this.menu = [item, 1];
    },
    /**
     * emitで受け取ったこだわりのキーワードをdataに格納.
     * @param - こだわりのキーワード
     */
    menuWords(word) {
      this.originalWord = word;
    },
    /**
     * emitで受け取った空室検索の条件をdataに格納.
     * @param - 空室検索の条件
     */
    async getVacantHotel(vacantData) {
      this.vacantObject.roomNum = vacantData.roomNum;
      this.vacantObject.middleClassCode = vacantData.middleClassCode;
      this.vacantObject.smallClassCode = vacantData.smallClassCode;
      this.vacantObject.detailClassCode = vacantData.detailClassCode;
      this.vacantObject.checkinDate = vacantData.checkinDate;
      this.vacantObject.checkoutDate = vacantData.checkoutDate;
      this.vacantObject.adultNum = vacantData.adultNum;
      this.vacantObject.upClassNum = vacantData.upClassNum;
      this.vacantObject.lowClassNum = vacantData.lowClassNum;
      this.vacantObject.infantWithMBNum = vacantData.infantWithMBNum;
      this.vacantObject.infantWithMNum = vacantData.infantWithMNum;
      this.vacantObject.infantWithBNum = vacantData.infantWithBNum;
      this.vacantObject.infantWithoutMBNum = vacantData.infantWithoutMBNum;
      this.vacantObject.page = 1;

      await this.$store.dispatch("searchVacantList", this.vacantObject);
    },
  },
  computed: {
    /**
     * 空室検索のエラー情報を取得.
     */
    getSearchError() {
      if (this.$store.getters.getSearchError === true) {
        this.errorMessage = "検索結果がありません";
        this.showResult = false;
      } else {
        this.errorMessage = "";
        this.showResult = true;
      }
      return this.errorMessage;
    },
    /**
     * ホテル一覧を取得.
     */
    getHotelList() {
      this.hotelList = this.$store.getters.getHotelList;
      return this.hotelList;
    },
    /**
     * ページ情報を取得.
     */
    getPageInfo() {
      this.pageInfo = this.$store.getters.getPageInfo;
      return this.pageInfo;
    },
  },
};
</script>

<style scoped>
.card {
  margin-bottom: 60px;
  transition: all 0.3s ease 0s;
}

.description {
  margin-top: 5px;
  font-size: 12px;
}

.drawer-menu {
  padding: 0;
  margin: 20px 0;
}

.error-flag {
  margin: 10px 0;
}

.hotel-name {
  font-size: 15px;
  font-weight: bold;
}

.menu {
  margin-top: 10px;
  margin-bottom: 20px;
}

.min-charge {
  margin-top: 15px;
}

.min-charge span {
  font-size: 1.2rem;
  font-weight: bold;
}

.record-count {
  margin-bottom: 10px;
}

.result {
  width: 90%;
}

.sub-title {
  margin-bottom: 10px;
  opacity: 0.7;
  font-size: 0.7rem;
}

.vacant-search {
  z-index: 100;
  margin-bottom: 30px;
}

.whole {
  width: 80%;
  margin: 60px 0;
}
</style>
