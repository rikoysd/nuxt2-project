<template>
  <div class="d-flex justify-center">
    <div class="whole">
      <top class="top"></top>
      <vacantSearch class="vacantSearch"></vacantSearch>
      <search-box @search="searchKeyword"></search-box>
      <keywords @search="searchKeyword"></keywords>
      <ranking class="ranking mt-auto"></ranking>
      <onsenRanking></onsenRanking>
      <!-- <p>人気のキーワードで検索する</p> -->
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
    return {};
  },
  methods: {
    // moveToResultPage() {
    //   this.$router.push("/keywordHotelList");
    // },
    /**
     * キーワードの検索結果を取得する.
     * @param {*} keyword - キーワード
     */
    async searchKeyword(keyword) {
      console.log(keyword);
      // // エラー判定を初期化
      // this.$store.commit("changeFlag", this.errorFlag);

      // // １ページ目に初期化
      // this.page = 1;

      // 引数として渡したい値をオブジェクトにまとめる
      this.object = {
        keyword: keyword,
        page: 1,
      };

      // actionの呼び出し
      await this.$store.dispatch("getPageList", this.object);

      // 検索結果ページに遷移
      this.$router.push("/keywordHotelList");
    },
  },
};
</script>

<style scoped>
.top {
  margin-top: 10px;
}
.vacantSearch {
  z-index: 100;
  margin-bottom: 30px;
}
.ranking {
  margin-top: auto;
  display: flex;
  flex-flow: column;
  z-index: 0;
}
.whole {
  width: 80%;
  margin: 60px 0;
}
</style>
