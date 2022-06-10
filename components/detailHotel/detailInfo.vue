<template>
  <div>
    <v-row>
      <v-col id="hotelInfo" cols="10">
        <p class="title font-weight-bold">施設情報</p>
        <br />
        <v-img :src="hotelImage"></v-img
      ></v-col>
      <v-col id="hotelInfo" cols="2">
        {{ "風呂評価" + reviewAverage.bathAverage }}
        <v-rating
          color="#e9bc00"
          :value="reviewAverage.bathAverage"
          readonly
          icon-label="custom icon label text {0} of {1}"
        ></v-rating>
        {{ "立地評価" + reviewAverage.locationAverage }}
        <v-rating
          color="#e9bc00"
          :value="reviewAverage.locationAverage"
          readonly
          icon-label="custom icon label text {0} of {1}"
        ></v-rating>
        {{ "装備品評価" + reviewAverage.equipmentAverage }}
        <v-rating
          color="#e9bc00"
          :value="reviewAverage.equipmentAverage"
          readonly
          icon-label="custom icon label text {0} of {1}"
        ></v-rating>
        {{ "食事評価" + reviewAverage.mealAverage }}
        <v-rating
          color="#e9bc00"
          :value="reviewAverage.mealAverage"
          readonly
          icon-label="custom icon label text {0} of {1}"
        ></v-rating>
        {{ "部屋評価" + reviewAverage.roomAverage }}
        <v-rating
          color="#e9bc00"
          :value="reviewAverage.roomAverage"
          readonly
          icon-label="custom icon label text {0} of {1}"
        ></v-rating>
        {{ "サービス評価" + reviewAverage.serviceAverage }}
        <v-rating
          color="#e9bc00"
          :value="reviewAverage.serviceAverage"
          readonly
          icon-label="custom icon label text {0} of {1}"
        ></v-rating>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    reviewAverage: { default: [] },
    hotelImage: { type: String, default: "" },
  },
};
</script>

<style></style>
