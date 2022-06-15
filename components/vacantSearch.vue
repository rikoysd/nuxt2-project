<template>
  <v-container class="square">
    <v-container class="searchBox">
      <!-- <v-row> -->

      <!-- </v-row> -->

      <v-row align="center">
        <!-- 都道府県選択 -->
        <v-col class="d-flex" cols="2" sm="2" height="10">
          <v-select
            hide-details="true"
            :items="areaNameList"
            label="都道府県"
            @change="getInfo('middleClassCode', $event)"
            solo
            dense
          ></v-select>
        </v-col>
        <!-- 市町村選択 -->
        <v-col class="d-flex" cols="2" sm="2">
          <v-select
            hide-details="true"
            v-model="selectedItem"
            :items="cityNameList"
            label="市町村"
            @change="getCityList('smallClassCode', $event)"
            solo
            dense
          ></v-select>
        </v-col>

        <!-- カレンダー -->
        <calender
          @selectDates="addDates"
          class="calender d-flex"
          hide-details="true"
          solo
        ></calender>
        <!-- 人数選択 -->
        <selectNumber
          class="numberBtn"
          @adultNum="getAdultNum"
          @roomNum="getRoomNum"
          @upClassNum="getchildNum"
          @MBNum="getinfantNum"
        ></selectNumber>
      </v-row>
      <!-- 札幌の地区詳細 -->
      <!-- <v-col class="d-flex" cols="2" sm="2"> -->
      <v-select
        class="select-detail mb-auto"
        dense
        v-if="selectedItem === '札幌'"
        :items="sapporoList"
        label="地区詳細"
        @change="getDetailList('detailClassCode', $event)"
        solo
      ></v-select>

      <!-- 東京23区の地区詳細 -->
      <!-- <v-col class="d-flex" cols="2" sm="2"> -->
      <v-select
        class="select-detail mb-auto"
        dense
        v-if="selectedItem === '東京２３区内'"
        :items="tokyoList"
        label="地区詳細"
        @change="getTokyoDetail('detailClassCode', $event)"
        solo
      ></v-select>
      <!-- </v-col> -->
      <!-- 名古屋の地区詳細 -->
      <v-select
        class="select-detail mb-auto"
        dense
        v-if="selectedItem === '名古屋'"
        :items="nagoyaList"
        label="地区詳細"
        @change="getNagoyaDetail('detailClassCode', $event)"
        solo
      ></v-select>

      <!-- 京都の地区詳細 -->
      <v-select
        class="select-detail mb-auto"
        dense
        v-if="selectedItem === '京都'"
        :items="kyotoList"
        label="地区詳細"
        @change="getKyotoDetail('detailClassCode', $event)"
        solo
      ></v-select>

      <!-- 大阪の地区詳細 -->
      <v-select
        class="select-detail mb-auto"
        dense
        v-if="selectedItem === '大阪'"
        :items="osakaList"
        label="地区詳細"
        @change="getOsakaDetail('detailClassCode', $event)"
        solo
      ></v-select>
      <!-- </v-col> -->
      <!-- 空室検索 -->
      <v-btn
        class="white--text searchBtn"
        large
        color="#333C5E"
        v-on:click="moveToVacantList"
      >
        空室検索する
      </v-btn>
    </v-container>
  </v-container>
</template>

