<template>
  <v-main>
    <DriverDrawer></DriverDrawer>
    <v-row>
      <v-col>
        <v-container fluid>
          <DriverDashboard v-if="DashboardState"></DriverDashboard>
          <ViewOrders v-if="ViewOrdersState"></ViewOrders>
          <SentLocation v-if="SentLocationState"></SentLocation>
          <ManageGoods></ManageGoods>
          <ManageOrder></ManageOrder>
          <ManageSchedule></ManageSchedule>
        </v-container>
      </v-col>
    </v-row>
  </v-main>
</template>
<script>
import DriverDashboard from "./dashboard/DriverDashboard";
import SentLocation from "./location/SentLocation";
import ViewOrders from "./orders/ViewOrders";
import DriverDrawer from "./drawer/DriverDrawer";
import ManageGoods from '../Operator/goods/ManageGoods'
import ManageOrder from '../Operator/order/ManageOrder'
import ManageSchedule from '../Operator/schedule/ManageSchedule'
export default {
  name: "DriverIndex",
  components: {
    DriverDrawer,
    DriverDashboard,
    SentLocation,
    ViewOrders,
    ManageGoods,
    ManageOrder,
    ManageSchedule
  },
  data: () => ({}),
  computed: {
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
