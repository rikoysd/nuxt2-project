import Vuex from "vuex";
import Vue from "vue";
import sample from "./modules/sample";

Vue.use(Vuex);
export const state = {};

export const actions = {
  test2() {
    console.log("call2");
    this.dispatch("sample/getData", { root: true });
  },
}; // end actions

export const mutations = {};

export const modules = {
  sample,
};
