<template>
  <div>
    <v-row>
      <v-col id="hotelInfo" cols="10">
        <p class="title font-weight-bold">施設情報</p>
        <br />
        <v-img :src="hotelImage"></v-img
      ></v-col>
      <v-col id="hotelInfo" cols="2">
        <p class="title font-weight-bold">施設評価</p>

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
        <v-row>
          <v-col cols="12">
            <v-row>
              <v-col>
                <v-card elevation="2" tile>
                  周辺施設
                  <span>{{ facilitiesInfo.aboutLeisure }}</span>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-card elevation="2" tile>
                  身障者設備
                  <span
                    v-for="(
                      facilitie, i
                    ) of facilitiesInfo.handicappedFacilities"
                    :key="i"
                  >
                    {{ facilitie.item }}
                  </span>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-card elevation="2" tile>
                  部屋設備・備品
                  <span
                    v-for="(facilitie, i) of facilitiesInfo.roomFacilities"
                    :key="`first-${i}`"
                  >
                    {{ facilitie.item }}
                  </span>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-card elevation="2" tile>
                  スタッフの言語レベル
                  <span v-html="facilitiesInfo.linguisticLevel"></span>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-card elevation="2" tile>
                  ホテルの設備
                  <span
                    v-for="(facilitie, i) of facilitiesInfo.hotelFacilities"
                    :key="`second-${i}`"
                  >
                    {{ facilitie.item }}
                  </span>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-card elevation="2" tile>
                  利用可能なクレジットカード
                  <span
                    v-for="(facilitie, i) of policyInfo.availableCreditCard"
                    :key="`third-${i}`"
                  >
                    {{ facilitie.card }}
                  </span>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-card elevation="2" tile>
                  キャンセルポリシー
                  <span v-html="policyInfo.cancelPolicy"></span>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-card elevation="2" tile>
                  条件・注意事項・備考
                  <span>{{ policyInfo.note }}</span>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-card elevation="2" tile>
                  特典
                  <span>{{ otherInfo.privilege }}</span>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    reviewAverage: { default: [] },
    hotelImage: { type: String, default: "" },
    facilitiesInfo: { default: "" },
    policyInfo: { default: "" },
    otherInfo: { default: "" },
  },
};
</script>

<style></style>
