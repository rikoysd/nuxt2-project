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
    menu: [],
    basicInfo: { default: "" },
    menuKeyword: String,
    propsKeyword: String,
    keyword2: String,
    originalWord: String,
    area: String,
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
      if (this.menu !== []) {
        // 検索結果が出た時点で検索キーワードをstateに格納
        this.$store.commit("setKeyword", this.menu[0].text);
        this.items.push(this.menu[0]);
      }
    },
    basicInfo() {
      // 検索したキーワードを取得
      this.keyword = this.$store.getters["keyword/getKeyword"];
      if (this.keyword2 !== "") {
        this.keyword = this.keyword2;
      }
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
      this.items.splice(1, 1);
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
    area() {
      this.items.splice(1, 1);
      if (this.area !== "") {
        // 検索したキーワードをstateに格納
        this.$store.commit("setKeyword", this.area);
      }

      let item = {
        text: this.area,
        disabled: true,
        href: "",
      };

      this.items.push(item);
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
