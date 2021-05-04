<template>
  <div>
    <v-row>
      <v-col
        lg="4"
        cols="sm"
        class="pb-2"
        v-for="(item, index) in status_count"
        :key="index"
      >
        <v-card>
          <v-row class="no-gutters">
            <v-col cols="auto">
              <div
                class="fill-height"
                :style="{ backgroundColor: randomColor() }"
              >
                {{ "\xa0" }}
              </div>
            </v-col>
            <div class="col pa-3 py-4" :style="{ color: randomColor() }">
              <h5 class="text-truncate text-uppercase">{{ item.status }}</h5>
              <h1>{{ item.status_count }}</h1>
            </div>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col lg="4" cols="md" class="pb-2">
        <v-card>
          <v-card-title class="blue--text">
            Pending
          </v-card-title>
          <v-card-text>
            <v-carousel
              cycle
              height="180"
              interval="3000"
              hide-delimiter-background
              show-arrows-on-hover
            >
              <v-carousel-item v-for="item in pending_order" :key="item.id">
                <v-row class="no-gutters">
                  <v-col>
                    <div class="black--text">
                      <h2 class="cyan--text text-truncate title mb-0">{{item.document.match(/`.+`/)[0].replaceAll("`", "")}}</h2>
                      <h2 class="mt-5 black--text overline red--text lighten-2">
                        Create At: {{getTime(item.req_created_at)}}
                      </h2>
                      <h2 class="mt-5 black--text overline purple--text lighten-2">
                        Modify At: {{getTime(item.req_modified_at)}}
                      </h2>
                    </div>
                  </v-col>
                </v-row>
              </v-carousel-item>
            </v-carousel>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col lg="4" cols="md" class="pb-2">
        <v-card>
          <v-card-title class="pink--text lighten-2">
            In Progress
          </v-card-title>
          <v-card-text>
            <v-carousel
              cycle
              height="180"
              interval="3000"
              hide-delimiter-background
              show-arrows-on-hover
            >
              <v-carousel-item v-for="item in in_progress_order" :key="item.id">
                <v-row class="no-gutters">
                  <v-col>
                    <div class="black--text">
                      <h2 class="purple--text text-truncate title mb-0 lighten-2">Company Name: {{item.company_name}}</h2>
                      <h2 class="mt-1 overline dark--text lighten-2 text-truncate">
                        Pickup Address: {{item.pickup_address}}
                      </h2>
                      <h2 class="mt-1 overline dark--text lighten-2 text-truncate">
                        Receiver Address: {{item.receiver_address}}
                      </h2>
                      <h2 class="mt-1 overline dark--text lighten-2">
                        Pickup At: {{getTime(item.pickup_datetime)}}
                      </h2>
                    </div>
                  </v-col>
                </v-row>
              </v-carousel-item>
            </v-carousel>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col lg="4" cols="md" class="pb-2">
        <v-card>
          <v-card-title class="green--text lighten-2">
            Completed
          </v-card-title>
          <v-card-text>
            <v-carousel
              cycle
              height="180"
              interval="3000"
              hide-delimiter-background
              show-arrows-on-hover
            >
              <v-carousel-item v-for="item in completed_order" :key="item.id">
                <v-row class="no-gutters">
                  <v-col>
                    <div class="black--text">
                      <h2 class="teal--text text-truncate title mb-0">Company Name: {{item.company_name}}</h2>
                      <h2 class="mt-1 overline orange--text lighten-1">
                        Pickup At: {{getTime(item.pickup_datetime)}}
                      </h2>
                      <h2 class="mt-1 overline orange--text lighten-1 text-truncate">
                        Arrived At: {{getTime(item.arrived_datetime)}}
                      </h2>
                      <h2 class="mt-1 overline orange--text lighten-1 text-truncate">
                        Pickup Address: {{item.pickup_address}}
                      </h2>
                      <h2 class="mt-1 overline orange--text lighten-1 text-truncate">
                        Receiver Address: {{item.receiver_address}}
                      </h2>
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
            :value="value"
            padding="18"
            label-size="4"
            color="cyan"
            :gradient="gradients"
            :line-width="2"
            :stroke-linecap="'round'"
            :smooth="10"
            :labels="value"
            gradient-direction="top"
            :fill="false"
            type="trend"
            auto-draw
            :auto-draw-duration="5000"
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
  name: "CustomerDashboard",
  data: () => ({
    status_count: [],
    pending_order: [],
    in_progress_order: [],
    completed_order: [],
    labels:[],
    value:[],
    gradients:['#f72047', '#ffd200', '#1feaea', '#00c6ff', '#F0F', '#FF0'],
  }),
  methods: {
    async getDashboard() {
      try {
        let result = await DashboardService.getCustomerAndOperator();
        this.status_count.push(result.data.status_count[0])
        this.status_count.push(result.data.status_count[2])
        this.status_count.push(result.data.status_count[1])
        this.addOrders(result.data.request_detail);
        this.plotGraph(result.data.request_detail)
        console.log(result);
      } catch (err) {
        console.log(err);
      }
    },
    randomColor() {
      const r = () => Math.floor(256 * Math.random() - 50);
      return `rgb(${r()}, ${r()}, ${r()})`;
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
          this.labels.push(this.getTime(item.pickup_datetime))
          this.value.push(Math.ceil(Math.abs(new Date(item.pickup_datetime) - new Date(item.arrived_datetime))/(1000*60*60)))
        }
      }
    },
    addOrders(list) {
      for (let item of list) {
        if (item.status == "pending" && this.pending_order.length != 5) {
          this.pending_order.push(item);
        }
        if (item.status == "completed" && this.completed_order.length != 5) {
          this.completed_order.push(item);
        }
        if (item.status == "in progress" && this.in_progress_order.length != 5) {
          this.in_progress_order.push(item);
        }
      }
    },
  },
  mounted() {
    this.getDashboard();
  },
};
</script>
