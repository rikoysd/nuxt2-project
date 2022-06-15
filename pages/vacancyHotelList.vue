<template>
  <div class="d-flex justify-center">
    <div class="whole">
      <div>{{ getSearchError }}</div>
      <v-progress-circular
        v-show="loading"
        :value="60"
        color="primary"
      ></v-progress-circular>
      <div class="d-flex justify-center">
        <div v-show="showResult" class="result">
          <!-- ページネーション -->
          <div class="text-center">
            <v-pagination
              v-model="page"
              :length="getPageInfo.pageCount"
              :total-visible="7"
              @input="getNumber"
            ></v-pagination>
          </div>
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
                    :loginUser="loginUser2"
                  ></favorite-button>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
          <!-- ページネーション -->
          <div class="text-center">
            <v-pagination
              v-model="page"
              :length="getPageInfo.pageCount"
              :total-visible="7"
              @input="getNumber"
            ></v-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    loginUser2: {},
  },
  data() {
    return {
      // apiに送るリクエストパラメータ
      vacantObject: {
        roomNum: 0, //部屋数
        middleClassCode: "", //都道府県
        smallClassCode: "", //主要な市町村
        detailClassCode: "", //駅や詳細地域
        checkinDate: 0, //チェックイン日
        checkoutDate: 0, //チェックアウト日
        adultNum: 0, //大人人数
        page: 1, // 取得したいページ
      },
      // エラーメッセージ
      errorMessage: "",
      // ローディング
      loading: false,
      // ページ情報
      pageInfo: {},
      // ホテル一覧
      hotelList: [],
      // 検索結果の表示・非表示
      showResult: false,
      // ページ
      page: 1,
    };
  },
  async mounted() {
    this.showResult = false;

    // リクエストパラメーターをapiにセットする
    let vacantData = this.$store.getters.getSearchResult;

    this.vacantObject.roomNum = vacantData.roomNum;
    this.vacantObject.middleClassCode = vacantData.middleClassCode;
    this.vacantObject.smallClassCode = vacantData.smallClassCode;
    this.vacantObject.detailClassCode = vacantData.detailClassCode;
    this.vacantObject.checkinDate = vacantData.checkinDate;
    this.vacantObject.checkoutDate = vacantData.checkoutDate;
    this.vacantObject.adultNum = vacantData.adultNum;
    this.vacantObject.page = 1;

    await this.$store.dispatch("searchVacantList", this.vacantObject);

    // ローディング非表示
    this.loading = false;
  },
  watch: {
    // ホテル一覧の変数を監視する
    hotelList() {
      if (this.hotelList.length === 0) {
        this.loading = true;
        this.showResult = false;
      } else {
        this.loading = false;
        this.showResult = true;
      }
    },
  },
  methods: {
    /**
     * ページを切り替える.
     * @param - ページ番号
     */
    async getNumber(number) {
      this.vacantObject.page = number;

      await this.$store.dispatch("searchVacantList", this.vacantObject);
    },
    /**
     * 詳細ページに遷移
     * @param - ホテル番号
     */
    showHotelDetail(number) {
      this.$router.push(`/hotelDetailvs/${number}`);
    },
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
      this.hotelList = this.$store.getters.getHotelList;
      return this.hotelList;
    },
    /**
     * ページ情報を取得.
     */
    getPageInfo() {
      this.pageInfo = this.$store.getters.getPageInfo;
      return this.pageInfo;
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
