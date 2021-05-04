<template>
    <v-main>
        <ShippingDrawer></ShippingDrawer>
        <v-row>
            <v-col>
                <v-container fluid>
                    <ViewOrders v-if="getShipping.ViewOrders"></ViewOrders>
                    <TrackingOrder v-if="getShipping.TrackingOrder"></TrackingOrder>
                    <ShippingDashboard v-if="getShipping.Dashboard"></ShippingDashboard>
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
        ManageSchedule
    },
    computed:{
        ...mapGetters([
            'getShipping'
        ])
    }
}
</script>
<style scoped>
.container{
  max-width:100% !important
}
</style>