<template>
  <div>
    <v-app-bar color="#333c5e">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title class="header"
        ><nuxt-link to="/" tag="div" class="title"
          >楽々booking.com</nuxt-link
        ></v-toolbar-title
      >

      <div class="flex-grow-1"></div>

      <div v-if="changeFlag === true">
        <v-menu top :close-on-content-click="closeOnContentClick">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon color="white" v-bind="attrs" v-on="on">
              <v-icon class="header">mdi-account</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              class="list"
              v-for="(item, index) in items"
              :key="index"
            >
              <v-list-item-title @click="myPageAction(index)">{{
                item.title
              }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="white" icon @click="favoriteList">
              <v-icon
                class="header"
                color="white"
                dark
                v-bind="attrs"
                v-on="on"
              >
                mdi-heart
              </v-icon>
            </v-btn>
          </template>
          <span>行きたい宿</span>
        </v-tooltip>
      </div>

      <div class="d-flex align-center" v-else>
        <nuxt-link to="/login" tag="div" class="header menu"
          >ログイン</nuxt-link
        >

        <nuxt-link to="/registerUser" tag="div" class="header menu"
          >会員登録</nuxt-link
        >
      </div>

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
    return {
      flag: false,
      items: [{ title: "マイページ" }, { title: "ログアウト" }],
      closeOnContentClick: true,
    };
  }, // end data

  methods: {
    /**
     * お気に入り一覧を見る.
     */
    favoriteList() {
      // 一時的に右辺を書き換えてます。
      window.location.href = "/mypage";
    },
    /**
     * マイページのメニューを選択する.
     */
    myPageAction(number) {
      if (number === 0) {
        // 一時的に右辺を書き換えてます。（ログイン状態は保持されない）
        window.location.href = "/reserveForm";
      } else {
        this.$store.commit("deleteUser");
      }
    },
  }, // end methods

  computed: {
    /**
     * アイコンの切り替え.
     */
    changeFlag() {
      if (this.$store.getters["register/getLoginUser"].id === 0) {
        this.flag = false;
      } else {
        this.flag = true;
      }
      return this.flag;
    },
  }, // end computed
};
</script>

<style>
.header {
  color: white;
}

.list {
  cursor: pointer;
}

.menu {
  font-size: 80%;
  margin-right: 7px;
  cursor: pointer;
}

.title {
  cursor: pointer;
}
</style>
