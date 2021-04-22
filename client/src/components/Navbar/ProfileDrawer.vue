<template>
  <v-navigation-drawer v-model="ProfileDrawerState" absolute temporary right @input="showProfileDrawer($event)" 
  :stateless="ProfileModalState || ChangePasswordModalState">
    <template v-slot:prepend>
      <v-list-item two-line>
        <v-list-item-avatar>
          <img src="https://randomuser.me/api/portraits/women/81.jpg" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ user.name }}</v-list-item-title>
          <v-list-item-subtitle>Logged In</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>
    <v-divider></v-divider>
    <v-list dense>

      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-home-city</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link @click="showProfileModal">
        <v-list-item-icon>
          <v-icon>mdi-account</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>My Account</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link @click="showChangePasswordModal">
        <v-list-item-icon>
          <v-icon>mdi-account</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Change Password</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link @click="Logout">
        <v-list-item-icon>
          <v-icon>mdi-account-group-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

    </v-list>
  </v-navigation-drawer>
</template>

<script>
import AccountService from "../../services/AccountService";
export default {
  name: "ProfileDrawer",
  data: () => ({
    show: false,
  }),
  methods: {
    showDrawer() {
      this.show = !this.show;
    },
    showProfileModal(){
      this.$store.commit('showProfileModal')
    },
    showChangePasswordModal(){
       this.$store.commit('showChangePasswordModal')
    },
    showProfileDrawer(e){
      if (!e){
        this.$store.commit('showProfileDrawer')
      }
    },
    async Logout() {
      try {
        let result = await AccountService.Logout();
        console.log(result);
        window.sessionStorage.clear();
        this.$router.go();
      } catch (err) {
        console.log(err.response);
      }
    },
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
    ProfileDrawerState:{
      get:function() {
        return this.$store.getters.getProfileDrawer
      },
      set:function(newValue){
        return newValue
      }
    },
    ProfileModalState:{
      get:function() {
        return this.$store.getters.getProfileModal
      },
      set:function(newValue){
        return newValue
      }
    },
    ChangePasswordModalState:{
      get:function() {
        return this.$store.getters.getChangePasswordModal
      },
      set:function(newValue){
        return newValue
      }
    }
  },
  created() {
    this.$root.$refs.ProfileDrawer = this;
  },
};
</script>
