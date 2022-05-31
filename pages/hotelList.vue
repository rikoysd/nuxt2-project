<template>
  <div>
    <v-breadcrumbs :items="items">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <search-box></search-box>
    <search-tab></search-tab>
    <keywords></keywords>
  </div>
</template>

<script>
import keywords from "../components/keywords.vue";
import SearchBox from "../components/searchBox.vue";
export default {
  components: { keywords, SearchBox },
  data() {
    return {
      // パンくずリスト
      items: [
        {
          text: "トップ",
          disabled: false,
          href: "/",
        },
        {
          text: "検索結果",
          disabled: true,
        },
      ],
    };
  },
  methods: {},
  computed: {},
};
</script>

<style scoped></style>
