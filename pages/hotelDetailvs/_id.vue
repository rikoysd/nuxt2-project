<template>
  <div class="d-flex topPosition justify-center">
    <div>
      <menu-list :basicInfo="basicInfo" :menuKeyword="keyword"></menu-list>
      <div>
        <!-- カルーセル -->
        <detail-carousel class="detailCarousel" :slides="slides">
        </detail-carousel>
        <v-row>
          <v-col>
            <span
              v-show="vBasicInfo.hotelMinCharge"
              class="carouselPlan fontSize"
            >
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
          </v-col>
        </v-row>
        <!-- ナビゲーションバー -->
        <v-row>
          <v-toolbar color="#F5F5F5">
            <v-col cols="6">
              <v-tabs background-color="#F5F5F5" grow>
                <v-tab @click="goTo('cards')"> 宿泊・プラン</v-tab>
                <v-tab @click="goTo('hotelInfo')"> 宿の詳細</v-tab>
                <v-tab @click="goTo('reviews')"> クチコミ</v-tab>
                <v-tab @click="goTo('acsess')"> アクセス</v-tab>
              </v-tabs>
            </v-col>
          </v-toolbar>
        </v-row>
      </div>
      <div class="d-flex justify-center">
        <div class="whole">
          <!-- 施設概要 -->
          <detail-overview
            :basicInfo="basicInfo"
            :detailInfo="detailInfo"
          ></detail-overview>
          <!-- <v-btn
            color="orange"
            class="font-weight-bold white--text insertBtn"
            @click.stop="drawer = !drawer"
          >
            設備詳細
          </v-btn> -->
          <!-- ボトムシート -->
          <!-- <v-navigation-drawer
          v-model="drawer"
          class="navigationDrawer"
          absolute
          bottom
          temporary
        >
          <v-container>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="title">
                  ホテルの設備
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <p></p>
            <p
              v-for="(facilitie, i) of facilitiesInfo.hotelFacilities"
              :key="`second-${i}`"
            >
              {{ facilitie.item }}
            </p>
          </v-container>
        </v-navigation-drawer> -->
          <!-- 宿泊プラン -->
          <v-row>
            <v-col cols="12">
              <v-card elevation="2" class="plansCard" id="cards" tile>
                <span class="title font-weight-bold">宿泊プラン</span>

                <v-row>
                  <span class="plansExplain"
                    >利用日付・利用人数を入力し宿泊プランの検索ができます。</span
                  >
                </v-row>

                <v-progress-circular
                  v-show="circularFlag"
                  class="progressCircular"
                  indeterminate
                  color="primary"
                ></v-progress-circular>

                <v-row>
                  <v-col cols="9" class="calender">
                    <calender @selectDates="addDate"></calender>
                  </v-col>
                  <v-col>
                    <v-text-field
                      class="adultNum"
                      v-model="adultNum"
                      label="利用人数"
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-btn @click="sendReserveData">検索</v-btn>
                  </v-col>
                </v-row>

                <div v-show="listShow">
                  <detail-plans
                    :plans="plans"
                    :roomImage="roomImage"
                    :vDetailInfo="vDetailInfo"
                    :staySpan="staySpan"
                    :checkInDate="checkinDate"
                    :adultNum="adultNum"
                    @sendReserveData="sendReserveData"
                  ></detail-plans>
                </div>
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
  </div>
</template>

<script>
import calender from "../../components/calender.vue";
import DetailOverview from "../../components/detailHotel/detailOverview.vue";
export default {
  props: {
    keyword: String,
  },
  components: { calender, DetailOverview },
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
      sheet: false,
      // チェックイン日時
      checkinDate: "2022-12-01",
      // チェックアウト日時
      checkoutDate: "2022-12-02",
      // 人数
      adultNum: 2,
      // 宿泊日数
      staySpan: 0,
      // 宿泊リスト表示フラグ
      listShow: false,
      circularFlag: false,
      // 現在の日時
      now: new Date(),
      // 指定した日時
      target: "",
      drawer: false,
      group: null,
    };
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },

  async mounted() {
    // URLからhotelIdを取得
    this.paramsNo = this.$route.params.id;
    // 施設検索
    await this.$store.dispatch("searchInstitution", this.paramsNo);
    this.institutionInfo = this.$store.getters.getInstitutitonInfo;
    const hotels = this.institutionInfo.hotels.hotels[0];
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
    // 施設概要
    console.log("空室情報", this.vacantList);
    // アクセス
    this.address = this.basicInfo.address1 + this.basicInfo.address2;
  },
  methods: {
    /**
     * 入力された宿泊の条件を元に宿泊リストを取得する.
     * @param {*} - store.state.stayPlanFlag
     */
    async sendReserveData(data) {
      this.circularFlag = true;
      this.plans = [];
      this.vacantList = [];
      // console.log(data);
      this.staySpan = this.getStaySpan;
      // console.log(this.staySpan);
      // 条件を元にAPIで検索
      await this.$store.dispatch("searchVacant", {
        hotelNo: this.basicInfo.hotelNo,
        checkinDate: this.checkinDate,
        checkoutDate: this.checkoutDate,
        adultNum: this.adultNum,
      });
      this.listShow = data;
      // console.log("this.listShow", this.listShow.isTrusted);
      this.vacantList = this.$store.getters.getVacantList;
      console.log("空室情報", this.vacantList);
      this.circularFlag = false;
      if (this.vacantList.hotels !== "" && this.vacantList !== undefined) {
        console.log("true");
        console.log(this.vacantList.hotels);
        this.vacantList = this.$store.getters.getVacantList;
        console.log("空室情報", this.vacantList);
        const hotelBasicInfo =
          this.vacantList.hotels[0].hotel[0].hotelBasicInfo;
        // 取得した情報をセット
        this.plans = [
          this.vacantList.hotels[0].hotel[3].roomInfo,
          this.vacantList.hotels[0].hotel[4].roomInfo,
          this.vacantList.hotels[0].hotel[5].roomInfo,
        ];
        this.vDetailInfo = this.vacantList.hotels[0].hotel[1].hotelDetailInfo;
        this.vBasicInfo = this.vacantList.hotels[0].hotel[0].hotelBasicInfo;
        // console.log("plans", this.detailInfo);
      } else {
        this.plans = [];
        this.listShow = false;
      }
    },
    /**
     * コンポーネントから取得した情報を指定に変数にセット.
     * @param {*} - 日時
     */
    addDate(date) {
      // console.log("date", date);
      this.checkinDate = date[0];
      this.checkoutDate = date[1];
      // console.log(date[0]);
      // console.log(date[1]);
    },
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
.topPosition {
  width: 100vw;
}

.whole {
  width: 80%;
  margin: 60px 0;
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
.calender {
  width: 400px;
}
.plansExplain {
  margin-top: 10px;
}
.adultNum {
  position: relative;
  top: 11px;
}
.progressCircular {
  position: relative;
  top: 170px;
  left: 45%;
}
.fontSize {
  font-size: 12px;
}
.hotelMinCharge {
  position: relative;
  top: 15px;
  left: 5px;
}
.minChargeSize {
  font-size: 25px;
}
.minChargeBtn {
  position: relative;
  left: 10px;
  top: 3px;
}
.insertBtn {
  position: relative;
  left: 40%;
}
.navigationDrawer {
  width: 50vw;
}
.fontSize {
  font-size: 15px;
}
</style>
