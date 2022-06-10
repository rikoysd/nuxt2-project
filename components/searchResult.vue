<template>
  <div>
    <v-col v-for="hotel of this.responseData" :key="hotel.id">
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
     * 空室検索の結果を出力する.
     */
    await this.$store.dispatch("searchVacantList", this.vacantData);
    this.responseData = this.$store.getters.getVacantList.hotels;
    console.log(this.responseData);
    // this.$nuxt.$on("send_number", (result) => {
    //   this.vacantData[data] = result;
    //   console.log(this.vacantData.roomNum);
    // });
  },
  //   beforeDestroy() {
  //     this.$nuxt.$off("send_number");
  //   },
};
</script>
