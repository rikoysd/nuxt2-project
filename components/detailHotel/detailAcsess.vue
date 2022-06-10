<template>
  <div>
    <v-row>
      <v-col id="acsess" cols="12">
        <p class="title font-weight-bold">アクセス</p>
        <br />
        <p class="body-1 address">
          住所：{{ address }} 最寄駅：{{ basicInfo.nearestStation + "駅" }}
        </p>
        <br />
        <iframe
          :src="
            'https://maps.google.co.jp/maps?output=embed&q=' +
            address +
            basicInfo.hotelName
          "
          width="1000"
          height="450"
          style="border: 0"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe
        ><br />
        <p class="caption">
          郵便番号：{{ basicInfo.postalCode }} <br />
          駐車場情報：{{ basicInfo.parkingInformation }}<br />
          電話番号：{{ basicInfo.telephoneNo }}<br />
        </p>
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
};
</script>

<style></style>
