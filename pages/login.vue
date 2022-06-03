<template>
  <div class="whole">
    <v-container fluid class="login-area">
      <div>{{ submitError }}</div>
      メールアドレス<span>&emsp;{{ mailAddressError }}</span
      ><v-text-field
        class="mailAddress"
        label="rakuraku@example.jp"
        v-model="mailAddress"
        outlined
      ></v-text-field>
      パスワード<span>&emsp;{{ passwordError }}</span
      ><v-text-field
        class="password"
        label="rakus12345（8文字以上で設定してください）"
        v-model="password"
        outlined
        type="password"
      ></v-text-field>
      <v-btn class="login-info" color="primary" @click="login">ログイン</v-btn>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // メールアドレス
      mailAddress: "",
      // パスワード
      password: "",
      // メールアドレスのエラー
      mailAddressError: "",
      // パスワードのエラー
      passwordError: "",
      // エラーチェック
      errorCheck: false,
      // エラーリスト
      errors: [],
      // 送信エラー
      submitError: "",
    };
  },
  methods: {
    /**
     * ログインする.
     */
    login() {
      // エラーリストの初期化
      this.errors = [];

      // メールアドレスのエラー
      if (this.mailAddress === "") {
        this.mailAddressError = "メールアドレスを入力してください";
        this.errorCheck = true;
      } else if (this.mailAddress.indexOf("@") === -1) {
        this.mailAddressError = "正しい形式で入力してください";
        this.errorCheck = true;
      } else {
        this.mailAddressError = "";
        this.errorCheck = false;
      }
      this.errors.push(this.errorCheck);

      // パスワードのエラー
      if (this.password === "") {
        this.passwordError = "パスワードを入力してください";
        this.errorCheck = true;
      } else if (this.password.length < 8) {
        this.passwordError = "パスワードは8文字以上を入力してください";
        this.errorCheck = true;
      } else {
        this.passwordError = "";
        this.errorCheck = false;
      }
      this.errors.push(this.errorCheck);

      let object = {};

      // register.jsのユーザー情報を取得
      object = this.$store.getters["register/getUserInfo"];

      if (
        object.mailAddress === this.mailAddress &&
        object.password === this.password
      ) {
        // ログイン成功
        this.submitError = "ログイン成功！";
      } else {
        // ログイン失敗
        this.submitError = "メールアドレスまたはパスワードが間違っています";
      }
    },
  },
  computed: {},
};
</script>

<style scoped>
span {
  color: red;
}

.login-area {
  background-color: white;
  border-radius: 5px;
  padding: 45px 40px;
  width: 600px;
}

.whole {
  width: 100%;
  height: 100vh;
  background-image: url(../assets/img/background-img.jpg);
  background-size: 100% 100%;
}
</style>
