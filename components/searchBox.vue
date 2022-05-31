<template>
  <div>
    <v-text-field
      v-model="keyword"
      solo
      label="エリア・キーワード・駅名など"
      clearable
    ></v-text-field>
    <v-btn color="primary" elevation="2" @click="searchWord(keyword)"
      >検索</v-btn
    >
    <div>{{ errorMessage }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 検索ワード
      keyword: "",
      // エラー文
      errorMessage: "",
    };
  },
  methods: {
    /**
     * キーワードやエリアを検索する.
     */
    searchWord(keyword) {
      if (keyword === "") {
        this.errorMessage = "キーワードを入力してください";
        return;
      }
      this.errorMessage = "";
      this.$store.dispatch("getHotelList", keyword);
    },
  },
  computed: {},
};
</script>

<style scoped></style>
