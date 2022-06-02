export default {
  namespaced: true,

  state: {
    name: "Taro",
  },

  actions: {},

  mutations: {
    registerUser(state, payload){
      console.log(payload);
    }
  },
};
