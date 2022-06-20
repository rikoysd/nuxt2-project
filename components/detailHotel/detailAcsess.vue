<template>
  <div>
    <v-row>
      <v-col id="acsess" cols="12">
        <span class="title font-weight-bold">アクセス</span>
        <br />
        <span class="fontSize address">
          住所：{{ address }} 最寄駅：{{ basicInfo.nearestStation + "駅" }}
        </span>
        <br />
        <iframe
          :src="
            'https://maps.google.co.jp/maps?output=embed&q=' +
            this.mapAddress +
            this.mapBasicInfoHotelName
          "
          width="1000"
          height="450"
          style="border: 0"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe
        ><br />
        <span class="fontSize">
          郵便番号：{{ basicInfo.postalCode }} <br />
          駐車場情報：{{ basicInfo.parkingInformation }}<br />
          電話番号：{{ basicInfo.telephoneNo }}<br />
        </span>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    basicInfo: { default: [] },
    address: { type: String, default: "" },
  },
  data() {
    return {
      mapAddress: "",
      mapBasicInfoHotelName: "",
    };
  },
  beforeUpdate() {
    this.mapAddress = this.address;
    this.mapBasicInfoHotelName = this.basicInfo.hotelName;
  },
};
</script>

<style>
.fontSize {
  font-size: 15px;
}
.address {
  background-color: #f7f7f7;
  height: 25px;
}
</style>
