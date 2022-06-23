<template>
  <div class="whole mx-auto d-flex justify-center">
    <div class="container">
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
      都道府県名<span>&emsp;{{ prefectureError }}</span
      ><selectPrefectures2
        :prefecture2="prefecture"
        @prefecture="registerPrefecture"
      ></selectPrefectures2>
      住所（都道府県以下）<span>&emsp;{{ addressError }}</span>
      <v-text-field
        class="address-m"
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
      メールアドレス<span>&emsp;{{ mailAddressError }}</span
      ><span>&emsp;{{ mailAddressError2 }}</span
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
          color="#333c5e"
          elevation="2"
          large
          @click="register"
          >登録</v-btn
        >
      </v-row>
    </div>
    <div class="mainContent"></div>
  </div>
</template>

<script>
import selectPrefectures2 from "../components/selectPrefectures2.vue";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import firebase from "@/plugins/firebase";

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
      mailAddressError: "",
      // メールアドレスのエラー(メアド重複チェック用)
      mailAddressError2: "",
      // パスワードのエラー
      passwordError: "",
      // エラーチェック
      errorCheck: "false",
      // エラーリスト
      errors: [],
      // ユーザー一覧
      userList: [],
      // エラーメッセージ
      errorMessage: "",
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

      // メールアドレスの重複エラー
      let sameAddress = "";
      for (let i = 0; i < this.userList.length; i++) {
        if (this.userList[i].mailAddress === this.mailAddress) {
          sameAddress = this.mailAddress;
        }
      }

      if (sameAddress !== "") {
        this.mailAddressError2 = "このメールアドレスは既に登録されています";
        this.errorCheck = true;
        this.errors.push(this.errorCheck);
      } else {
        this.mailAddressError2 = "";
        this.errorCheck = false;
        this.errors.push(this.errorCheck);
      }

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

      // 登録情報を送信する
      const db = getFirestore(firebase);
      try {
        const docRef1 = setDoc(doc(db, "ユーザー一覧", String(userId)), {
          id: userId,
          fullName1: this.fullName1,
          fullName2: this.fullName2,
          zipcode: this.zipcode,
          prefecture: this.prefecture,
          address: this.address,
          mailAddress: this.mailAddress,
          telephone: this.telephone,
          password: this.password,
        });
        // console.log(docRef1);
      } catch (error) {
        console.error(error);
        this.errorMessage = "エラーが発生したため登録できませんでした";
      }

      // ログインページに遷移
      this.$router.push("/login");
    },
  },
  computed: {},
};
</script>

<style scoped>
.mainContent {
  width: 100vw;
  height: 1300px;
  background-image: url(../assets/img/background-img.jpg);
  background-size: cover;
  background-position: center center;
  background-attachment: fixed;
  background-repeat: no-repeat;
  position: absolute;
  left: 0;
  overflow: auto;
  z-index: 0;
}
.container {
  width: 600px;
  border-radius: 5px;
  padding: 45px 40px;
  background-color: white;
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
    rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
  margin: 60px 0;
  z-index: 1;
  position: relative;
  right: 8%;
}

.register-btn {
  margin-top: 30px;
  color: white;
}

span {
  color: red;
}

.whole {
  width: 100%;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  /* background-image: url(../assets/img/background-img.jpg);
  background-size: cover;
  background-position: center center;
  background-attachment: fixed;
  background-repeat: no-repeat; */
}

.whole[data-v-0ad26307] {
  width: 100vw;
}
</style>
