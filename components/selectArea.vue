<template>
  <div>
    <!-- <v-card> -->
    <p>人気のエリアから探す</p>
    <v-container>
      <v-row dense>
        <v-col v-for="card in cards" :key="card.title" :cols="card.flex">
          <v-card class="flex-row pt-80">
            <v-img
              @click="getArea(card.title)"
              :src="card.src"
              class="white--text text-center pt-80"
              height="200px"
              :value="card.title"
            >
              <v-card-title
                v-text="card.title"
                class="text-h4 text-center text pt-80"
              ></v-card-title>
            </v-img>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <!-- </v-card> -->
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      areaCode: [],
      keyword: "",
      cards: [
        {
          title: "六本木",
          src: require("../assets/img/area_img1.jpg"),
          flex: 3,
        },
        {
          title: "東京駅",
          src: require("../assets/img/area_img2.jpg"),
          flex: 3,
        },
        {
          title: "大阪",
          src: require("../assets/img/area_img3.jpg"),
          flex: 3,
        },
        {
          title: "京都",
          src: require("../assets/img/area_img4.jpg"),
          flex: 3,
        },
      ],
    };
  },
  methods: {
    /**
     * 選択したエリアをパラメーターをして渡す.
     */
    getArea(keyword) {
      this.keyword = keyword;
      this.$store.commit("areaData", this.keyword);
      this.$router.push("/areaHotelList");
    },
  },
};
</script>

<style scoped>
.text {
  text-align: center;
}
.v-card__title {
  display: block;
  margin: auto;
  padding-top: 80px;
}
p {
  padding-left: 20px;
}
</style>
