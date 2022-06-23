<template>
  <div class="container">
    <v-card class="main-card" style="background-color: lightgray">
      <span class="hotel-name">{{ hotelName }}</span>

      <div class="plans" style="background-color: white">
        <span style="font-weight: bold">日付・食事</span>&nbsp;&nbsp;<v-col
          >{{ formatDate }}〜{{ staySpan }}泊<br />
          {{ breakfast }}・{{ dinner }}</v-col
        ><br />
        <span style="font-weight: bold">人数室数</span>&nbsp;&nbsp;<v-col
          >大人{{ adult }}名
          <span v-if="1 <= child">子供{{ child }}名</span>
          {{ roomNum }}室</v-col
        ><br />
        <span style="font-weight: bold">部屋</span>&nbsp;&nbsp;<v-col>{{
          room
        }}</v-col
        ><br />
        <span style="font-weight: bold">プラン</span
        >&nbsp;&nbsp;&nbsp;&nbsp;<v-col>{{ plan }}</v-col>
      </div>

      <div class="price" style="background-color: white">
        <span style="font-weight: bold">宿泊料金合計</span
        >&nbsp;&nbsp;&nbsp;&nbsp;<span>{{ subPrice.toLocaleString() }}円</span>
        <hr />
        <span style="font-weight: bold">お支払い金額</span
        >&nbsp;&nbsp;&nbsp;&nbsp;<span class="total-price"
          >{{ totalPrice.toLocaleString() }}円</span
        ><br />
        <span class="content">消費税・サービス料込み</span>
      </div>

      <div class="attentions">
        <span>※入湯税がかかる場合があります。</span><br />
        <span>※宿泊税など別途諸税がかかる場合があります。</span>
      </div>

      <v-btn
        x-large
        class="confirm-button"
        style="background-color: #e9bc00"
        @click="reserveConfirm"
        >入力内容を確認する</v-btn
      >
    </v-card>
  </div>
</template>

<script>
import { format } from "date-fns";
import {
  setDoc,
  getFirestore,
  doc,
  collection,
  getDocs,
} from "firebase/firestore";
import firebase from "@/plugins/firebase";

