export default {
  namespaced: true,

  state: {
    rankings: new Array(),
  },

  //   mutations: {
  //     // addHotelList(state, payload) {
  //     //   // console.log(payload.hotels);
  //     //   console.log(payload);
  //     //   state.hotels = new Array();
  //     //   for (const hotel of payload) {
  //     //     state.hotels.push(
  //     //       new Ranking(
  //     //         hotel.hotel.rank,
  //     //         hotel.hotel.hotelName,
  //     //         hotel.hotel.userReview
  //     //       )
  //     //     );
  //     //     console.log(hotel.hotel.rank);
  //     //   }
  //     //   console.log(state.hotels);
  //     // },
  //   }, //end of mutations
  actions: {
    async getRankingList(context) {
      const response = await axios.get(
        //総合ランキング情報の取得
        "https://app.rakuten.co.jp/services/api/Travel/HotelRanking/20170426?applicationId=1098541415969458249&format=json&carrier=0&genre=all"
      );
      console.dir("response:" + JSON.stringify(response));
      const payload = response.data.Rankings[0].Ranking.hotels;
      console.log(payload);
      // context.commit("addHotelList", payload);
    },
  }, //end of actions

  //   // getters: {
  //   //   getHotels(state) {
  //   //     return state.hotels;
  //   //   },
  //   // },//getters
};

// export const state = () => ({
//   rankings: new Array(),
//   message: "Hello Vuex",
// }); //state

// export const actions = {
//   async getRankingList(context) {
//     const response = await axios.get(
//       //総合ランキング情報の取得
//       "https://app.rakuten.co.jp/services/api/Travel/HotelRanking/20170426?applicationId=1098541415969458249&format=json&carrier=0&genre=all"
//     );
//     console.dir("response:" + JSON.stringify(response));
//     const payload = response.data.Rankings[0].Ranking.hotels;
//     console.log(payload);
//   },
// };
