<template>
  <div class="container">
    <v-card class="main-card" style="background-color: lightgray">
      <span class="hotel-name">{{ hotelName }}</span>

      <div class="plans" style="background-color: white">
        <span style="font-weight: bold">日付・食事</span>&nbsp;&nbsp;<v-col>{{
          dateAndMeal
        }}</v-col
        ><br />
        <span style="font-weight: bold">人数室数</span>&nbsp;&nbsp;<v-col>{{
          peopleAndRooms
        }}</v-col
        ><br />
        <span style="font-weight: bold">部屋</span>&nbsp;&nbsp;<v-col>{{
          room
        }}</v-col
        ><br />
        <span style="font-weight: bold">プラン</span
        >&nbsp;&nbsp;&nbsp;&nbsp;<v-col>{{ plan }}</v-col>
      </div>

      <div class="price" style="background-color: white">
        <span style="font-weight: bold">宿泊料金合計</span
        >&nbsp;&nbsp;&nbsp;&nbsp;<span>{{ subPrice.toLocaleString() }}円</span>
        <hr />
        <span style="font-weight: bold">お支払い金額</span
        >&nbsp;&nbsp;&nbsp;&nbsp;<span class="total-price"
          >{{ totalPrice.toLocaleString() }}円</span
        ><br />
        <span class="content">消費税・サービス料込み</span>
      </div>

      <div class="attentions">
        <span>※入湯税がかかる場合があります。</span><br />
        <span>※宿泊税など別途諸税がかかる場合があります。</span>
      </div>

      <v-btn
        x-large
        class="confirm-button"
        style="background-color: #e9bc00"
        @click="reserveConfirm"
        >入力内容を確認する</v-btn
      >
    </v-card>
  </div>
</template>

