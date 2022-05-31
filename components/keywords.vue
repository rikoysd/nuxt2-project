<template>
  <div>
    <div v-for="(keyword, index) of tags" v-bind:key="index">
      <v-chip link @click="searchKeyword(keyword)">#{{ keyword }}</v-chip>
    </div>
    <div>
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
            <div>★評価{{ hotel.hotel[0].hotelBasicInfo.reviewAverage }}</div>
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
export default {
  data() {
    return {
      // キーワード検索
      tags: [
        "東京ディズニーリゾート",
        "ユニバーサル・スタジオ・ジャパン",
        "スイートルーム",
        "女子旅",
        "一人旅",
        "温泉旅館",
        "客室露天風呂",
      ],
      // ページ情報
      pageInfo: {},
      // ホテル一覧
      hotelList: [],
    };
  },
  methods: {
    /**
     * キーワードで検索する.
     * @param {*} keyword - キーワード
     */
    async searchKeyword(keyword) {
      // actionの呼び出し
      await this.$store.dispatch("getHotelList", keyword);

      this.pageInfo = this.$store.getters.getPageInfo;
      this.hotelList = this.$store.getters.getHotelList;
      console.log(this.hotelList);
    },
  },
  computed: {},
};
</script>

<style scoped></style>
