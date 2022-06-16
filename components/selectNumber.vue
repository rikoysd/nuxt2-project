<template>
  <div>
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-x
    >
      <template v-slot:activator="{ on, attrs }">
        <v-col cols="6" sm="6">
          <v-btn
            block
            class="select-btn"
            v-bind="attrs"
            v-on="on"
            color="white"
            height="45px"
            ><v-icon dark left>mdi-account</v-icon> 大人{{ adultNum }}名　子供{{
              count +
              lowClassCount +
              infantWithMBNumCount +
              infantWithMNumCount +
              infantWithBNumCount +
              infantWithoutMBNumCount
            }}名　{{ 1 }}室
          </v-btn>
        </v-col>
      </template>
      <!-- 大人人数選択 -->
      <v-card>
        <v-divider></v-divider>
        <v-list>
          <v-list-item>
            <v-list-item-title>大人</v-list-item-title>
            <v-btn
              @click="adlulNumDecrement"
              v-model="message"
              class="mx-2"
              fab
              dark
              x-small
              color="primary"
            >
              <v-icon dark> mdi-minus </v-icon>
            </v-btn>
            {{ adultNum }}
            <v-btn
              @click="adlulNumIncrement"
              v-model="message"
              class="mx-2"
              fab
              dark
              x-small
              color="primary"
            >
              <v-icon dark> mdi-plus </v-icon>
            </v-btn>
          </v-list-item>
          <br />
          <v-divider></v-divider>
          <!-- 子供区分選択 -->
          <v-col class="d-flex" cols="6">
            <v-select
              v-model="selectedItem"
              label="子供区分"
              dense
              :items="elementalyClass"
            ></v-select>
          </v-col>
          <v-list-item v-if="selectedItem === '小学生'">
            <v-list-item-title>高学年</v-list-item-title>
            <v-btn
              @click="upclassDecrement"
              v-model="message"
              class="mx-2"
              fab
              dark
              x-small
              color="primary"
            >
              <v-icon dark> mdi-minus </v-icon>
            </v-btn>
            {{ count }}
            <v-btn
              @click="upclassIncrement"
              v-model="message"
              class="mx-2"
              fab
              dark
              x-small
              color="primary"
            >
              <v-icon dark> mdi-plus </v-icon>
            </v-btn>
          </v-list-item>

          <v-list-item v-if="selectedItem === '小学生'">
            <v-list-item-title>低学年</v-list-item-title>
            <v-btn
              @click="lowclassDecrement"
              v-model="message"
              class="mx-2"
              fab
              dark
              x-small
              color="primary"
            >
              <v-icon dark> mdi-minus </v-icon>
            </v-btn>
            {{ lowClassCount }}
            <v-btn
              @click="lowclassIncrement"
              v-model="message"
              class="mx-2"
              fab
              dark
              x-small
              color="primary"
            >
              <v-icon dark> mdi-plus </v-icon>
            </v-btn>
          </v-list-item>
          <v-list-item v-if="selectedItem === '幼児'">
            <v-list-item-title>食事・布団付</v-list-item-title>
            <v-btn
              @click="infantWithMBNumDec"
              v-model="message"
              class="mx-2"
              fab
              dark
              x-small
              color="primary"
            >
              <v-icon dark> mdi-minus </v-icon>
            </v-btn>
            {{ infantWithMBNumCount }}
            <v-btn
              @click="infantWithMBNumInc"
              v-model="message"
              class="mx-2"
              fab
              dark
              x-small
              color="primary"
            >
              <v-icon dark> mdi-plus </v-icon>
            </v-btn>
          </v-list-item>
          <v-list-item v-if="selectedItem === '幼児'">
            <v-list-item-title>食事のみ</v-list-item-title>
            <v-btn
              @click="infantWithMNumDec"
              v-model="message"
              class="mx-2"
              fab
              dark
              x-small
              color="primary"
            >
              <v-icon dark> mdi-minus </v-icon>
            </v-btn>
            {{ infantWithMNumCount }}
            <v-btn
              @click="infantWithMNumInc"
              v-model="message"
              class="mx-2"
              fab
              dark
              x-small
              color="primary"
            >
              <v-icon dark> mdi-plus </v-icon>
            </v-btn>
          </v-list-item>
          <v-list-item v-if="selectedItem === '幼児'">
            <v-list-item-title>布団のみ</v-list-item-title>
            <v-btn
              @click="infantWithBNumDec"
              v-model="message"
              class="mx-2"
              fab
              dark
              x-small
              color="primary"
            >
              <v-icon dark> mdi-minus </v-icon>
            </v-btn>
            {{ infantWithBNumCount }}
            <v-btn
              @click="infantWithBNumInc"
              v-model="message"
              class="mx-2"
              fab
              dark
              x-small
              color="primary"
            >
              <v-icon dark> mdi-plus </v-icon>
            </v-btn>
          </v-list-item>
          <v-list-item v-if="selectedItem === '幼児'">
            <v-list-item-title>食事・布団不要</v-list-item-title>
            <v-btn
              @click="infantWithoutMBNumDec"
              v-model="message"
              class="mx-2"
              fab
              dark
              x-small
              color="primary"
            >
              <v-icon dark> mdi-minus </v-icon>
            </v-btn>
            {{ infantWithoutMBNumCount }}
            <v-btn
              @click="infantWithoutMBNumInc"
              v-model="message"
              class="mx-2"
              fab
              dark
              x-small
              color="primary"
            >
              <v-icon dark> mdi-plus </v-icon>
            </v-btn>
          </v-list-item>
          <br />
          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-title>部屋数</v-list-item-title>
            <v-btn
              @click="roomNumDecrement"
              v-model="message"
              class="mx-2"
              fab
              dark
              x-small
              color="primary"
            >
              <v-icon dark> mdi-minus </v-icon>
            </v-btn>
            {{ roomNum }}
            <v-btn
              @click="roomNumIncrement"
              v-model="message"
              class="mx-2"
              fab
              dark
              x-small
              color="primary"
            >
              <v-icon dark> mdi-plus </v-icon>
            </v-btn>
          </v-list-item>
        </v-list>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="menu = false"> 保存 </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //大人人数
      adultNum: 2,
      //子供区分
      elementalyClass: ["小学生", "幼児"],
      //小学生（高学年）の数
      count: 0,
      //小学生（低学年）の数
      lowClassCount: 0,
      //幼児（食事・布団付）の数
      infantWithMBNumCount: 0,
      //幼児（食事のみ）の数
      infantWithMNumCount: 0,
      //幼児（布団のみ）の数
      infantWithBNumCount: 0,
      //幼児（食事・布団不要）の数
      infantWithoutMBNumCount: 0,
      fav: true,
      menu: false,
      message: false,
      hints: true,
      //部屋数
      roomNum: 1,
      selectedItem: "",
    };
  }, //end od data
  methods: {
    /**大人人数のカウント（＋）. */
    adlulNumIncrement() {
      this.adultNum++;
      this.$emit("adultNum", this.adultNum);
      console.log("call");
      //   this.vacantData.adultNum = this.adultNum;
    },
    /**大人人数のカウント（ー）. */
    adlulNumDecrement() {
      if (this.adultNum >= 1) {
        this.adultNum--;
        return this.$emit("adultNum", this.adultNum);
      } else {
        return this.$emit("adultNum", 0);
      }
    },
    /**小学生（高学年）人数のカウント（＋）. */
    upclassIncrement() {
      this.count++;
      this.$emit("upClassNum", this.count, this.lowClassCount);
    },
    /**小学生（高学年）人数のカウント（ー）. */
    upclassDecrement() {
      if (this.count >= 1) {
        this.count--;
        return this.$emit("upClassNum", this.count, this.lowClassCount);
      } else {
        return this.$emit("upClassNum", 0);
      }
    },
    /**小学生（低学年）人数のカウント（＋）. */
    lowclassIncrement() {
      this.lowClassCount++;
      this.$emit("upClassNum", this.count, this.lowClassCount);
    },
    /**小学生（低学年）人数のカウント（ー）. */
    lowclassDecrement() {
      if (this.lowClassCount >= 1) {
        this.lowClassCount--;
        return this.$emit("upClassNum", this.count, this.lowClassCount);
      } else {
        return this.$emit("upClassNum", 0);
      }
    },

    /**幼児（食事・布団付）のカウント（ー） */
    infantWithMBNumDec() {
      if (this.infantWithMBNumCount >= 1) {
        this.infantWithMBNumCount--;
        return this.$emit(
          "MBNum",
          this.infantWithMBNumCount,
          this.infantWithMNumCount,
          this.infantWithBNumCount,
          this.infantWithoutMBNumCount
        );
      } else {
        return this.$emit("MBNum", 0);
      }
    },
    /**幼児（食事・布団付）のカウント（＋） */
    infantWithMBNumInc() {
      this.infantWithMBNumCount++;
      this.$emit(
        "MBNum",
        this.infantWithMBNumCount,
        this.infantWithMNumCount,
        this.infantWithBNumCount,
        this.infantWithoutMBNumCount
      );
    },
    /**幼児（食事のみ）のカウント（ー） */
    infantWithMNumDec() {
      if (this.infantWithMNumCount >= 1) {
        this.infantWithMNumCount--;
        return this.$emit(
          "MBNum",
          this.infantWithMBNumCount,
          this.infantWithMNumCount,
          this.infantWithBNumCount,
          this.infantWithoutMBNumCount
        );
      } else {
        this.$emit("MBNum", 0);
      }
    },
    /**幼児（食事のみ）のカウント（＋） */
    infantWithMNumInc() {
      this.infantWithMNumCount++;
      this.$emit(
        "MBNum",
        this.infantWithMBNumCount,
        this.infantWithMNumCount,
        this.infantWithBNumCount,
        this.infantWithoutMBNumCount
      );
    },
    /**幼児（布団のみ）のカウント（ー） */
    infantWithBNumDec() {
      if (this.infantWithBNumCount >= 1) {
        this.infantWithBNumCount--;
        return this.$emit(
          "MBNum",
          this.infantWithMBNumCount,
          this.infantWithMNumCount,
          this.infantWithBNumCount,
          this.infantWithoutMBNumCount
        );
      } else {
        return this.$emit("MBNum", 0);
      }
    },
    /**幼児（布団のみ）のカウント（＋） */
    infantWithBNumInc() {
      this.infantWithBNumCount++;
      this.$emit(
        "MBNum",
        this.infantWithMBNumCount,
        this.infantWithMNumCount,
        this.infantWithBNumCount,
        this.infantWithoutMBNumCount
      );
    },
    /**幼児（食事・布団不要）のカウント（ー） */
    infantWithoutMBNumDec() {
      if (this.infantWithoutMBNumCount >= 1) {
        this.infantWithoutMBNumCount--;
        return this.$emit(
          "MBNum",
          this.infantWithMBNumCount,
          this.infantWithMNumCount,
          this.infantWithBNumCount,
          this.infantWithoutMBNumCount
        );
      } else {
        return this.$emit("MBNum", 0);
      }
    },
    /**幼児（食事・布団不要）のカウント（＋） */
    infantWithoutMBNumInc() {
      this.infantWithoutMBNumCount++;
      this.$emit(
        "MBNum",
        this.infantWithMBNumCount,
        this.infantWithMNumCount,
        this.infantWithBNumCount,
        this.infantWithoutMBNumCount
      );
    },
    /**部屋数のカウント（ー）. */
    roomNumDecrement() {
      if (this.roomNum >= 1) {
        this.roomNum--;
        return this.$emit("roomNum", this.roomNum);
      } else {
        return this.$emit("roomNum", 0);
      }
    },
    /**部屋数のカウント（＋）. */
    roomNumIncrement() {
      this.roomNum++;
      this.$emit("roomNum", this.roomNum);
    },
  },
};
</script>

<style scoped>
.select-btn {
  padding-bottom: 20px;
}
.data-v-58217fa0 {
  padding-bottom: 25px;
}
.v-btn:not(.v-btn--round).v-size--default {
  width: 280px;
}
</style>
