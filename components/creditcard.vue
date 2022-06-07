<template>
  <div>
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
  </div>
</template>

<script>
export default {
  props: {
    cardFlag: Boolean,
  },
  data() {
    return {
      // カードフラッグ
      cardFlag: false,
    };
  }, //end data

  computed: {}, // end computed

  methods: {
    /**
     * モーダルウィンドウを閉じる.
     */
    close() {
      this.cardFlag = false;
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
</style>
