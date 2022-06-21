<template>
  <v-row class="d-flex justify-center">
    <div>
      <!-- パンくずリスト -->
      <menu-list
        class="menuList"
        :basicInfo="basicInfo"
        :keyword2="keyword2"
      ></menu-list>
      <div class="topPosition">
        <!-- カルーセル -->
        <detail-carousel class="detailCarousel" :slides="slides">
        </detail-carousel>

        <span v-show="vBasicInfo.hotelMinCharge" class="carouselPlan fontSize">
          このホテルの最安料金<br /><span class="hotelMinCharge"
            >(2名)税込</span
          >
          <span class="font-weight-bold hotelMinCharge minChargeSize"
            >{{ vBasicInfo.hotelMinCharge * 2 }}円</span
          >
          <v-btn
            color="#65CC42"
            class="minChargeBtn white--text font-weight-bold"
            @click="goTo('cards')"
            >プランを確認</v-btn
          >
        </span>

        <!-- ナビゲーションバー -->
        <v-row>
          <v-toolbar color="#F5F5F5">
            <v-col cols="6">
              <v-tabs background-color="#F5F5F5" grow>
                <v-tab @click="goTo('cards')"> 宿泊・プラン</v-tab>
                <!-- <v-tab  to="#hotelInfo"> -->
                <v-tab @click="goTo('hotelInfo')"> 宿の詳細</v-tab>
                <v-tab @click="goTo('reviews')"> クチコミ</v-tab>
                <v-tab @click="goTo('acsess')"> アクセス</v-tab>
              </v-tabs>
            </v-col>
          </v-toolbar>
        </v-row>
      </div>
      <div class="">
        <div class="whole">
          <!-- 施設概要 -->
          <detail-overview
            :basicInfo="basicInfo"
            :detailInfo="detailInfo"
          ></detail-overview>
          <!-- 宿泊プラン -->
          <v-row>
            <v-col cols="12">
              <v-card elevation="2" class="plansCard" id="cards" tile>
                <p class="title font-weight-bold">宿泊プラン</p>
                <detail-plans
                  :basicInfo="basicInfo"
                  :plans="plans"
                  :roomImage="roomImage"
                  :vDetailInfo="vDetailInfo"
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
            :facilitiesInfo="facilitiesInfo"
            :policyInfo="policyInfo"
            :otherInfo="otherInfo"
          ></detail-info>

          <!-- アクセス -->
          <detail-acsess
            :basicInfo="basicInfo"
            :address="address"
          ></detail-acsess>
        </div>
      </div>
    </div>
  </v-row>
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
      vBasicInfo: [],
      // 住所
      address: "",
      // 宿泊プラン
      plans: [],
      // ホテル詳細情報
      detailInfo: [],
      vDetailInfo: [],
      facilitiesInfo: [],
      policyInfo: [],
      otherInfo: [],
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
      searchRequirement: [],
      // propsで渡すキーワード
      keyword2: "",
    };
  },
  methods: {
    createDate(date) {
      return new Date(date);
    },
  },
  async created() {
    this.vacantList = [];
    this.plans = [];
    this.searchRequirement = [];
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
    this.facilitiesInfo = hotels.hotel[3].hotelFacilitiesInfo;
    console.log("this.facilitiesInfo", this.facilitiesInfo);
    this.policyInfo = hotels.hotel[4].hotelPolicyInfo;
    console.log("this.policyInfo", this.policyInfo);
    this.otherInfo = hotels.hotel[5].hotelOtherInfo;
    console.log("this.otherInfo", this.otherInfo);

    // アクセス
    this.address = this.basicInfo.address1 + this.basicInfo.address2;

    this.searchRequirement = this.$store.getters.getSearchResult;
    this.checkinDate = this.searchRequirement.checkinDate;
    this.checkoutDate = this.searchRequirement.checkoutDate;
    // 空室検索
    this.staySpan = this.getStaySpan;

    await this.$store.dispatch("searchVacant", {
      hotelNo: this.basicInfo.hotelNo,
      checkinDate: this.checkinDate,
      checkoutDate: this.checkoutDate,
      adultNum: this.adultNum,
    });

    this.vacantList = this.$store.getters.getVacantList;
    if (this.vacantList.hotels === undefined || this.vacantList.hotels === "") {
      this.$router.push("/keywordHotelList");
    }
    console.log("空室情報", this.vacantList);
    const hotelBasicInfo = this.vacantList.hotels[0].hotel[0].hotelBasicInfo;
    for (let i = 3; i <= 5; i++) {
      this.plans.push(this.vacantList.hotels[0].hotel[i].roomInfo);
    }

    this.vDetailInfo = this.vacantList.hotels[0].hotel[1].hotelDetailInfo;
    this.vBasicInfo = this.vacantList.hotels[0].hotel[0].hotelBasicInfo;
    console.log("plans", this.plans);
  },
  watch: {
    basicInfo() {
      if (this.basicInfo !== undefined) {
        this.keyword2 = this.$store.getters["keyword/getKeyword"];
      }
    },
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
    goTo(id) {
      this.$vuetify.goTo(`#${id}`);
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
  width: 102vw;
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
  margin-top: 10px;
  padding: 20px;
}
.planTitle {
  font-weight: 1000;
}
.planImg {
  object-fit: cover;
  height: auto;
  width: 150px;
  border-radius: 5px;
}

.whole {
  width: 80%;
  margin: 60px auto;
}
.topPosition {
  width: 100vw;
}
.carouselPlan {
  position: absolute;
  top: 300px;
  left: 65%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  height: 80px;
  width: 320px;
  border-radius: 10px;
  padding: 5px 7px;
}
.plansExplain {
  margin-top: 10px;
}
.fontSize {
  font-size: 12px;
}
.hotelMinCharge {
  position: relative;
  top: 15px;
  left: 5px;
}

.menuList {
  margin-top: 10px;
}

.minChargeSize {
  font-size: 23px;
}
.minChargeBtn {
  position: relative;
  left: 10px;
  top: 3px;
}
.fontSize {
  font-size: 15px;
}
.detailCarousel {
  margin-top: 11.5px;
  width: 100vw;
}
</style>
