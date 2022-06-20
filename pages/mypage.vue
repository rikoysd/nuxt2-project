<template>
  <div class="d-flex justify-center">
    <div class="whole">
      <nuxt-link to="/">宿泊予約</nuxt-link>
      <nuxt-link to="/reserveHistory">予約履歴</nuxt-link>
      <div class="item">
        <h4>お気に入りの宿</h4>
        <div>{{ favoriteError }}</div>
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
      <div class="item">
        <h4>閲覧履歴</h4>
        <div>{{ watchedError }}</div>
        <v-slide-group
          v-model="model"
          class="pa-4"
          active-class="success"
          show-arrows
        >
          <v-slide-item
            v-for="(hotel, index) of getWatchedList"
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
  </div>
</template>

<script>
export default {
  props: {
    loginUser2: {
      id: 0,
      fullName1: String,
      fullName2: String,
      zipcode: String,
      prefecture: String,
      address: String,
      mailAddress: String,
      telephone: String,
      password: String,
    },
  },
  data() {
    return {
      // お気に入り一覧
      favoriteList: [],
      // 閲覧履歴
      watchedList: [],
      // お気に入り一覧のエラー
      favoriteError: "",
      // 閲覧履歴のエラー
      watchedError: "",
      model: null,
      // ログインユーザー
      loginUser: {},
    };
  },

  mounted() {
    this.favoriteList = this.$store.getters["favorite/getFavoriteList"];
    this.watchedList = this.$store.getters["watchedList/getWatchedList"];
  },
  watch: {
    loginUser2() {
      // ログインしていなかったらログインページへ誘導
      if (this.loginUser2.mailAddress === undefined) {
        this.$router.push("/login");
      }
    },
  },
  methods: {},
  computed: {
    /**
     * お気に入り一覧を取得する.
     */
    getFavoriteList() {
      if (this.favoriteList.length === 0) {
        this.favoriteError = "お気に入りした宿がありません";
      } else {
        this.favoriteError = "";
      }
      return this.favoriteList;
    },
    /**
     * 閲覧履歴を取得する.
     */
    getWatchedList() {
      if (this.watchedList.length === 0) {
        this.watchedError = "閲覧履歴がありません";
      } else {
        this.watchedError = "";
      }
      return this.watchedList;
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

.item {
  margin: 60px 0;
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
