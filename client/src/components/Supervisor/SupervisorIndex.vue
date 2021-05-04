<template>
    <v-main>
        <SupervisorDrawer></SupervisorDrawer>
        <v-row>
            <v-col>
                <v-container fluid>
                    <SupervisorDashboard v-if="getSupervisor.Dashboard"></SupervisorDashboard>
                    <ManageDriver v-if="getSupervisor.ManageDriver"></ManageDriver>
                    <ManageOperator v-if="getSupervisor.ManageOperator"></ManageOperator>
                    <ManageShipping v-if="getSupervisor.ManageShipping"></ManageShipping>
                    <ManageTransport v-if="getSupervisor.ManageTransport"></ManageTransport>
                    <Feedback v-if="getSupervisor.Feedback"></Feedback>
                </v-container>
            </v-col>
        </v-row>
    </v-main>
</template>
<script>
import SupervisorDrawer from './drawer/SupervisorDrawer'
import SupervisorDashboard from './dashboard/SupervisorDashboard'
import ManageDriver from './staff/ManageDriver'
import ManageOperator from './staff/ManageOperator'
import ManageShipping from './staff/ManageShipping'
import ManageTransport from './staff/ManageTransport'
import Feedback from './feedback/Feedback'
import { mapGetters } from "vuex";
export default {
    name:'SupervisorIndex',
    data:() => ({
    }),
    components: {
        SupervisorDrawer,
        SupervisorDashboard,
        ManageDriver,
        ManageOperator,
        ManageShipping,
        ManageTransport,
        Feedback
    },
    watch:{
    },
    computed:{
        ...mapGetters([
            'getSupervisor'
        ])
    }
}
</script>
<style scoped>
.container{
  max-width:100% !important
}
</style>