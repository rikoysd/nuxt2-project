<template>
  <div>
    <v-app>
      <Header class="header" :loginUser="loginUser" @search="searchKeyword" />
      <v-main>
        <v-container mt-0 pt-0
          ><Nuxt
            class="nuxt"
            :loginUser2="loginUser2"
            :loginUser="loginUser"
            :propsKeyword2="object.keyword"
        /></v-container>
      </v-main>
      <Footer class="nuxt" />
    </v-app>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // ログインユーザー（ログインページからヘッダーに渡すログイン情報）
      loginUser: {},
      // ログインユーザー（ヘッダーからマイページに渡すログイン情報）
      loginUser2: {},

      object: {},
    };
  },
  mounted() {
    this.getLoginUser();
    this.getUserInfo();
  },
  methods: {
    getLoginUser() {
      this.$nuxt.$on("getLoginUser", this.setLoginUser);
    },
    /**
     * emitで受け取ったユーザー情報をdataに格納.
     * @param - ログイン中のユーザー情報
     */
    setLoginUser(user) {
      this.loginUser = user;
    },
    getUserInfo() {
      this.$nuxt.$on("getUserInfo", this.setUserInfo);
    },
    /**
     * emitで受け取ったユーザー情報をdataに格納.
     * @param - ログイン中のユーザー情報
     */
    setUserInfo(user) {
      this.loginUser2 = user;
    },
    async searchKeyword(keyword) {
      this.object = {
        keyword: keyword,
        page: 1,
      };
      await this.$store.dispatch("getPageList", this.object);

      // 検索結果が出た時点で検索キーワードをstateに格納
      this.$store.commit("setKeyword", this.object.keyword);
      this.$router.push("/keywordHotelList");
    },
  },
};
</script>

<style scoped>
.container {
  padding: 0;
  margin-left: auto;
  margin-right: auto;
}

.header {
  width: 100vw;
  position: fixed;
  /* 最前面に持ってくる */
  z-index: 9999;
}

.nuxt {
  position: relative;
  top: 90px;
}
</style>
