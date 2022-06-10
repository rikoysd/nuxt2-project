<template>
  <v-row>
    <v-col cols="6">
      <p class="font-weight-bold">{{ basicInfo.hotelName }}</p>
      <br />
      {{ basicInfo.hotelSpecial }}<br />
      IN{{ detailInfo.checkinTime
      }}{{ exist(detailInfo.lastCheckinTime) }} OUT{{ detailInfo.checkoutTime }}
    </v-col>
    <v-col id="reviews" cols="6">
      {{ "評価平均:" + basicInfo.reviewAverage }}
      <v-rating
        color="#e9bc00"
        :value="basicInfo.reviewAverage"
        readonly
        icon-label="custom icon label text {0} of {1}"
      ></v-rating>
      {{ "評価件数:" + basicInfo.reviewCount }}<br />
      口コミ:<span v-html="basicInfo.userReview"></span>
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
      if (data !== null) {
        return "~" + data;
      } else {
        return "";
      }
    },
  },
};
</script>

<style></style>