export default {
  props: {
    id: Number,
    fullName1: String,
    fullName2: String,
    zipcode: String,
    prefecture: String,
    address: String,
    telephone: String,
    mailAddress: String,
    checkInTime: String,
    man: String,
    woman: String,
    payments: String,
    other: String,
    errorChecks: Object,
    card_number: String,
    card_cvv: Number,
    card_exp_month: String,
    card_exp_year: String,
    card_name: String,
  },
  data() {
    return {
      // 詳細情報
      reserveDetail: [],
      // 予約者ID
      reserveId: "0",
      // ホテル名
      hotelName: "",
      // チェックイン日
      date: "",
      // フォーマット化したチェックイン日
      formatDate: new Date(),
      // 宿泊日数
      staySpan: 0,
      // 朝食
      breakfast: "",
      // 夕食
      dinner: "",
      // 宿泊人数（大人）
      adult: 0,
      // 宿泊人数（子供）
      child: 0,
      // 部屋数
      roomNum: 0,
      // 部屋の種類
      room: "",
      // プラン名
      plan: "",
      // 宿泊料金合計
      subPrice: 0,
      // お支払い金額
      totalPrice: 0,
      // エラーチェック
      errorCheck: "false",
      // エラーリスト
      errors: [],
      // エラーオブジェクト
      errorObject: {
        fullName1Error: "",
        fullName2Error: "",
        zipcodeError: "",
        prefectureError: "",
        addressError: "",
        telephoneError: "",
        mailaddressError: "",
        checkInTimeError: "",
        manAndWomanError: "",
      },
      result: "",
      // 予約一覧
      reserveList: [],
    };
  }, //end data

  /**
   * 非同期でホテル詳細情報を反映させる.
   */
  mounted() {
    this.reserveDetail = this.$store.getters.getPreReserveData;
    this.reserveId = String(this.reserveDetail.reserveId);
    this.hotelName = this.reserveDetail.hotelName;
    this.date = this.reserveDetail.checkInDate;
    this.formatDate = format(new Date(this.date), "yyyy年MM月dd日");
    this.staySpan = this.reserveDetail.staySpan;
    this.breakfast = this.reserveDetail.withBreakfastFlag;
    if (this.breakfast === 0) {
      this.breakfast = "朝食なし";
    } else {
      this.breakfast = "朝食あり";
    }
    this.dinner = this.reserveDetail.withDinnerFlag;
    if (this.dinner === 0) {
      this.dinner = "夕食なし";
    } else {
      this.dinner = "夕食あり";
    }
    this.adult = this.reserveDetail.adultNum;
    this.child =
      this.reserveDetail.upClassNum +
      this.reserveDetail.lowClassNum +
      this.reserveDetail.infantWithMBNum +
      this.reserveDetail.infantWithMNum +
      this.reserveDetail.infantWithBNum +
      this.reserveDetail.infantWithoutMBNum;
    this.room = this.reserveDetail.roomName;
    this.roomNum = this.reserveDetail.roomNum;
    this.plan = this.reserveDetail.planName;
    this.subPrice = this.reserveDetail.subPrice;
    this.totalPrice = this.reserveDetail.totalPrice;
  },

  methods: {
    /**
     * 予約確認画面に遷移する.
     */
    async reserveConfirm() {
      // エラーリストの初期化
      this.errors = [];

      // フルネーム（漢字）のエラー
      if (this.fullName1 === "") {
        this.errorChecks.fullName1Error = "名前を入力してください";
        this.errorCheck = true;
        this.errors.push(this.errorCheck);
      } else {
        this.errorChecks.fullName1Error = "";
        this.errorCheck = false;
      }
      this.errorObject.fullName1Error = this.errorChecks.fullName1Error;
      this.errors.push(this.errorCheck);

      // フルネーム（かな）のエラー
      if (this.fullName2 === "") {
        this.errorChecks.fullName2Error = "ふりがなを入力してください";
        this.errorCheck = true;
      } else {
        this.errorChecks.fullName2Error = "";
        this.errorCheck = false;
      }
      this.errorObject.fullName2Error = this.errorChecks.fullName2Error;
      this.errors.push(this.errorCheck);

      // 郵便番号のエラー
      if (this.zipcode === "") {
        this.errorChecks.zipcodeError = "郵便番号を入力してください";
        this.errorCheck = true;
      } else if (this.zipcode.length !== 7) {
        this.errorChecks.zipcodeError = "郵便番号は7桁で入力してください";
        this.errorCheck = true;
      } else {
        this.errorChecks.zipcodeError = "";
        this.errorCheck = false;
      }
      this.errorObject.zipcodeError = this.errorChecks.zipcodeError;
      this.errors.push(this.errorCheck);

      // 都道府県のエラー
      if (this.prefecture === "") {
        this.errorChecks.prefectureError = "都道府県を選択してください";
        this.errorCheck = true;
      } else {
        this.errorChecks.prefectureError = "";
        this.errorCheck = false;
      }
      this.errorObject.prefectureError = this.errorChecks.prefectureError;
      this.errors.push(this.errorCheck);

      // 住所のエラー
      if (this.address === "") {
        this.errorChecks.addressError = "住所を入力してください";
        this.errorCheck = true;
      } else {
        this.errorChecks.addressError = "";
        this.errorCheck = false;
      }
      this.errorObject.addressError = this.errorChecks.addressError;
      this.errors.push(this.errorCheck);

      // 電話番号のエラー
      if (this.telephone === "") {
        this.errorChecks.telephoneError = "電話番号を入力してください";
        this.errorCheck = true;
      } else {
        this.errorChecks.telephoneError = "";
        this.errorCheck = false;
      }
      this.errorObject.telephoneError = this.errorChecks.telephoneError;
      this.errors.push(this.errorCheck);

      // メールアドレスのエラー
      if (this.mailAddress === "") {
        this.errorChecks.mailaddressError = "メールアドレスを入力してください";
        this.errorCheck = true;
      } else if (this.mailAddress.indexOf("@") === -1) {
        this.errorChecks.mailaddressError = "正しい形式で入力してください";
        this.errorCheck = true;
      } else {
        this.errorChecks.mailaddressError = "";
        this.errorCheck = false;
      }
      this.errorObject.mailaddressError = this.errorChecks.mailaddressError;
      this.errors.push(this.errorCheck);

      // チェックイン時刻のエラー
      if (this.checkInTime === "") {
        this.errorChecks.checkInTimeError =
          "チェックイン時刻を選択してください";
        this.errorCheck = true;
      } else {
        this.errorChecks.checkInTimeError = "";
        this.errorCheck = false;
      }
      this.errorObject.checkInTimeError = this.errorChecks.checkInTimeError;
      this.errors.push(this.errorCheck);

      // 宿泊人数のエラー
      if (this.man === "" || this.woman === "") {
        this.errorChecks.manAndWomanError = "人数を選択してください";
        this.errorCheck = true;
      } else {
        this.errorChecks.manAndWomanError = "";
        this.errorCheck = false;
      }
      this.errorObject.manAndWomanError = this.errorChecks.manAndWomanError;
      this.errors.push(this.errorCheck);

      // エラーの数を数える
      let array = [];
      for (let error of this.errors) {
        if (error === true) {
          array.push(error);
        }
      }

      // 親にエラーオブジェクトを渡す
      this.$emit("errorObject", this.errorObject);

      // エラーが一つでもあったら処理を止める
      if (array.length > 0) {
        return;
      }

      // 予約登録IDの採番
      const db = getFirestore(firebase);

      // サブコレクションを一括取得
      try {
        const docRef = collection(
          db,
          "ユーザー一覧",
          String(this.id),
          "予約情報"
        );

        // getDocs（複数形）にすることで複数のドキュメント取得
        await getDocs(docRef).then((snapShot) => {
          const data = snapShot.docs.map((doc) => ({
            ...doc.data(),
          }));
          // console.log(data);

          this.reserveList = data;
        });
      } catch (error) {
        console.error(error);
      }

      let id = 0;
      let idList = [];
      if (this.reserveList.length === 0) {
        id = 1;
      } else if (
        this.reserveList[this.reserveList.length - 1].detailObject.reserveId ===
        this.reserveId
      ) {
        id = this.reserveList.length;
      } else {
        for (let reservation of this.reserveList) {
          idList.push(reservation.id);
        }
        id = Math.max(...idList) + 1;
      }

      try {
        // サブコレクションの追加
        const path = doc(
          db,
          "ユーザー一覧",
          String(this.id),
          "予約情報",
          String(id)
        );

        // 予約者情報とプラン詳細を一つのオブジェクトにまとめる
        const setData = {
          id: id,
          fullName1: this.fullName1,
          fullName2: this.fullName2,
          zipcode: this.zipcode,
          prefecture: this.prefecture,
          address: this.address,
          telephone: this.telephone,
          mailAddress: this.mailAddress,
          checkInTime: this.checkInTime,
          man: this.man,
          woman: this.woman,
          payments: this.payments,
          card_number: this.card_number,
          card_cvv: this.card_cvv,
          card_exp_month: this.card_exp_month,
          card_exp_year: this.card_exp_year,
          card_name: this.card_name,
          other: this.other,
          detailObject: {
            reserveId: this.reserveId,
            hotelName: this.hotelName,
            formatDate: this.formatDate,
            staySpan: this.staySpan,
            breakfast: this.breakfast,
            dinner: this.dinner,
            adult: this.adult,
            // child: this.child,
            room: this.room,
            plan: this.plan,
            subPrice: this.subPrice,
            totalPrice: this.totalPrice,
          },
        };

        await setDoc(path, setData, { merge: true });
      } catch (error) {
        console.error(error);
      }

      this.$router.push("/reserveConfirm");
    },
  }, // end methods
};
</script>

<style scoped>
.container {
  margin-top: 20px;
}
.main-card,
.plans,
.price {
  padding: 20px;
}
.hotel-name {
  font-weight: bold;
  font-size: 25px;
}
.plans,
.price {
  margin-top: 10px;
}
.content {
  font-size: 12px;
}
.attentions {
  font-size: 13px;
  margin-top: 10px;
}
.total-price {
  font-size: 25px;
}
.confirm-button {
  margin-top: 20px;
  margin-left: 85px;
  margin-right: 85px;
  color: white;
  font-weight: bold;
}
</style>
