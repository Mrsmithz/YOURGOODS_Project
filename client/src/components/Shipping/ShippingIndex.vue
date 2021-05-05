<template>
    <v-main>
        <ShippingDrawer :name="getUser.name"></ShippingDrawer>
        <v-row>
            <v-col>
                <v-container fluid>
                    <ViewOrders v-if="getShipping.ViewOrders"></ViewOrders>
                    <TrackingOrder v-if="getShipping.TrackingOrder"></TrackingOrder>
                    <ShippingDashboard v-if="false"></ShippingDashboard>
                    <StaffDashboard v-if="getShipping.Dashboard"></StaffDashboard>
                    <ManageGoods></ManageGoods>
                    <ManageOrder></ManageOrder>
                    <ManageSchedule></ManageSchedule>
                </v-container>
            </v-col>
        </v-row>
    </v-main>
</template>
<script>
import ShippingDrawer from './drawer/ShippingDrawer'
import TrackingOrder from '../Operator/tracking/TrackingOrder'
import ShippingDashboard from './dashboard/ShippingDashboard'
import ViewOrders from './view/ViewOrders'
import ManageGoods from '../Operator/goods/ManageGoods'
import ManageOrder from '../Operator/order/ManageOrder'
import ManageSchedule from '../Operator/schedule/ManageSchedule'
import StaffDashboard from '../Transport/dashboard/TransportDashboard'
import { mapGetters } from "vuex";
export default {
    name:'ShippingIndex',
    components:{
        ShippingDrawer,
        TrackingOrder,
        ShippingDashboard,
        ViewOrders,
        ManageGoods,
        ManageOrder,
        ManageSchedule,
        StaffDashboard
    },
    computed:{
        ...mapGetters([
            'getShipping',
            'getUser'
        ])
    }
}
</script>
<style scoped>
.container{
  max-width:100% !important
}
</style>