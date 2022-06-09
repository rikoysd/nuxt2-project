<template>
  <div class="d-flex justify-center">
    <div class="whole">
      <v-btn @click="moveToReserve">予約画面に移動</v-btn>
      <nuxt-link to="/keywordHotelList">一覧</nuxt-link>

      <h4>お気に入りの宿</h4>
      <v-slide-group
        v-model="model"
        class="pa-4"
        active-class="success"
        show-arrows
      >
        <v-slide-item
          v-for="(hotel, index) of getFavoriteList"
          v-bind:key="index"
        >
          <v-card class="card ma-4" max-width="300">
            <v-img
              class="white--text align-end"
              height="160px"
              v-bind:src="hotel[0].hotelBasicInfo.hotelImageUrl"
            >
            </v-img>
            <v-card-text class="text--primary">
              <div class="hotel-name">
                {{ hotel[0].hotelBasicInfo.hotelName }}
              </div>
              <div class="pb-0 sub-title">
                {{ hotel[2].hotelDetailInfo.areaName }} [全{{
                  hotel[3].hotelFacilitiesInfo.hotelRoomNum
                }}室]
                <star-rating
                  v-bind:increment="0.01"
                  v-bind:max-rating="5"
                  v-bind:rating="hotel[0].hotelBasicInfo.reviewAverage"
                  inactive-color="#000"
                  active-color="#fa8000"
                  v-bind:star-size="15"
                  v-bind:read-only="true"
                >
                </star-rating>
              </div>
              <div class="description">
                {{ hotel[0].hotelBasicInfo.hotelSpecial }}
              </div>
              <div class="min-charge">
                最安値<span
                  >&nbsp;{{
                    Number(
                      hotel[0].hotelBasicInfo.hotelMinCharge
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
                @click="showHotelDetail(hotel[0].hotelBasicInfo.hotelNo)"
                >詳細を見る</v-btn
              >
              <favorite-button
                :hotelNum="hotel[0].hotelBasicInfo.hotelNo"
              ></favorite-button>
            </v-card-actions>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hotelList: [],
      model: null,
    };
  },
  methods: {
    moveToReserve() {
      this.$router.push("/reserveForm");
    },
  },
  computed: {
    getFavoriteList() {
      this.hotelList = this.$store.getters["favorite/getFavoriteList"];
      return this.hotelList;
    },
  },
};
</script>

<style scoped>
.card {
  margin-bottom: 60px;
  transition: all 0.3s ease 0s;
}

.card:hover {
  opacity: 0.7;
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

.sub-title {
  margin-bottom: 10px;
  opacity: 0.7;
  font-size: 0.7rem;
}

.whole {
  width: 80%;
}
</style>
