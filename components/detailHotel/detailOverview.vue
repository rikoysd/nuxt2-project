<template>
  <v-row>
    <v-col cols="6">
      <span class="font-weight-bold hotelName">{{ basicInfo.hotelName }}</span>
      <br />
      <span class="fontSize"> {{ basicInfo.hotelSpecial }}</span
      ><br />
      <span v-if="detailInfo.checkinTime !== undefined" class="fontSize">
        IN{{ detailInfo.checkinTime
        }}{{ exist(detailInfo.lastCheckinTime) }} OUT{{
          detailInfo.checkoutTime
        }}
      </span>
      <br /><svg
        class="mapIcon"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 1 1"
      >
        <g
          transform="matrix(0.020833333333333332,0,0,0.020833333333333332,0,0)"
        >
          <path
            fill="#A6CFFF"
            d="M6 38C6 41.3137 14.0589 44 24 44C33.9411 44 42 41.3137 42 38C42 34.6863 33.9411 32 24 32C14.0589 32 6 34.6863 6 38Z"
          ></path>
          <path
            fill="#1575E5"
            d="M13.1353 8.50055C19.1361 2.49982 28.8652 2.49982 34.8659 8.50055C40.8667 14.5013 40.8667 24.2304 34.8659 30.2312C31.5729 33.5242 28.7162 35.791 26.7594 37.1937C25.0898 38.3907 22.9115 38.3907 21.2418 37.1937C19.2851 35.791 16.4283 33.5242 13.1353 30.2312C7.13458 24.2304 7.13458 14.5013 13.1353 8.50055Z"
          ></path>
          <circle cx="24.001" cy="19.366" r="5.122" fill="#A6CFFF"></circle>
        </g></svg
      ><span class="areaName fontSize"
        ><span v-if="detailInfo.areaName !== undefined">{{
          detailInfo.areaName + " "
        }}</span>
        {{ basicInfo.nearestStation + "駅" }}</span
      >
    </v-col>
    <v-col id="reviews" cols="6">
      <v-row>
        <v-row>
          <v-col>
            <span class="font-weight-bold reviewAverage">
              {{ basicInfo.reviewAverage }}
            </span>
            <v-rating
              class="rating"
              color="#e9bc00"
              :value="basicInfo.reviewAverage"
              readonly
              icon-label="custom icon label text {0} of {1}"
            >
            </v-rating>
            <v-row class="fontSize">
              <v-col class="reviewCount">
                {{ "評価件数:" + basicInfo.reviewCount }}
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <br />
        <v-row class="reviews">
          <v-row>
            <v-col cols="1">
              <svg
                class="accountIcon"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 1 1"
              >
                <g
                  transform="matrix(0.07142857142857142,0,0,0.07142857142857142,0,0)"
                >
                  <path
                    fill="#f7f7f7"
                    stroke="#cccccc"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M7 13.25C10.4518 13.25 13.25 10.4518 13.25 7C13.25 3.54822 10.4518 0.75 7 0.75C3.54822 0.75 0.75 3.54822 0.75 7C0.75 10.4518 3.54822 13.25 7 13.25Z"
                  ></path>
                  <path
                    fill="#cccccc"
                    stroke="#cccccc"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M7.00001 7.57997C8.20773 7.57997 9.18678 6.60092 9.18678 5.3932C9.18678 4.18547 8.20773 3.20642 7.00001 3.20642C5.79228 3.20642 4.81323 4.18547 4.81323 5.3932C4.81323 6.60092 5.79228 7.57997 7.00001 7.57997Z"
                  ></path>
                  <path
                    fill="#cccccc"
                    stroke="#cccccc"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M10.7043 12.0345C9.66765 12.7985 8.38655 13.25 7 13.25C5.61345 13.25 4.33235 12.7985 3.29572 12.0345C3.50216 11.257 3.9487 10.5622 4.57448 10.0507C5.259 9.49119 6.11591 9.18555 7 9.18555C7.88409 9.18555 8.741 9.49119 9.42552 10.0507C10.0513 10.5622 10.4978 11.257 10.7043 12.0345Z"
                  ></path>
                </g>
              </svg>
            </v-col>
            <v-col cols="11">
              <span class="fontSize reviews">
                口コミ:<span v-html="basicInfo.userReview"></span
              ></span>
            </v-col>
          </v-row>
        </v-row>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    basicInfo: { default: "" },
    detailInfo: { default: "" },
  },
  methods: {
    exist(data) {
      if (data !== undefined + " ") {
        return "~" + data;
      } else {
        return "";
      }
    },
  },
};
</script>

<style>
.hotelName {
  font-family: "Avenir", "Helvetica Neue", "Helvetica", "Arial", "Hiragino Sans",
    "ヒラギノ角ゴシック", YuGothic, "Yu Gothic", "メイリオ", Meiryo,
    "ＭＳ Ｐゴシック", "MS PGothic";
  font-size: 25px;
}
.mapIcon {
  height: 15px;
  position: relative;
  top: 3px;
}
.areaName {
  font-size: 15px;
  margin-bottom: 5px;
}
.fontSize {
  font-size: 12px;
}
p {
  left: 0px;
}
.accountIcon {
  height: 40px;
  position: relative;
  top: 4px;
}
.reviews {
  margin-top: 5px;
  background-color: #f7f7f7;
}
.rating {
  position: relative;
  bottom: 5px;
}
.reviewAverage {
  font-size: 30px;
}
.reviewCount {
  margin-top: 5px;
}
</style>
