<template>
  <div class="d-flex justify-center">
    <div class="whole">
      <drawerMenu></drawerMenu>
      <calender></calender>
      <!-- パンくずリスト -->
      <menu-list :menu="menu"></menu-list>
      <search-box @search="searchKeyword"></search-box>
      <keywords @search="searchKeyword" @getMenuList="getMenuList"></keywords>
      <!-- 検索結果ページ（初期表示） -->
      <div class="error-flag">{{ getErrorFlag }}</div>
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
              @input="getNumber"
            ></v-pagination>
          </div>
          <!-- 検索結果カンマ区切り -->
          <div class="record-count">
            対象施設：{{ Number(getPageInfo.recordCount).toLocaleString() }}件
          </div>
          <!-- カード -->
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
                    {{ hotel.hotel[2].hotelDetailInfo.areaName }} [全{{
                      hotel.hotel[3].hotelFacilitiesInfo.hotelRoomNum
                    }}室]
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
                  <favorite-button
                    :hotelNum="hotel.hotel[0].hotelBasicInfo.hotelNo"
                  ></favorite-button>
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
            ></v-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import keywords from "../components/keywords.vue";
import Menu from "../components/drawerMenu.vue";
import SearchBox from "../components/searchBox.vue";
import MenuList from "../components/menuList.vue";
export default {
  components: { keywords, SearchBox, Menu, MenuList },
  data() {
    return {
      // ページ情報
      pageInfo: {},
      // ホテル一覧
      hotelList: [],
      // 検索結果の表示・非表示
      showResult: false,
      // ページ
      page: 1,
      // 総合評価
      rating: 0,
      // キーワード
      keyword: "",
      // APIに渡すオブジェクト
      object: {},
      // 検索エラー
      searchError: "",
      // エラー判定
      errorFlag: false,
      // ローディング
      loading: false,
      // パンくずリスト
      menu: {},
    };
  },
  mounted() {
    this.showResult = false;
  },
  watch: {
    // ホテル一覧の変数を監視する
    hotelList() {
      if (this.hotelList.length !== 0) {
        this.loading = false;
        this.showResult = true;
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

      // １ページ目に初期化
      this.page = 1;

      // 引数として渡したい値をオブジェクトにまとめる
      this.object = {
        keyword: keyword,
        page: this.page,
      };

      // actionの呼び出し
      await this.$store.dispatch("getPageList", this.object);
    },
    /**
     * ページを切り替える.
     * @param - ページ番号
     */
    async getNumber(number) {
      this.object.page = number;

      // actionの呼び出し
      await this.$store.dispatch("getPageList", this.object);
    },
    /**
     * 詳細ページに遷移
     * @param - ホテル番号
     */
    showHotelDetail(number) {
      // actionの呼び出し（閲覧履歴）
      this.$store.dispatch("searchHotel2", number);

      this.$router.push(`/hotelDetailvs/${number}`);
    },
    /**
     * emitで受け取ったパンくずリストをdataに格納.
     * @param - パンくずリスト
     */
    getMenuList(item) {
      this.menu = item;
    },
  },
  computed: {
    /**
     * ページ情報を取得.
     * @returns ページ情報
     */
    getPageInfo() {
      this.pageInfo = this.$store.getters["keyword/getPageInfo"];
      return this.pageInfo;
    },
    /**
     * ホテル一覧を取得.
     * @returns ホテル一覧
     */
    getHotelList() {
      this.hotelList = this.$store.getters["keyword/getHotelList"];
      return this.hotelList;
    },
    /**
     * エラー時にメッセージを表示する.
     */
    getErrorFlag() {
      if (this.$store.getters["keyword/getErrorFlag"] === true) {
        this.showResult = false;
        this.searchError = "検索結果がありません";
      } else {
        this.showResult = true;
        this.searchError = "";
      }
      return this.searchError;
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

.error-flag {
  margin: 10px 0;
}

.hotel-name {
  font-size: 15px;
  font-weight: bold;
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

.v-progress-circular {
  margin: 1rem;
}

.whole {
  width: 80%;
}
</style>
