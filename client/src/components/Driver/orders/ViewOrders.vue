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
              <v-toolbar-title>View Orders</v-toolbar-title>
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
          <template v-slot:[`item.status`]="{ item }">
            <v-col cols="auto">
              <v-select
                class="statusSelector"
                :items="select2"
                :value="{ text: item.status.toUpperCase(), value: item.status }"
                item-value="value"
                item-text="text"
                @input="updateOrderStatus(item, $event)"
              ></v-select>
            </v-col>
          </template>
          <template v-slot:[`item.arrived_at`]="{ item }">
            <v-row>
              <v-col>
                <v-menu
                  v-model="item.menuPickupTime"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="item.pickupTime"
                      label="Arrived Time"
                      prepend-icon="mdi-clock-time-four-outline"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      :rules="timeRules"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="item.menuPickupTime"
                    v-model="item.pickupTime"
                    full-width
                    format="24hr"
                  ></v-time-picker>
                </v-menu>
              </v-col>
              <v-col>
                <v-menu
                  v-model="item.menuPickupDate"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="item.pickupDate"
                      label="Arrived Date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      :rules="timeRules"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-if="item.menuPickupDate"
                    full-width
                    v-model="item.pickupDate"
                    :show-current="true"
                    :min="getCurrentDate()"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
          </template>
          <template v-slot:[`item.location`]="{ item }">
            <v-col cols="auto">
              <v-btn small color="primary" @click="showLocationModal(item)"
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
              <v-toolbar-title>Completed Orders Detail</v-toolbar-title>
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
          <template v-slot:[`item.location`]="{ item }">
            <v-col cols="auto">
              <v-btn small color="primary" @click="showLocationModal(item)"
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
    menuPickupTime: false,
    headers: [
      {
        text: "Customer Name",
        align: "start",
        value: "customer_name",
      },
      { text: "Arrived At", value: "arrived_at", align: "start" },
      { text: "Status", value: "status", align: "center" },
      { text: "Location", value: "location", align: "center" },
      { text: "Schedule", value: "schedule", align: "center" },
      { text: "Order", value: "order", align: "center" },
      { text: "Driver", value: "driver", align: "center" },
    ],
    orders: [],
    completed_orders: [],
    select2: [
      { text: "In Progress", value: "in progress" },
      { text: "Completed", value: "completed" },
    ],
    timeRules: [(v) => !!v || "This Field is required"],
  }),
  methods: {
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
    showLocationModal(item) {
      item.driver_id = this.$store.getters.getUser.id;
      this.$store.commit("setTempDriverData", item);
      this.$store.commit("setLocationModal", true);
    },
    async updateOrderStatus(item, event) {
      if (event == "completed") {
        if (
          item.pickupTime.match(/\d+:\d+/) &&
          item.pickupDate.match(/\d{4}-\d{2}-\d{2}/)
        ) {
          try {
            let value = await this.$swal({
              title: "Confirm To Change Vehicle Status ?",
              icon: "question",
              showCancelButton: true,
              confirmButtonText: "Yes",
              cancelButtonText: "Cancel",
              showCloseButton: true,
            });
            if (value.isConfirmed) {
              let form = new FormData();
              form.append("request_id", item.request_id);
              form.append("status", event);
              form.append(
                "arrived_datetime",
                `${item.pickupDate} ${item.pickupTime}`
              );
              form.append('pickup_datetime', item.pickup_datetime)
              let result = await ScheduleService.updateScheduleStatus(
                item.schedule_id,
                form
              );
              console.log(result);
              this.getSchedule();
              this.getCompletedSchedule();
              this.$swal({
              title: "Update Arrived Time Successfully",
              icon: "success",
              timer: 1000,
              showConfirmButton: false,
              showCancelButton: false,
            });
            }
          } catch (err) {
            console.log(err);
             this.$swal({
              title: "Update Arrived Time Fail, Please try again",
              icon: "error",
              timer: 1000,
              showConfirmButton: false,
              showCancelButton: false,
            });
          }
        } else {
          item.status = "in progress";
          this.$forceUpdate();
          this.$swal({
              title: "Please fill arrived date time, and try again",
              icon: "error",
              timer: 1000,
              showConfirmButton: false,
              showCancelButton: false,
            });
        }
      }
    },
    async getCompletedSchedule() {
      try {
        let result = await ScheduleService.getScheduleCompletedDetailByDriver();
        this.completed_orders = [];
        for (let item of result.data) {
          let obj = {
            schedule_id: item.id,
            driver: item.driver_name,
            order_id: item.order_id,
            customer_name: item.customer_name,
            status: item.status.toUpperCase(),
            arrived_at: this.getFullTime(item.arrived_datetime),
          };
          this.completed_orders.push(obj);
        }
      } catch (err) {
        console.log(err);
      }
    },
    async getSchedule() {
      try {
        let result = await ScheduleService.getScheduleInProgressDetailByDriver();
        this.orders = [];
        for (let item of result.data) {
          let obj = {
            pickup_datetime:item.pickup_datetime,
            schedule_id: item.id,
            driver: item.driver_name,
            order_id: item.order_id,
            customer_name: item.customer_name,
            status: item.status,
            request_id: item.request_id,
            menuPickupDate: false,
            pickupDate: "",
            menuPickupTime: false,
            pickupTime: "",
          };
          this.orders.push(obj);
        }
      } catch (err) {
        console.log(err);
      }
    },
    getCurrentDate() {
      let date = new Date();
      date.setTime(date.getTime() + 7 * 60 * 60 * 1000);
      return date.toISOString().match(/.+(?=T)/)[0];
    },
    getDate(date) {
      return date.match(/.+(?=T)/)[0];
    },
    getTime(time) {
      return time.match(/\d+:\d+/)[0];
    },
    getFullTime(input) {
      var date = new Date(input);
      date.setTime(date.getTime() + 7 * 60 * 60 * 1000);
      var time = date.toISOString();
      let year = time.match(/.+(?=T)/)[0].split("-");
      let time_result = time.match(/\d+:\d+/)[0];
      let result = `${time_result} ${year[2]}/${year[1]}/${year[0]}`;
      return result;
    },
  },
  mounted() {
    this.getSchedule();
    this.getCompletedSchedule();
  },
};
</script>
