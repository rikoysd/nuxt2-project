<template>
  <div>
    <v-text-field :rules="rules"></v-text-field>
    <v-col class="d-flex" cols="12" sm="2">
      <v-select :items="items" label="区分" outlined></v-select>
    </v-col>

    <!-- <button type="button" v-on:click="getVacantlist">検索結果取得</button> -->
    <button type="button" v-on:click="getList">地区コード取得</button>
    <!-- {{ responseData }} -->
    {{ areaList }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      responseData: [],
      areaList: [],
      searchWord: "",
      items: ["大人", "小人", "幼児"],
    };
  },

  methods: {
    /**
     * 空室検索の結果を出力する.
     */
    async getVacantlist() {
      await this.$store.dispatch("searchVacantList");
      this.responseData = this.$store.getters.getVacantList;
    },
    async getList() {
      await this.$store.dispatch("getAreaCode");
      this.areaList = this.$store.getters.getAreaList;
      console.log(this.areaList);
    },
  }, //methods
};
</script>
