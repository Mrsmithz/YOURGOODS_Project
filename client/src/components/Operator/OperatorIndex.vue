<template>
    <v-main>
        <OperatorDrawer></OperatorDrawer>
        <v-row>
            <v-col>
                <v-container>
                    <OperatorDashboard v-show="DashboardState"></OperatorDashboard>
                    <ManageRequest v-show="ManageRequestState"></ManageRequest>
                    <OrdersHistory v-show="OrdersHistoryState"></OrdersHistory>
                    <TrackingOrder v-show="TrackingOrderState"></TrackingOrder>
                    <ManageOrder></ManageOrder>
                    <ManageGoods></ManageGoods>
                    <ManageSchedule></ManageSchedule>
                    <ContactModal></ContactModal>
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
        TrackingOrder
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
  }
}
</script>
<style scoped>
.container{
  max-width:100% !important
}
</style>