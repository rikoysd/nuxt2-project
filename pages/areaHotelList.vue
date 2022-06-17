<template>
  <div class="d-flex justify-center">
    <div class="whole">
      <v-progress-circular
        v-show="loading"
        :value="60"
        color="primary"
      ></v-progress-circular>
      <v-row>
        <v-col
          class="d-flex justify-center"
          v-for="(hotel, index) of getArea"
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
                {{ hotel[0] }}
                {{ hotel.hotel[0].hotelBasicInfo.hotelName }}
              </div>
              <div class="pb-0 sub-title">
                <!-- {{ hotel.hotel[1].hotelDetailInfo.areaName }} -->
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
      lists: [],
      area: {
        keyword: "",
      },
      areaList: [],
      // ローディング
      loading: false,
    };
  },
  async mounted() {
    this.area.keyword = this.$store.getters.getAreaData;
    console.log(this.area.keyword);
    await this.$store.dispatch("areaHotelLists", this.area);
  },
  methods: {
    showHotelDetail(number) {
      this.$router.push(`/hotelDetailvs/${number}`);
    },
  },

  computed: {
    getArea() {
      this.lists = this.$store.getters.getAreaHotel;
      console.log(this.$store.getters.getAreaHotel);

      //   for (list of this.lists) {
      //     this.areaList.push(list);
      //   }
      //   console.log(this.areaList);
      //   return this.areaList;
      return this.lists;
    },
  },
};
</script>

<style scoped></style>
