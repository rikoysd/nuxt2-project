<template>
  <div>
    <v-btn color="pink" text @click="addFavorite(hotelNum)"
      ><v-icon>mdi-cards-heart-outline</v-icon>行きたい</v-btn
    >
  </div>
</template>

<script>
export default {
  props: ["hotelNum"],
  data() {
    return {};
  },
  methods: {
    addFavorite(number) {
      console.log(number);
    },
  },
  computed: {},
};
</script>

<style scoped></style>
