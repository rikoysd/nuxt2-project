<template>
  <div>
    <v-breadcrumbs :items="items">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <search-box @search="searchKeyword"></search-box>
    <keywords @search="searchKeyword"></keywords>
    <div v-show="showResult">
      <!-- 検索結果カンマ区切り -->
      <div>検索結果：{{ pageInfo.recordCount }}件</div>
      <!-- カード -->
      <div v-for="(hotel, index) of hotelList" v-bind:key="index">
        <v-card class="mx-auto" max-width="500">
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
              総合評価
              {{ hotel.hotel[0].hotelBasicInfo.reviewAverage }}
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
    </div>
  </div>
</template>

<script>
import keywords from "../components/keywords.vue";
import SearchBox from "../components/searchBox.vue";
export default {
  components: { keywords, SearchBox },
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
