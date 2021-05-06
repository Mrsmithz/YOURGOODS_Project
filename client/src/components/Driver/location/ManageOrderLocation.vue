<template>
  <v-dialog
    v-model="getLocationModal"
    max-width="50%"
    @click:outside="showLocationModal"
  >
    <v-card>
      <v-card-title class="primary white--text">
        <span>Location</span>
        <v-spacer></v-spacer>
        <v-btn outlined dark @click="showAdd = !showAdd">{{
          showAdd ? "HIDE" : "ADD"
        }}</v-btn>
      </v-card-title>
      <v-slide-y-reverse-transition>
        <v-card-text class="mt-3" v-if="showAdd">
          <v-row>
            <v-col>
              <v-form ref="location_form" @submit.prevent>
                <v-text-field
                  label="Location"
                  v-model="location"
                  :rules="requiredRules"
                  @keyup.enter="addLocation"
                ></v-text-field>
              </v-form>
              <v-btn outlined dark class="success mt-3" @click="addLocation"
                >SUBMIT</v-btn
              >
            </v-col>
          </v-row>
        </v-card-text>
      </v-slide-y-reverse-transition>
      <v-card-text class="mt-3">
        <v-row>
          <v-col>
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
                      index % 2 == 0 ? 'purple lighten-1' : 'cyan lighten-1'
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
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapGetters } from "vuex";
import LocationService from "../../../services/LocationService";
export default {
  name: "ManageOrderLocation",
  data: () => ({
    dialog: true,
    showAdd: false,
    location: "",
    requiredRules: [
        (v) => !!v || "This Field is required"
        ],
    locations: [],
  }),
  methods: {
    showLocationModal() {
      this.location = "";
      this.showAdd = false
      this.$store.commit("setTempDriverData", {});
      this.$store.commit("setLocationModal", false);
    },
    async addLocation() {
      if (this.$refs.location_form.validate()) {
        try {
          let form = new FormData();
          form.append("order_id", this.getTempDriverData.order_id);
          form.append("location", this.location);
          let result = await LocationService.addLocation(form);
          console.log(result);
          this.location = "";
          this.getLocationByOrderId();
        } catch (err) {
          console.log(err);
        }
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
    async getLocationByOrderId() {
      try {
        let result = await LocationService.getLocationByOrderId(
          this.getTempDriverData.order_id
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
  watch: {
    getLocationModal(visible) {
      if (visible) {
        this.getLocationByOrderId();
      }
    },
  },
  computed: {
    ...mapGetters(["getLocationModal", "getTempDriverData"]),
  },
};
</script>
