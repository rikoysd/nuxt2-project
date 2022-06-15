<template>
  <div>
    <v-app>
      <Header />
      <v-main>
        <v-container mt-0 pt-0><Nuxt /></v-container>
      </v-main>
      <Footer />
    </v-app>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style scoped>
.container {
  padding: 0;
}
</style>
