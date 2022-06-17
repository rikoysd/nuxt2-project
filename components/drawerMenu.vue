<template>
  <v-col>
    <v-btn class="btn-color" color="#333c5e" elevation="2" @click="addItems"
      >こだわりを追加する</v-btn
    >
    <v-expand-transition>
      <v-card class="menu" max-width="400" tile v-show="showMenu">
        <v-list-item>
          <v-list-item-content>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="item-title"
                  >人気のこだわり</v-list-item-title
                >
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
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="item-title"
                  >施設タイプ</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list>
              <v-list-item v-for="(item, i) of items2" :key="i">
                <v-list-item-action>
                  <v-checkbox
                    v-model="checkbox"
                    v-bind:value="item"
                    :label="item"
                  ></v-checkbox>
                </v-list-item-action>
              </v-list-item>
            </v-list>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="item-title">食事</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list>
              <v-list-item v-for="(item, i) of items3" :key="i">
                <v-list-item-action>
                  <v-checkbox
                    v-model="checkbox"
                    v-bind:value="item"
                    :label="item"
                  ></v-checkbox>
                </v-list-item-action>
              </v-list-item>
            </v-list>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="item-title"
                  >ベッドタイプ</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list>
              <v-list-item v-for="(item, i) of items4" :key="i">
                <v-list-item-action>
                  <v-checkbox
                    v-model="checkbox"
                    v-bind:value="item"
                    :label="item"
                  ></v-checkbox>
                </v-list-item-action>
              </v-list-item>
            </v-list>
            <v-row class="search-words">
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
            </v-row>
            <v-btn
              color="#333c5e"
              elevation="2"
              class="btn-color"
              @click="searchKeyword"
              >検索</v-btn
            >
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-expand-transition>
  </v-col>
</template>

<script>
export default {
  name: "DefaultLayout",
  data() {
    return {
      // チェックボックスリスト
      items: ["夕朝食付き", "禁煙", "ツインベッド", "温泉", "露天風呂付き客室"],
      items2: ["ホテル", "旅館", "ビジネス", "カジュアル"],
      items3: ["夕朝食付", "朝食付", "食事無し", "夕食付"],
      items4: ["ツインベッド", "ダブルベッド", "和洋室", "和室"],
      // メニューの表示・非表示
      showMenu: false,
      // チェック一覧
      checkbox: [],
      expand: false,
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
    /**
     * こだわり検索する.
     */
    searchKeyword() {
      // チェックボックスの中身を文字列に変換する
      let str1 = this.checkbox.toString();
      let str2 = str1.split(",").join(" ");

      this.$emit("search", str2);
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

.item-title {
  font-weight: bold;
  color: #333c5e;
}

.btn-color {
  color: white;
}

.search-words {
  margin-left: 5px;
}
</style>
