<template>
  <div>
    <v-app>
      <Header :loginUser="loginUser" />
      <v-main>
        <v-container mt-0 pt-0
          ><Nuxt :loginUser2="loginUser2" :loginUser="loginUser"
        /></v-container>
      </v-main>
      <Footer />
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
    setUserInfo(user) {
      this.loginUser2 = user;
    },
  },
};
</script>

<style scoped>
.container {
  padding: 0;
  margin-left: 0;
  margin-right: 0;
}
</style>
