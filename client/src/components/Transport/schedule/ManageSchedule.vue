<template>
  <div>
    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="schedule"
          data:items-per-page="5"
          :search="search"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Schedule</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-toolbar>
          </template>
          <template v-slot:[`item.order`]="{ item }">
            <v-btn small @click="showManageOrder(item)" color="success">view</v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import ScheduleService from "../../../services/ScheduleService";
export default {
  name: "ManageSchedule",
  data: () => ({
    search: "",
    headers: [
      {
        text: "Operator Name",
        align: "start",
        value: "operator_name",
      },
      { text: "Pickup At", value: "pickup_at" },
      { text: "Driver", value: "driver" },
      { text: "Vehicle", value: "vehicle" },
      { text: "Order", value: "order", align: "center" },
      { text: "Created At", value: "created_at" },
      { text: "Modified At", value: "modified_at" },
    ],
    schedule: [],
  }),
  methods: {
    getFullTime(time) {
      var date = new Date(time);
      date.setTime(date.getTime() + 7 * 60 * 60 * 1000);
      return `${
        date.toISOString().match(/\d+:\d+:\d+/)[0]
      } ${date.toDateString()}`;
    },
    getDate(date) {
      return date.match(/.+(?=T)/)[0];
    },
    getTime(time) {
      return time.match(/\d+:\d+/)[0];
    },
    showManageOrder(item) {
      this.$store.commit("setTempOrderId", item.order_id);
      this.$store.commit('setOrdersHistoryMode', true)
      this.$store.commit("showOperatorManagePage", "ManageOrder");
    },
    async getScheduleDetail() {
      try {
        let result = await ScheduleService.getScheduleDetail();
        this.schedule = [];
        for (let item of result.data) {
          console.log(item);
          var obj = {
            id: item.id,
            operator_name: item.operator_name,
            order_id: item.order_id,
            shipping_id: item.shipping_id,
            transport_id: item.transport_id,
            vehicle: item.vehicle_plate_number,
            driver_id: item.driver_id,
            driver: item.driver_name,
            created_at: this.getFullTime(item.create_datetime),
            modified_at: this.getFullTime(item.modified_datetime),
            pickup_at:`${this.getTime(item.pickup_datetime)} ${this.getDate(item.pickup_datetime)}`
          };
          this.schedule.push(obj);
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {
    this.getScheduleDetail();
  },
};
</script>
