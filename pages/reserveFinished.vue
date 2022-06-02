<template>
  <div>
    <div class="msg">
      <h2>ご予約ありがとうございました。</h2>
      <p>予約履歴はマイページからご確認いただけます。</p>
      <v-btn @click="moveToTop">トップへ戻る</v-btn>
    </div>
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
    moveToTop() {
      this.$router.push("/");
    },
  }, // end methods
};
</script>

<style scoped></style>
