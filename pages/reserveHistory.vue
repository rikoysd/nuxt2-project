<template>
  <div>
    <h1>山田太郎さんの予約情報</h1>
  </div>
</template>

<script>
export default {
  props: {
    loginUser2: {
      id: 0,
      fullName1: String,
      fullName2: String,
      zipcode: String,
      prefecture: String,
      address: String,
      mailAddress: String,
      telephone: String,
      password: String,
    },
  },
  data() {
    return {};
  },
  methods: {},
  computed: {},
};
</script>

<style scoped></style>
