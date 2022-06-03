<template>
  <div class="container">
    <div class="main">
      <div class="reserve-info">
        <h4>予約者情報</h4>
        <v-btn class="login-info" color="primary" @click="loginInfo"
          >ログイン情報を反映させる</v-btn
        ><br />
        氏名<v-text-field
          class="name-field"
          label="楽々太郎"
          v-model="fullName1"
          outlined
        ></v-text-field>
        かな<v-text-field
          class="name2-field"
          label="ラクラクタロウ"
          v-model="fullName2"
          outlined
        ></v-text-field>
        郵便番号（ハイフンなし）<v-text-field
          class="zipcode"
          label="0000000"
          v-model.number="zipcode"
          maxlength="7"
          outlined
        ></v-text-field>
        住所<selectPrefectures></selectPrefectures><br />
        <v-text-field
          class="address"
          label="港区赤坂0-0-0（海外住所の場合は「海外」と入力）"
          v-model="address"
          outlined
        ></v-text-field>
        電話番号（ハイフンなし）<v-text-field
          class="telephone"
          label="09012345678"
          v-model.number="telephone"
          outlined
        ></v-text-field>
        メールアドレス<v-text-field
          class="mailaddress"
          label="rakuraku@example.jp"
          v-model="mailAddress"
          outlined
        ></v-text-field>
        <hr />
      </div>

      <div class="lodging-info">
        <h4>宿泊情報</h4>
        チェックイン予定時刻<selectChecin></selectChecin>
        <div class="select-gender">
          宿泊人数&nbsp;&nbsp;&nbsp;1室目 (大人{{
            people
          }}名)&nbsp;&nbsp;男性&nbsp;<v-select
            class="select-g"
            label="選択する"
            :items="items"
            outlined
          >
          </v-select
          >&nbsp;&nbsp;女性&nbsp;<v-select
            class="select-g"
            label="選択する"
            :items="items"
            outlined
          >
          </v-select>
        </div>
        <hr />
      </div>

      <div class="payment">
        <h4>お支払い方法</h4>
        <v-radio-group v-model="radioGroup" @change="payment">
          <label for="online" class="radio"
            >オンライン決済<v-radio id="online" value="online"></v-radio
          ></label>

          <v-card
            v-if="!flag"
            class="online-info"
            style="background-color: #f5f5f5"
          >
            <v-btn
              Large
              color="primary"
              class="card-info"
              @click="inputCardInfo"
              >カード情報を入力する</v-btn
            ><br />

            <!-- モーダルウィンドウ -->
            <div id="overlay" v-if="cardFlag">
              <div id="content" v-if="cardFlag">
                <v-card class="creditcard" style="background-color: #f5f5f5">
                  <p style="font-weight: bold">カード情報入力</p>
                  <span>カード情報</span>
                  <v-text-field
                    label="0000000000000000"
                    v-model.number="counts"
                    outlined
                    maxlength="16"
                  ></v-text-field>
                  <span>セキュリティコード</span
                  ><v-text-field
                    label="000"
                    v-model.number="securityCord"
                    outlined
                    maxlength="3"
                  ></v-text-field>
                  <span>有効期限</span
                  ><v-text-field
                    label="MM/YY"
                    v-model="expirationDate"
                    outlined
                  ></v-text-field>
                  <span>カード名義人</span
                  ><v-text-field
                    label="TARO RAKURAKU"
                    v-model="cardName"
                    outlined
                  ></v-text-field>
                </v-card>
                <v-btn class="close-button" @click="close">キャンセル</v-btn>
                <v-btn class="success-button" color="teal" @click="reflection"
                  >カード情報を反映させる</v-btn
                >
              </div>
            </div>
            <!-- モーダルウィンドウ -->

            <v-card class="reflectionInfo" v-if="creditFlag">
              <span>カード情報：{{ counts }} </span><br />
              <span>セキュリティコード：{{ securityCord }}</span
              ><br />
              <span>有効期限：{{ expirationDate }}</span
              ><br />
              <span>カード名義人：{{ cardName }}</span>
            </v-card>

            <span>予約日の翌日に決済となります。</span><br />
            <span style="font-size: 13px"
              >※デビット・プリペイドカードはこの限りではありません</span
            >
          </v-card>

          <label for="cash" class="radio"
            >現地決済<v-radio id="cash" value="cash"></v-radio
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
        <h4>施設への連絡事項</h4>
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
      <reservetionContents></reservetionContents>
    </div>
  </div>
</template>

<script>
import selectPrefectures from "../components/selectPrefectures.vue";
import selectChecin from "../components/selectCheckin.vue";
import reservetionContents from "../components/reservetionContents.vue";

export default {
  name: "reserveForm",
  components: {
    selectPrefectures,
    selectChecin,
    reservetionContents,
  },
  data() {
    return {
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
      // 男女の人数
      items: ["0名", "1名", "2名"],
      // 決済方法
      radioGroup: "online",
      // 施設への連絡事項
      other: "",
      // カード番号
      counts: "",
      // セキュリティコード
      securityCord: "",
      // 有効期限
      expirationDate: "",
      // カード名義人
      cardName: "",
    };
  }, //end data

  methods: {
    /**
     * ログイン情報の反映.
     */
    loginInfo() {},
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
      }
    },
    /**
     * モーダルウィンドウを閉じる.
     */
    close() {
      this.cardFlag = false;
    },
    /**
     * カード情報を反映させる.
     */
    reflection() {
      this.counts = this.counts;
      this.securityCord = this.securityCord;
      this.expirationDate = this.expirationDate;
      this.cardName = this.cardName;
      this.close();
      this.creditFlag = true;
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
.select-gender,
.radio,
.container {
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
/* モーダルウィンドウ部分のCSS */
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
  margin-left: 350px;
}
.success-button {
  color: white;
  margin-top: 15px;
  float: right;
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
</style>
