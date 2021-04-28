<template>
  <v-main>
      <CustomerDrawer></CustomerDrawer>
      <v-container fluid class="fill-height" px-4 py-2>
          <v-row class="fill-height">
            <v-col>
              <CustomerDashboard v-if="DashboardState"></CustomerDashboard>
              <UploadDocument v-if="UploadDocumentState"></UploadDocument>
              <OrdersHistory v-if="OrdersHistoryState"></OrdersHistory>
              <Feedback v-if="FeedbackState"></Feedback>
              <Contact v-if="ContactModalState"></Contact>
              <GoodsModal></GoodsModal>
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
import Contact from "./../Modal/Contact"
import Feedback from "./feedback/Feedback"
import GoodsModal from './history/GoodsModal'
export default {
  name: "CustomerIndex",
  data: () => ({}),
  components: {
      CustomerDrawer,
      CustomerDashboard,
      UploadDocument,
      OrdersHistory,
      Contact,
      Feedback,
      GoodsModal
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    ContactModalState: {
      get: function() {
        return this.$store.getters.getContactModal;
      },
      set: function(newValue) {
        return newValue;
      },
    },
    DashboardState: {
      get: function() {
        return this.$store.getters.getCustomer.Dashboard;
      },
      set: function(newValue) {
        return newValue;
      },
    },
    UploadDocumentState: {
      get: function() {
        return this.$store.getters.getCustomer.UploadDocument;
      },
      set: function(newValue) {
        return newValue;
      },
    },
    OrdersHistoryState: {
      get: function() {
        return this.$store.getters.getCustomer.OrdersHistory;
      },
      set: function(newValue) {
        return newValue;
      },
    },
    FeedbackState: {
      get: function() {
        return this.$store.getters.getCustomer.Feedback;
      },
      set: function(newValue) {
        return newValue;
      },
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
};
</script>
<style scoped>
.container{
  max-width:100% !important
}
</style>
