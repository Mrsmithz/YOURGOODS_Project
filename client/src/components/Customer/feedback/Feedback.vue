<template>
  <v-card class="feedbackCard">
    <v-row>
      <v-col>
        <v-card-title>Feedback</v-card-title>
        <v-card-text>
            <v-textarea clearable counter no-resize auto-grow label="Comment">
            </v-textarea>
        </v-card-text>
        <v-card-actions>
      <v-btn color="success" class="ml-3">
        Submit
      </v-btn>
    </v-card-actions>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
export default {
  name: "Feedback",
  data: () => ({
      tab:true
  })
};
</script>
<style>
.commentArea{
    height:10rem;
    overflow-y:auto;
    overflow-x:hidden;
}
.feedbackCard{
    max-height: 100%;
    min-height: 20rem;
}
</style>
