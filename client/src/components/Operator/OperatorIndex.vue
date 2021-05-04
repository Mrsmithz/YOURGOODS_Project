<template>
    <v-main>
        <OperatorDrawer></OperatorDrawer>
        <v-row>
            <v-col>
                <v-container>
                    <SharedDashboard v-if="DashboardState"></SharedDashboard>
                    <OperatorDashboard v-if="false"></OperatorDashboard>
                    <ManageRequest v-if="ManageRequestState"></ManageRequest>
                    <OrdersHistory v-if="OrdersHistoryState"></OrdersHistory>
                    <TrackingOrder v-if="TrackingOrderState"></TrackingOrder>
                    <ManageOrder></ManageOrder>
                    <ManageGoods></ManageGoods>
                    <ManageSchedule></ManageSchedule>
                    <ContactModal v-if="ContactModalState"></ContactModal>
                </v-container>
            </v-col>
        </v-row>
    </v-main>
</template>
<script>
import OperatorDrawer from './drawer/OperatorDrawer'
import ManageRequest from './request/ManageRequest'
import ManageOrder from './order/ManageOrder'
import ManageGoods from './goods/ManageGoods'
import ManageSchedule from './schedule/ManageSchedule'
import OperatorDashboard from './dashboard/OperatorDashboard'
import OrdersHistory from './order/OrdersHistory'
import ContactModal from '../Modal/Contact'
import TrackingOrder from './tracking/TrackingOrder'
import SharedDashboard from '../Customer/dashboard/CustomerDashboard'
export default {
    name:'OperatorIndex',
    components: {
        OperatorDrawer,
        ManageRequest,
        ManageOrder,
        ManageGoods,
        OperatorDashboard,
        OrdersHistory,
        ManageSchedule,
        ContactModal,
        TrackingOrder,
        SharedDashboard
    },
    computed:{
    DashboardState:{
      get:function(){
        return this.$store.getters.getOperator.Dashboard
      },
      set:function(newValue){
        return newValue
      }
    },
    ManageRequestState:{
      get:function(){
        return this.$store.getters.getOperator.ManageRequest
      },
      set:function(newValue){
        return newValue
      }
    },
    TrackingOrderState:{
      get:function(){
        return this.$store.getters.getOperator.TrackingOrder
      },
      set:function(newValue){
        return newValue
      }
    },
    OrdersHistoryState:{
      get:function(){
        return this.$store.getters.getOperator.OrdersHistory
      },
      set:function(newValue){
        return newValue
      }
    },
    ContactModalState: {
      get: function() {
        return this.$store.getters.getContactModal;
      },
      set: function(newValue) {
        return newValue;
      },
    },
  }
}
</script>
<style scoped>
.container{
  max-width:100% !important
}
</style>