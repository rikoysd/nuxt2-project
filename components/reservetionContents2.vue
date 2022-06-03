<template>
  <div class="container">
    <v-card class="main-card" style="background-color: lightgray">
      <v-col class="hotel-name">{{ hotelName }}</v-col>

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
        style="background-color: #3cb371"
        @click="reserveFinished"
        >予約を完了する</v-btn
      >
    </v-card>
  </div>
</template>

<script>
export default {
  name: "reservetionContents",
  data() {
    return {
      hotelName: "The Okura Tokyo",
      dateAndMeal: "2022月5月30日〜 1泊 食事なし",
      peopleAndRooms: "大人2名 1室",
      room: "プレステージルーム ツイン 【禁煙】",
      plan: "ホテルのリンクを貼る（？）",
      subPrice: 0,
      totalPrice: 0,
    };
  }, //end data

  computed: {}, // end computed

  methods: {
    reserveFinished() {
      this.$router.push("/reserveFinished");
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
