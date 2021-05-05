<template>
  <div>
    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="orders"
          data:items-per-page="5"
          :search="search"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>In Progress Orders</v-toolbar-title>
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
          <template v-slot:[`item.schedule`]="{ item }">
            <v-col cols="auto">
              <v-btn small color="primary" @click="showManageSchedule(item)"
                >View</v-btn
              >
            </v-col>
          </template>
          <template v-slot:[`item.order`]="{ item }">
            <v-col cols="auto">
              <v-btn small color="primary" @click="showManageOrder(item)"
                >View</v-btn
              >
            </v-col>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-row>
        <v-col>
      <v-data-table
        :headers="headers"
        :items="completed_orders"
        :items-per-page="5"
        :search="completed_search"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Completed Orders</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="completed_search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-toolbar>
        </template>
        <template v-slot:[`item.schedule`]="{ item }">
          <v-col cols="auto">
            <v-btn small color="primary" @click="showManageSchedule(item)"
              >View</v-btn
            >
          </v-col>
        </template>
        <template v-slot:[`item.order`]="{ item }">
          <v-col cols="auto">
            <v-btn small color="primary" @click="showManageOrder(item)"
              >View</v-btn
            >
          </v-col>
        </template>
      </v-data-table>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import ScheduleService from "../../../services/ScheduleService";
export default {
  name: "ViewOrders",
  data: () => ({
    search: "",
    completed_search: "",
    headers: [
      {
        text: "Customer Name",
        align: "start",
        value: "customer_name",
      },
      { text: "Status", value: "status", align: "center" },
      { text: "Schedule", value: "schedule", align: "center" },
      { text: "Order", value: "order", align: "center" },
    ],
    orders: [],
    completed_orders: [],
  }),
  methods: {
    async getScheduleDetail() {
      try {
        let result = await ScheduleService.getScheduleDetailByShipping();
        this.orders = [];
        this.completed_orders = [];
        for (let item of result.data) {
          let obj = {
            customer_name: item.customer_name,
            status: item.status.toUpperCase(),
            schedule_id: item.schedule_id,
            order_id: item.order_id,
          };
          if (item.status == "completed") {
            this.completed_orders.push(obj);
          } else {
            this.orders.push(obj);
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
    showManageOrder(item) {
      this.$store.commit("setTempOrderId", item.order_id);
      this.$store.commit("setOrdersHistoryMode", true);
      this.$store.commit("showOperatorManagePage", "ManageOrder");
    },
    showManageSchedule(item) {
      this.$store.commit("setTempScheduleId", item.schedule_id);
      this.$store.commit("setOrdersHistoryMode", true);
      this.$store.commit("showOperatorManagePage", "ManageSchedule");
    },
  },
  mounted() {
    this.getScheduleDetail();
  },
};
</script>
