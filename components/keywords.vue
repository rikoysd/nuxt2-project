<template>
  <v-container>
    <v-row>
      <div v-for="(keyword, index) of tags" v-bind:key="index">
        <v-chip class="chip" link @click="searchKeyword(keyword)"
          >#{{ keyword }}</v-chip
        >
      </div>
    </v-row>
  </v-container>
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
    };
  },
  methods: {
    /**
     * キーワードで検索する.
     * @param {*} keyword - キーワード
     */
    searchKeyword(keyword) {
      // 親に渡す
      this.$emit("search", keyword);
    },
  },
  computed: {},
};
</script>

<style scoped>
.chip {
  margin-bottom: 5px;
  margin-right: 5px;
}
</style>
