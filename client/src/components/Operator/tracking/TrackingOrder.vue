<template>
  <div>
    <v-row>
      <v-col>
        <v-card flat>
          <v-card-title>
            <span class="headline">Tracking Order</span>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="4">
                <v-text-field
                  label="Enter Order ID"
                  v-model="search"
                  @keyup="getLocationByOrderId"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-slide-x-reverse-transition>
            <v-row v-if="locations.length > 0">
              <v-col>
                <v-card-text class="mt-3">
                  <v-timeline>
                    <v-slide-x-reverse-transition group hide-on-leave>
                      <v-timeline-item
                        small
                        fill-dot
                        v-for="(item, index) in locations"
                        :key="index"
                        icon="mdi-star"
                      >
                        <v-card
                          :color="
                            index % 2 == 0
                              ? 'purple lighten-1'
                              : 'cyan lighten-1'
                          "
                          dark
                        >
                          <v-card-title>{{
                            getTime(item.created_datetime)
                          }}</v-card-title>
                          <v-card-text class="white text--primary py-4"
                            ><h2>{{ item.location }}</h2></v-card-text
                          >
                        </v-card>
                      </v-timeline-item>
                    </v-slide-x-reverse-transition>
                  </v-timeline>
                </v-card-text>
              </v-col>
            </v-row>
            <v-row v-else-if="search.length > 0 && locations.length < 1">
              <v-col>
                <h2 class="title">Not Found</h2>
              </v-col>
            </v-row>
            </v-slide-x-reverse-transition>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import LocationService from '../../../services/LocationService'
export default {
  name: "TrackingOrder",
  data: () => ({
    search: "",
    locations: [],
  }),
  methods: {
    getTime(time) {
      let year = time.match(/.+(?=T)/)[0].split("-");
      let time_result = time.match(/\d+:\d+/)[0];
      let result = `${time_result} ${year[2]}/${year[1]}/${year[0]}`;
      return result;
    },
    async getLocationByOrderId() {
      try {
        let result = await LocationService.getLocationByOrderId(
          this.search
        );
        this.locations = [];
        for (let item of result.data) {
          this.locations.push(item);
        }
        console.log(this.locations);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
