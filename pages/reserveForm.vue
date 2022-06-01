<template>
  <div class="container">
    <div class="main">
      <div class="reserve-info">
        <h4>予約者情報</h4>
        氏名<v-text-field
          class="name-field"
          label="楽々太郎"
          v-model="fullName1"
          outlined
        ></v-text-field>
        かな<v-text-field
          class="name2-field"
          label="ラクラクタロウ"
          v-model="fullName2"
          outlined
        ></v-text-field>
        郵便番号（ハイフンなし）<v-text-field
          class="zipcode"
          label="0000000"
          v-model="zipcode"
          outlined
        ></v-text-field>
        住所<selectPrefectures></selectPrefectures><br />
        <v-text-field
          class="address"
          label="港区赤坂0-0-0（海外住所の場合は「海外」と入力）"
          v-model="address"
          outlined
        ></v-text-field>
        電話番号（ハイフンなし）<v-text-field
          class="telephone"
          label="09012345678"
          v-model="telephone"
          outlined
        ></v-text-field>
        メールアドレス<v-text-field
          class="mailaddress"
          label="rakuraku@example.jp"
          v-model="mailAddress"
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
          <label for="online" class="radio"
            >オンライン決済<v-radio id="online" value="online"></v-radio
          ></label>
          <label for="cash" class="radio"
            >現地決済<v-radio id="cash" value="cash"></v-radio
          ></label>
        </v-radio-group>
        <hr />
      </div>

      <div class="contact">
        <h4>施設への連絡事項</h4>
        <v-textarea solo style="width: 500px" v-model="other"></v-textarea>
        <div class="attentions">
          <span>※ご希望に添えない場合もございます。予めご了承ください。</span
          ><br />
          <span>※機種依存文字の入力はできません。</span><br />
          <span
            >※当サイトに関する質問は お問合せフォームをご利用ください。</span
          >
        </div>
        <hr />
      </div>

      <div class="cancellation-policy">
        <h4>キャンセルポリシー</h4>
        <span
          >当予約のキャンセル・変更の場合、以下のキャンセル料を申し受けます。</span
        >
        <table border="1px">
          <td>
            前日 15:00から <br />
            100%
          </td>
          <td>
            不泊 <br />
            100%
          </td>
        </table>
        <span class="attention">※ 8日前まではキャンセル料はかかりません。</span>
      </div>
    </div>

    <div class="reservetion-contents">
      <reservetionContents></reservetionContents>
    </div>
  </div>
</template>

<script>
import selectPrefectures from "../components/selectPrefectures.vue";
import selectChecin from "../components/selectCheckin.vue";
import reservetionContents from "../components/reservetionContents.vue";

export default {
  name: "reserveForm",
  components: {
    selectPrefectures,
    selectChecin,
    reservetionContents,
  },
  data() {
    return {
      fullName1: "",
      fullName2: "",
      zipcode: "",
      prefecture: "",
      address: "",
      telephone: "",
      mailAddress: "",
      checkInTime: "",
      items: ["0名", "1名", "2名"],
      radioGroup: "online",
      other: "",
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
.radio,
.container {
  display: flex;
}
.select-g {
  width: 30px;
}
.reserve-info,
.lodging-info,
.payment,
.contact,
.cancellation-policy {
  margin-top: 20px;
}
h4 {
  margin-bottom: 10px;
}
.attentions {
  font-size: 13px;
  margin-bottom: 20px;
}
table {
  text-align: center;
  margin: 20px;
}
td {
  width: 300px;
  padding: 10px;
}
</style>
