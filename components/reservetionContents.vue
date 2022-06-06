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
    fullName1Error: String,
    fullName2Error: String,
    zipcodeError: String,
    prefectureError: String,
    addressError: String,
    telephoneError: String,
    mailaddressError: String,
    checkInTimeError: String,
    manAndWomanError: String,
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
  },
  data() {
    return {
      hotelName: "The Okura Tokyo",
      dateAndMeal: "2022月5月30日〜 1泊 食事なし",
      peopleAndRooms: "大人2名 1室",
      room: "プレステージルーム ツイン 【禁煙】",
      plan: "ホテルのリンクを貼る（？）",
      subPrice: 0,
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
        this.fullName1Error = "名前を入力してください";
        this.errorCheck = true;
        this.errors.push(this.errorCheck);
      } else {
        this.fullName1Error = "";
        this.errorCheck = false;
      }
      this.errorObject.fullName1Error = this.fullName1Error;
      this.errors.push(this.errorCheck);

      // フルネーム（かな）のエラー
      if (this.fullName2 === "") {
        this.fullName2Error = "ふりがなを入力してください";
        this.errorCheck = true;
      } else {
        this.fullName2Error = "";
        this.errorCheck = false;
      }
      this.errorObject.fullName2Error = this.fullName2Error;
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
      this.errorObject.zipcodeError = this.zipcodeError;
      this.errors.push(this.errorCheck);

      // 都道府県のエラー
      if (this.prefecture === "") {
        this.prefectureError = "都道府県を選択してください";
        this.errorCheck = true;
      } else {
        this.prefectureError = "";
        this.errorCheck = false;
      }
      this.errorObject.prefectureError = this.prefectureError;
      this.errors.push(this.errorCheck);

      // 住所のエラー
      if (this.address === "") {
        this.addressError = "住所を入力してください";
        this.errorCheck = true;
      } else {
        this.addressError = "";
        this.errorCheck = false;
      }
      this.errorObject.addressError = this.addressError;
      this.errors.push(this.errorCheck);

      // 電話番号のエラー
      if (this.telephone === "") {
        this.telephoneError = "電話番号を入力してください";
        this.errorCheck = true;
      } else {
        this.telephoneError = "";
        this.errorCheck = false;
      }
      this.errorObject.telephoneError = this.telephoneError;
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
      this.errorObject.mailaddressError = this.mailaddressError;
      this.errors.push(this.errorCheck);

      // チェックイン時刻のエラー
      if (this.checkInTime === "") {
        this.checkInTimeError = "チェックイン時刻を選択してください";
        this.errorCheck = true;
      } else {
        this.checkInTimeError = "";
        this.errorCheck = false;
      }
      this.errorObject.checkInTimeError = this.checkInTimeError;
      this.errors.push(this.errorCheck);

      // 宿泊人数のエラー
      if (this.man === "" || this.woman === "") {
        this.manAndWomanError = "人数を選択してください";
        this.errorCheck = true;
      } else {
        this.manAndWomanError = "";
        this.errorCheck = false;
      }
      this.errorObject.manAndWomanError = this.manAndWomanError;
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
        checkInTime: "",
        man: "",
        woman: "",
        payments: "",
        other: "",
      };
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
      object.other = this.other;

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
