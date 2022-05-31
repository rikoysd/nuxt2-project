<template>
  <div>
    <search-box></search-box>
    <keywords></keywords>
  </div>
</template>

<script>
import keywords from "../components/keywords.vue";
import SearchBox from "../components/searchBox.vue";
export default {
  components: { keywords, SearchBox },
  data() {
    return {};
  },
  methods: {},
  computed: {},
};
</script>

<style scoped></style>
