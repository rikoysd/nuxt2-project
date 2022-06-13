<template>
  <div>
    <v-col v-for="hotel of getResultList" :key="hotel.id">
      <p>{{ hotel.hotel[0].hotelBasicInfo.hotelName }}</p>
      <p>最低料金{{ hotel.hotel[0].hotelBasicInfo.hotelMinCharge }}円~</p>
      <p>{{ hotel.hotel[1].hotelDetailInfo.areaName }}</p>
      <p>{{ hotel.hotel[0].hotelBasicInfo.hotelImageUrl }}</p>
      <p>{{ hotel.hotel[0].hotelBasicInfo.userReview }}</p>
    </v-col>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //検索結果
      responseData: [],
      //apiに送るリクエストパラメータ
      vacantData: {
        roomNum: 0, //部屋数
        middleClassCode: "", //都道府県
        smallClassCode: "", //主要な市町村
        detailClassCode: "", //駅や詳細地域
        checkinDate: 0, //チェックイン日
        checkoutDate: 0, //チェックアウト日
        adultNum: 0, //大人人数
      },
    };
  },
  async mounted() {
    /**
     * リクエストパラメーターをapiにセットする.
     */
    this.vacantData = this.$store.getters.getSearchResult;
    await this.$store.dispatch("searchVacantList", this.vacantData);
    console.log(this.vacantData);
  },
  computed: {
    /**
     * 空室検索の結果を返す.
     */
    getResultList() {
      this.responseData = this.$store.getters.getVacantList.hotels;
      return this.responseData;
    },
  },
};
</script>
