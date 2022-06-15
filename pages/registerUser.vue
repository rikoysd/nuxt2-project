<template>
  <div class="whole mx-auto d-flex justify-center">
    <div class="container">
      <v-btn
        class="register-btn"
        color="primary"
        elevation="2"
        @click="registerDummy"
        >ダミーを登録する</v-btn
      >
      <div>※パスワードはフォームの例と同じ</div>
      <h3 class="d-flex justify-center mb-6">会員登録</h3>
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
        label="らくらくたろう"
        v-model="fullName2"
        outlined
      ></v-text-field>
      郵便番号（ハイフンなし）<span>&emsp;{{ zipcodeError }}</span
      ><v-text-field
        class="zipcode"
        label="0000000"
        v-model="zipcode"
        outlined
        maxlength="7"
      ></v-text-field>
      住所<span>&emsp;{{ prefectureError }}</span
      ><selectPrefectures2
        :prefecture2="prefecture"
        @prefecture="registerPrefecture"
      ></selectPrefectures2
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
        label="Rakus12345?（8～16文字、英小大文字、数字、記号(.?/-)を各1つ以上）"
        v-model="password"
        type="password"
        outlined
      ></v-text-field>
      <v-row justify="center">
        <v-btn
          class="register-btn"
          color="primary"
          elevation="2"
          large
          @click="register"
          >登録</v-btn
        >
      </v-row>
    </div>
  </div>
</template>

<script>
import selectPrefectures2 from "../components/selectPrefectures2.vue";

export default {
  components: {
    selectPrefectures2,
  },
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
      // ユーザー一覧
      userList: [],
    };
  },
  mounted() {
    this.userList = this.$store.getters["register/getUserList"];
  },
  methods: {
    // テスト用(最後に削除する)
    registerDummy() {
      this.fullName1 = "山田太郎";
      this.fullName2 = "やまだたろう";
      this.zipcode = "1600022";
      this.address = "新宿区";
      this.telephone = "09012345678";
      this.mailAddress = "aa@aa";
      this.password = "Rakus12345?";
    },
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
        this.prefecture;
        Error = "都道府県を選択してください";
        this.errorCheck = true;
      } else {
        this.prefecture;
        Error = "";
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

      // メールアドレスの重複エラー
      let addressArray = [];
      for (let user of this.userList) {
        addressArray.push(user.mailAddress);
      }
      let sameAddress = "";
      for (let address of addressArray) {
        if (address === this.mailAddress) {
          sameAddress = this.mailAddress;
        }
      }
      if (sameAddress !== "") {
        this.mailaddressError = "このメールアドレスは既に登録されています";
        this.errorCheck = true;
      } else {
        this.mailaddressError = "";
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
      // 正規表示を定義(※英語小文字・大文字、数字、記号(.?/-)をそれぞれ1つ以上使用して設定)
      const regex = /^(?=.*[A-Z])(?=.*[.?/-])[a-zA-Z0-9.?/-]{8,16}$/;

      if (this.password === "") {
        this.passwordError = "パスワードを入力してください";
        this.errorCheck = true;
      } else if (this.password.length < 8 || this.password.length > 16) {
        this.passwordError =
          "パスワードは8文字以上16文字以内で設定してください";
        this.errorCheck = true;
      } else if (!regex.test(this.password)) {
        this.passwordError = "設定の条件を満たしていません";
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

      // ユーザーIDを作成
      let userId = 0;
      let idList = [];
      if (this.userList.length === 0) {
        userId = 1;
      } else {
        for (let user of this.userList) {
          idList.push(user.id);
        }
        userId = Math.max(...idList) + 1;
      }

      let object = {
        id: "",
        fullName1: "",
        fullName2: "",
        zipcode: "",
        prefecture: "",
        address: "",
        telephone: "",
        mailAddress: "",
        password: "",
      };

      object.id = userId;
      object.fullName1 = this.fullName1;
      object.fullName2 = this.fullName2;
      object.zipcode = this.zipcode;
      object.prefecture = this.prefecture;
      object.address = this.address;
      object.telephone = this.telephone;
      object.mailAddress = this.mailAddress;
      object.password = this.password;

      // 登録情報を送信する
      this.$store.commit("register", object);

      // ログインページに遷移
      this.$router.push("/login");
    },
  },
  computed: {},
};
</script>

<style scoped>
.container {
  width: 600px;
  border-radius: 5px;
  padding: 45px 40px;
  background-color: white;
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
    rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
  margin: 60px 0;
}

.register-btn {
  margin-top: 30px;
}

span {
  color: red;
}

.whole {
  width: 100%;
  height: 100%;
  background-image: url(../assets/img/background-img.jpg);
  background-size: cover;
  background-position: center center;
  background-attachment: fixed;
  background-repeat: no-repeat;
}

.whole[data-v-0ad26307] {
  width: 100vw;
}
</style>
