<template>
  <div id="navb">
    <v-app-bar color="transparent" fixed width="100%" >
      <v-toolbar-title>YOURGOODS</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="#a8d8ea" class="mr-8" @click="show_login">
          Sign IN
      </v-btn>

      <v-btn color="#ffffd2">
        Sign UP
      </v-btn>
    </v-app-bar>
  </div>
</template>
<script>
export default {
  name: "Navbar",
  data: () => ({
    drawer: false,
    items: [
      { title: "Dashboard", icon: "mdi-view-dashboard" },
      { title: "Photos", icon: "mdi-image" },
      { title: "About", icon: "mdi-help-box" },
    ],
  }),
  mounted() {
    window.onscroll = () => {
      this.changeColor();
    };
  },
  methods: {
    changeColor() {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        this.bg = 'white';
      } else {
        this.bg = 'transparent';
      }
    },
    show_login(){
        console.log(this.$store)
        this.$store.commit('show_login')
    }
  },
};
</script>
<style scoped>
.v-sheet.v-toolbar:not(.v-sheet--outlined){
    box-shadow: none !important;
}
</style>
