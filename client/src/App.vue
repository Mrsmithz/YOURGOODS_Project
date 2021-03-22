<template>
  <v-app>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link
      href="https://fonts.googleapis.com/css2?family=Short+Stack&display=swap"
      rel="stylesheet"
    />
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet">
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
//import Loginregister from "./components/Loginregister";
//import Navbar from "./components/Navbar";
//import AccountService from './services/AccoundService'
export default {
  name: "App",
  components: {
    //Loginregister,
    //Navbar,
  },

  data: () => ({

  }),
  methods:{
  },
};
</script>
<style lang="scss">
// @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600&family=Short+Stack&display=swap');
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.1/css/bulma.min.css";

</style>
