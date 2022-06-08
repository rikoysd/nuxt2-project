<template>
  <div class="whole d-flex align-center mb-6">
    <v-container fluid class="login-area">
      <div class="submit-error">{{ submitError }}</div>
      <span>{{ mailAddressError }}</span
      ><v-text-field
        label="メールアドレス"
        v-model="mailAddress"
        outlined
      ></v-text-field>
      <span>{{ passwordError }}</span
      ><v-text-field
        :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show3 ? 'text' : 'password'"
        name="input-10-2"
        label="パスワード"
        class="input-group--focused"
        @click:append="show3 = !show3"
        outlined
        v-model="password"
      ></v-text-field>
      <v-btn class="login-info" color="primary" @click="login">ログイン</v-btn>
      <div class="msg">
        アカウントをお持ちではありませんか？<nuxt-link to="/registerUser"
          >会員登録はこちら</nuxt-link
        >
      </div>
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
      // 入力時のパスワード非表示
      show3: false,
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

      // エラーの数を数える
      let array = [];
      for (let error of this.errors) {
        if (error === true) {
          array.push(error);
        }
      }

      // エラーが一つでもあったら処理を止める
      if (array.length > 0) {
        return;
      }
      // register.jsのユーザー情報を取得

      let object = this.$store.getters["register/getUserList"];

      if (
        this.mailAddress !== object[0].mailAddress ||
        this.password !== object[0].password
      ) {
        // ログイン失敗
        this.submitError = "メールアドレスまたはパスワードが間違っています";
        return;
      }
      // マイページに遷移
      this.$router.push("/mypage");
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

.msg {
  margin-top: 20px;
}

.submit-error {
  margin-bottom: 10px;
  color: red;
}

.whole {
  width: 100%;
  height: 100vh;
  background-image: url(../assets/img/background-img.jpg);
  background-size: cover;
  background-position: center center;
}
</style>
