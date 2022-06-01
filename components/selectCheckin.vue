<template>
  <div>
    <v-select
      v-model="checkInTime"
      class="select"
      label="選択する"
      :items="items"
      outlined
    >
    </v-select>
  </div>
</template>

<script>
export default {
  name: "selectChecin",
  data() {
    return {
      items: [
        "15:00",
        "15:30",
        "16:00",
        "16:30",
        "17:00",
        "17:30",
        "18:00",
        "18:30",
        "19:00",
        "19:30",
        "20:00",
      ],
    };
  }, //end data

  computed: {}, // end computed

  methods: {}, // end methods
};
</script>

<style scoped>
.select {
  width: 300px;
}
</style>
