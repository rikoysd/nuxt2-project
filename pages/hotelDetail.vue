<template>
  <div>
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
            <v-tab to="#plans"> 宿泊・プラン</v-tab>
            <v-tab to="#hotelInfo"> 宿の詳細</v-tab>
            <v-tab to="#reviews"> クチコミ</v-tab>
            <v-tab to="#acsess"> アクセス</v-tab>
          </v-tabs>
        </v-col>
      </v-toolbar>
    </v-row>
    <v-row>
      <v-col cols="6">
        <p class="font-weight-bold">{{ hotelName }}</p>
        <br />
        {{ hotelSpecial }}<br />
        IN{{ detailInfo.checkinTime + "~" + detailInfo.lastCheckinTime }} OUT{{
          detailInfo.checkoutTime
        }}
      </v-col>
      <v-col id="reviews" cols="6">
        {{ "評価平均:" + reviewAverage }}<br />
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
      <v-col id="hotelInfo" cols="12">
        <p class="title font-weight-bold">施設情報</p>
        <br />
        <v-img :src="hotelImage"></v-img>
        {{ "風呂評価" + bathAverage }}
        {{ "立地評価" + locationAverage }}
        {{ "装備品評価" + equipmentAverage }}
        {{ "食事評価" + mealAverage }}
        {{ "部屋評価" + roomAverage }}
        {{ "サービス評価" + serviceAverage }}
      </v-col>
    </v-row>
    <v-row>
      <v-col id="acsess" cols="12">
        <p class="title font-weight-bold">アクセス</p>
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
        住所：{{ address }} <br />
        郵便番号：{{ postalCode }} <br />
        最寄駅：{{ nearestStation + "駅" }} <br />
        駐車場情報：{{ parkingInformation }}<br />
        電話番号：{{ telephoneNo }}<br />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      vacantList: [],
      institutionInfo: "",
      colors: [
        "indigo",
        "warning",
        "pink darken-2",
        "red lighten-1",
        "deep-purple accent-4",
      ],
      slides: [],
      hotelName: "ホテル",
      hotelSpecial: "ホテルの特徴",
      reviewAverage: 0,
      reviewCount: 0,
      userReview: "",
      bathAverage: 0,
      equipmentAverage: 0,
      locationAverage: 0,
      mealAverage: 0,
      roomAverage: 0,
      serviceAverage: 0,
      roomImage: "",
      hotelImage: "",
      address: "",
      plans: [],
      detailInfo: [],
      address: "",
      access: "",
      nearestStation: "",
      parkingInformation: "",
      postalCode: "",
      telephoneNo: 0,
    };
  },
  // methods: {
  //   searchVacant() {
  //     console.log("call1");
  //     this.$store.dispatch("searchVacantList");
  //     this.vacantList = this.$store.getters.getVacantList;
  //     console.log(this.vacantList);
  //   },
  // },
  async mounted() {
    // 施設検索
    await this.$store.dispatch("searchInstitution");
    this.institutionInfo = this.$store.getters.getInstitutitonInfo;
    const hotels = this.institutionInfo.hotels.hotels[0];
    const basicInfo = hotels.hotel[0].hotelBasicInfo;
    console.log("施設情報", hotels);
    // 空室検索
    await this.$store.dispatch("searchVacant", {
      hotelNo: basicInfo.hotelNo,
      largeClassCode: "japan",
      middleClassCode: "akita",
      smallClassCode: "tazawa",
      checkinDate: "2022-12-01",
      checkoutDate: "2022-12-02",
      adultNum: "2",
    });
    this.vacantList = this.$store.getters.getVacantList;
    const hotelBasicInfo = this.vacantList.hotels[0].hotel[0].hotelBasicInfo;
    this.roomImage = hotelBasicInfo.roomImageUrl;
    this.hotelImage = hotelBasicInfo.hotelImageUrl;
    this.slides.push(this.roomImage, this.hotelImage);
    this.hotelName = hotelBasicInfo.hotelName;
    this.hotelSpecial = hotelBasicInfo.hotelSpecial;

    console.log("空室情報", this.vacantList);
    this.reviewAverage = hotelBasicInfo.reviewAverage;
    this.reviewCount = hotelBasicInfo.reviewCount;
    // this.serviceAverage = ratingInfo.serviceAverage;
    // this.locationAverage = ratingInfo.locationAverage;
    // this.roomAverage = ratingInfo.roomAverage;
    // this.equipmentAverage = ratingInfo.equipmentAverage;
    // this.bathAverage = ratingInfo.bathAverage;
    // this.mealAverage = ratingInfo.mealAverage;
    this.userReview = hotelBasicInfo.userReview;
    // console.log(hotels);
    this.bathAverage = hotels.hotel[1].hotelRatingInfo.bathAverage;
    this.equipmentAverage = hotels.hotel[1].hotelRatingInfo.equipmentAverage;
    this.locationAverage = hotels.hotel[1].hotelRatingInfo.locationAverage;
    this.mealAverage = hotels.hotel[1].hotelRatingInfo.mealAverage;
    this.roomAverage = hotels.hotel[1].hotelRatingInfo.roomAverage;
    this.serviceAverage = hotels.hotel[1].hotelRatingInfo.serviceAverage;
    this.address = hotelBasicInfo.address1 + hotelBasicInfo.address2;
    this.access = hotelBasicInfo.access;
    this.nearestStation = hotelBasicInfo.nearestStation;
    this.parkingInformation = hotelBasicInfo.parkingInformation;
    this.postalCode = hotelBasicInfo.postalCode;
    this.telephoneNo = hotelBasicInfo.telephoneNo;
    this.plans = [
      this.vacantList.hotels[0].hotel[3].roomInfo,
      this.vacantList.hotels[0].hotel[4].roomInfo,
      this.vacantList.hotels[0].hotel[5].roomInfo,
    ];
    this.detailInfo = this.vacantList.hotels[0].hotel[1].hotelDetailInfo;
    console.log("plans", this.detailInfo);
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
* {
  margin: auto;
}
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
