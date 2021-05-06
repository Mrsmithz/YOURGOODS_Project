<template>
  <div>
    <v-row>
      <v-col lg="4" cols="auto" class="pb-2">
        <v-card>
          <v-row class="no-gutters">
            <v-col cols="auto">
              <div class="cyan fill-height">{{ "\xa0" }}</div>
            </v-col>
            <div class="col pa-3 py-4 cyan--text">
              <h5 class="text-truncate text-uppercase">Pending</h5>
              <h1>{{ pending_orders ? pending_orders.status_count : 0 }}</h1>
            </div>
          </v-row>
        </v-card>
      </v-col>
      <v-col lg="4" cols="sm" class="pb-2">
        <v-card>
          <v-row class="no-gutters">
            <v-col cols="auto">
              <div class="primary fill-height">{{ "\xa0" }}</div>
            </v-col>
            <div class="col pa-3 py-4 primary--text">
              <h5 class="text-truncate text-uppercase">In Progress</h5>
              <h1>{{ in_progress_orders ? in_progress_orders.status_count : 0 }}</h1>
            </div>
          </v-row>
        </v-card>
      </v-col>
      <v-col lg="4" cols="sm" class="pb-2">
        <v-card>
          <v-row class="no-gutters">
            <v-col cols="auto">
              <div class="success fill-height">{{ "\xa0" }}</div>
            </v-col>
            <div class="col pa-3 py-4 success--text">
              <h5 class="text-truncate text-uppercase">Completed</h5>
              <h1>{{ completed_orders ? completed_orders.status_count : 0 }}</h1>
            </div>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col lg="6" cols="md" class="pb-2">
        <v-card>
          <v-card-title class="light-blue--text">
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
              <v-carousel-item v-for="item in in_progress_orders_details" :key="item.id">
                <v-row class="no-gutters">
                  <v-col>
                    <div>
                      <h2 class="green--text text-truncate overline accent-4">Company Name: {{item.company_name}}</h2>
                      <h2 class="green--text text-truncate overline accent-4">Receiver Address: {{item.receiver_address}}</h2>
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
          <v-card-title class="deep-orange--text">
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
              <v-carousel-item v-for="item in completed_orders_details" :key="item.id">
                <v-row class="no-gutters">
                  <v-col>
                    <div>
                      <h2 class="teal--text text-truncate overline darken-4">Company Name: {{item.company_name}}</h2>
                      <h2 class="teal--text text-truncate overline darken-4">Arrived At: {{getTime(item.arrived_datetime)}}</h2>
                      <h2 class="teal--text text-truncate overline darken-4">Receiver Address: {{item.receiver_address}}</h2>
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
            Orders Status GRAPH
          </v-card-title>
          <v-sparkline
            padding="18"
            label-size="4"
            color="cyan"
            :gradient="['red','cyan', 'orange', 'amber', ]"
            :line-width="2"
            :stroke-linecap="'round'"
            :labels="labels"
            :value="value"
            auto-draw
            auto-draw-duration="5000"
            smooth
          >
            <template v-slot:label="item"> {{ item.value }} </template>
          </v-sparkline>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import DashboardService from "../../../services/DashboardService";
export default {
  name: "SupervisorDashboard",
  data: () => ({
    pending_orders: {},
    in_progress_orders: {},
    completed_orders: {},
    completed_orders_details: [],
    in_progress_orders_details: [],
    labels:[],
    value:[]
  }),
  methods: {
    async getDashboard() {
      try {
        let result = await DashboardService.getSupervisorDashboard();
        this.addStatusCount(result.data.status_count);
        this.addOrderDetails(result.data.order_details);
        this.plotGraph(result.data.status_count)
      } catch (err) {
        console.log(err);
      }
    },
    plotGraph(list){
        for(let item of list){
            this.labels.push(item.status)
            this.value.push(item.status_count)
        }
    },
    getTime(input) {
      var date = new Date(input);
      date.setTime(date.getTime() + 7 * 60 * 60 * 1000);
      var time = date.toISOString();
      let year = time.match(/.+(?=T)/)[0].split("-");
      let time_result = time.match(/\d+:\d+/)[0];
      let result = `${time_result} ${year[2]}/${year[1]}/${year[0]}`;
      return result;
    },
    addStatusCount(list) {
      for (let item of list) {
        if (item.status == "completed") {
          this.completed_orders = item;
        } else if (item.status == "in progress") {
          this.in_progress_orders = item;
        } else if (item.status == "pending") {
          this.pending_orders = item;
        }
      }
    },
    addOrderDetails(list) {
      for (let item of list) {
        if (
          item.status == "completed" &&
          this.completed_orders_details.length != 5
        ) {
          this.completed_orders_details.push(item);
        } else if (
          item.status == "in progress" &&
          this.in_progress_orders_details.length != 5
        ) {
          this.in_progress_orders_details.push(item);
        }
      }
    },
  },
  mounted() {
    this.getDashboard();
  },
};
</script>
