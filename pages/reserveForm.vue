<template>
  <div>
    <div class="reserve-info">
      <h4>予約者情報</h4>
      氏名<v-text-field
        class="name-field"
        label="楽々太郎"
        outlined
      ></v-text-field>
      かな<v-text-field
        class="name2-field"
        label="ラクラクタロウ"
        outlined
      ></v-text-field>
      郵便番号（ハイフンなし）<v-text-field
        class="zipcode"
        label="0000000"
        outlined
      ></v-text-field>
      住所<selectPrefectures></selectPrefectures><br />
      <v-text-field
        class="address"
        label="港区赤坂0-0-0（海外住所の場合は「海外」と入力）"
        outlined
      ></v-text-field>
      電話番号（ハイフンなし）<v-text-field
        class="telephone"
        label="09012345678"
        outlined
      ></v-text-field>
      メールアドレス<v-text-field
        class="mailaddress"
        label="rakuraku@example.jp"
        outlined
      ></v-text-field>
      <hr />
    </div>

    <div class="lodging-info">
      <h4>宿泊情報</h4>
      チェックイン予定時刻<selectChecin></selectChecin>
      <div class="select-gender">
        宿泊人数&nbsp;&nbsp;&nbsp;男性&nbsp;<v-select
          class="select-g"
          label="選択する"
          :items="items"
          outlined
        >
        </v-select
        >&nbsp;&nbsp;女性&nbsp;<v-select
          class="select-g"
          label="選択する"
          :items="items"
          outlined
        >
        </v-select>
      </div>
      <hr />
    </div>

    <div class="payment">
      <h4>お支払い方法</h4>
      <v-radio-group v-model="radioGroup">
        <div class="radio">オンライン決済<v-radio></v-radio></div>
        <div class="radio">現地決済<v-radio></v-radio></div>
      </v-radio-group>
      <hr />
    </div>

    <div class="contact">
      <h4>施設への連絡事項</h4>
      <v-textarea solo style="width: 500px"></v-textarea>
      <hr />
    </div>
  </div>
</template>

<script>
import selectPrefectures from "../components/selectPrefectures.vue";
import selectChecin from "../components/selectCheckin.vue";

export default {
  name: "reserveForm",
  components: {
    selectPrefectures,
    selectChecin,
  },
  data() {
    return {
      items: ["0名", "1名", "2名"],
    };
  }, //end data

  computed: {}, // end computed

  methods: {}, // end methods
};
</script>

<style scoped>
.name-field,
.name2-field,
.zipcode,
.address,
.mailaddress,
.telephone {
  width: 500px;
}
.select-gender,
.radio {
  display: flex;
}
.select-g {
  width: 100px;
}
.reserve-info,
.lodging-info,
.payment,
.contact {
  margin-top: 20px;
}
h4 {
  margin-bottom: 10px;
}
</style>
