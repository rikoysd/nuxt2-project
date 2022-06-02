<template>
  <v-footer padless class="footer text-center">
    <v-card flat tile class="indigo lighten-1 white--text text-center">
      <v-card-text class="footer">
        <v-btn v-for="icon in icons" :key="icon" class="mx-4 white--text" icon>
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="white--text pt-0 footer">
        ※掲載の写真はイメージです。※掲載されているすべてのコンテンツの無断での転載、転用、コピー等は禁じます。

        <p>Copyright© Rakuraku booking Corporation®. All Rights Reserved.</p>
      </v-card-text>

      <v-divider class="footer"></v-divider>

      <v-card-text class="white--text footer">
        {{ new Date().getFullYear() }} — <strong>楽々booking.com</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
  }),
};
</script>
<style scoped>
.footer {
  background-color: #333c5e;
  text-align: center;
  display: block;
}
</style>
