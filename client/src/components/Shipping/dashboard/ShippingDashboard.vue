<template>
  <div>
    <v-row>
      <v-col lg="4" cols="sm" class="pb-2">
        <v-card>
          <v-row class="no-gutters">
            <v-col cols="auto">
              <div class="cyan fill-height">{{ "\xa0" }}</div>
            </v-col>
            <div class="col pa-3 py-4 cyan--text">
              <h5 class="text-truncate text-uppercase">Pending</h5>
              <h1>53</h1>
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
              <h1>23%</h1>
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
              <h1>213</h1>
            </div>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col lg="4" cols="md" class="pb-2">
        <v-card>
          <v-card-title>
            Pending
          </v-card-title>
          <v-card-text>
            <v-carousel
              cycle
              height="180"
              interval="2000"
              hide-delimiter-background
              show-arrows-on-hover
            >
              <v-carousel-item>
                <v-row class="no-gutters">
                  <v-col>
                    <div class="black--text">
                      <h2 class="cyan--text">Randy Sheets</h2>
                      <p class="mt-1">Tutankum, WI 33192</p>
                      <h3 class="mb-0">
                        $217.00
                        <i
                          class="mdi mdi-36px mdi-credit-card-outline float-right"
                        ></i>
                      </h3>
                      <p>Total items: 5</p>
                    </div>
                  </v-col>
                </v-row>
              </v-carousel-item>
            </v-carousel>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col lg="4" cols="md" class="pb-2">
        <v-card min-height="252">
          <v-card-title class="font-weight-light text-truncate primary--text">
            In Progress
          </v-card-title>
          <v-card-text>
            <p class="primary--text subtitle-1">
              Results from last campaign
            </p>
            <div class="my-5">
              <v-progress-linear
                indeterminate
                height="8"
                color="success"
              ></v-progress-linear>
              <h6>SINCE JAN 2020</h6>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn outlined rounded color="primary">
              Details
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col lg="4" cols="md" class="pb-2">
        <v-card min-height="252">
          <v-card-title class="font-weight-light text-truncate success--text">
            Completed
          </v-card-title>
          <v-card-text>
            <span class="success--text subtitle-1">
              Judy Pincus
            </span>
            <div class="mb-3">
              @jpincus
              <h3>Service Manager</h3>
              <span class="overline">Start date: 5/12/2020</span>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn outlined rounded color="success">
              View
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card class="mx-auto text-center">
          <v-card-title class="primary--text">
            GRAPH
          </v-card-title>
          <v-sparkline
            :value="sparklineData"
            padding="18"
            label-size="4"
            color="cyan"
            :gradient="['#007bff', 'cyan']"
            :line-width="2"
            :stroke-linecap="'round'"
            smooth
          >
            <template v-slot:label="item"> ${{ item.value }} </template>
          </v-sparkline>
          <v-card-actions class="py-4 justify-center">
            <v-btn color="primary">View Report</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  name: "ShippingDashboard",
  data: () => ({
      sparklineData: [
        423,
        446,
        675,
        510,
        590,
        610,
        423,
      ],
  })
};
</script>
