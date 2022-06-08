<template>
  <v-container>
    <drawerMenu></drawerMenu>
    <calender></calender>
    <!-- パンくずリスト -->
    <v-breadcrumbs :items="items">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <search-box @search="searchKeyword"></search-box>
    <keywords @search="searchKeyword"></keywords>
    <!-- 検索結果ページ（初期表示） -->
    <div class="error-flag">{{ getErrorFlag }}</div>
    <div v-show="showResult">
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
              src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
            >
              <v-card-title class="title">{{
                hotel.hotel[0].hotelBasicInfo.hotelName
              }}</v-card-title>
              <v-card-subtitle class="pb-0 sub-title"
                >{{ hotel.hotel[2].hotelDetailInfo.areaName }} [全{{
                  hotel.hotel[3].hotelFacilitiesInfo.hotelRoomNum
                }}室]</v-card-subtitle
              >
            </v-img>
            <v-card-text class="text--primary">
              <div>
                <star-rating
                  v-bind:increment="0.01"
                  v-bind:max-rating="5"
                  v-bind:rating="hotel.hotel[0].hotelBasicInfo.reviewAverage"
                  inactive-color="#000"
                  active-color="#ffd700"
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
                @click="showHotelDetail(hotel.hotel[0].hotelBasicInfo.hotelNo)"
                >詳細を見る</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <!-- ページネーション -->
      <div class="text-center">
        <v-pagination
          v-model="page"
          :length="5"
          @input="getNumber"
        ></v-pagination>
      </div>
    </div>
  </v-container>
</template>

<script>
import keywords from "../components/keywords.vue";
import Menu from "../components/drawerMenu.vue";
import SearchBox from "../components/searchBox.vue";
export default {
  components: { keywords, SearchBox, Menu },
  data() {
    return {
      // パンくずリスト
      items: [
        {
          text: "トップ",
          disabled: false,
          href: "/",
        },
        {
          text: "検索結果",
          disabled: true,
        },
      ],
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
    };
  },
  mounted() {
    this.showResult = false;
  },
  methods: {
    /**
     * キーワードの検索結果を取得する.
     * @param {*} keyword - キーワード
     */
    async searchKeyword(keyword) {
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

      // 検索結果表示
      this.showResult = true;
    },
    /**
     * ページを切り替える.
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
      console.log(number);
      this.$router.push(`/hotelDetail/${number}`);
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
}

.description {
  margin-top: 5px;
}

.error-flag {
  margin: 10px 0;
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

.sub-title {
  margin-bottom: 10px;
  opacity: 0.7;
  font-size: 0.7rem;
}

.title {
  font-size: 10px;
}
</style>
