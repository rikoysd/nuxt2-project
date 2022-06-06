<template>
  <div>
    <!-- カレンダー -->
    <calender></calender>

    <!-- 地区コード取得 -->
    <div>
      <!-- {{ area.middleClass[0].middleClassName }} -->
      <v-container>
        <!-- <v-col class="d-flex" cols="12" sm="2">
          <v-select
            :items="areaList"
            label="都道府県"
            @change="getInfo('middleClassCode', $event)"
            outlined
          ></v-select>
        </v-col> -->
        <!-- 都道府県選択 -->
        <v-col class="d-flex" cols="12" sm="2">
          <v-select
            v-model="select"
            :items="prefecture"
            item-text="state"
            item-value="value"
            label="都道府県"
            return-object.value
            single-line
            outlined
            @change="getInfo('middleClassCode', $event)"
          ></v-select>
        </v-col>
        <!-- 市町村選択 -->
        <v-col class="d-flex" cols="12" sm="2">
          <v-select
            :items="cityList"
            label="目的地"
            @change="getInfo('smallClassCode', $event)"
            outlined
          ></v-select>
        </v-col>
      </v-container>
    </div>

    <!-- {{ areaList }} -->
    <!-- {{ areaList.middleClasses }} -->
    <!-- {{ areaList.middleClasses[0].middleClass }} -->

    <v-container fluid>
      <v-row align="center">
        <!-- 人数選択 -->
        <v-col class="d-flex" cols="12" sm="2">
          <v-select
            :items="adultNum"
            label="大人人数"
            outlined
            @change="getInfo('adultNum', $event)"
          ></v-select>
        </v-col>
        <!-- 部屋数選択 -->
        <v-col class="d-flex" cols="12" sm="2">
          <v-select
            :items="roomNum"
            label="部屋数"
            outlined
            @change="getInfo('roomNum', $event)"
          ></v-select>
        </v-col>
      </v-row>
    </v-container>

    <!-- 空室検索 -->
    <div class="my-2">
      <v-btn small color="primary" v-on:click="getVacantlist">
        空室検索する
      </v-btn>
      {{ responseData.hotels }}
      <!-- <button type="button" v-on:click="getVacantlist">検索する</button> -->
      <!-- <div v-for="result of responseData" :key="result.id">
        {{ result }}
      </div> -->
    </div>
  </div>
</template>

<script>
import calender from "./calender.vue";
export default {
  components: { calender },

  data() {
    return {
      select: { state: "都道府県", value: "todofuken" },
      prefecture: [
        { state: "北海道", value: "hokkaido" },
        { state: "青森県", value: "aomori" },
        { state: "岩手県", value: "iwate" },
        { state: "宮城県", value: "miyagi" },
        { state: "秋田県", value: "akita" },
      ],
      //検索結果
      responseData: [],
      //apiに送るパラメータ
      vacantData: {
        roomNum: 0,
        middleClassCode: "",
        smallClassCode: "",
        detailClassCode: "",
        checkinDate: 0,
        checkoutDate: 0,
        adultNum: 0,
      },
      //都道府県情報
      areaList: [],
      //市町村情報
      cityList: [],
      //地区詳細情報
      detailList: [],
      //大人人数
      adultNum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      //部屋数
      roomNum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      searchWord: "",
    };
  },

  methods: {
    /**
     * 空室検索の結果を出力する.
     */
    async getVacantlist() {
      await this.$store.dispatch("searchVacantList", this.vacantData);
      this.responseData = this.$store.getters.getVacantList;
      console.log("call");
      console.log(this.responseData);
    },

    // async getList() {
    //   await this.$store.dispatch("getAreaCode");
    //   this.areaList = this.$store.getters.getAreaList.middleClasses;
    //   console.log(this.areaList);
    // },
    /**
     * 検索値をパラメーラーに渡す.
     */
    getInfo(data, event) {
      console.log(data);
      console.log(event);
      this.vacantData[data] = event;
    },
  }, //methods

  async mounted() {
    /**
     * 地区コードを取得する.
     */
    await this.$store.dispatch("getAreaCode");
    const areaLists = this.$store.getters.getAreaList.middleClasses;
    for (let area of areaLists) {
      console.log(area);
      //middleClass（都道府県）を取得.
      this.areaList.push(area.middleClass[0].middleClassCode);
    }
    //smallClass（市町村）を取得.
    const cityLists = this.$store.getters.getAreaList.middleClasses;
    for (let city of cityLists) {
      this.cityList.push(
        city.middleClass[1].smallClasses[0].smallClass[0].smallClassCode
      );
    }
    // const cityLists = this.$store.getters.getAreaList.middleClasses;
    // this.cityList.push(
    //   cityLists[0].middleClass[1].smallClasses[0].smallClass[0].smallClassCode
    // );
    console.log(cityLists);
    //地区詳細
    const detailLists = this.$store.getters.getAreaList.middleClasses;
    for (let detail of detailLists) {
      this.detailList.push(
        detail.middleClass[1].smallClasses[0].smallClass[0].smallClassCode
          .detailClasses
      );
    }
    console.log(this.detailList);
  }, //end of mounted
};
</script>
