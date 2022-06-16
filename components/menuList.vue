<template>
  <div>
    <v-breadcrumbs :items="items">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
  </div>
</template>

<script>
export default {
  props: {
    menu: {
      text: String,
      disabled: Boolean,
      href: String,
    },
  },
  data() {
    return {
      // パンくずリスト
      items: [
        {
          text: "トップ",
          disabled: false,
          href: "/",
        },
      ],
      hotelList: [],
    };
  },
  mounted() {
    this.items.splice(1, 1);
  },
  watch: {
    menu() {
      this.items.splice(1, 1);
      if (this.menu !== {}) {
        this.items.push(this.menu);
      }
    },
  },
  methods: {},
  computed: {},
};
</script>

<style scoped></style>
