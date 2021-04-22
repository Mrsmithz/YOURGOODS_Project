<template>
  <v-main>
      <CustomerDrawer></CustomerDrawer>
      <v-container fluid class="fill-height" px-4 py-2>
          <v-row class="fill-height">
            <v-col>
              <CustomerDashboard v-if="false"></CustomerDashboard>
              <UploadDocument v-if="true"></UploadDocument>
              <OrdersHistory v-if="false"></OrdersHistory>
            </v-col>
          </v-row>
      </v-container>
  </v-main>
</template>
<script>
import AccountService from "../../services/AccountService";
import CustomerDrawer from "./drawer/CustomerDrawer"
import CustomerDashboard from "./dashboard/CustomerDashboard"
import UploadDocument from "./request/UploadDocument"
import OrdersHistory from "./history/OrdersHistory"
export default {
  name: "Home",
  data: () => ({}),
  components: {
      CustomerDrawer,
      CustomerDashboard,
      UploadDocument,
      OrdersHistory
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
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
  async beforeCreate() {
    try {
      let result = await AccountService.getSession();
      console.log(result);
      this.$store.commit("setUser", result.data);
    } catch (err) {
      console.log(err.response);
      window.sessionStorage.clear();
      this.$router.go();
    }
  },
};
</script>
<style scoped>
.container{
  max-width:100% !important
}
</style>