<script>
export default {
  name: "reservetionContents",
  props: {
    fullName1: String,
    fullName2: String,
    zipcode: String,
    prefecture: String,
    address: String,
    telephone: String,
    mailAddress: String,
    checkInTime: String,
    man: String,
    woman: String,
    payments: String,
    other: String,
    errorChecks: Object,
    card_number: String,
    card_cvv: Number,
    card_exp_month: String,
    card_exp_year: String,
    card_name: String,
  },
  data() {
    return {
      // ホテル名
      hotelName: "The Okura Tokyo",
      // ホテル詳細
      dateAndMeal: "2022月5月30日〜 1泊 食事なし",
      // 宿泊人数
      peopleAndRooms: "大人2名 1室",
      // 部屋の種類
      room: "プレステージルーム ツイン 【禁煙】",
      // リンク？
      plan: "ホテルのリンクを貼る（？）",
      // 宿泊料金合計
      subPrice: 0,
      // お支払い金額
      totalPrice: 0,
      // エラーチェック
      errorCheck: "false",
      // エラーリスト
      errors: [],
      // エラーオブジェクト
      errorObject: {
        fullName1Error: "",
        fullName2Error: "",
        zipcodeError: "",
        prefectureError: "",
        addressError: "",
        telephoneError: "",
        mailaddressError: "",
        checkInTimeError: "",
        manAndWomanError: "",
      },
    };
  }, //end data

  computed: {}, // end computed

  methods: {
    /**
     * 予約確認画面に遷移する.
     */
    reserveConfirm() {
      // エラーリストの初期化
      this.errors = [];

      // フルネーム（漢字）のエラー
      if (this.fullName1 === "") {
        this.errorChecks.fullName1Error = "名前を入力してください";
        this.errorCheck = true;
        this.errors.push(this.errorCheck);
      } else {
        this.errorChecks.fullName1Error = "";
        this.errorCheck = false;
      }
      this.errorObject.fullName1Error = this.errorChecks.fullName1Error;
      this.errors.push(this.errorCheck);

      // フルネーム（かな）のエラー
      if (this.fullName2 === "") {
        this.errorChecks.fullName2Error = "ふりがなを入力してください";
        this.errorCheck = true;
      } else {
        this.errorChecks.fullName2Error = "";
        this.errorCheck = false;
      }
      this.errorObject.fullName2Error = this.errorChecks.fullName2Error;
      this.errors.push(this.errorCheck);

      // 郵便番号のエラー
      if (this.zipcode === "") {
        this.errorChecks.zipcodeError = "郵便番号を入力してください";
        this.errorCheck = true;
      } else if (this.zipcode.length !== 7) {
        this.errorChecks.zipcodeError = "郵便番号は7桁で入力してください";
        this.errorCheck = true;
      } else {
        this.errorChecks.zipcodeError = "";
        this.errorCheck = false;
      }
      this.errorObject.zipcodeError = this.errorChecks.zipcodeError;
      this.errors.push(this.errorCheck);

      // 都道府県のエラー
      if (this.prefecture === "") {
        this.errorChecks.prefectureError = "都道府県を選択してください";
        this.errorCheck = true;
      } else {
        this.errorChecks.prefectureError = "";
        this.errorCheck = false;
      }
      this.errorObject.prefectureError = this.errorChecks.prefectureError;
      this.errors.push(this.errorCheck);

      // 住所のエラー
      if (this.address === "") {
        this.errorChecks.addressError = "住所を入力してください";
        this.errorCheck = true;
      } else {
        this.errorChecks.addressError = "";
        this.errorCheck = false;
      }
      this.errorObject.addressError = this.errorChecks.addressError;
      this.errors.push(this.errorCheck);

      // 電話番号のエラー
      if (this.telephone === "") {
        this.errorChecks.telephoneError = "電話番号を入力してください";
        this.errorCheck = true;
      } else {
        this.errorChecks.telephoneError = "";
        this.errorCheck = false;
      }
      this.errorObject.telephoneError = this.errorChecks.telephoneError;
      this.errors.push(this.errorCheck);

      // メールアドレスのエラー
      if (this.mailAddress === "") {
        this.errorChecks.mailaddressError = "メールアドレスを入力してください";
        this.errorCheck = true;
      } else if (this.mailAddress.indexOf("@") === -1) {
        this.errorChecks.mailaddressError = "正しい形式で入力してください";
        this.errorCheck = true;
      } else {
        this.errorChecks.mailaddressError = "";
        this.errorCheck = false;
      }
      this.errorObject.mailaddressError = this.errorChecks.mailaddressError;
      this.errors.push(this.errorCheck);

      // チェックイン時刻のエラー
      if (this.checkInTime === "") {
        this.errorChecks.checkInTimeError =
          "チェックイン時刻を選択してください";
        this.errorCheck = true;
      } else {
        this.errorChecks.checkInTimeError = "";
        this.errorCheck = false;
      }
      this.errorObject.checkInTimeError = this.errorChecks.checkInTimeError;
      this.errors.push(this.errorCheck);

      // 宿泊人数のエラー
      if (this.man === "" || this.woman === "") {
        this.errorChecks.manAndWomanError = "人数を選択してください";
        this.errorCheck = true;
      } else {
        this.errorChecks.manAndWomanError = "";
        this.errorCheck = false;
      }
      this.errorObject.manAndWomanError = this.errorChecks.manAndWomanError;
      this.errors.push(this.errorCheck);

      // エラーの数を数える
      let array = [];
      for (let error of this.errors) {
        if (error === true) {
          array.push(error);
        }
      }

      // 親にエラーオブジェクトを渡す
      this.$emit("errorObject", this.errorObject);
      console.log(this.errorObject);

      // エラーが一つでもあったら処理を止める
      if (array.length > 0) {
        return;
      }
      // 予約情報IDの生成
      let reserveId = "";
      for (let i = 0; i < 7; i++) {
        let num = Math.floor(Math.random() * 10) + 11;
        let str = String(num);
        reserveId += str;
      }

      let object = {
        reserveId: "",
        fullName1: "",
        fullName2: "",
        zipcode: "",
        prefecture: "",
        address: "",
        telephone: "",
        mailAddress: "",
        checkInTime: "",
        man: "",
        woman: "",
        payments: "",
        card_number: "",
        card_cvv: 0,
        card_exp_month: "",
        card_exp_year: "",
        card_name: "",
        other: "",
      };
      object.reserveId = reserveId;
      object.fullName1 = this.fullName1;
      object.fullName2 = this.fullName2;
      object.zipcode = this.zipcode;
      object.prefecture = this.prefecture;
      object.address = this.address;
      object.telephone = this.telephone;
      object.mailAddress = this.mailAddress;
      object.checkInTime = this.checkInTime;
      object.man = this.man;
      object.woman = this.woman;
      object.payments = this.payments;
      object.card_number = this.card_number;
      object.card_cvv = this.card_cvv;
      object.card_exp_month = this.card_exp_month;
      object.card_exp_year = this.card_exp_year;
      object.card_name = this.card_name;
      object.other = this.other;

      // storeのmutationにobjectを渡す
      this.$store.commit("reserve", object);
      this.$router.push("/reserveConfirm");
    },
  }, // end methods
};
</script>

<style scoped>
.container {
  margin-top: 20px;
}
.main-card,
.plans,
.price {
  padding: 20px;
}
.hotel-name {
  font-weight: bold;
  font-size: 25px;
}
.plans,
.price {
  margin-top: 10px;
}
.content {
  font-size: 12px;
}
.attentions {
  font-size: 13px;
  margin-top: 10px;
}
.total-price {
  font-size: 25px;
}
.confirm-button {
  margin-top: 20px;
  margin-left: 85px;
  margin-right: 85px;
  color: white;
  font-weight: bold;
}
</style>
