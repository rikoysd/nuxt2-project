<template>
  <div class="d-flex justify-center">
    <div class="whole">
      <!-- <v-col v-for="hotel of getResultList" :key="hotel.id">
      <p>{{ hotel.hotel[0].hotelBasicInfo.hotelName }}</p>
      <p>最低料金{{ hotel.hotel[0].hotelBasicInfo.hotelMinCharge }}円~</p>
      <p>{{ hotel.hotel[1].hotelDetailInfo.areaName }}</p>
      <p>{{ hotel.hotel[0].hotelBasicInfo.hotelImageUrl }}</p>
      <p>{{ hotel.hotel[0].hotelBasicInfo.userReview }}</p>
    </v-col> -->
      <v-row>
        <v-col
          class="d-flex justify-center"
          v-for="(hotel, index) of getResultList"
          v-bind:key="index"
        >
          <v-card class="card" max-width="399">
            <v-img
              class="white--text align-end"
              height="160px"
              v-bind:src="hotel.hotel[0].hotelBasicInfo.hotelImageUrl"
            >
            </v-img>
            <v-card-text class="text--primary">
              <div class="hotel-name">
                {{ hotel.hotel[0].hotelBasicInfo.hotelName }}
              </div>
              <div class="pb-0 sub-title">
                {{ hotel.hotel[1].hotelDetailInfo.areaName }}
                <star-rating
                  v-bind:increment="0.01"
                  v-bind:max-rating="5"
                  v-bind:rating="hotel.hotel[0].hotelBasicInfo.reviewAverage"
                  inactive-color="#000"
                  active-color="#fa8000"
                  v-bind:star-size="15"
                  v-bind:read-only="true"
                >
                </star-rating>
              </div>
              <div class="description">
                {{ hotel.hotel[0].hotelBasicInfo.hotelSpecial }}
              </div>
              <div class="min-charge">
                最安値<span
                  >&nbsp;{{
                    Number(
                      hotel.hotel[0].hotelBasicInfo.hotelMinCharge
                    ).toLocaleString()
                  }}&nbsp;</span
                >
                円(税込)
              </div>
            </v-card-text>
            <v-card-actions>
              <v-btn
                color="orange"
                text
                @click="showHotelDetail(hotel.hotel[0].hotelBasicInfo.hotelNo)"
                >詳細を見る</v-btn
              >
              <favorite-button
                :hotelNum="hotel.hotel[0].hotelBasicInfo.hotelNo"
              ></favorite-button>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
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

<style scoped>
.whole {
  width: 80%;
  margin: 60px 0;
}
</style>
