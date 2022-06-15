<template>
  <div>
    <v-btn color="pink" text @click="addFavorite(hotelNum)" v-if="flag === true"
      ><v-icon>mdi-cards-heart-outline</v-icon>行きたい</v-btn
    >
    <v-btn color="pink" text @click="deleteFavorite(hotelNum)" v-else
      ><v-icon>mdi-check-circle-outline</v-icon>追加済</v-btn
    >
  </div>
</template>

<script>
export default {
  props: ["hotelNum", "loginUser"],
  data() {
    return {
      // お気に入りボタンの切り替え
      flag: true,
      // お気に入り一覧
      favoriteList: [],
    };
  },
  mounted() {},
  methods: {
    /**
     * お気に入りに登録.
     * @param {*} number - ホテル番号
     */
    addFavorite(number) {
      // ログインしていなかったらログインページへ誘導
      if (this.loginUser === {}) {
        this.$router.push("/login");
        return;
      }

      this.$store.dispatch("searchHotel", number);
      this.flag = false;
    },
    /**
     * お気に入りから削除.
     * @param {*} number - ホテル番号
     */
    deleteFavorite(number) {
      this.$store.commit("deleteFavorite", number);
      this.flag = true;
    },
  },
  computed: {},
};
</script>

<style scoped></style>
