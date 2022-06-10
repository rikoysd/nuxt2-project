<template>
  <div class="d-flex justify-center">
    <div class="whole">
      <!-- {{ institutionInfo }} -->
      <!-- <div v-for="(vacantInfo, i) of vacantList" :key="i">
      {{ vacantInfo }}<br />
      {{ vacantInfo.vacantRoom }}
      <v-img :src="vacantInfo.roomImageUrl"></v-img>
      <v-img :src="vacantInfo.roomThumbnailUrl"></v-img>
      <v-img :src="vacantInfo.hotelImageUrl"></v-img>
      <v-img :src="vacantInfo.hotelThumbnailUrl"></v-img>
      <v-img :src="vacantInfo.hotelMapImageUrl"></v-img>
    </div> -->

      <v-row>
        <v-col cols="12">
          <v-carousel
            cycle
            height="400"
            hide-delimiter-background
            show-arrows-on-hover
          >
            <v-carousel-item v-for="(slide, i) in slides" :key="i">
              <v-row class="fill-height" align="center" justify="center">
                <div class="text-h2">
                  <v-img class="hotelImage" align="center" :src="slide"></v-img>
                </div>
              </v-row>
            </v-carousel-item>
          </v-carousel>
        </v-col>
      </v-row>
      <v-row>
        <v-toolbar color="#F5F5F5">
          <v-col cols="6">
            <v-tabs background-color="#F5F5F5" grow>
              <v-tab @click="sheet = !sheet"> 宿泊・プラン</v-tab>
              <v-tab to="#hotelInfo"> 宿の詳細</v-tab>
              <v-tab to="#reviews"> クチコミ</v-tab>
              <v-tab to="#acsess"> アクセス</v-tab>
            </v-tabs>
          </v-col>
        </v-toolbar>
      </v-row>
      <v-row>
        <v-col>
          <div class="text-center">
            <v-bottom-sheet v-model="sheet" inset>
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="orange" dark v-bind="attrs" v-on="on">
                  Open Inset
                </v-btn>
              </template>
              <v-sheet class="text-center" height="200px">
                <v-btn class="mt-6" text color="error" @click="sheet = !sheet">
                  close
                </v-btn>
                <div class="my-3">
                  This is a bottom sheet using the inset prop
                  <p class="font-weight-bold">{{ hotelName }}</p>
                  <br />
                  {{ hotelSpecial }}<br />
                  IN{{
                    detailInfo.checkinTime + "~" + detailInfo.lastCheckinTime
                  }}
                  OUT{{ detailInfo.checkoutTime }}
                </div>
              </v-sheet>
            </v-bottom-sheet>
          </div>
        </v-col>
      </v-row>
      <v-row>
  <div>
    <!-- カルーセル -->
    <detail-carousel :slides="slides"></detail-carousel>
    <!-- ナビゲーションバー -->
    <v-row>
      <v-toolbar color="#F5F5F5">
        <v-col cols="6">
          <p class="font-weight-bold">{{ hotelName }}</p>
          <br />
          {{ hotelSpecial }}<br />
          IN{{
            detailInfo.checkinTime + "~" + detailInfo.lastCheckinTime
          }}
          OUT{{ detailInfo.checkoutTime }}
        </v-col>
        <v-col id="reviews" cols="6">
          {{ "評価平均:" + reviewAverage }}
          <v-rating
            color="#e9bc00"
            :value="reviewAverage"
            readonly
            icon-label="custom icon label text {0} of {1}"
          ></v-rating>
          {{ "評価件数:" + reviewCount }}<br />
          {{ "口コミ:" + userReview }}
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card elevation="2" class="plansCard" tile>
            <p class="title font-weight-bold">宿泊プラン</p>

            <v-row v-for="(plan, i) of plans" :key="i">
              <v-col id="plans" cols="12">
                <v-card elevation="2" class="planCard" tile>
                  <v-row>
                    <v-col cols="12">
                      <v-card-title class="subtitle-1 font-weight-bold">
                        {{ plan[0].roomBasicInfo.planName }}
                      </v-card-title>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="2" class="planImg">
                      <v-img class="planImg" :src="roomImage"></v-img>
                    </v-col>
                    <v-col cols="8">
                      <v-card-text class="body-2">
                        <p>{{ plan[0].roomBasicInfo.roomName }}</p>
                        <span
                          v-if="plan[0].roomBasicInfo.withBreakfastFlag === 1"
                        >
                          朝食あり
                        </span>
                        <span v-else>朝食なし</span>
                        <span v-if="plan[0].roomBasicInfo.withDinnerFlag === 1">
                          夕食あり
                        </span>
                        <span v-else>夕食なし</span>
                        <p>
                          IN{{
                            detailInfo.checkinTime +
                            "~" +
                            detailInfo.lastCheckinTime
                          }}
                          OUT{{ detailInfo.checkoutTime }}
                        </p>
                        <v-spacer />
                        <p class="text-right">
                          税込
                          <span class="text-h6 font-weight-bold">
                            {{ plan[1].dailyCharge.total }}
                          </span>
                          円
                        </p>
                      </v-card-text>
                    </v-col>
                    <v-col cols="2">
                      <v-btn color="#65CC42">詳細・予約</v-btn>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col id="hotelInfo" cols="10">
          <p class="title font-weight-bold">施設情報</p>
          <br />
          <v-img :src="hotelImage"></v-img
        ></v-col>
        <v-col id="hotelInfo" cols="2">
          {{ "風呂評価" + bathAverage }}
          <v-rating
            color="#e9bc00"
            :value="bathAverage"
            readonly
            icon-label="custom icon label text {0} of {1}"
          ></v-rating>
          {{ "立地評価" + locationAverage }}
          <v-rating
            color="#e9bc00"
            :value="locationAverage"
            readonly
            icon-label="custom icon label text {0} of {1}"
          ></v-rating>

          {{ "装備品評価" + equipmentAverage }}
          <v-rating
            color="#e9bc00"
            :value="equipmentAverage"
            readonly
            icon-label="custom icon label text {0} of {1}"
          ></v-rating>
          {{ "食事評価" + mealAverage }}
          <v-rating
            color="#e9bc00"
            :value="mealAverage"
            readonly
            icon-label="custom icon label text {0} of {1}"
          ></v-rating>
          {{ "部屋評価" + roomAverage }}
          <v-rating
            color="#e9bc00"
            :value="roomAverage"
            readonly
            icon-label="custom icon label text {0} of {1}"
          ></v-rating>
          {{ "サービス評価" + serviceAverage }}
          <v-rating
            color="#e9bc00"
            :value="serviceAverage"
            readonly
            icon-label="custom icon label text {0} of {1}"
          ></v-rating>
        </v-col>
      </v-row>
      <v-row>
        <v-col id="acsess" cols="12">
          <p class="title font-weight-bold">アクセス</p>
          <br />
          <p class="body-1 address">
            住所：{{ address }} 最寄駅：{{ nearestStation + "駅" }}
          </p>
          <br />
          <iframe
            :src="
              'https://maps.google.co.jp/maps?output=embed&q=' +
              address +
              hotelName
            "
            width="1000"
            height="450"
            style="border: 0"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe
          ><br />
          <p class="caption">
            郵便番号：{{ postalCode }} <br />

            駐車場情報：{{ parkingInformation }}<br />
            電話番号：{{ telephoneNo }}<br />
          </p>
        </v-col>
      </v-row>
    </div>
      </v-toolbar>
    </v-row>
    <!-- 施設概要 -->
    <detail-overview
      :basicInfo="basicInfo"
      :detailInfo="detailInfo"
    ></detail-overview>
    <!-- 宿泊プラン -->
    <v-row>
      <v-col cols="12">
        <v-card elevation="2" class="plansCard" tile>
          <p class="title font-weight-bold">宿泊プラン</p>
          <detail-plans
            :plans="plans"
            :roomImage="roomImage"
            :detailInfo="detailInfo"
            :staySpan="staySpan"
            :checkInDate="checkinDate"
            :adultNum="adultNum"
          ></detail-plans>
        </v-card>
      </v-col>
    </v-row>
    <!-- 施設詳細 -->
    <detail-info
      :reviewAverage="reviewAverage"
      :hotelImage="hotelImage"
    ></detail-info>
    <!-- アクセス -->
    <detail-acsess :basicInfo="basicInfo" :address="address"></detail-acsess>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Params番号
      paramsNo: 0,
      // 空室検索結果
      vacantList: [],
      // カルーセル写真リスト
      slides: [],
      // 部屋写真
      roomImage: "",
      // ホテル写真
      hotelImage: "",
      // ホテル基本情報
      basicInfo: [],
      // 住所
      address: "",
      // 宿泊プラン
      plans: [],
      // ホテル詳細情報
      detailInfo: [],
      // レビュー平均リスト
      reviewAverage: [],
      address: "",
      sheet: false,
      // チェックイン日時
      checkinDate: "2022-12-01",
      // チェックアウト日時
      checkoutDate: "2022-12-02",
      // 人数
      adultNum: 2,
      // 宿泊日数
      staySpan: 0,

      // 現在の日時
      now: new Date(),
      // 指定した日時
      target: "",
    };
  },
  methods: {
    createDate(date) {
      return new Date(date);
    },
  },
  async mounted() {
    // URLからhotelIdを取得
    this.paramsNo = this.$route.params.id;
    // 施設検索
    await this.$store.dispatch("searchInstitution", this.paramsNo);
    this.institutionInfo = this.$store.getters.getInstitutitonInfo;
    const hotels = this.institutionInfo.hotels.hotels[0];
    // 施設概要
    this.basicInfo = hotels.hotel[0].hotelBasicInfo;
    console.log("施設情報", hotels);

    // カルーセル
    this.roomImage = this.basicInfo.roomImageUrl;
    this.hotelImage = this.basicInfo.hotelImageUrl;
    if (this.roomImage !== null) {
      this.slides.push(this.roomImage);
    }
    if (this.hotelImage !== null) {
      this.slides.push(this.hotelImage);
    }
    // 施設詳細
    this.reviewAverage = hotels.hotel[1].hotelRatingInfo;
    // アクセス
    this.address = this.basicInfo.address1 + this.basicInfo.address2;

    // 空室検索
    this.staySpan = this.getStaySpan;

    await this.$store.dispatch("searchVacant", {
      hotelNo: this.basicInfo.hotelNo,
      checkinDate: this.checkinDate,
      checkoutDate: this.checkoutDate,
      adultNum: this.adultNum,
    });
    this.vacantList = this.$store.getters.getVacantList;
    console.log("空室情報", this.vacantList);
    const hotelBasicInfo = this.vacantList.hotels[0].hotel[0].hotelBasicInfo;

    this.plans = [
      this.vacantList.hotels[0].hotel[3].roomInfo,
      this.vacantList.hotels[0].hotel[4].roomInfo,
      this.vacantList.hotels[0].hotel[5].roomInfo,
    ];
    this.detailInfo = this.vacantList.hotels[0].hotel[1].hotelDetailInfo;
    console.log("plans", this.plans);
  },
  methods: {
    /**
     * dataが空だったら表示させない.
     * @param {*} - データ
     */
    exist(data) {
      if (data !== null) {
        return "~" + data;
      } else {
        return "";
      }
    },
  },
  computed: {
    /**
     * 宿泊期間の計算.
     */
    getStaySpan() {
      return (
        (new Date(this.checkoutDate) - new Date(this.checkinDate)) / 86400000
      );
    },
  },
};
</script>

<style>
.hotelImage {
  width: 1185px;
  height: 400px;
  object-fit: cover;
  -ms-filter: blur(3px);
  filter: blur(3px);
}
v-btn {
  height: 100%;
}
/* * {
  margin: auto;
} */
.planCard {
  height: 230px;
  padding-bottom: 5px;
  overflow: hidden;
}
.plansCard {
  padding: 10px;
}
.planTitle {
  font-weight: 1000;
}
.planImg {
  object-fit: cover;
  height: auto;
  width: 150px;
}
address {
  background-color: antiquewhite;
}

.whole {
  width: 80%;
}
</style>
