<template>
  <div class="container">
    <div class="main">
      <div class="reserve-info">
        <h4>予約者情報</h4>
        <v-btn class="login-info" color="primary" @click="loginInfoReflection"
          >ログイン情報を反映させる</v-btn
        ><br />
        <span style="color: red">*</span>氏名<span style="color: red"
          >&emsp;{{ fullName1Error }}</span
        ><v-text-field
          class="name-field"
          label="楽々太郎"
          v-model="fullName1"
          outlined
        ></v-text-field>
        <span style="color: red">*</span>かな<span style="color: red"
          >&emsp;{{ fullName2Error }}</span
        ><v-text-field
          class="name2-field"
          label="ラクラクタロウ"
          v-model="fullName2"
          outlined
        ></v-text-field>
        <span style="color: red">*</span>郵便番号（ハイフンなし）<span
          style="color: red"
          >&emsp;{{ zipcodeError }}</span
        ><v-text-field
          class="zipcode"
          label="0000000"
          v-model="zipcode"
          maxlength="7"
          outlined
        ></v-text-field>
        <!-- コンポーネント start-->
        <span style="color: red">*</span>住所<span style="color: red"
          >&emsp;{{ prefectureError }}</span
        >
        <div v-if="prefecture !== ''">
          <selectPrefectures
            @prefecture="reservePrefecture"
            :prefecture="prefecture"
          ></selectPrefectures>
        </div>
        <div v-else>
          <selectPrefectures
            @prefecture="reservePrefecture"
            :prefecture="prefecture"
          ></selectPrefectures>
        </div>
        <!-- コンポーネント end-->
        <span style="color: red">&emsp;{{ addressError }}</span>
        <v-text-field
          class="address"
          label="港区赤坂0-0-0（海外住所の場合は「海外」と入力）"
          v-model="address"
          outlined
        ></v-text-field>
        <span style="color: red">*</span>電話番号（ハイフンなし）<span
          style="color: red"
          >&emsp;{{ telephoneError }}</span
        ><v-text-field
          class="telephone"
          label="09012345678"
          v-model="telephone"
          outlined
        ></v-text-field>
        <span style="color: red">*</span>メールアドレス<span style="color: red"
          >&emsp;{{ mailaddressError }}</span
        ><v-text-field
          class="mailaddress"
          label="rakuraku@example.jp"
          type="text"
          v-model="mailAddress"
          outlined
        ></v-text-field>
        <hr />
      </div>

      <div class="lodging-info">
        <h4>宿泊情報</h4>
        <span style="color: red">*</span>チェックイン予定時刻<span
          style="color: red"
          >&emsp;{{ checkInTimeError }}</span
        ><selectChecin @checkin="reserveCheckIn"></selectChecin>
        <span style="color: red">*</span>宿泊人数 1室目 (大人{{ people }}名)
        <span style="color: red">&ensp;{{ manAndWomanError }}</span>
        <v-row class="gender"
          >男性&nbsp;<v-select
            class="select-g"
            label="選択する"
            :items="items"
            v-model="man"
            outlined
          >
          </v-select
          >&nbsp;女性&nbsp;<v-select
            class="select-g"
            label="選択する"
            :items="items"
            v-model="woman"
            outlined
          >
          </v-select
        ></v-row>
        <hr />
      </div>

      <div class="payment">
        <h4><span style="color: red">*</span>お支払い方法</h4>
        <v-radio-group @change="payment" v-model="payments">
          <label for="online" class="radio"
            >オンライン決済<v-radio id="online" value="オンライン決済"></v-radio
          ></label>

          <v-card
            v-if="!flag"
            class="online-info"
            style="background-color: #f5f5f5"
          >
            <div class="card-img">
              <img src="@/assets/img/jcb.png" />
              <img src="@/assets/img/amex.png" />
              <img src="@/assets/img/visa.png" />
              <img src="@/assets/img/master.png" />
              <img src="@/assets/img/diners.png" />
            </div>
            <v-btn
              Large
              color="primary"
              class="card-info"
              @click="inputCardInfo"
              >カード情報を入力する</v-btn
            ><br />

            <!-- モーダルウィンドウ start-->
            <creditcard
              :cardFlag="cardFlag"
              @change="inputCardInfo"
              @reflectionCardInfo="reflectionCardInfo"
            ></creditcard>
            <!-- モーダルウィンドウ end-->

            <v-card class="reflectionInfo" v-if="creditFlag">
              <span>カード情報：{{ card_number }} </span><br />
              <span>セキュリティコード：{{ card_cvv }}</span
              ><br />
              <span>有効期限：{{ card_exp_month }}/{{ card_exp_year }}</span
              ><br />
              <span>カード名義人：{{ card_name }}</span>
            </v-card>

            <span>予約日の翌日に決済となります。</span><br />
            <span style="font-size: 13px"
              >※デビット・プリペイドカードはこの限りではありません</span
            >
          </v-card>

          <label for="cash" class="radio"
            >現地決済<v-radio id="cash" value="現地決済"></v-radio
          ></label>

          <v-card
            v-if="flag"
            class="cash-info"
            style="background-color: #f5f5f5"
          >
            <span>宿泊当日の正午までにオンラインカード決済に変更可能です。</span
            ><br />
            <span style="font-size: 13px"
              >※チェックイン予定時間以降の変更はできません</span
            >
          </v-card>
        </v-radio-group>
        <hr />
      </div>

      <div class="contact">
        <h4>施設への連絡事項（未記入可）</h4>
        <v-textarea solo style="width: 500px" v-model="other"></v-textarea>
        <div class="attentions">
          <span>※ご希望に添えない場合もございます。予めご了承ください。</span
          ><br />
          <span>※機種依存文字の入力はできません。</span><br />
          <span
            >※当サイトに関する質問は お問合せフォームをご利用ください。</span
          >
        </div>
        <hr />
      </div>

      <div class="cancellation-policy">
        <h4>キャンセルポリシー</h4>
        <span
          >当予約のキャンセル・変更の場合、以下のキャンセル料を申し受けます。</span
        >
        <table border="1px">
          <td>
            前日 15:00から <br />
            100%
          </td>
          <td>
            不泊 <br />
            100%
          </td>
        </table>
        <span class="attention">※ 8日前まではキャンセル料はかかりません。</span>
      </div>
    </div>

    <div class="reservetion-contents">
      <img class="reserve-img" src="@/assets/img/1.png" />
      <!-- コンポーネント start-->
      <reservetionContents
        :fullName1="fullName1"
        :fullName2="fullName2"
        :zipcode="zipcode"
        :prefecture="prefecture"
        :address="address"
        :telephone="telephone"
        :mailAddress="mailAddress"
        :checkInTime="checkInTime"
        :man="man"
        :woman="woman"
        :payments="payments"
        :other="other"
        :errorChecks="errorChecks"
        :card_number="card_name"
        :card_cvv="card_cvv"
        :card_exp_month="card_exp_month"
        :card_exp_year="card_exp_year"
        :card_name="card_name"
        @errorObject="errorObject"
      ></reservetionContents>
      <!-- コンポーネント end-->
    </div>
  </div>
