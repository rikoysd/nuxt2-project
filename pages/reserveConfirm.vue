<template>
  <div class="container">
    <div class="main">
      <div class="reserve-info">
        <h4>予約者情報</h4>
        氏名<v-col class="name-field" outlined>{{ fullName1 }}</v-col>
        かな<v-col class="name2-field" outlined>{{ fullName2 }}</v-col>
        郵便番号（ハイフンなし）<v-col class="zipcode" outlined>{{
          zipcode
        }}</v-col>
        住所<v-col class="address" outlined>{{ prefecture + address }}</v-col>
        電話番号（ハイフンなし）<v-col class="telephone" outlined>{{
          telephone
        }}</v-col>
        メールアドレス<v-col class="mailaddress" outlined>{{
          mailAddress
        }}</v-col>
        <hr />
      </div>

      <div class="lodging-info">
        <h4>宿泊情報</h4>
        <v-col>
          チェックイン予定時刻&nbsp;&nbsp;&nbsp;<span>{{ checkInTime }}</span>
        </v-col>
        <v-col class="select-gender">
          宿泊人数&nbsp;&nbsp;&nbsp;1室目 (大人{{
            people
          }}名)&nbsp;&nbsp;男性&nbsp;<span>{{ man }}名</span>
          &nbsp;女性&nbsp;<span>{{ woman }}名</span>
        </v-col>
        <hr />
      </div>

      <div class="payment">
        <h4>お支払い方法</h4>
        <v-col>{{ payment }}</v-col>
        <hr />
      </div>

      <div class="contact">
        <h4>施設への連絡事項</h4>
        <v-col>{{ other }}</v-col>
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
      <reservetionContents2></reservetionContents2>
    </div>
  </div>
</template>

<script>
import reservetionContents2 from "../components/reservetionContents2.vue";

export default {
  name: "reserveForm",
  components: {
    reservetionContents2,
  },
  data() {
    return {
      // フラッグ
      flag: false,
      // カードフラッグ
      cardFlag: false,
      // フルネーム（氏名）
      fullName1: "山田花子",
      // フルネーム（かな）
      fullName2: "やまだはなこ",
      // 郵便番号
      zipcode: "1234567",
      // 都道府県
      prefecture: "東京都",
      // 住所
      address: "新宿区新宿3丁目",
      // 電話番号
      telephone: "09012345678",
      // メールアドレス
      mailAddress: "aaa@co.jp",
      // チェックイン時間
      checkInTime: "15:00",
      // 宿泊人数
      people: 2,
      // 男性
      man: 1,
      // 女性
      woman: 1,
      // 決済方法
      payment: "オンライン決済",
      // 施設への連絡事項
      other: "特にありません。",
    };
  }, //end data

  computed: {}, // end computed

  methods: {}, // end methods
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
.select-gender,
.radio,
.container {
  display: flex;
}
.select-g {
  width: 30px;
}
.reserve-info,
.lodging-info,
.payment,
.contact,
.cancellation-policy {
  margin-top: 20px;
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
.online-info,
.cash-info {
  margin-top: 10px;
  margin-bottom: 20px;
  padding: 30px;
}
.card-info {
  margin-bottom: 10px;
}
#overlay {
  /*　要素を重ねた時の順番　*/
  z-index: 1;
  /*　画面全体を覆う設定　*/
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  /*　画面の中央に要素を表示させる設定　*/
  display: flex;
  align-items: center;
  justify-content: center;
}
#content {
  z-index: 2;
  width: 50%;
  padding: 1em;
  background: #fff;
}
.creditcard {
  margin: 10px;
  padding: 20px;
}
.close-button {
  margin-top: 15px;
  margin-left: 10px;
}
.reservetion-contents {
  margin-left: 100px;
}
</style>
