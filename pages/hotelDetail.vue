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
            <v-sheet :color="colors[i]" height="100%">
              <v-row class="fill-height" align="center" justify="center">
                <div class="text-h2">
                  <v-img align="center" width="100vw" :src="slide"></v-img>
                </div>
              </v-row>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
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
    console.log("call1");
    await this.$store.dispatch("searchVacantList");
    this.vacantList = this.$store.getters.getVacantList;
    console.log(
      this.vacantList.hotels[0].hotel[0].hotelBasicInfo.roomImageUrl,
      this.vacantList.hotels[0].hotel[0].hotelBasicInfo.hotelImageUrl
    );
    this.slides.push(
      this.vacantList.hotels[4].hotel[0].hotelBasicInfo.roomImageUrl,
      this.vacantList.hotels[4].hotel[0].hotelBasicInfo.hotelImageUrl
    );
    // await this.$store.dispatch("searchInstitution");
    // this.institutionInfo = this.$store.getters.getInstitutitonInfo;
    // console.log(this.institutionInfo);
  },
};
</script>

<style>
v-img {
  width: 10px;
}
</style>
