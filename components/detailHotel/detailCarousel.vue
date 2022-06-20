<template>
  <div>
    <v-row>
      <v-col cols="12">
        <!-- カルーセル -->
        <v-carousel
          cycle
          height="400"
          width="100vw"
          hide-delimiter-background
          show-arrows-on-hover
        >
          <v-carousel-item v-for="(slide, i) in slides" :key="i">
            <v-row
              class="fill-height carousel carouselSize"
              align="center"
              justify="center"
            >
              <div class="text-h2">
                <v-img class="hotelImage" align="center" :src="slide"></v-img>
              </div>
            </v-row>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    slides: { type: Array, default: () => {} },
  },
};
</script>

<style>
.hotelImage {
  width: 102vw;
}
.carouselSize {
  width: 100vw;
}
</style>
