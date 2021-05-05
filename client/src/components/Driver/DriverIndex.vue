<template>
  <v-main>
    <DriverDrawer :name="getUser.name"></DriverDrawer>
    <v-row>
      <v-col>
        <v-container fluid>
          <DriverDashboard v-if="false"></DriverDashboard>
          <ViewOrders v-if="ViewOrdersState"></ViewOrders>
          <SentLocation v-if="SentLocationState"></SentLocation>
          <StaffDashboard v-if="DashboardState"></StaffDashboard>
          <ManageOrderLocation></ManageOrderLocation>
          <ManageGoods></ManageGoods>
          <ManageOrder></ManageOrder>
          <ManageSchedule></ManageSchedule>
        </v-container>
      </v-col>
    </v-row>
  </v-main>
</template>
<script>
import {mapGetters} from 'vuex'
import DriverDashboard from "./dashboard/DriverDashboard";
import SentLocation from "./location/SentLocation";
import ViewOrders from "./orders/ViewOrders";
import DriverDrawer from "./drawer/DriverDrawer";
import ManageGoods from '../Operator/goods/ManageGoods'
import ManageOrder from '../Operator/order/ManageOrder'
import ManageSchedule from '../Operator/schedule/ManageSchedule'
import ManageOrderLocation from './location/ManageOrderLocation'
import StaffDashboard from '../Transport/dashboard/TransportDashboard'
export default {
  name: "DriverIndex",
  components: {
    DriverDrawer,
    DriverDashboard,
    SentLocation,
    ViewOrders,
    ManageGoods,
    ManageOrder,
    ManageSchedule,
    ManageOrderLocation,
    StaffDashboard
  },
  data: () => ({}),
  computed: {
    ...mapGetters([
        'getUser'
    ]),
    DashboardState: {
      get: function() {
        return this.$store.getters.getDriver.Dashboard;
      },
      set: function(newValue) {
        return newValue;
      },
    },
    ViewOrdersState: {
      get: function() {
        return this.$store.getters.getDriver.ViewOrders;
      },
      set: function(newValue) {
        return newValue;
      },
    },
    SentLocationState: {
      get: function() {
        return this.$store.getters.getDriver.SentLocation;
      },
      set: function(newValue) {
        return newValue;
      },
    },
  },
};
</script>
<style scoped>
.container{
  max-width:100% !important
}
</style>