<script>
import calender from "./calender.vue";
import Top from "./top.vue";
import selectNumber from "./selectNumber.vue";
export default {
  components: { calender, Top, selectNumber },

  data() {
    return {
      //apiに送るリクエストパラメータ
      vacantData: {
        roomNum: 0, //部屋数
        middleClassCode: "", //都道府県
        smallClassCode: "", //主要な市町村
        detailClassCode: "", //駅や詳細地域
        checkinDate: 0, //チェックイン日
        checkoutDate: 0, //チェックアウト日
        adultNum: 0, //大人人数
        upClassNum: 0, //小学生（高学年）
        lowClassNum: 0, //小学生（低学年）
        infantWithMBNum: 0, //幼児（食事・布団付）
        infantWithMNum: 0, //幼児（食事のみ）
        infantWithBNum: 0, //幼児（布団のみ）
        infantWithoutMBNum: 0, //幼児（食事・布団不要）
      },
      //都道府県のリスト
      areaList: [],
      //全国の主要な市町村のリスト
      cityList: [],
      //選択した都道府県の市町村が入るリスト
      smallClassList: ["都道府県を選択してください"],
      //大人人数
      // adultNum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      adultNum: 0,
      //部屋数
      roomNum: 0,
      // roomNum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      //全地区詳細のリスト
      detailList: [],
      //札幌の地区詳細
      sapporoArray: [],
      //東京の地区詳細
      tokyoArray: [],
      //名古屋の地区詳細
      nagoyaArray: [],
      //京都の地区詳細
      kyotoArray: [],
      //大阪の地区詳細
      osakaAray: [],
      selectedItem: "",
      hotels: [],
      selectNum: "選択してください",
      defadultNum: 0,
    };
  },

  methods: {
    /**
     *検索条件をペイロードに渡す.
     */
    moveToVacantList() {
      this.$store.commit("searchResultList", this.vacantData);
      //検索結果一覧へ遷移
      this.$router.push("/vacancyHotelList");
    },
    /**
     * カレンダーから選択した日付をパラメーターに渡す.
     */
    addDates(date) {
      this.vacantData.checkinDate = date[0];
      this.vacantData.checkoutDate = date[1];
      console.log(date[0]);
      console.log(date[1]);
    },
    /*
     *大人人数を子(selectNumber.vue)から受け取る.
     */
    getAdultNum(value) {
      this.vacantData.adultNum = value;
      console.log(this.vacantData.adultNum);
    },
    /**
     *小学生人数を子(selectNumber.vue)から受け取る.
     */
    getchildNum(value1, value2) {
      this.vacantData.upClassNum = value1;
      console.log(this.vacantData.upClassNum);
      this.vacantData.lowClassNum = value2;
      console.log(this.vacantData.lowClassNum);
    },
    /**
     * 幼児人数を子(selectNumber.vue)から受け取る.
     */
    getinfantNum(value1, value2, value3, value4) {
      this.vacantData.infantWithMBNum = value1;
      console.log(value1);
      this.vacantData.infantWithMNum = value2;
      console.log(value2);
      this.vacantData.infantWithBNum = value3;
      console.log(value3);
      this.vacantData.infantWithoutMBNum = value4;
      console.log(value4);
      console.log(this.vacantData.infantWithoutMBNum);
    },

    /**部屋数を子(selectNumber.vue)から受け取る. */
    getRoomNum(value) {
      this.vacantData.roomNum = value;
      console.log(this.vacantData.roomNum);
    },

    /**
     * 検索値をパラメーターに渡す.
     */
    getInfo(data, name) {
      console.log(data);
      console.log(name);
      //選択した値と同じ名前のコードを値として渡す
      let obj = this.areaList.find((area) => area.name === name);
      this.vacantData[data] = obj.code;
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
      for (let city of this.cityList[result]) {
        const cityCode = city.smallClass[0].smallClassCode;
        const cityName = city.smallClass[0].smallClassName;
        this.smallClassList.push({
          cityCode: cityCode,
          cityName: cityName,
        });
      }
      console.log(this.smallClassList); //選択済の市町村のリストが入る
      //

      //札幌地区の名前・コードを(sapporoArray)に入れる
      for (let detail of this.detailList[0]) {
        const detailCode = detail.detailClass.detailClassCode;
        const detailName = detail.detailClass.detailClassName;
        this.sapporoArray.push({
          detailCode: detailCode,
          detailName: detailName,
        });
      }

      //東京地区の名前・コードを配列(tokyoArray)に入れる
      for (let detail of this.detailList[1]) {
        const detailCode = detail.detailClass.detailClassCode;
        const detailName = detail.detailClass.detailClassName;
        this.tokyoArray.push({
          detailCode: detailCode,
          detailName: detailName,
        });
      }

      //名古屋地区の名前・コードを配列(nagoyaArray)に入れる
      for (let detail of this.detailList[2]) {
        const detailCode = detail.detailClass.detailClassCode;
        const detailName = detail.detailClass.detailClassName;
        this.nagoyaArray.push({
          detailCode: detailCode,
          detailName: detailName,
        });
      }
      //京都地区の名前・コードを配列(kyotoArray)に入れる
      for (let detail of this.detailList[3]) {
        const detailCode = detail.detailClass.detailClassCode;
        const detailName = detail.detailClass.detailClassName;
        this.kyotoArray.push({
          detailCode: detailCode,
          detailName: detailName,
        });
      }
      // 大阪地区の名前・コードを配列(osakaArray)に入れる
      for (let detail of this.detailList[4]) {
        const detailCode = detail.detailClass.detailClassCode;
        const detailName = detail.detailClass.detailClassName;
        this.osakaAray.push({
          detailCode: detailCode,
          detailName: detailName,
        });
      }
    },
    /**
     * 人数、部屋数をパラメーターとして渡す.
     */
    requestdata(data, name) {
      this.vacantData[data] = name;
    },
    /**
     * 市町村コードをパラメーターとして渡す.
     */
    getCityList(data, name) {
      let cityObj = this.smallClassList.find((city) => city.cityName === name);
      this.vacantData[data] = cityObj.cityCode;
      console.log(data);
      if (cityObj.cityCode === "sapporo") {
      }
    },
    /**
     * 札幌の地区詳細コードをパラメーターとして渡す.
     */
    getDetailList(data, name) {
      console.log(name);
      let sapporoObj = this.sapporoArray.find(
        (detail) => detail.detailName === name
      );
      this.vacantData[data] = sapporoObj.detailCode;
    },
    /**
     * 東京２３区の地区詳細コードをパラメーターとして渡す.
     */
    getTokyoDetail(data, name) {
      console.log(name);
      let tokyoObj = this.tokyoArray.find(
        (detail) => detail.detailName === name
      );
      this.vacantData[data] = tokyoObj.detailCode;
      console.log(tokyoObj);
    },
    /**
     * 名古屋の地区詳細コードをパラメーターとして渡す.
     */
    getNagoyaDetail(data, name) {
      let nagoyaObj = this.nagoyaArray.find(
        (detail) => detail.detailName === name
      );
      this.vacantData[data] = nagoyaObj.detailCode;
    },
    /**
     * 京都の地区詳細コードをパラメーターとして渡す.
     */
    getKyotoDetail(data, name) {
      let kyotoObj = this.kyotoArray.find(
        (detail) => detail.detailName === name
      );
      this.vacantData[data] = kyotoObj.detailCode;
    },
    /**
     * 大阪の地区詳細コードをパラメーターとして渡す.
     */
    getOsakaDetail(data, name) {
      let osakaObj = this.osakaAray.find(
        (detail) => detail.detailName === name
      );
      console.log(data);
      this.vacantData[data] = osakaObj.detailCode;
    },
  }, //end of methods

  computed: {
    /**
     * 都道府県の漢字表記のみを返す.
     */
    areaNameList() {
      let array = [];
      for (let area of this.areaList) {
        array.push(area.name);
      }
      return array;
    },
    /**
     * 市町村の漢字表記のみを返す.
     */
    cityNameList() {
      let array3 = [];
      for (let city of this.smallClassList) {
        array3.push(city.cityName);
      }
      return array3;
    },
    /**
     * 札幌の地区詳細の漢字表記のみを返す.
     */
    sapporoList() {
      let detailLists = [];
      for (let sapporoDetail of this.sapporoArray) {
        detailLists.push(sapporoDetail.detailName);
      }
      return detailLists;
    },
    /**
     * 東京２３区の地区詳細の漢字表記のみを返す.
     */
    tokyoList() {
      let tokyoLists = [];
      for (let tokyoDetail of this.tokyoArray) {
        tokyoLists.push(tokyoDetail.detailName);
      }
      return tokyoLists;
    },
    /**
     * 名古屋の地区詳細の漢字表記のみを返す.
     */
    nagoyaList() {
      let nagoyaLists = [];
      for (let nagoyaDetail of this.nagoyaArray) {
        nagoyaLists.push(nagoyaDetail.detailName);
      }
      return nagoyaLists;
    },
    /**
     * 京都の地区詳細の漢字表記のみを返す.
     */
    kyotoList() {
      let kyotoLists = [];
      for (let kyotoDetail of this.kyotoArray) {
        kyotoLists.push(kyotoDetail.detailName);
      }
      return kyotoLists;
    },
    /**
     * 大阪の地区詳細の漢字表記のみを返す.
     */
    osakaList() {
      let osakaLists = [];
      for (let osakaDetail of this.osakaAray) {
        osakaLists.push(osakaDetail.detailName);
      }
      return osakaLists;
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
    let smallList = [];
    for (let detail of this.cityList) {
      smallList.push(detail[0].smallClass[1]);
    }

    // //detailClassが存在する地区だけ配列(detailList)に入れる
    this.detailList.push(
      smallList[0].detailClasses, //札幌
      smallList[12].detailClasses, //東京23区
      smallList[22].detailClasses, //名古屋
      smallList[25].detailClasses, //京都
      smallList[26].detailClasses //大阪
    );

    // if (this.smallClassList === 0) {
    //   this.smallClassList.push({ cityName: "都道府県を選択してください" });
    // }
    // console.log(this.smallClassList);
  }, //end of mounted
  created() {
    this.defadultNum = 2;
  },
};
</script>
<style scoped>
.v-btn:not(.v-btn--round).v-size--default {
  height: 40px;
  margin-bottom: 25px;
}
.v-btn:not(.v-btn--round).v-size--default[data-v-2c3a9d92] {
  color: #757575;
}
p {
  font-size: 15px;
}
/* グレーの背景 */
.square {
  margin-top: 50px;
  width: auto;
  height: 160px;
  border-radius: 20px;
  background: #d9d9d9;
  position: relative;
  z-index: 0;
}
/* 検索窓全て */
.searchBox {
  position: absolute;
  z-index: 1;
}
.calender {
  width: 300px;
  height: 60px;
  padding-top: -12px;
}
.calender[data-v-dc40fa16] {
  box-shadow: none;
  width: 300px;
  height: 60px;
  padding-top: -12px;
}
/* .v-select {
  background-color: white;
} */
/* 空室検索ボタン */
.searchBtn {
  /* margin: 0 50%; */
  margin: 20px 50% 0 50%;
  text-align: center;
  position: absolute;
  top: 107px;
  left: 0px;
  z-index: 3;
}
/* 地区詳細のセレクトボックス */
.select-detail {
  margin-top: 20px;
  width: 365px;
}
.numberBtn {
  width: 300px;
}
</style>
