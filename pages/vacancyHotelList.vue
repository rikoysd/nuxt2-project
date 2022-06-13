<template>
  <div class="d-flex justify-center">
    <div class="whole">
      <div>{{ getSearchError }}</div>
      <div class="d-flex justify-center">
        <div class="result">
          <div class="record-count">
            対象施設：{{ Number(getPageInfo.recordCount).toLocaleString() }}件
          </div>
          <v-row>
            <v-col
              class="d-flex justify-center"
              v-for="(hotel, index) of getHotelList"
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
                      v-bind:rating="
                        hotel.hotel[0].hotelBasicInfo.reviewAverage
                      "
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
                    @click="
                      showHotelDetail(hotel.hotel[0].hotelBasicInfo.hotelNo)
                    "
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
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
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
      // エラーメッセージ
      errorMessage: "",
    };
  },
  async mounted() {
    /**
     * リクエストパラメーターをapiにセットする.
     */
    this.vacantData = this.$store.getters.getSearchResult;
    await this.$store.dispatch("searchVacantList", this.vacantData);
  },
  computed: {
    /**
     * 空室検索のエラー情報を取得.
     */
    getSearchError() {
      if (this.$store.getters.getSearchError === true) {
        this.errorMessage = "検索結果がありません";
      } else {
        this.errorMessage = "";
      }
      return this.errorMessage;
    },
    /**
     * ホテル一覧を取得.
     */
    getHotelList() {
      return this.$store.getters.getHotelList;
    },
    /**
     * ページ情報を取得.
     */
    getPageInfo() {
      console.log(this.$store.getters.getPageInfo);
      return this.$store.getters.getPageInfo;
    },
  },
};
</script>

<style scoped>
.card {
  margin-bottom: 60px;
  transition: all 0.3s ease 0s;
}

.description {
  margin-top: 5px;
  font-size: 12px;
}

.hotel-name {
  font-size: 15px;
  font-weight: bold;
}

.min-charge {
  margin-top: 15px;
}

.min-charge span {
  font-size: 1.2rem;
  font-weight: bold;
}

.record-count {
  margin-bottom: 10px;
}

.result {
  width: 90%;
}

.sub-title {
  margin-bottom: 10px;
  opacity: 0.7;
  font-size: 0.7rem;
}

.whole {
  width: 80%;
  margin: 60px 0;
}
</style>
