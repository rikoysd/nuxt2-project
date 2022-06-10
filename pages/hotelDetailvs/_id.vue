<template>
  <div>
    <!-- カルーセル -->
    <detail-carousel :slides="slides"></detail-carousel>
    <!-- ナビゲーションバー -->
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
    <!-- ボトムシート -->
    <v-navigation-drawer v-model="drawer" absolute bottom temporary>
    </v-navigation-drawer>
    <v-row>
      <v-col>
        <v-btn color="orange" dark @click.stop="drawer = !drawer">
          Open Inset
        </v-btn>
      </v-col>
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
          <div>
            <v-row>
              <p>必要情報を入力し空室検索できます</p>
            </v-row>
            <v-row>
              <v-col cols="10" md="4">
                <calender @selectDates="addDate"></calender>
              </v-col>
              <v-col cols="2" md="4">
                <v-text-field
                  v-model="adultNum"
                  label="params.adultNum"
                ></v-text-field>
              </v-col>
              <v-col cols="1">
                <v-btn @click="sendReserveData">検索</v-btn>
              </v-col>
            </v-row>
          </div>
          <div v-show="listShow">
            <detail-plans
              :plans="plans"
              :roomImage="roomImage"
              :detailInfo="detailInfo"
              :staySpan="staySpan"
              :checkInDate="target"
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
    ></detail-info>
    <!-- アクセス -->
    <detail-acsess :basicInfo="basicInfo" :address="address"></detail-acsess>
  </div>
</template>

<script>
import calender from "../../components/calender.vue";
import DetailOverview from "../../components/detailHotel/detailOverview.vue";
export default {
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
      // 住所
      address: "",
      // 宿泊プラン
      plans: [],
      // ホテル詳細情報
      detailInfo: [],
      // レビュー平均リスト
      reviewAverage: [],
      sheet: false,
      // チェックイン日時
      checkinDate: "",
      // チェックアウト日時
      checkoutDate: "",
      // 人数
      adultNum: 2,
      // 宿泊日数
      staySpan: 0,
      // 宿泊リスト表示フラグ
      listShow: false,
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
      console.log(data);
      this.staySpan = this.getStaySpan;
      console.log(this.staySpan);
      // 条件を元にAPIで検索
      await this.$store.dispatch("searchVacant", {
        hotelNo: this.basicInfo.hotelNo,
        checkinDate: this.checkinDate,
        checkoutDate: this.checkoutDate,
        adultNum: this.adultNum,
      });
      this.vacantList = this.$store.getters.getVacantList;
      console.log(this.vacantList);

      this.listShow = data;
      console.log("this.listShow", this.listShow.isTrusted);
      if (this.listShow.isTrusted === true) {
        console.log("空室情報", this.listShow);
        this.vacantList = this.$store.getters.getVacantList;
        const hotelBasicInfo =
          this.vacantList.hotels[0].hotel[0].hotelBasicInfo;
        // 取得した情報をセット
        this.plans = [
          this.vacantList.hotels[0].hotel[3].roomInfo,
          this.vacantList.hotels[0].hotel[4].roomInfo,
          this.vacantList.hotels[0].hotel[5].roomInfo,
        ];
        this.detailInfo = this.vacantList.hotels[0].hotel[1].hotelDetailInfo;
        console.log("plans", this.detailInfo);
      }
    },
    /**
     * コンポーネントから取得した情報を指定に変数にセット.
     * @param {*} - 日時
     */
    addDate(date) {
      console.log("date", date);
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
</style>
