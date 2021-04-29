<template>
  <v-app>
    <IndexNavbar></IndexNavbar>
    <ProfileDrawer></ProfileDrawer>
    <ProfileModal></ProfileModal>
    <ChangePasswordModal></ChangePasswordModal>
    <CustomerIndex v-if="UserState.type == 'customer'"></CustomerIndex>
    <OperatorIndex v-if="UserState.type == 'operator'"></OperatorIndex>
    <TransportIndex v-if="UserState.type == 'transport'"></TransportIndex>
  </v-app>
</template>

<script>
window.onunload = function(){
  window.sessionStorage.clear()
}
import IndexNavbar from "../components/Navbar/IndexNavbar";
import ProfileModal from "../components/Modal/ProfileModal"
import ProfileDrawer from "../components/Navbar/ProfileDrawer"
import ChangePasswordModal from "../components/Modal/ChangePasswordModal"
import CustomerIndex from "../components/Customer/CustomerIndex";
import OperatorIndex from "../components/Operator/OperatorIndex"
import AccountService from "../services/AccountService"
import TransportIndex from '../components/Transport/TransportIndex'
export default {
  name: "Index",
  components: {
    CustomerIndex,
    IndexNavbar,
    ProfileDrawer,
    ProfileModal,
    ChangePasswordModal,
    OperatorIndex,
    TransportIndex
  },
  data:() => ({
    user:''
  }),
  async beforeCreate() {
    try {
      let result = await AccountService.getSession();
      console.log(result);
      //this.$store.commit("setUser", result.data);
    } catch (err) {
      console.log(err.response);
      //window.sessionStorage.clear();
      //this.$router.go();
    }
  },
  beforeDestroy(){
    
  },
  computed:{
    UserState: {
      get: function() {
        return this.$store.getters.getUser;
      },
      set: function(newValue) {
        return newValue;
      },
    },
  }
};
</script>
