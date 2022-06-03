<template>
  <div>
    <h4>会員登録</h4>
    氏名<span>&emsp;{{ fullName1Error }}</span>
    <v-text-field
      class="name-field"
      label="楽々太郎"
      v-model="fullName1"
      outlined
    ></v-text-field>
    かな<span>&emsp;{{ fullName2Error }}</span
    ><v-text-field
      class="name2-field"
      label="ラクラクタロウ"
      v-model="fullName2"
      outlined
    ></v-text-field>
    郵便番号（ハイフンなし）<span>&emsp;{{ zipcodeError }}</span
    ><v-text-field
      class="zipcode"
      label="0000000"
      v-model="zipcode"
      outlined
    ></v-text-field>
    住所<span>&emsp;{{ prefectureError }}</span
    ><selectPrefectures @prefecture="registerPrefecture"></selectPrefectures
    ><br />
    <span>&emsp;{{ addressError }}</span>
    <v-text-field
      class="address"
      label="港区赤坂0-0-0（海外住所の場合は「海外」と入力）"
      v-model="address"
      outlined
    ></v-text-field>
    電話番号（ハイフンなし）<span>&emsp;{{ telephoneError }}</span
    ><v-text-field
      class="telephone"
      label="09012345678"
      v-model="telephone"
      outlined
    ></v-text-field>
    メールアドレス<span>&emsp;{{ mailaddressError }}</span
    ><v-text-field
      class="mailaddress"
      label="rakuraku@example.jp"
      v-model="mailAddress"
      outlined
    ></v-text-field>
    パスワード<span>&emsp;{{ passwordError }}</span
    ><v-text-field
      class="password"
      label="rakus12345（8桁以上を設定してください）"
      v-model="password"
      type="password"
      outlined
    ></v-text-field>
    <v-btn color="primary" elevation="2" @click="register">登録</v-btn>
    <v-btn color="primary" elevation="2">戻る</v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // フルネーム（氏名）
      fullName1: "",
      // フルネーム（かな）
      fullName2: "",
      // 郵便番号
      zipcode: "",
      // 都道府県
      prefecture: "",
      // 住所
      address: "",
      // 電話番号
      telephone: "",
      // メールアドレス
      mailAddress: "",
      // パスワード
      password: "",
      // フルネーム（氏名）のエラー
      fullName1Error: "",
      // フルネーム（かな）のエラー
      fullName2Error: "",
      // 郵便番号のエラー
      zipcodeError: "",
      // 都道府県のエラー
      prefectureError: "",
      // 住所のエラー
      addressError: "",
      // 電話番号のエラー
      telephoneError: "",
      // メールアドレスのエラー
      mailaddressError: "",
      // パスワードのエラー
      passwordError: "",
      // エラーチェック
      errorCheck: "false",
      // エラーリスト
      errors: [],
    };
  },
  methods: {
    /**
     * emitで渡ってきた都道府県を変数に代入.
     */
    registerPrefecture(prefecture) {
      this.prefecture = prefecture;
    },
    /**
     * 登録する.
     */
    register() {
      // エラーリストの初期化
      this.errors = [];
      
      // フルネーム（漢字）のエラー
      if (this.fullName1 === "") {
        this.fullName1Error = "名前を入力してください";
        this.errorCheck = true;
        this.errors.push(this.errorCheck);
      } else {
        this.fullName1Error = "";
        this.errorCheck = false;
      }
      this.errors.push(this.errorCheck);

      // フルネーム（かな）のエラー
      if (this.fullName2 === "") {
        this.fullName2Error = "ふりがなを入力してください";
        this.errorCheck = true;
      } else {
        this.fullName2Error = "";
        this.errorCheck = false;
      }
      this.errors.push(this.errorCheck);

      // 郵便番号のエラー
      if (this.zipcode === "") {
        this.zipcodeError = "郵便番号を入力してください";
        this.errorCheck = true;
      } else if (this.zipcode.length !== 7) {
        this.zipcodeError = "郵便番号は7桁で入力してください";
        this.errorCheck = true;
      } else {
        this.zipcodeError = "";
        this.errorCheck = false;
      }
      this.errors.push(this.errorCheck);

      // 都道府県のエラー
      if (this.prefecture === "") {
        this.prefectureError = "都道府県を選択してください";
        this.errorCheck = true;
      } else {
        this.prefectureError = "";
        this.errorCheck = false;
      }
      this.errors.push(this.errorCheck);

      // 住所のエラー
      if (this.address === "") {
        this.addressError = "住所を入力してください";
        this.errorCheck = true;
      } else {
        this.addressError = "";
        this.errorCheck = false;
      }
      this.errors.push(this.errorCheck);

      // 電話番号のエラー
      if (this.telephone === "") {
        this.telephoneError = "電話番号を入力してください";
        this.errorCheck = true;
      } else {
        this.telephoneError = "";
        this.errorCheck = false;
      }
      this.errors.push(this.errorCheck);

      // メールアドレスのエラー
      if (this.mailAddress === "") {
        this.mailaddressError = "メールアドレスを入力してください";
        this.errorCheck = true;
      } else if (this.mailAddress.indexOf("@") === -1) {
        this.mailaddressError = "正しい形式で入力してください";
        this.errorCheck = true;
      } else {
        this.mailaddressError = "";
        this.errorCheck = false;
      }
      this.errors.push(this.errorCheck);

      // パスワードのエラー
      if (this.password === "") {
        this.passwordError = "パスワードを入力してください";
        this.errorCheck = true;
      } else if (this.password.length < 9) {
        this.passwordError = "パスワードは8桁以上で設定してください";
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

      let object = {
        fullName1: "",
        fullName2: "",
        zipcode: "",
        prefecture: "",
        address: "",
        telephone: "",
        mailAddress: "",
        password: "",
      };
      console.log(object);

      // 登録情報を送信する
      this.$store.commit("register");
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
