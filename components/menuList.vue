<template>
  <div>
    <v-breadcrumbs :items="items" class="item">
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
    basicInfo: { default: "" },
    menuKeyword: String,
    propsKeyword: String,
    keyword2: String,
    originalWord: String,
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
      keyword: "",
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
    basicInfo() {
      // 検索したキーワードを取得
      this.keyword = this.$store.getters["keyword/getKeyword"];
      let items = [
        {
          text: this.keyword,
          disabled: false,
          href: "/keywordHotelList",
        },
        {
          text: this.basicInfo.hotelName,
          disabled: true,
          href: "",
        },
      ];
      for (let item of items) {
        this.items.push(item);
      }
    },
    propsKeyword() {
      if (this.propsKeyword !== "") {
        let item = {
          text: this.propsKeyword,
          disabled: true,
          href: "",
        };
        this.items.push(item);
      }
    },
    keyword2() {},
    originalWord() {
      if (this.originalWord !== "") {
        // 検索したキーワードをstateに格納
        this.$store.commit("setKeyword", this.propsKeyword);

        let item = {
          text: this.originalWord,
          disabled: true,
          href: "",
        };

        this.items.push(item);
      }
    },
  },
  methods: {},
  computed: {},
};
</script>

<style scoped>
.item {
  padding: 6px 20px;
}
</style>
