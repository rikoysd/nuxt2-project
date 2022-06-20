<template>
  <div>
    <v-row>
      <v-col id="hotelInfo" cols="11">
        <span class="title font-weight-bold">宿の詳細</span>
        <br />
        <v-img class="hotelImage1" :src="hotelImage"></v-img>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-row v-show="reviewAverage.bathAverage > 0">
          <span class="subtitle-1 font-weight-bold">設備の評価</span>
          <v-col cols="12" class="averages">
            <span class="average">
              {{ "風呂評価" + reviewAverage.bathAverage }}
              <v-rating
                color="#e9bc00"
                :value="reviewAverage.bathAverage"
                readonly
                size="20"
                dense
              ></v-rating
            ></span>
            <span class="average"
              >{{ "立地評価" + reviewAverage.locationAverage }}
              <v-rating
                color="#e9bc00"
                :value="reviewAverage.locationAverage"
                readonly
                size="20"
                dense
                icon-label="custom icon label text {0} of {1}"
              ></v-rating
            ></span>
            <span class="average">
              {{ "装備品評価" + reviewAverage.equipmentAverage }}
              <v-rating
                color="#e9bc00"
                :value="reviewAverage.equipmentAverage"
                readonly
                size="20"
                dense
                icon-label="custom icon label text {0} of {1}"
              ></v-rating>
            </span>
            <span class="average">
              {{ "食事評価" + reviewAverage.mealAverage }}
              <v-rating
                color="#e9bc00"
                :value="reviewAverage.mealAverage"
                readonly
                size="20"
                dense
                icon-label="custom icon label text {0} of {1}"
              ></v-rating>
            </span>
            <span class="average">
              {{ "部屋評価" + reviewAverage.roomAverage }}
              <v-rating
                color="#e9bc00"
                :value="reviewAverage.roomAverage"
                readonly
                size="20"
                dense
                icon-label="custom icon label text {0} of {1}"
              ></v-rating>
            </span>
            <span class="average">
              {{ "サービス評価" + reviewAverage.serviceAverage }}
              <v-rating
                color="#e9bc00"
                :value="reviewAverage.serviceAverage"
                readonly
                size="20"
                dense
                icon-label="custom icon label text {0} of {1}"
              ></v-rating>
            </span>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            v-show="reviewAverage.bathAverage == 0"
            class="notEquipmentReview"
          >
            設備評価はありません
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-card>
              <v-tabs v-model="tab" background-color="#333C5E" dark>
                <v-tab v-for="item in items" :key="item.tab">
                  {{ item.tab }}
                </v-tab>
              </v-tabs>

              <v-tabs-items v-model="tab">
                <v-tab-item v-for="item in items" :key="item.tab">
                  <v-card flat>
                    <v-card-text v-for="(data, i) of item.contents" :key="i">
                      <span v-if="data.card != ''" v-html="data.card"></span>
                      <span v-if="data.item != ''" v-html="data.item"> </span>
                    </v-card-text>
                    <v-card-text v-html="item.content"></v-card-text>
                  </v-card>
                </v-tab-item>
                <!-- <v-tab-item>
                  <v-card flat>{{ items[0].content }} </v-card>
                </v-tab-item>
                <v-tab-item v-for="item in items[1].content" :key="item.tab">
                  <v-card flat>{{ item.item }} </v-card>
                </v-tab-item>
                <v-tab-item v-for="item in items[2].content" :key="item.tab">
                  <v-card flat>{{ item.item }} </v-card>
                </v-tab-item> -->
              </v-tabs-items>
            </v-card>
            <!-- <v-row>
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
            </v-row> -->
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
  beforeUpdate() {
    this.items[0].content = this.facilitiesInfo.aboutLeisure;
    this.items[1].contents = this.facilitiesInfo.handicappedFacilities;
    this.items[2].contents = this.facilitiesInfo.roomFacilities;
    this.items[3].content = this.facilitiesInfo.linguisticLevel;
    this.items[4].contents = this.facilitiesInfo.hotelFacilities;
    this.items[5].contents = this.policyInfo.availableCreditCard;
    this.items[6].content = this.policyInfo.cancelPolicy;
    this.items[7].content = this.policyInfo.note;
    this.items[8].content = this.otherInfo.privilege;
  },
  data: () => ({
    tab: null,
    items: [
      { tab: "周辺施設", content: "Tab 0 Content" },
      { tab: "身障者設備", contents: "Tab 1 Content" },
      { tab: "部屋設備・備品", contents: "Tab 2 Content" },
      { tab: "スタッフの言語レベル", content: "Tab 3 Content" },
      { tab: "ホテルの設備", contents: "Tab 4 Content" },
      { tab: "利用可能なクレジットカード", contents: "Tab 5 Content" },
      { tab: "キャンセルポリシー", content: "Tab 6 Content" },
      { tab: "条件・注意事項・備考", content: "Tab 7 Content" },
      { tab: "特典", content: "Tab 8 Content" },
    ],
  }),
};
</script>

<style>
.hotelImage1 {
  height: 400px;
  width: 80vw;
}
.averages {
  display: flex;
  justify-content: space-between;
}
.notEquipmentReview {
  background-color: #f7f7f7;
  width: 100%;
}
</style>
