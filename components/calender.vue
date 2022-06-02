<template>
  <div>
    <v-col>
      <v-text-field
        @focus="dateFocus"
        v-model="dateRangeText"
        label="Date range"
        prepend-icon="mdi-calendar"
        readonly
      ></v-text-field>
    </v-col>
    <v-card max-width="400" v-show="showCalender">
      <v-date-picker
        class="calender"
        v-model="dates"
        range
        @input="addDates"
      ></v-date-picker>
      <v-card-actions>
        <v-btn text color="deep-purple accent-4" @click="closePopup"
          >閉じる</v-btn
        >
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { format } from "date-fns";
export default {
  data() {
    return {
      dates: [],
      showCalender: false,
    };
  },
  methods: {
    addDates() {
      let array = [];
      if (this.dates.length === 2) {
        for (let i = 0; i < this.dates.length; i++) {
          let candidateDate = new Date(this.dates[i]);
          array.push(candidateDate);
        }

        // 日付を昇順に並び替える
        array.sort(function (a, b) {
          return a > b ? 1 : -1;
        });

        // 配列の中身を空に
        this.dates.splice(0, this.dates.length);

        for (let item of array) {
          let formatString = format(item, "yyyy-MM-dd");
          this.dates.push(formatString);
        }
      }
    },
    /**
     * カーソルが当たったときカレンダーを表示.
     */
    dateFocus() {
      this.showCalender = true;
    },
    /**
     * モーダルを閉じる.
     */
    closePopup() {
      this.showCalender = false;
    },
  },
  computed: {
    /**
     * フォームの表示を整える.
     */
    dateRangeText() {
      return this.dates.join(" ~ ");
    },
  },
};
</script>

<style scoped>
.calender {
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
}
</style>
