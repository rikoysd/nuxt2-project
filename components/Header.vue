<template>
  <div>
    <!-- <v-app-bar color="#333c5e"> -->
    <v-app-bar elevation="0" color="white">
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

      <v-toolbar-title class="header"
        ><nuxt-link to="/" tag="div" class="title font-weight-bold"
          >楽々booking.com</nuxt-link
        ></v-toolbar-title
      >

      <div class="flex-grow-1"></div>

      <search-box class="search-box" @search="searchKeyword"></search-box>
      <div v-if="flag === true">
        <v-menu top :close-on-content-click="closeOnContentClick">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="white" v-bind="attrs" v-on="on">
              <v-icon>mdi-account</v-icon>
              <span>{{ loginUser.fullName1 }}さん</span>
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

      <v-btn icon color="#333c5e">
        <v-icon class="header">mdi-magnify</v-icon>
      </v-btn>

      <v-menu left bottom class="header"> </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
import { doc, deleteDoc, getFirestore } from "firebase/firestore";
import firebase from "@/plugins/firebase";

export default {
  props: {
    loginUser: {
      id: 0,
      fullName1: String,
      fullName2: String,
      zipcode: String,
      prefecture: String,
      address: String,
      mailAddress: String,
      telephone: String,
      password: String,
    },
  },
  data() {
    return {
      flag: false,
      items: [{ title: "マイページ" }, { title: "ログアウト" }],
      closeOnContentClick: true,
      // ログインユーザー
      loginUser2: {},
    };
  },
  watch: {
    loginUser() {
      if (this.loginUser.id) {
        this.flag = true;
      } else {
        this.flag = false;
      }
    },
    loginUser2() {
      if (this.loginUser2.id) {
        this.flag = true;
      } else {
        this.flag = false;
      }
    },
  },
  methods: {
    /**
     * お気に入り一覧を見る.
     */
    favoriteList() {
      this.$router.push("/mypage");
    },
    /**
     * マイページのメニューを選択する.
     */
    async myPageAction(number) {
      this.loginUser2 = this.loginUser;
      if (number === 0) {
        // マイページ
        this.$nuxt.$emit("getUserInfo", this.loginUser2);
        this.$router.push("/mypage");
      } else {
        // ログアウト
        const db = getFirestore(firebase);
        await deleteDoc(
          doc(db, "ログインユーザー", String(this.loginUser2.id))
        );

        // ログインユーザー初期化
        this.loginUser2 = {};
        // トップに戻る
        this.$router.push("/");
      }
    },
    searchKeyword(keyword) {
      console.log(keyword);
      this.$emit("search", keyword);
    },
  }, // end methods
  computed: {},
};
</script>

<style scoped>
.headers {
  background-color: rgba(50, 59, 93, 0.8);
}
.header {
  color: #333c5e;
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

.search-box {
  margin-top: 25px;
  width: 450px;
  margin-right: 320px;
}

.user-name {
  color: white;
  margin-right: 8px;
}
</style>
