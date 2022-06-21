<template>
  <div class="d-flex justify-center">
    <div class="whole">
      <div class="container">
        <div class="main">
          <div class="reserve-info">
            <h4>予約者情報</h4>
            <v-col
              >氏名：<span class="name-field" outlined>{{
                fullName1
              }}</span></v-col
            >
            <v-col
              >かな：<span class="name2-field" outlined>{{
                fullName2
              }}</span></v-col
            >
            <v-col
              >郵便番号：<span class="zipcode" outlined>{{
                zipcode
              }}</span></v-col
            >
            <v-col
              >住所：<span class="address" outlined>{{
                prefecture + address
              }}</span></v-col
            >
            <v-col
              >電話番号：<span class="telephone" outlined>{{
                telephone
              }}</span></v-col
            >
            <v-col
              >メールアドレス：<span class="mailaddress" outlined>{{
                mailAddress
              }}</span></v-col
            >
            <hr />
          </div>

          <div class="lodging-info">
            <h4>宿泊情報</h4>
            <v-col>
              チェックイン予定時刻&nbsp;&nbsp;&nbsp;<span>{{
                checkInTime
              }}</span>
            </v-col>
            <v-col class="select-gender">
              宿泊人数&nbsp;&nbsp;&nbsp;1室目 (大人{{
                people
              }}名)&nbsp;&nbsp;男性&nbsp;<span>{{ man }}</span>
              &nbsp;女性&nbsp;<span>{{ woman }}</span>
            </v-col>
            <hr />
          </div>

          <div class="payment">
            <h4>お支払い方法</h4>
            <v-col>{{ payments }}</v-col>
            <v-card class="reflectionInfo" v-if="!cardFlag">
              <span>カード情報：{{ card_number }} </span><br />
              <span>セキュリティコード：{{ card_cvv }}</span
              ><br />
              <span>有効期限：{{ card_exp_month }}/{{ card_exp_year }}</span
              ><br />
              <span>カード名義人：{{ card_name }}</span>
            </v-card>
            <hr />
          </div>

          <div class="contact">
            <h4>施設への連絡事項</h4>
            <v-col>{{ other }}</v-col>
            <div class="attentions">
              <span
                >※ご希望に添えない場合もございます。予めご了承ください。</span
              ><br />
              <span>※機種依存文字の入力はできません。</span><br />
              <span
                >※当サイトに関する質問は
                お問合せフォームをご利用ください。</span
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
            <span class="attention"
              >※ 8日前まではキャンセル料はかかりません。</span
            >
          </div>
        </div>

        <div class="reservetion-contents">
          <img class="reserve-img" src="@/assets/img/2.png" />
          <!-- コンポーネント start-->
          <reservetionContents2
            class="reservetionContents2"
            :reserveArray="reserveArray"
            :reserveId2="reserveId2"
          ></reservetionContents2>
          <!-- コンポーネント end-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import reservetionContents2 from "../components/reservetionContents2.vue";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import firebase from "@/plugins/firebase";

export default {
  components: {
    reservetionContents2,
  },
  data() {
    return {
      // 予約情報の配列
      reserveArray: [],
      // カードフラッグ
      cardFlag: false,
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
      people: 2,
      // 男性
      man: "",
      // 女性
      woman: "",
      // 決済方法
      payments: "",
      // カード番号
      card_number: "",
      // セキュリティコード
      card_cvv: "",
      // 有効期限(月)
      card_exp_month: "",
      // 有効期限(日)
      card_exp_year: "",
      // カード名義人
      card_name: "",
      // 施設への連絡事項
      other: "",
      // ログインユーザー
      loginUser: {},
      // 予約一覧
      reserveList: [],
      // 予約情報
      reserveInfo: {},
      // 予約ID
      reserveId2: "0",
    };
  }, //end data

  /**
   * 非同期処理(予約情報の反映).
   */
  async mounted() {
    const db = getFirestore(firebase);

    // 現在ログイン中のユーザー情報を取得
    this.loginUser = this.$store.getters["register/getLoginUser"];

    // 予約情報の中から一番最新の情報を取得
    try {
      const docRef = collection(
        db,
        "ユーザー一覧",
        String(this.loginUser.id),
        "予約情報"
      );

      await getDocs(docRef).then((snapShot) => {
        const data = snapShot.docs.map((doc) => ({
          ...doc.data(),
        }));
        // console.log(data);

        this.reserveList = data;
      });
    } catch (error) {
      console.error(error);
    }

    let targetIndex = this.reserveList[this.reserveList.length - 1];

    this.fullName1 = targetIndex.fullName1;
    this.fullName2 = targetIndex.fullName2;
    this.zipcode = targetIndex.zipcode;
    this.prefecture = targetIndex.prefecture;
    this.address = targetIndex.address;
    this.telephone = targetIndex.telephone;
    this.mailAddress = targetIndex.mailAddress;
    this.checkInTime = targetIndex.checkInTime;
    this.man = targetIndex.man;
    this.woman = targetIndex.woman;
    this.payments = targetIndex.payments;
    this.card_number = targetIndex.card_number;
    this.card_cvv = targetIndex.card_cvv;
    this.card_exp_month = targetIndex.card_exp_month;
    this.card_exp_year = targetIndex.card_exp_year;
    this.card_name = targetIndex.card_name;
    this.other = targetIndex.other;

    this.reserveId2 = targetIndex.detailObject.reserveId;

    // 決済方法によるカードの表示切り替え
    if (this.payments === "現地決済") {
      this.cardFlag = true;
    } else {
      this.cardFlag = false;
    }
  },

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
.radio,
.container {
  display: flex;
  justify-content: center;
  position: relative;
  top: 0;
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
  width: 500px;
  position: relative;
  right: 0;
}
.reserve-img {
  object-fit: cover;
  width: 250px;
  height: 80px;
  margin-right: 50px;
  position: relative;
  left: 160px;
}
.reflectionInfo {
  padding: 20px;
  margin: 10px;
}
.reservetionContents2 {
  padding: 0;
}

.whole {
  width: 90%;
  margin: 60px 0;
}
</style>
