<template>
  <div>
    <div v-for="(keyword, index) of tags" v-bind:key="index">
      <v-chip link @click="searchKeyword(keyword)">#{{ keyword }}</v-chip>
    </div>
    <div>
      <div>検索結果：{{ pageInfo.recordCount }}件</div>
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
