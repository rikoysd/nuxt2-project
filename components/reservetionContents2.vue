<template>
  <div class="container">
    <v-card class="main-card" style="background-color: lightgray">
      <v-col class="hotel-name">{{ hotelName }}</v-col>

      <div class="plans" style="background-color: white">
        <span style="font-weight: bold">日付・食事</span>&nbsp;&nbsp;<v-col
          >{{ formatDate }}〜{{ staySpan }}泊<br />
          {{ breakfast }}・{{ dinner }}</v-col
        ><br />
        <span style="font-weight: bold">人数室数</span>&nbsp;&nbsp;<v-col
          >大人{{ adult }}名
          <span v-if="1 <= child">子供{{ child }}名</span>
          1室</v-col
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
        class="change-reserve"
        @click="changeReservation(reserveId)"
        style="background-color: #e9bc00"
        >入力内容を変更する</v-btn
      >
      <v-btn
        x-large
        class="confirm-button"
        style="background-color: #3cb371"
        @click="reserveFinished"
        >予約を完了する</v-btn
      >
    </v-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    reserveObject: Object,
  },
  data() {
    return {
      // ホテル詳細オブジェクト
      detailObject: {},
      // ホテル名
      hotelName: "",
      // 宿泊日数
      formatDate: new Date(),
      // 宿泊日数
      staySpan: 0,
      // 朝食
      breakfast: "",
      // 夕食
      dinner: "",
      // 宿泊人数（大人）
      adult: 0,
      // 宿泊人数（子供）
      child: 0,
      // 部屋の種類
      room: "",
      // プラン名
      plan: "",
      // 宿泊料金合計
      subPrice: 0,
      // お支払い金額
      totalPrice: 0,
    };
  }, //end data

  /**
   * 非同期処理(ホテル詳細情報の反映).
   */
  async mounted() {
    this.detailObject = await this.$store.getters["reserve/getDetailInfo"];
    this.hotelName = this.detailObject.hotelName;
    this.formatDate = this.detailObject.formatDate;
    this.staySpan = this.detailObject.staySpan;
    this.breakfast = this.detailObject.breakfast;
    this.dinner = this.detailObject.dinner;
    this.adult = this.detailObject.adult;
    this.child = this.detailObject.child;
    this.room = this.detailObject.room;
    this.plan = this.detailObject.plan;
    this.subPrice = this.detailObject.subPrice;
    this.totalPrice = this.detailObject.totalPrice;
  },

  methods: {
    /**
     *予約内容を変更する.
     */
    changeReservation(reserveId) {
      reserveId = this.reserveObject.reserveId;
      this.$router.push(`/reserveForm2/${reserveId}`);
    },
    /**
     * 予約を確定する.
     */
    async reserveFinished() {
      // 注文IDの生成
      let orderNum = "";
      for (let i = 0; i < 7; i++) {
        let num = Math.floor(Math.random() * 10) + 11;
        let str = String(num);
        orderNum += str;
      }
      // クレカ情報を送る
      const response = await axios.post(
        "http://153.127.48.168:8080/sample-credit-card-web-api/credit-card/payment",
        {
          user_id: 1,
          order_number: orderNum,
          amount: this.totalPrice,
          card_number: this.reserveObject.card_num,
          card_exp_year: this.reserveObject.card_exp_year,
          card_exp_month: this.reserveObject.card_exp_month,
          card_name: this.reserveObject.card_name,
          card_cvv: this.reserveObject.card_cvv,
        }
      );
      console.log(response);
      this.$router.push("/reserveFinished");
    },
  }, // end methods
};
</script>

<style scoped>
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
  margin-left: 80px;
  margin-right: 60px;
  color: white;
  font-weight: bold;
}
.change-reserve {
  margin-top: 20px;
  margin-left: 60px;
  margin-right: 60px;
  color: white;
  font-weight: bold;
}
</style>
