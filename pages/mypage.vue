<template>
  <div>
    <div>マイページです</div>
    <v-btn @click="moveToReserve">予約画面に移動</v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    moveToReserve() {
      this.$router.push("/reserveForm");
    },
  },
  computed: {},
};
</script>

<style scoped></style>
