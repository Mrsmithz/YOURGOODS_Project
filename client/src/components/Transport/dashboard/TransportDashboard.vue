<template>
  <div>
    <v-row>
      <v-col lg="6" cols="sm" class="pb-2">
        <v-card>
          <v-row class="no-gutters">
            <v-col cols="auto">
              <div class="primary fill-height">{{ "\xa0" }}</div>
            </v-col>
            <div class="col pa-3 py-4 primary--text">
              <h5 class="text-truncate text-uppercase">In Progress</h5>
              <h1 class="mt-1">{{ in_progress_count ? in_progress_count.status_count : 0 }}</h1>
            </div>
          </v-row>
        </v-card>
      </v-col>
      <v-col lg="6" cols="sm" class="pb-2">
        <v-card>
          <v-row class="no-gutters">
            <v-col cols="auto">
              <div class="success fill-height">{{ "\xa0" }}</div>
            </v-col>
            <div class="col pa-3 py-4 success--text">
              <h5 class="text-truncate text-uppercase">Completed</h5>
              <h1 class="mt-1">{{ completed_count ? completed_count.status_count : 0 }}</h1>
            </div>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col lg="6" cols="md" class="pb-2">
        <v-card>
          <v-card-title class="pink--text darken-3">
            IN PROGRESS
          </v-card-title>
          <v-card-text>
            <v-carousel
              cycle
              height="180"
              interval="3000"
              hide-delimiter-background
              show-arrows-on-hover
            >
              <v-carousel-item
                v-for="item in in_progress_orders"
                :key="item.id"
              >
                <v-row class="no-gutters">
                  <v-col>
                    <div>
                      <h2 class="blue--text text-truncate overline darken-3">Company Name: {{item.company_name}}</h2>
                      <h2 class="mt-3 blue--text text-truncate overline darken-3">Pickup Address: {{item.pickup_address}}</h2>
                      <h2 class="mt-3 blue--text text-truncate overline darken-3">Receiver Address: {{item.pickup_address}}</h2>
                      <h2 class="mt-3 blue--text text-truncate overline darken-3">Vehicle: {{item.plate_number}}</h2>
                    </div>
                  </v-col>
                </v-row>
              </v-carousel-item>
            </v-carousel>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col lg="6" cols="md" class="pb-2">
        <v-card>
          <v-card-title class="teal--text">
            COMPLETED
          </v-card-title>
          <v-card-text>
            <v-carousel
              cycle
              height="180"
              interval="5000"
              hide-delimiter-background
              show-arrows-on-hover
            >
              <v-carousel-item
                v-for="item in completed_orders"
                :key="item.id"
              >
                <v-row class="no-gutters">
                  <v-col>
                    <div>
                      <h2 class="indigo--text text-truncate overline darken-3">Company Name: {{item.company_name}}</h2>
                      <h2 class="mt-3 indigo--text text-truncate overline darken-3">Arrived At: {{getTime(item.arrived_datetime)}}</h2>
                      <h2 class="mt-3 indigo--text text-truncate overline darken-3">Pickup At: {{getTime(item.pickup_datetime)}}</h2>
                      <h2 class="mt-3 indigo--text text-truncate overline darken-3">Vehicle: {{item.plate_number}}</h2>
                    </div>
                  </v-col>
                </v-row>
              </v-carousel-item>
            </v-carousel>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card class="mx-auto text-center">
          <v-card-title class="primary--text">
            Time To Completed Last 10 Orders
          </v-card-title>
          <v-sparkline
            padding="18"
            label-size="4"
            color="cyan"
            :gradient="['pink', 'cyan', 'orange', 'red', 'indigo']"
            :line-width="2"
            :stroke-linecap="'round'"
            :labels="value"
            :value="value"
            auto-draw
            :auto-draw-duration="5000"
            smooth
          >
            <template v-slot:label="item"> {{ item.value }} Hrs </template>
          </v-sparkline>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import DashboardService from "../../../services/DashboardService";
export default {
  name: "TransportDashboard",
  data: () => ({
    in_progress_count: null,
    completed_count: null,
    in_progress_orders: [],
    completed_orders: [],
    value:[],
    labels:[]
  }),
  methods: {
    async getStaffDashboard() {
      try {
        let result = await DashboardService.getStaffDashboard();
        this.addStatusCount(result.data.order_status_count);
        this.addOrdersDetail(result.data.order_details);
        this.plotGraph(result.data.order_details)
      } catch (err) {
        console.log(err.response);
      }
    },
    sortByPickupDateTime(a, b){
      return new Date(a.pickup_datetime) - new Date(b.pickup_datetime)
    },
    plotGraph(list){
      let data = list.filter(el => {
        return el.arrived_datetime && el.pickup_datetime
      })
      data.sort(this.sortByPickupDateTime)
      let count = 0
      for (let item of data){
        if (count == 10){
          break
        }
        else{
          count++;
          this.labels.push(this.getTime(item.pickup_datetime))
          this.value.push(Math.ceil(Math.abs(new Date(item.pickup_datetime) - new Date(item.arrived_datetime))/(1000*60*60)))
        }
      }
    },
    getTime(input) {
      var date = new Date(input);
      date.setTime(date.getTime() + 7 * 60 * 60 * 1000);
      var time = date.toISOString()
      let year = time.match(/.+(?=T)/)[0].split("-");
      let time_result = time.match(/\d+:\d+/)[0];
      let result = `${time_result} ${year[2]}/${year[1]}/${year[0]}`;
      return result;
    },
    addOrdersDetail(list) {
      for (let item of list) {
        if (item.status == "completed" && this.completed_orders.length != 5) {
          this.completed_orders.push(item);
        } else if (
          item.status == "in progress" &&
          this.in_progress_orders.length != 5
        ) {
          this.in_progress_orders.push(item);
        }
      }
    },
    addStatusCount(list) {
      for (let item of list) {
        if (item.status == "completed") {
          this.completed_count = item;
        } else if (item.status == "in progress") {
          this.in_progress_count = item;
        }
      }
    },
  },
  mounted() {
    this.getStaffDashboard();
  },
};
</script>
