<template>
  <div class="d-flex justify-center">
    <div class="whole">
      <!-- カルーセル -->
      <top class="top mb-10"></top>
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
  width: 100%;
  margin: 60px 0;
}
</style>
