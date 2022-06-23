<template>
  <v-row>
    <v-col cols="12">
      <v-carousel
        cycle
        height="500"
        width="100vw"
        hide-delimiter-background
        show-arrows-on-hover
      >
        <v-carousel-item v-for="(color, i) in colors" :key="i">
          <!-- <v-sheet :color="colors[i]" height="100%"> -->
          <v-row
            class="fill-height carouselSize"
            align="center"
            justify="center"
          >
            <!-- {{ color }} Slide -->
            <v-img
              :src="color.src"
              class="hotelImage"
              align="center"
              height="100%"
            />
          </v-row>
          <!-- </v-sheet> -->
        </v-carousel-item>
      </v-carousel>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      responsedata: "",
      // image_src: [require('@/assets/img/hotel_img1')],
      colors: [
        { src: require("@/assets/img/hotel_img9.jpg") },
        { src: require("@/assets/img/hotel_img6.jpg") },
        { src: require("../assets/img/hotel_img4.jpg") },
        { src: require("@/assets/img/hotel_img8.jpg") },
        { src: require("../assets/img/hotel_img2.jpg") },
      ],
      // slides: ["first", "Second", "Third", "Fourth", "Fifth"],
      // slides: ["@/assets/hotel_img1"],
    };
  }, //data
};
</script>

<style>
.carouselSize {
  width: 100vw;
}
.hotelImages {
  width: 102vw;
}
</style>
