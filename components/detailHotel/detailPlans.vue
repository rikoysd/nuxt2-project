<template>
  <div>
    <v-row v-for="(plan, i) of plans" :key="i">
      <v-col id="plans" cols="12">
        <v-card elevation="2" class="planCard" tile>
          <v-row>
            <v-col cols="12">
              <v-card-title class="subtitle-1 font-weight-bold">
                {{ plan[0].roomBasicInfo.planName }}
              </v-card-title>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="2" class="planImg">
              <v-img class="planImg" :src="roomImage"></v-img>
            </v-col>
            <v-col cols="8">
              <v-card-text class="body-2">
                <p>{{ plan[0].roomBasicInfo.roomName }}</p>
                <span v-if="plan[0].roomBasicInfo.withBreakfastFlag === 1">
                  朝食あり
                </span>
                <span v-else>朝食なし</span>
                <span v-if="plan[0].roomBasicInfo.withDinnerFlag === 1">
                  夕食あり
                </span>
                <span v-else>夕食なし</span>
                <p>
                  IN{{ detailInfo.checkinTime
                  }}{{ exist(detailInfo.lastCheckinTime) }} OUT{{
                    detailInfo.checkoutTime
                  }}
                </p>
                <v-spacer />
                <p class="text-right">
                  税込
                  <span class="text-h6 font-weight-bold">
                    {{ plan[1].dailyCharge.total * staySpan }}
                  </span>
                  円
                </p>
              </v-card-text>
            </v-col>
            <v-col cols="2">
              <v-btn color="#65CC42" @click="preReserve">詳細・予約</v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    basicInfo: { default: "" },
    plans: { type: Array, default: [] },
    roomImage: { type: String, default: "" },
    detailInfo: { default: "" },
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
        hotelName: this.basicInfo.hotelName,
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
      this.$router.push("/reserveForm");
    },
  },
};
</script>

<style></style>
