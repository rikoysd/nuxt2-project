<template>
  <div>
    <v-app>
      <Header />
      <v-main>
        <v-container><Nuxt /></v-container>
      </v-main>
      <Footer />
    </v-app>
  </div>
</template>

<script>
import vacantSearch from "../components/vacantSearch.vue";
export default {
  components: { vacantSearch },
  name: "DefaultLayout",
  data() {
    return {};
  },
};
</script>
<style></style>
