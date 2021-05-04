<template>
  <v-card flat>
    <v-card-title><span class="title">Feedback </span></v-card-title>
    <v-card-text>
      <v-timeline align-top :dense="$vuetify.breakpoint.smAndDown">
        <v-timeline-item
          v-for="(item, index) in items"
          :key="index"
          fill-dot
          icon="mdi-star"
        >
          <v-card
            :color="index % 2 == 0 ? 'purple lighten-1' : 'cyan lighten-1'"
            dark
          >
            <v-card-title class="title">
              {{ item.created_datetime }}
            </v-card-title>
            <v-card-text class="white text--primary py-4">
                {{ item.comment }}
            </v-card-text>
          </v-card>
        </v-timeline-item>
      </v-timeline>
    </v-card-text>
  </v-card>
</template>
<script>
import StaffService from "../../../services/StaffServices";
export default {
  name: "Feedback",
  data: () => ({
    items: [],
  }),
  methods: {
    async getLatestFeedback() {
      try {
        let result = await StaffService.getLatestFeedback();
        for (let item of result.data) {
          item.created_datetime = this.getTime(item.created_datetime);
        }
        this.items = result.data;
      } catch (err) {
        console.log(err);
      }
    },
    getTime(time) {
      let year = time.match(/.+(?=T)/)[0].split("-");
      let time_result = time.match(/\d+:\d+/)[0];
      let result = `${time_result} ${year[2]}/${year[1]}/${year[0]}`;
      return result;
    },
  },
  mounted() {
    this.getLatestFeedback();
  },
};
</script>
