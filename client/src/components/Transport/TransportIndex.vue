<template>
  <v-main>
    <TransportDrawer></TransportDrawer>
    <v-row>
      <v-col>
        <v-container fluid>
          <TransportDashboard v-if="DashboardState"></TransportDashboard>
          <ManageSchedule v-if="ManageScheduleState"></ManageSchedule>
          <ManageVehicle v-if="ManageVehicleState"></ManageVehicle>
          <ManageOrder></ManageOrder>
          <ManageGoods></ManageGoods>
        </v-container>
      </v-col>
    </v-row>
  </v-main>
</template>
<script>
import TransportDrawer from "./drawer/TransportDrawer";
import TransportDashboard from "./dashboard/TransportDashboard";
import ManageSchedule from './schedule/ManageSchedule'
import ManageVehicle from './vehicle/ManageVehicle'
import ManageOrder from '../Operator/order/ManageOrder'
import ManageGoods from '../Operator/goods/ManageGoods'
export default {
  name: "TransportIndex",
  components: {
    TransportDrawer,
    TransportDashboard,
    ManageSchedule,
    ManageVehicle,
    ManageOrder,
    ManageGoods
  },
  data: () => ({}),
  computed: {
    DashboardState: {
      get: function() {
        return this.$store.getters.getTransport.Dashboard;
      },
      set: function(newValue) {
        return newValue;
      },
    },
    ManageScheduleState: {
      get: function() {
        return this.$store.getters.getTransport.ManageSchedule;
      },
      set: function(newValue) {
        return newValue;
      },
    },
    ManageVehicleState: {
      get: function() {
        return this.$store.getters.getTransport.ManageVehicle;
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