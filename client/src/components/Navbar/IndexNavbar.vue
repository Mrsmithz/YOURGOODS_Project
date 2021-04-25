<template>
    <v-app-bar
      absolute
      color="#43a047"
      dark
      src="https://picsum.photos/1920/1080?random"
      app
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(55,236,186,.7), rgba(25,32,72,.7)"
        ></v-img>
      </template>

      <v-app-bar-nav-icon @click="showSideBarMenu"></v-app-bar-nav-icon>

      <v-app-bar-title>YOURGOODS</v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon @click="showProfileDrawer">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>
</template>

<script>
export default {
    name:"IndexNavbar",
    data: () => ({
        
    }),
    methods:{
        showProfileDrawer(){
            this.$store.commit('showProfileDrawer')
        },
        showSideBarMenu(){
            this.$store.commit('showSideBarMenu')
        }
    }
}
</script>