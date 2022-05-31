<template>
  <div>
    <v-select class="select" label="都道府県" :items="items" outlined>
    </v-select
    ><br />
    <button type="button" @click="test">test</button>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
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
      ],
    };
  }, //end data

  computed: {}, // end computed

  methods: {
    test() {
      console.log("call");
      this.$store.dispatch("test2");
    },
  }, // end methods
};
</script>

<style scoped>
.select {
  width: 300px;
}
</style>
