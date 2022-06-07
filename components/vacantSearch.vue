<template>
  <div>
    <!-- カレンダー -->
    <calender @selectDates="addDates"></calender>

    <div>
      <!-- 都道府県選択 -->
      <v-container>
        <v-col class="d-flex" cols="12" sm="2">
          <v-select
            :item-text="middleClassName"
            :items="areaNameList"
            label="都道府県"
            @change="getInfo('middleClassCode', $event)"
            outlined
          ></v-select>
        </v-col>
        <!-- 市町村選択 -->
        <v-col class="d-flex" cols="12" sm="2">
          <v-select
            :items="cityNameList"
            label="市町村"
            @change="getCityList('smallClassCode', $event)"
            outlined
          ></v-select>
        </v-col>
      </v-container>
    </div>
    <v-container fluid>
      <v-row align="center">
        <!-- 人数選択 -->
        <v-col class="d-flex" cols="12" sm="2">
          <v-select
            :items="adultNum"
            label="大人人数"
            outlined
            @change="requestdata('adultNum', $event)"
          ></v-select>
        </v-col>
        <!-- 部屋数選択 -->
        <v-col class="d-flex" cols="12" sm="2">
          <v-select
            :items="roomNum"
            label="部屋数"
            outlined
            @change="requestdata('roomNum', $event)"
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
    </div>
  </div>
</template>

<script>
import calender from "./calender.vue";
export default {
  components: { calender },

  data() {
    return {
      //検索結果
      responseData: [],
      //apiに送るパラメータ
      vacantData: {
        roomNum: 0, //部屋数
        middleClassCode: "", //都道府県
        smallClassCode: "", //主要な市町村
        detailClassCode: "", //駅や詳細地域
        checkinDate: 0, //チェックイン日
        checkoutDate: 0, //チェックアウト日
        adultNum: 0, //大人人数
      },
      //都道府県情報
      areaList: [],
      //主要な市町村
      cityList: [],
      smallClassList: ["都道府県を選択してください"],
      //大人人数
      adultNum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      //部屋数
      roomNum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],

      detailList: [],
    };
  },

  methods: {
    addDates(date) {
      this.vacantData.checkinDate = date[0];
      this.vacantData.checkoutDate = date[1];
      console.log(date[0]);
      console.log(date[1]);
    },
    /**
     * 空室検索の結果を出力する.
     */
    async getVacantlist() {
      await this.$store.dispatch("searchVacantList", this.vacantData);
      this.responseData = this.$store.getters.getVacantList;
      console.log(this.responseData);
    },

    /**
     * 検索値をパラメーラーに渡す.
     */
    getInfo(data, name) {
      console.log(data);
      console.log(name);
      let obj = this.areaList.find((area) => area.name === name);
      this.vacantData[data] = obj.code;
      console.log(obj);
      //選択した都道府県の添え字を取得する
      let result = 0;
      const keys = Object.keys(this.areaList);
      for (let i = 0; i <= this.areaList.length; i++) {
        if (this.areaList[keys[i]].code === obj.code) {
          result = keys[i];
          break;
        }
      }
      //選択肢が残らないよう空の配列でリセットする
      this.smallClassList = [];
      //選択した都道府県の添え字と同じ番号の市町村を表示する
      for (let hokkaido of this.cityList[result]) {
        const hokkaidoCode = hokkaido.smallClass[0].smallClassCode;
        const hokkaidoName = hokkaido.smallClass[0].smallClassName;
        this.smallClassList.push({
          hokkaidoCode: hokkaidoCode,
          hokkaidoName: hokkaidoName,
        });
      }
    },
    requestdata(data, name) {
      this.vacantData[data] = name;
    },
    getCityList(data, name) {
      let hokkaidoObj = this.smallClassList.find(
        (hokkaido) => hokkaido.hokkaidoName === name
      );
      this.vacantData[data] = hokkaidoObj.hokkaidoCode;
      console.log(data);
      console.log(hokkaidoObj);
    },
  }, //end of methods

  computed: {
    areaNameList() {
      let array = [];
      for (let area of this.areaList) {
        array.push(area.name);
      }
      return array;
    },
    cityNameList() {
      let array3 = [];
      for (let city of this.smallClassList) {
        array3.push(city.hokkaidoName);
      }
      return array3;
    },
  }, //end of computed

  async mounted() {
    await this.$store.dispatch("getAreaCode");
    //middleClass（都道府県）を取得.
    const areaLists = this.$store.getters.getAreaList.middleClasses;
    for (let area of areaLists) {
      const code = area.middleClass[0].middleClassCode;
      const name = area.middleClass[0].middleClassName;
      this.areaList.push({ code: code, name: name });
    }

    //smallClass（主要な市町村）を取得.
    let cityLists = this.$store.getters.getAreaList.middleClasses;
    for (let city of cityLists) {
      this.cityList.push(city.middleClass[1].smallClasses);
    }

    //detailClass（地区詳細）を取得
    // let detailLists = this.$store.getters.getAreaList.middleClasses;
    // for (let detail of detailLists) {
    //   this.detailList.push(detail.middleClass[1].smallClasses);
    // }
    // console.log(
    //   cityLists.middleClass[1].smallClasses[0].smallClass[1].detailClasses
    // );
    console.log(this.cityLists.middleClass);

    if (this.smallClassList === 0) {
      this.smallClassList.push({ hokkaidoName: "都道府県を選択してください" });
    }
    console.log(this.smallClassList);
  }, //end of mounted
};
</script>
