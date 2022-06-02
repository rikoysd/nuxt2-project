<template>
  <div>
    <!-- <input type="text" /> -->
    <!-- <button type="button" v-on:click="getVacantlist">検索結果取得</button> -->
    <button type="button" v-on:click="getList">地区コード取得</button>
    <!-- {{ responseData }} -->
    {{ areaList }}
  </div>
</template>

<script>
export default {
  data() {
    return { responseData: [], areaList: [], searchWord: "" };
  },

  methods: {
    // async getVacantlist() {
    //   await this.$store.dispatch("searchVacantList");
    //   this.responseData = this.$store.getters.getVacantList;
    // },
    async getList() {
      await this.$store.dispatch("getAreaCode");
      this.areaList = this.$store.getters.getAreaList;
      console.log(this.areaList);
    },
  }, //methods
};
</script>
