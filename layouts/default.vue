<template>
  <div>
    <v-app>
      <Header :loginUser="loginUser" />
      <v-main>
        <v-container mt-0 pt-0><Nuxt /></v-container>
      </v-main>
      <Footer />
    </v-app>
  </div>
</template>

<script>
import vacantSearch from "../components/vacantSearch.vue";

export default {
  components: { vacantSearch },
  name: "DefaultLayout",
  data() {
    return {
      // ログインユーザー
      loginUser: {},
    };
  },
  mounted() {
    this.getLoginUser();
  },
  methods: {
    getLoginUser() {
      this.$nuxt.$on("getLoginUser", this.setLoginUser);
    },
    /**
     * emitで受け取ったユーザー情報をdataに格納.
     */
    setLoginUser(user) {
      this.loginUser = user;
    },
  },
};
</script>

<style scoped></style>
