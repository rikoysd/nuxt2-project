<template>
  <div>
    <img class="reserve-img" src="@/assets/img/3.png" />
    <v-col class="msg">
      <img
        class="bg-img"
        height="100px"
        width="1000px"
        src="@/assets/img/bg-img.jpg"
      />
      <h2>ご予約ありがとうございました。</h2>
      <p>予約履歴はマイページからご確認いただけます。</p>
      <v-btn class="button" @click="moveToTop">トップへ戻る</v-btn><br />
      <img
        class="bg-img"
        height="100px"
        width="1000px"
        src="@/assets/img/bg-img.jpg"
      />
    </v-col>
  </div>
</template>

<script>
export default {
  name: "reserveFinished",
  data() {
    return {};
  }, //end data

  computed: {}, // end computed

  methods: {
    /**
     * TOPへ戻る.
     */
    moveToTop() {
      this.$router.push("/");
    },
  }, // end methods
};
</script>

<style scoped>
h2 {
  margin-top: 20px;
}
.msg {
  text-align: center;
}
.bg-img {
  object-fit: cover;
}
.button {
  margin-bottom: 25px;
}
.reserve-img {
  object-fit: cover;
  width: 250px;
  height: 80px;
  float: right;
  margin-right: 70px;
  margin-bottom: 10px;
}
</style>
