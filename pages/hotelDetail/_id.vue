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
      <v-col cols="6">
        <p class="font-weight-bold">{{ hotelName }}</p>
        <br />
        {{ hotelSpecial }}<br />
        IN{{ detailInfo.checkinTime + "~" + detailInfo.lastCheckinTime }} OUT{{
          detailInfo.checkoutTime
        }}
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
        口コミ:<span v-html="userReview"></span>
      </v-col>
    </v-row>
    <!-- <nuxt-link>link</nuxt-link> -->
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
</template>

<script>
export default {
  data() {
    return {
      paramsNo: 0,
      vacantList: [],
      institutionInfo: "",
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
      sheet: false,
      now: new Date(),
      target: "",
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
    this.paramsNo = this.$route.params.id;
    // 施設検索
    await this.$store.dispatch("searchInstitution", this.paramsNo);
    this.institutionInfo = this.$store.getters.getInstitutitonInfo;
    const hotels = this.institutionInfo.hotels.hotels[0];
    const basicInfo = hotels.hotel[0].hotelBasicInfo;
    console.log("施設情報", hotels);
    // 空室検索
    const Year = this.now.getFullYear();
    let Month = this.now.getMonth() + 1;
    if (Month < 10) {
      Month = "0" + Month;
    }
    let Date = this.now.getDate() + 7;
    if (Date < 10) {
      Date = "0" + Date;
    }
    let Date2 = this.now.getDate() + 1;
    if (Date2 < 10) {
      Date2 = "0" + Date;
    }
    this.target = Year + "-" + Month + "-" + Date;
    const target2 = Year + "-" + Month + "-" + Date2;
    console.log("target", this.target);

    await this.$store.dispatch("searchVacant", {
      hotelNo: basicInfo.hotelNo,
      checkinDate: this.target,
      checkoutDate: target2,
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
</style>
