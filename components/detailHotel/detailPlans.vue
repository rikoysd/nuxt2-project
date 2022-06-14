<template>
  <div>
    <span class="planExplain">
      検索条件：宿泊日時 {{ getCheckInDate + "~" }} 宿泊日数
      {{ staySpan + "泊" }} 宿泊人数 {{ adultNum + "人" }}</span
    >
    <v-row v-for="(plan, i) of plans" :key="i">
      <v-col id="plans" cols="12">
        <v-card elevation="2" class="planCard" tile>
          <v-row>
            <v-col cols="12">
              <v-card-title class="planName font-weight-bold">
                {{ plan[0].roomBasicInfo.planName }}
              </v-card-title>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="2" class="planImg">
              <v-img class="planImg" :src="roomImage"></v-img>
            </v-col>
            <v-col cols="8">
              <v-card-text>
                <span class="planExplain">
                  {{ plan[0].roomBasicInfo.roomName }} </span
                ><br />
                <span
                  class="planExplain2"
                  v-if="plan[0].roomBasicInfo.withBreakfastFlag === 1"
                >
                  朝食あり
                </span>
                <span class="planExplain2" v-else>朝食なし</span>
                <span
                  class="planExplain2"
                  v-if="plan[0].roomBasicInfo.withDinnerFlag === 1"
                >
                  夕食あり
                </span>
                <span class="planExplain2" v-else>夕食なし</span>
                <span>
                  IN{{ vDetailInfo.checkinTime
                  }}{{ exist(vDetailInfo.lastCheckinTime) }} OUT{{
                    vDetailInfo.checkoutTime
                  }}
                </span>
                <v-spacer />
                <span class="text-right planExplain2">
                  税込
                  <span class="text-h6 font-weight-bold">
                    {{ plan[1].dailyCharge.total * staySpan }}
                  </span>
                  円
                </span>
              </v-card-text>
            </v-col>
            <v-col cols="2">
              <v-btn
                color="#65CC42"
                class="white--text font-weight-bold"
                @click="preReserve"
                >詳細・予約</v-btn
              >
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { format } from "date-fns";
export default {
  props: {
    plans: { type: Array, default: [] },
    roomImage: { type: String, default: "" },
    vDetailInfo: { default: "" },
    staySpan: { type: Number, default: 0 },
    checkInDate: { type: String, default: "" },
    adultNum: { default: "" },
  },
  methods: {
    sendReserveData() {
      this.$store.dispatch("searchVacant", {
        hotelNo: this.paramsNo,
        checkinDate: this.checkinDate,
        checkoutDate: this.checkoutDate,
        adultNum: this.adultNum,
      });
      const showList = this.$store.getters.getStayFlag;
      this.$emit("sendReserveData", showList);
    },
    exist(data) {
      if (data !== null) {
        return "~" + data;
      } else {
        return "";
      }
    },
    preReserve() {
      const plan = this.plans[0];
      this.$store.commit("setPreReserveData", {
        checkInDate: this.checkInDate,
        staySpan: this.staySpan,
        withDinnerFlag: plan[0].roomBasicInfo.withDinnerFlag,
        withBreakfastFlag: plan[0].roomBasicInfo.withBreakfastFlag,
        planName: plan[0].roomBasicInfo.planName,
        roomName: plan[0].roomBasicInfo.roomName,
        // 0:現金1:クレジットカード / 現金2:クレジットカード
        payment: plan[0].roomBasicInfo.payment,
        adultNum: this.adultNum,
      });
      console.log(this.$store.state.preReserveData);
    },
  },
  computed: {
    getCheckInDate() {
      return format(new Date(this.checkInDate), "yyyy年MM月dd日");
    },
  },
};
</script>

<style>
.planName {
  font-size: 16px;
}
.planExplain {
  font-size: 15px;
}
.planExplain2 {
  font-size: 13px;
}
.planCard {
  padding-left: 13px;
  max-height: 190px;
}
</style>
