<template>
  <div>
    <drawerMenu></drawerMenu>
    <calender></calender>
    <requirement></requirement>
    <!-- パンくずリスト -->
    <v-breadcrumbs :items="items">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <search-box @search="searchKeyword"></search-box>
    <keywords @search="searchKeyword"></keywords>
    <div v-show="showResult">
      <!-- 検索結果カンマ区切り -->
      <div>対象施設：{{ pageInfo.recordCount }}件</div>
      <!-- カード -->
      <div v-for="(hotel, index) of hotelList" v-bind:key="index">
        <v-card max-width="500">
          <v-img
            class="white--text align-end"
            height="160px"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          >
            <v-card-title>{{
              hotel.hotel[0].hotelBasicInfo.hotelName
            }}</v-card-title>
            <v-card-subtitle class="pb-0"
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
            <div>{{ hotel.hotel[0].hotelBasicInfo.hotelSpecial }}</div>
            <div>
              最安値{{ hotel.hotel[0].hotelBasicInfo.hotelMinCharge }} 円(税込)
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn color="orange" text>詳細を見る</v-btn>
          </v-card-actions>
        </v-card>
      </div>
      <!-- ページネーション -->
      <div class="text-center">
        <v-pagination
          v-model="page"
          :length="15"
          :total-visible="7"
        ></v-pagination>
      </div>
    </div>
  </div>
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
    };
  },
  methods: {
    /**
     * キーワードの検索結果を取得する.
     * @param {*} keyword - キーワード
     */
    async searchKeyword(keyword) {
      // actionの呼び出し
      await this.$store.dispatch("getHotelList", keyword);

      this.pageInfo = this.$store.getters.getPageInfo;
      this.hotelList = this.$store.getters.getHotelList;
      // console.log(this.hotelList);

      // 検索結果表示
      this.showResult = true;
    },
  },
  computed: {},
};
</script>

<style scoped></style>
