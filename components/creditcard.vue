<template>
  <div>
    <div id="overlay" v-if="cardFlag">
      <div id="content" v-if="cardFlag">
        <v-card class="creditcard" style="background-color: #f5f5f5">
          <p style="font-weight: bold">カード情報入力</p>
          <span>カード情報</span>
          <v-text-field
            label="1234567812345678"
            v-model="card_number"
            outlined
            maxlength="16"
          ></v-text-field>
          <span>セキュリティコード</span
          ><v-text-field
            label="000"
            v-model="card_cvv"
            outlined
            maxlength="3"
          ></v-text-field>
          <span>有効期限</span>
          <div class="card-exp">
            <v-text-field
              label="MM"
              v-model="card_exp_month"
              outlined
              maxlength="2"
            ></v-text-field
            >&emsp;
            <v-text-field
              label="YYYY"
              v-model="card_exp_year"
              outlined
              maxlength="4"
            ></v-text-field>
          </div>
          <span>カード名義人</span
          ><v-text-field
            label="TARO RAKURAKU"
            v-model="card_name"
            outlined
          ></v-text-field>
        </v-card>
        <v-btn class="close-button" @click="preClick">キャンセル</v-btn>
        <v-btn
          class="success-button"
          color="teal"
          @click="reflection(creditObject)"
          >カード情報を反映させる</v-btn
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // propsは直接書き換えてはいけない！！！
    cardFlag: Boolean,
  },
  data() {
    return {
      // カード番号
      card_number: "",
      // セキュリティコード
      card_cvv: 123,
      // 有効期限(月)
      card_exp_month: "",
      // 有効期限(年)
      card_exp_year: "",
      // カード名義人
      card_name: "",
      // カード内容のオブジェクト
      creditObject: {
        card_number: "",
        card_cvv: "",
        card_exp_month: "",
        card_exp_year: "",
        card_name: "",
        cardFlag: false,
        creditFlag: false,
      },
    };
  }, //end data

  computed: {}, // end computed

  methods: {
    /**
     * カード情報を反映させる.
     */
    reflection(creditObject) {
      this.creditObject.card_number = this.card_number;
      this.creditObject.card_cvv = this.card_cvv;
      this.creditObject.card_exp_month = this.card_exp_month;
      this.creditObject.card_exp_year = this.card_exp_year;
      this.creditObject.card_name = this.card_name;
      this.creditObject.creditFlag = true;
      this.$emit("reflectionCardInfo", creditObject);
    },
    /**
     * モーダルウィンドウを閉じる(親にメソッドのみを渡す).
     */
    preClick() {
      // emitで値を渡すときは引数なしでもいける
      this.$emit("change");
    },
  }, // end methods
};
</script>

<style scoped>
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
.card-exp {
  display: flex;
  width: 200px;
}
</style>
