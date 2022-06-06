<template>
  <div>
    <div v-for="(keyword, index) of tags" v-bind:key="index" class="d-flex">
      <v-chip link @click="searchKeyword(keyword)">#{{ keyword }}</v-chip>
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

<style scoped></style>
