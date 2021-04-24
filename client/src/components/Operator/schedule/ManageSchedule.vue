<template>
  <v-dialog v-model="ManageScheduleState" max-width="50%" @click:outside="showManageSchedule">
    <v-card>
      <v-card-title>
        <span class="headline">Schedule Detail</span>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <v-text-field label="Pickup At"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="Arrived At"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field label="Driver"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="Vehicle Plate Number"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field label="Transport"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="Shipping"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-btn>TEST</v-btn>
            </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: "ManageSchedule",
  beforeUpdate(){
    console.log(this.TempOrderIdState)
  },
  methods: {
    showManageSchedule() {
      this.$store.commit("showOperatorManagePage", "ManageSchedule");
    },
  },
  computed: {
    ManageScheduleState: {
      get: function() {
        return this.$store.getters.getOperatorManage.ManageSchedule;
      },
      set: function(newValue) {
        return newValue;
      },
    },
    TempOrderIdState: {
      get: function() {
        return this.$store.getters.getTempOrderId;
      },
      set: function(newValue) {
        return newValue;
      },
    },
  },
};
</script>
