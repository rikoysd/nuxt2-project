<template>
  <div class="whole d-flex align-center justify-center">
    <v-container class="login-area">
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
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import firebase from "@/plugins/firebase";

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
      // ユーザー一覧
      userList: [],
      // ログインユーザー
      loginUser: {},
    };
  },
  async mounted() {
    // ユーザー一覧を取得する
    const db = getFirestore(firebase);
    try {
      const listData = collection(db, "ユーザー一覧");
      await getDocs(listData).then((snapShot) => {
        const data = snapShot.docs.map((doc) => ({ ...doc.data() }));
        // console.log(data);

        for (let user of data) {
          this.userList.push(user);
        }
      });
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    /**
     * ログインする.
     */
    login() {
      // エラーリストの初期化
      this.errors = [];
      this.submitError = "";

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

      // メアドとパスワードが一一致するかチェック
      let errorArray = [];
      for (let user of this.userList) {
        if (
          !(
            this.mailAddress === user.mailAddress &&
            this.password === user.password
          )
        ) {
          this.errorCheck = true;
          errorArray.push(this.errorCheck);
        } else {
          this.loginUser = user;
          this.errorCheck = false;
          errorArray.push(this.errorCheck);
        }
      }

      if (errorArray.indexOf(false) === -1) {
        this.submitError = "メールアドレスまたはパスワードが間違っています";
        this.errorCheck = true;
      } else {
        this.submitError = "";
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
        console.log("不備あり");
        return;
      }

      // ログインしたユーザー情報をFirebaseに保存
      const db = getFirestore(firebase);
      try {
        const docRef = setDoc(
          doc(db, "ログインユーザー", String(this.loginUser.id)),
          {
            id: this.loginUser.id,
            fullName1: this.loginUser.fullName1,
            fullName2: this.loginUser.fullName2,
            zipcode: this.loginUser.zipcode,
            prefecture: this.loginUser.prefecture,
            address: this.loginUser.address,
            mailAddress: this.loginUser.mailAddress,
            telephone: this.loginUser.telephone,
            password: this.loginUser.password,
          }
        );
        // console.log(docRef);
        this.submitError = "";
      } catch (error) {
        console.error(error);
        this.submitError = "ログインに失敗しました";
      }

      if (this.submitError !== "") {
        return;
      } else {
        // ログインユーザーの情報を渡す
        this.$nuxt.$emit("getLoginUser", this.loginUser);

        // ログインしたらトップページに遷移
        this.$router.push("/");
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
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
    rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
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
  background-attachment: fixed;
  background-repeat: no-repeat;
}
.whole[data-v-18804380] {
  width: 100vw;
}
</style>
