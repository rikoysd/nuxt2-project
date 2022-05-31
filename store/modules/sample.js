import axios from "axios";

export default {
  namespaced: true,

  state: {
    name: "Taro",
  },

  actions: {
    async getData() {
      console.log("call3");
      const responce = await axios.get(
        "https://app.rakuten.co.jp/services/api/Travel/HotelRanking/20170426?applicationId=1098541415969458249&format=json&carrier=0&genre=all"
      );
      const payload = responce.data.Rankings;
      console.log(payload);
    },
  },

  mutations: {},
};
