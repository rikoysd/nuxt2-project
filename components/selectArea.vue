<template>
  <div>
    <p>人気のエリアから探す</p>
    <v-container>
      <v-row dense>
        <v-col v-for="card in cards" :key="card.title" :cols="card.flex">
          <v-hover v-slot="{ hover }" open-delay="200">
            <v-card
              class="flex-row pt-80 card mx-auto"
              :elevation="hover ? 16 : 2"
              :class="{ 'on-hover': hover }"
              height="200"
              max-width="200"
            >
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
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
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
     * 選択したエリアをパラメーターとして渡す.
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
  padding-left: 90px;
}
.card {
  cursor: pointer;
  transition: all 0.3s;
}
.card:hover {
  transform: scale(1.1, 1.1);
}
.v-card.on-hover.theme--dark {
  background-color: rgba(#fff, 0.8);
}
.v-card__text {
  color: #000;
}
</style>
