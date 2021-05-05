<template>
  <v-footer dark padless app absolute>
    <v-card class="flex" flat tile>
      <v-card-text class="py-2 white--text text-center">
        {{ new Date().getFullYear() }} — Powered By Vuetify ExpressJS VueJS
        <v-btn v-for="(icon, index) in icons" :key="index" class="mx-4" dark icon @click="openNewTab(icon.link)">
          <v-icon size="24px">
            {{ icon.icon }}
          </v-icon>
        </v-btn>
      </v-card-text>
    </v-card>
  </v-footer>
</template>
<script>
export default {
  name: "IndexFooter",
  data: () => ({
    icons: [
        {icon:"mdi-github", link:'https://github.com/Mrsmihz/YOURGOODS_Project'}
    ],
  }),
  methods:{
      openNewTab(link){
          window.open(link)
      }
  }
};
</script>
