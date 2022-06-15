<template>
  <div>
    <v-carousel
      cycle
      height="400"
      hide-delimiter-background
      show-arrows-on-hover
    >
      <v-carousel-item v-for="(color, i) in colors" :key="i">
        <!-- <v-sheet :color="colors[i]" height="100%"> -->
        <v-row class="fill-height" align="center" justify="center">
          <!-- <div class="text-h2">{{ color }} Slide</div> -->
          <img :src="color.src" alt="" height="100%" width="100%" />
        </v-row>
        <!-- </v-sheet> -->
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      responsedata: "",
      // image_src: [require('@/assets/img/hotel_img1')],
      colors: [
        { src: require("@/assets/img/hotel_img1.jpg") },
        { src: require("../assets/img/hotel_img2.jpg") },
        { src: require("../assets/img/hotel_img3.jpg") },
        { src: require("../assets/img/hotel_img4.jpg") },
        { src: require("../assets/img/hotel_img5.jpg") },
      ],
      // slides: ["first", "Second", "Third", "Fourth", "Fifth"],
      // slides: ["@/assets/hotel_img1"],
    };
  }, //data
};
</script>

<style></style>
