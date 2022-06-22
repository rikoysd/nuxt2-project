<template>
  <v-row class="d-flex justify-center">
    <!-- カルーセル -->
    <div class="topPosition">
      <top class="top mb-10"></top>
      <div class="whole">
        <!-- 検索窓 -->
        <vacantSearch class="vacantSearch"></vacantSearch>
        <!-- 総合ランキング -->
        <ranking class="ranking"></ranking>
        <!-- 温泉宿ランキング -->
        <onsenRanking></onsenRanking>
        <!-- 人気のエリア -->
        <selectArea></selectArea>
      </div>
    </div>
  </v-row>
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
    /**
     * キーワードの検索結果を取得する.
     * @param {*} keyword - キーワード
     */
    async searchKeyword(keyword) {
      // 引数として渡したい値をオブジェクトにまとめる
      this.object = {
        keyword: keyword,
        page: 1,
      };

      // actionの呼び出し
      await this.$store.dispatch("getPageList", this.object);

      // キーワードをstateに格納
      this.$store.commit("setKeyword", this.object.keyword);

      // 検索結果ページに遷移
      this.$router.push("/keywordHotelList");
    },
  },
};
</script>

<style scoped>
@media (min-width: 1264px) {
  .container {
    width: 100vw;
  }
}
.topPosition {
  width: 100vw;
}
.top {
  margin-top: 10px;
  width: 100vw;
}
.vacantSearch {
  z-index: 100;
  margin-bottom: 30px;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}
.ranking {
  margin-top: 20px;
  display: flex;
  flex-flow: column;
  z-index: 0;
}
.whole {
  width: 100%;
  margin-bottom: 60px;
}
</style>
