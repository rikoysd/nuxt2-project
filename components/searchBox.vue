<template>
  <v-container>
    <v-row class="d-flex">
      <v-text-field
        v-model="keyword"
        solo
        label="エリア・キーワード・駅名など"
        clearable
      ></v-text-field>
      <v-btn
        class="btn"
        color="primary"
        elevation="2"
        @click="searchWord(keyword)"
        >検索</v-btn
      >
    </v-row>
    <div class="msg">{{ errorMessage }}</div>
  </v-container>
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
     * @param {*} keyword - キーワード
     */
    searchWord(keyword) {
      if (keyword === "") {
        this.errorMessage = "キーワードを入力してください";
        return;
      }
      this.errorMessage = "";

      // 親に渡す
      this.$emit("search", keyword);
    },
  },
  computed: {},
};
</script>

<style scoped>
.btn {
  margin-top: 5px;
  margin-left: 10px;
}

.msg {
  color: red;
}
</style>
