<template>
  <div>
    <v-btn color="primary" elevation="2" @click="addItems"
      >こだわりを追加する</v-btn
    >
    <v-card class="mx-auto menu" max-width="400" tile v-show="showMenu">
      <v-list-item>
        <v-list-item-content>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>人気のこだわり</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list>
            <v-list-item v-for="(item, i) of items" :key="i">
              <v-list-item-action>
                <v-checkbox
                  v-model="checkbox"
                  v-bind:value="item"
                  :label="item"
                ></v-checkbox>
              </v-list-item-action>
            </v-list-item>
          </v-list>
          <div v-for="(item, index) of checkbox" v-bind:key="index">
            <v-chip
              class="ma-2"
              close
              color="primary"
              outlined
              @click:close="deleteItem(index)"
            >
              {{ item }}
            </v-chip>
          </div>
          <v-btn color="primary" elevation="2">検索</v-btn>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "DefaultLayout",
  data() {
    return {
      // チェックボックスリスト
      items: ["夕朝食付き", "禁煙", "ツイン", "温泉", "露天風呂付き客室"],
      // メニューの表示・非表示
      showMenu: false,
      // チェック一覧
      checkbox: [],
    };
  },
  methods: {
    /**
     * こだわりを追加する.
     */
    addItems() {
      if (this.showMenu === false) {
        this.showMenu = true;
      } else {
        this.showMenu = false;
      }
    },
    /**
     * 条件を削除する.
     * @param {*} index - インデックス
     */
    deleteItem(index) {
      this.checkbox.splice(index, 1);
    },
  },
};
</script>

<style scoped>
.menu {
  height: 300px;

  /* 縦方向にスクロール */
  overflow-y: auto;
  overflow-y: scroll;
}
</style>
