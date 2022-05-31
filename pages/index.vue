<template>
  <div>
    <p>{{ $store.state.ranking.message }}</p>
    <v-btn v-on:click="getData">ボタン</v-btn>
    {{ getData }}/{{ responsedata }}
    <table>
      <thead>
        <tr>
          <th>ジャンル</th>
          <th>タイトル</th>
          <th>ランキング</th>
        </tr>
      </thead>
    </table>
    <tbody>
      <tr v-for="hotel of hotels" v-bind:key="hotel.id">
        <td>{{ hotel.rank }}</td>
        <td>{{ hotel.hotelName }}</td>
        <td>{{ hotel.userReview }}</td>
      </tr>
    </tbody>
  </div>
</template>

<script>
export default {
  data() {
    return { responsedata: "" };
  }, //end data
  methods: {
    getData() {
      this.responsedata = this.$store.dispatch("ranking/getRankingList");
    },
  }, // end methods
};
</script>
