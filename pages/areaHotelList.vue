<template>
  <div>
    <!-- パンくずリスト -->
    <menu-list
      class="menu"
      :area="area"
      :originalWord="originalWord"
    ></menu-list>
    <div class="d-flex justify-center">
      <div class="whole">
        <v-progress-circular
          v-show="loading"
          :value="60"
          color="primary"
        ></v-progress-circular>
        <div class="d-flex justify-center">
          <div class="result">
            <!-- ページネーション -->
            <div class="text-center">
              <v-pagination
                @input="getNumber"
                :length="getPageInfo.pageCount"
                :total-visible="7"
                color="#333c5e"
                class="mt-10 pagenation"
              ></v-pagination>
            </div>
            <!-- 検索結果カンマ区切り -->
            <div class="record-count">
              対象施設：{{ Number(getPageInfo.recordCount).toLocaleString() }}件
            </div>
            <v-row>
              <v-col
                class="d-flex justify-center"
                v-for="(hotel, index) of getArea"
                v-bind:key="index"
              >
                <v-card class="card mb-10" width="399">
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
                    <!-- <favorite-button
                      :hotelNum="hotel.hotel[0].hotelBasicInfo.hotelNo"
                    ></favorite-button> -->
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
            <!-- ページネーション -->
            <div class="text-center pagenation">
              <v-pagination
                @input="getNumber"
                :length="getPageInfo.pageCount"
                :total-visible="7"
                color="#333c5e"
                class="mt-10"
              ></v-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //施設情報
      lists: [],
      //選択したエリア情報
      area: {
        keyword: "",
        pageNum: 1,
      },
      // ローディング
      loading: false,
      //ページ情報
      page: {},
      originalWord: "",
    };
  },
  async mounted() {
    //パラメータをapiにセットする.
    this.area.keyword = this.$store.getters.getAreaData;
    await this.$store.dispatch("areaHotelLists", this.area);
  },
  watch: {
    lists() {
      if (this.lists !== []) {
        this.originalWord = this.area.keyword;
        // 検索結果が出た時点で検索キーワードをstateに格納
        this.$store.commit("setKeyword", this.originalWord);
      }
    },
  },

  methods: {
    /**
     * ページを切り替える.
     * @param - ページ番号
     */
    async getNumber(number) {
      this.area.pageNum = number;
      await this.$store.dispatch("areaHotelLists", this.area);
    },
    /**
     * 詳細ページへ遷移.
     */
    showHotelDetail(number) {
      this.$router.push(`/hotelDetailvs/${number}`);
    },
  },

  computed: {
    /**
     * 選択したエリアの施設情報を取得する.
     */
    getArea() {
      this.lists = this.$store.getters.getAreaHotel;
      return this.lists;
    },
    /**
     * 選択したエリアの施設ページ情報を取得する.
     */
    getPageInfo() {
      this.page = this.$store.getters.getAreaPageInfo;
      return this.page;
    },
  },
};
</script>

<style scoped>
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

.v-pagination__item {
  background-color: #333c5e;
}
.v-pagination {
  background-color: #333c5e;
}

.whole {
  width: 80%;
}
</style>
