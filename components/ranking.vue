<template>
  <div>
    <v-container>
      <p>今人気の宿10選</p>
      <v-sheet>
        <v-slide-group multiple show-arrows>
          <v-slide-item v-for="hotel of responsedata" v-bind:key="hotel.id">
            <v-card :loading="loading" class="mx-2" max-width="270">
              <template slot="progress">
                <v-progress-linear
                  color="deep-purple"
                  height="10"
                  indeterminate
                ></v-progress-linear>
              </template>

              <v-img
                height="150"
                src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
              ></v-img>

              <v-card-title>{{ hotel.hotel.hotelName }}</v-card-title>

              <v-card-text>
                <v-row align="center" class="mx-0">
                  <v-rating
                    :value="4.5"
                    color="amber"
                    dense
                    half-increments
                    readonly
                    size="14"
                  ></v-rating>

                  <div class="grey--text ms-4">
                    {{ hotel.hotel.reviewAverage }} ({{
                      hotel.hotel.reviewCount
                    }})
                  </div>
                </v-row>

                <div class="my-4 text-subtitle-1">
                  {{ hotel.hotel.middleClassName }}
                </div>
              </v-card-text>

              <v-divider class="mx-4"></v-divider>
              <v-card-actions>
                <v-btn color="deep-purple lighten-2" text @click="reserve">
                  詳細を見る
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-slide-item>
        </v-slide-group>
      </v-sheet>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return { responsedata: [], loading: false, selection: 1 };
  }, //end data
  /**
   * 総合ランキング情報を取得、表示する.
   */
  async mounted() {
    console.log("call");
    await this.$store.dispatch("getRankingList");
    this.responsedata = this.$store.getters.getHotels;
    console.log(this.responsedata);
    console.log();
    console.log();
  }, //created

  methods: {
    reserve() {
      //   this.loading = true;
      //   setTimeout(() => (this.loading = false), 2000);
    },
  }, // end methods
};
</script>

<style>
.v-card__title {
  font-size: 13px;
}
.v-application .text-subtitle-1 {
  font-size: 13px;
}
P {
  font-size: 20px;
  padding-left: 60px;
}
</style>