</template>

<script>
import selectPrefectures from "../../components/selectPrefectures.vue";
import selectChecin from "../../components/selectCheckin.vue";
import reservetionContents from "../../components/reservetionContents.vue";
import creditcard from "../../components/creditcard.vue";

export default {
  name: "reserveForm",
  components: {
    selectPrefectures,
    selectChecin,
    reservetionContents,
    creditcard,
  },
  data() {
    return {
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
      // チェックイン時刻のエラー
      checkInTimeError: "",
      // 宿泊人数のエラー
      manAndWomanError: "",
      // フラッグ
      flag: false,
      // カードフラッグ
      cardFlag: false,
      // クレカフラッグ
      creditFlag: false,
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
      // チェックイン時間
      checkInTime: "",
      // 宿泊人数
      people: 0,
      // 男
      man: "",
      // 女
      woman: "",
      // 男女の人数
      items: ["0名", "1名", "2名"],
      // 決済方法
      payments: "オンライン決済",
      // 施設への連絡事項
      other: "",
      // カード番号
      card_number: "",
      // セキュリティコード
      card_cvv: 0,
      // 有効期限(月)
      card_exp_month: "",
      // 有効期限(年)
      card_exp_year: "",
      // カード名義人
      card_name: "",
      // ログイン情報
      loginInfo: {},
      // エラーチェックオブジェクト
      errorChecks: {
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

  methods: {
    /**
     * ログイン情報の反映.
     */
    loginInfoReflection() {
      this.loginInfo = this.$store.getters["register/getUserList"];
      this.fullName1 = this.loginInfo[0].fullName1;
      this.fullName2 = this.loginInfo[0].fullName2;
      this.zipcode = this.loginInfo[0].zipcode;
      this.prefecture = this.loginInfo[0].prefecture;
      this.address = this.loginInfo[0].address;
      this.telephone = this.loginInfo[0].telephone;
      this.mailAddress = this.loginInfo[0].mailAddress;
    },
    /**
     * emitで渡ってきた都道府県を変数に代入.
     */
    reservePrefecture(prefecture2) {
      this.prefecture = prefecture2;
    },
    /**
     * emitで渡ってきたチェックイン時刻を変数に代入.
     */
    reserveCheckIn(checkin) {
      this.checkInTime = checkin;
    },
    /**
     * emitで渡ってきたエラーオブジェクトを変数に代入.
     */
    errorObject(errorObject) {
      this.fullName1Error = errorObject.fullName1Error;
      this.fullName2Error = errorObject.fullName2Error;
      this.zipcodeError = errorObject.zipcodeError;
      this.prefectureError = errorObject.prefectureError;
      this.addressError = errorObject.addressError;
      this.telephoneError = errorObject.telephoneError;
      this.mailaddressError = errorObject.mailaddressError;
      this.checkInTimeError = errorObject.checkInTimeError;
      this.manAndWomanError = errorObject.manAndWomanError;
    },
    /**
     * お支払い方法の表示切り替え.
     */
    payment() {
      if (this.flag === true) {
        this.flag = false;
      } else {
        this.flag = true;
      }
    },
    /**
     * カード情報を入力する.
     */
    inputCardInfo() {
      if (this.cardFlag === false) {
        this.cardFlag = true;
      } else {
        this.cardFlag = false;
      }
    },
    /**
     * emitで渡ってきたクレカ情報を変数に代入.
     */
    reflectionCardInfo(creditObject) {
      this.card_number = creditObject.card_number;
      this.card_cvv = creditObject.card_cvv;
      this.card_exp_month = creditObject.card_exp_month;
      this.card_exp_year = creditObject.card_exp_year;
      this.card_name = creditObject.card_name;
      this.cardFlag = creditObject.cardFlag;
      this.creditFlag = creditObject.creditFlag;
    },
  }, // end methods

  computed: {}, // end computed
};
</script>

<style scoped>
.name-field,
.name2-field,
.zipcode,
.address,
.mailaddress,
.telephone {
  width: 500px;
}
.container {
  display: flex;
  justify-content: center;
}
.radio {
  display: flex;
}
.reserve-info,
.lodging-info,
.payment,
.contact,
.cancellation-policy {
  margin-top: 20px;
}
.login-info {
  margin-bottom: 20px;
}
h4 {
  margin-bottom: 10px;
}
.attentions {
  font-size: 13px;
  margin-bottom: 20px;
}
table {
  text-align: center;
  margin: 20px;
}
td {
  width: 300px;
  padding: 10px;
}
.select-g {
  width: 100px;
}
.online-info,
.cash-info {
  margin-top: 10px;
  margin-bottom: 20px;
  padding: 30px;
}
.card-info {
  margin-bottom: 10px;
}
.card-img {
  width: 300px;
}
img {
  object-fit: cover;
  width: 40px;
  height: 30px;
}
p {
  font-size: 20px;
}
.reflectionInfo {
  padding: 20px;
  margin: 10px;
}
.reservetion-contents {
  margin-left: 100px;
}
.reserve-img {
  object-fit: cover;
  width: 250px;
  height: 80px;
  float: right;
  margin-right: 80px;
}
.gender {
  margin-top: 10px;
  margin-left: 15px;
  margin-right: 15px;
}
</style>
