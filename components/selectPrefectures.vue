<template>
  <div>
    <v-select
      v-model="prefecture"
      @input="selectPrefecture(prefecture)"
      class="select"
      label="都道府県"
      :items="items"
      outlined
    >
    </v-select>
  </div>
</template>

<script>
export default {
  props: {
    prefecture: String,
  },
  data() {
    return {
      prefecture: "",
      items: [
        "北海道",
        "青森県",
        "岩手県",
        "宮城県",
        "秋田県",
        "山形県",
        "福島県",
        "茨城県",
        "栃木県",
        "群馬県",
        "埼玉県",
        "千葉県",
        "東京都",
        "神奈川県",
        "新潟県",
        "富山県",
        "石川県",
        "福井県",
        "山梨県",
        "長野県",
        "岐阜県",
        "静岡県",
        "愛知県",
        "三重県",
        "滋賀県",
        "京都府",
        "大阪府",
        "兵庫県",
        "奈良県",
        "和歌山県",
        "鳥取県",
        "島根県",
        "広島県",
        "岡山県",
        "山口県",
        "徳島県",
        "香川県",
        "愛媛県",
        "高知県",
        "福岡県",
        "長崎県",
        "佐賀県",
        "熊本県",
        "大分県",
        "宮崎県",
        "鹿児島県",
        "海外",
      ],
    };
  }, //end data

  computed: {}, // end computed

  methods: {
    /**
     * 都道府県を選択する.
     */
    selectPrefecture(prefecture) {
      // 親に選択した都道府県を引数として渡す
      this.$emit("prefecture", prefecture);
    },
  }, // end methods
};
</script>

<style scoped>
.select {
  width: 300px;
}
</style>
