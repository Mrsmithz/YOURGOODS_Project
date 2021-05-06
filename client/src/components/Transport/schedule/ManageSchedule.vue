<template>
  <div>
    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="schedule"
          data:items-per-page="5"
          :search="search_inprogress_schedule"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>In Progress Schedule</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search_inprogress_schedule"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-toolbar>
          </template>
          <template v-slot:[`item.order`]="{ item }">
            <v-btn small @click="showManageOrder(item)" color="success"
              >view</v-btn
            >
          </template>
          <template v-slot:[`item.vehicle`]="{ item }">
            <v-col cols="auto">
              <v-select
                class="statusSelector"
                :items="vehicleList"
                :value="{ text: item.vehicle, value: item.vehicle }"
                item-value="value"
                item-text="text"
                @input="updateScheduleVehicle(item, $event)"
              ></v-select>
            </v-col>
          </template>
          <template v-slot:[`item.driver`]="{ item }">
            <v-col cols="auto">
              <v-select
                class="statusSelector"
                :items="driverList"
                :value="{ text: item.driver, value: item.driver_id }"
                item-value="value"
                item-text="text"
                @input="updateScheduleDriver(item, $event)"
              ></v-select>
            </v-col>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-data-table
          :headers="headers2"
          :items="completed_schedule"
          data:items-per-page="5"
          :search="search_completed_schedule"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Completed Schedule</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search_completed_schedule"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-toolbar>
          </template>
          <template v-slot:[`item.order`]="{ item }">
            <v-btn small @click="showManageOrder(item)" color="success"
              >view</v-btn
            >
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import ScheduleService from "../../../services/ScheduleService";
import VehicleService from "../../../services/VehicleService";
export default {
  name: "ManageSchedule",
  data: () => ({
    search_inprogress_schedule: "",
    search_completed_schedule: "",
    headers: [
      {
        text: "Operator Name",
        align: "start",
        value: "operator_name",
      },
      { text: "Customer Name", value: "customer_name" },
      { text: "Pickup At", value: "pickup_at" },
      { text: "Driver", value: "driver" },
      { text: "Vehicle", value: "vehicle" },
      { text: "Order", value: "order", align: "center" },
      { text: "Created At", value: "created_at" },
      { text: "Modified At", value: "modified_at" },
    ],
    headers2: [
      {
        text: "Operator Name",
        align: "start",
        value: "operator_name",
      },
      { text: "Customer Name", value: "customer_name" },
      { text: "Pickup At", value: "pickup_at" },
      { text: "Arrived At", value: "arrived_at" },
      { text: "Driver", value: "driver" },
      { text: "Vehicle", value: "vehicle" },
      { text: "Order", value: "order", align: "center" },
      { text: "Created At", value: "created_at" },
      { text: "Modified At", value: "modified_at" },
    ],
    schedule: [],
    completed_schedule: [],
    vehicleList: [],
    driverList: [],
  }),
  methods: {
    // getFullTime(time) {
    //   var date = new Date(time);
    //   date.setTime(date.getTime() + 7 * 60 * 60 * 1000);
    //   return `${
    //     date.toISOString().match(/\d+:\d+:\d+/)[0]
    //   } ${date.toDateString()}`;
    // },
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
    showManageOrder(item) {
      this.$store.commit("setTempOrderId", item.order_id);
      this.$store.commit("setOrdersHistoryMode", true);
      this.$store.commit("showOperatorManagePage", "ManageOrder");
    },
    async updateScheduleVehicle(item, input) {
      try {
        let value = await this.$swal({
          title: "Confirm Assign Vehicle ?",
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "Cancel",
          showCloseButton: true,
        });
        if (value.isConfirmed) {
          let form = new FormData();
          form.append("plate_number", input);
          await ScheduleService.updateScheduleVehicle(item.id, form);
          this.getScheduleInProgressDetail();
          this.$swal({
            title: "Assign Vehicle Successfully",
            icon: "success",
            timer: 1000,
            showConfirmButton: false,
            showCancelButton: false,
          });
        }
        else{
          this.getScheduleInProgressDetail();
        }
      } catch (err) {
        console.log(err);
        this.$swal({
          title: "Assign Vehicle Fail, Please try again",
          icon: "error",
          timer: 1000,
          showConfirmButton: false,
          showCancelButton: false,
        });
      }
    },
    async updateScheduleDriver(item, input) {
      try {
        let value = await this.$swal({
          title: "Confirm Assign Driver ?",
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "Cancel",
          showCloseButton: true,
        });
        if (value.isConfirmed) {
          let form = new FormData();
          form.append("driver_id", input);
          await ScheduleService.updateScheduleDriver(item.id, form);
          this.getScheduleInProgressDetail();
          this.$swal({
            title: "Assign Driver Successfully",
            icon: "success",
            timer: 1000,
            showConfirmButton: false,
            showCancelButton: false,
          });
        }
        else{
          this.getScheduleInProgressDetail();
        }
      } catch (err) {
        console.log(err);
        this.$swal({
          title: "Assign Driver Fail, Please try again",
          icon: "error",
          timer: 1000,
          showConfirmButton: false,
          showCancelButton: false,
        });
      }
    },
    async getScheduleInProgressDetail() {
      try {
        let result = await ScheduleService.getScheduleInProgressDetail();
        this.schedule = [];
        for (let item of result.data) {
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
            pickup_at: this.getFullTime(item.pickup_datetime),
            customer_name: item.customer_name,
          };
          this.schedule.push(obj);
        }
      } catch (err) {
        console.log(err);
      }
    },
    async getScheduleCompletedDetail() {
      try {
        let result = await ScheduleService.getScheduleCompletedDetail();
        this.completed_schedule = [];
        for (let item of result.data) {
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
            pickup_at: this.getFullTime(item.pickup_datetime),
            customer_name: item.customer_name,
            arrived_at: this.getFullTime(item.arrived_datetime),
          };
          this.completed_schedule.push(obj);
        }
      } catch (err) {
        console.log(err);
      }
    },
    async getAllVehicleByManagerId() {
      try {
        let result = await VehicleService.getAllVehicleByManagerId();
        for (let item of result.data) {
          if (item.status == "available") {
            this.vehicleList.push({
              text: item.plate_number,
              value: item.plate_number,
            });
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
    async getAllDriver() {
      try {
        let result = await ScheduleService.getAllDriver();
        for (let item of result.data) {
          this.driverList.push({
            text: item.name,
            value: item.id,
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {
    this.getScheduleInProgressDetail();
    this.getScheduleCompletedDetail();
    this.getAllVehicleByManagerId();
    this.getAllDriver();
  },
};
</script>
<style></style>
