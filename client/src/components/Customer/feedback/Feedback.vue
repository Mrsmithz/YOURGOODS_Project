<template>
  <v-card class="feedbackCard">
    <v-row>
      <v-col>
        <v-card-title>Feedback</v-card-title>
        <v-form ref="feedback_form">
          <v-card-text>
            <v-textarea
              clearable
              counter
              no-resize
              auto-grow
              label="Comment"
              v-model="comment"
              :rules="requiredRules"
            >
            </v-textarea>
          </v-card-text>
        </v-form>
        <v-card-actions>
          <v-btn color="success" class="ml-3" @click="createFeedback">
            Submit
          </v-btn>
        </v-card-actions>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import CustomerService from "../../../services/CustomerService";
export default {
  name: "Feedback",
  data: () => ({
    tab: true,
    comment: "",
    requiredRules: [(v) => !!v || "This field is required"],
  }),
  methods: {
    async createFeedback() {
      if (this.$refs.feedback_form.validate()) {
        try {
          let form = new FormData();
          form.append("comment", this.comment);
          let result = await CustomerService.createFeedback(form);
          console.log(result);
          this.$refs.feedback_form.reset();
        } catch (err) {
          console.log(err);
        }
      }
    },
  },
};
</script>
<style>
.commentArea {
  height: 10rem;
  overflow-y: auto;
  overflow-x: hidden;
}
.feedbackCard {
  max-height: 100%;
  min-height: 20rem;
}
</style>
