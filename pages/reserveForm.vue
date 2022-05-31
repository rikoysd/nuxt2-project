<template>
  <div>
    <h4>予約者情報</h4>

    氏名<v-text-field
      class="name-field"
      label="楽々太郎"
      outlined
    ></v-text-field>
    かな<v-text-field
      class="name2-field"
      label="ラクラクタロウ"
      outlined
    ></v-text-field>
    郵便番号<v-text-field
      class="zipcode"
      label="0000000"
      outlined
    ></v-text-field>
    住所<selectPrefectures></selectPrefectures>
  </div>
</template>

<script>
import selectPrefectures from "../components/selectPrefectures.vue";

export default {
  name: "reserveForm",
  components: {
    selectPrefectures,
  },
  data() {
    return {};
  }, //end data

  computed: {}, // end computed

  methods: {}, // end methods
};
</script>

<style scoped>
.name-field,
.name2-field,
.zipcode {
  width: 300px;
}
</style>
