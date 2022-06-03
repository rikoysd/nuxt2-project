<template>
  <div>
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
      } else if (this.password.length < 9) {
        this.passwordError = "パスワードは8文字以上を入力してください";
        this.errorCheck = true;
      } else {
        this.passwordError = "";
        this.errorCheck = false;
      }
      this.errors.push(this.errorCheck);
    },
  },
  computed: {},
};
</script>

<style scoped>
span {
  color: red;
}
</style>
