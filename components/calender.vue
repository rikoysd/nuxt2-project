<template>
  <div>
    <v-col>
      <v-text-field
        @focus="dateFocus"
        v-model="dates"
        label="Date range"
        prepend-icon="mdi-calendar"
        readonly
      ></v-text-field>
    </v-col>
    <v-card max-width="400" v-show="showCalender">
      <v-date-picker class="calender" v-model="dates" range></v-date-picker>
      <v-card-actions>
        <v-btn text color="deep-purple accent-4" @click="closePopup"
          >閉じる</v-btn
        >
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dates: [],
      showCalender: false,
    };
  },
  methods: {
    dateRangeText() {
      return this.dates.join(" ~ ");
    },
    /**
     * カーソルが当たったときカレンダーを表示.
     */
    dateFocus() {
      this.showCalender = true;
    },
    closePopup() {
      this.showCalender = false;
    },
  },
  computed: {},
};
</script>

<style scoped>
.calender {
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
}
</style>
