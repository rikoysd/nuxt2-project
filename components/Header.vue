<template>
  <div>
    <v-app-bar color="#333c5e">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title class="header">楽々booking.com</v-toolbar-title>

      <div class="flex-grow-1"></div>

      <v-btn icon color="white" @click="favoriteList">
        <v-icon class="header">mdi-heart</v-icon>
      </v-btn>

      <v-btn icon color="white">
        <v-icon class="header">mdi-magnify</v-icon>
      </v-btn>

      <v-menu left bottom class="header"> </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    /**
     * お気に入り一覧を見る.
     */
    favoriteList() {
      this.$router.push("/mypage");
    },
  },
  computed: {},
};
</script>

<style>
.header {
  color: white;
}
</style>
