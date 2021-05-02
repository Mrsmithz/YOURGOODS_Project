<template>
  <v-dialog
    v-model="ManageScheduleState"
    max-width="50%"
    @click:outside="showManageSchedule"
  >
    <v-card>
      <v-card-title>
        <span class="headline">Schedule Detail</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="schedule_form">
        <v-row>
          <v-col>
            <v-card flat>
              <v-card-title>Pickup Time</v-card-title>
              <v-card-text>
                <v-row>
                  <v-col>
                    <v-menu
                      v-model="menuPickupTime"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      :disabled="!editMode && (TempScheduleIdState != null)"
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="pickupTime"
                          label="Pickup Time"
                          prepend-icon="mdi-clock-time-four-outline"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          :rules="timeRules"
                        ></v-text-field>
                      </template>
                      <v-time-picker
                        v-if="menuPickupTime"
                        v-model="pickupTime"
                        full-width
                        format="24hr"
                      ></v-time-picker>
                    </v-menu>
                  </v-col>
                  <v-col>
                    <v-menu
                      v-model="menuPickupDate"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      :disabled="!editMode && (TempScheduleIdState != null)"
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="pickupDate"
                          label="Pickup Date"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          :rules="timeRules"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-if="menuPickupDate"
                        full-width
                        v-model="pickupDate"
                        :show-current="true"
                        :min="getCurrentDate()"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field label="Arrived At" readonly v-model="arrived_datetime"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field label="Driver" readonly v-model="driver"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="Vehicle Plate Number" readonly v-model="plate_number"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field label="Transport" readonly v-model="transport"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="Shipping" readonly v-model="shipping"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn v-if="TempOrderIdState && !OrdersHistoryModeState" @click="createSchedule">Create</v-btn>
            <!-- <v-btn v-if="TempOrderIdState" class="ml-3">Reset</v-btn> -->
            <v-btn
              v-if="TempScheduleIdState && !editMode && !OrdersHistoryModeState"
              @click="editMode = true"
              >Edit</v-btn
            >
            <v-btn v-if="TempScheduleIdState && editMode">Save</v-btn>
            <v-btn v-if="OrdersHistoryModeState" @click="showManageSchedule">CLOSE</v-btn>
            <!-- <v-btn v-if="TempScheduleIdState && editMode" class="ml-3"
              >Reset</v-btn
            > -->
          </v-col>
        </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import ScheduleService from '../../../services/ScheduleService'
export default {
  name: "ManageSchedule",
  data: () => ({
    editMode: false,
    arrived_datetime:'',
    driver:'',
    plate_number:'',
    transport:'',
    shipping:'',
    menuPickupTime: false,
    menuPickupDate: false,
    pickupTime: "",
    pickupDate: "",
    timeRules: [
      (v) => !!v || "This Field is required",
    ],
  }),
  beforeUpdate() {},
  methods: {
    getCurrentDate() {
      let date = new Date()
      date.setTime(date.getTime() + 7 * 60 * 60 * 1000)
      return date.toISOString().match(/.+(?=T)/)[0]
    },
    getCurrentTime(){
      let date = new Date()
      date.setTime(date.getTime() + 7 * 60 * 60 * 1000)
      return `${date.toISOString().match(/\d+:\d+/)[0]}`;
    },
    checkDateTime(v){
      if (this.getCurrentTime() <= v && this.pickupTime == this.getCurrentDate()){
        return "Invalid"
      }
      else{
        return true
      }
    },
    getDate(date){
      return date.match(/.+(?=T)/)[0]
    },
    getTime(time){
      return time.match(/\d+:\d+/)[0]
    },
    showManageSchedule() {
      this.$store.commit("showOperatorManagePage", "ManageSchedule");
      this.$store.commit("setTempScheduleId", null);
      this.$store.commit("setTempOrderId", null);
      this.$store.commit('setOrdersHistoryMode', false)
      this.editMode = false
      this.$refs.schedule_form.reset()
    },
    createScheduleFormData() {
      let form = new FormData();
      form.append("pickup_datetime", `${this.pickupDate} ${this.pickupTime}`);
      form.append("order_id", this.TempOrderIdState);
      return form
    },
    async createSchedule() {
      try {
        if (this.$refs.schedule_form.validate()){
          let result = await ScheduleService.createSchedule(this.createScheduleFormData())
          this.$store.commit("setTempScheduleId", result.data[0].id);
          this.$store.commit("setTempOrderId", null);
          this.getSchedule()
          this.$root.$refs.ManageRequest.getAllRequest()
        }
      } catch (err) {
        console.log(err);
      }
    },
    async getSchedule() {
      try {
        let result = await ScheduleService.getScheduleById(this.TempScheduleIdState)
        let data = result.data[0]
        if (data.arrived_datetime){
          this.arrived_datetime = `${this.getTime(data.arrived_datetime)} ${this.getDate(data.arrived_datetime)}`
        }
        this.shipping = data.shipping_name
        this.transport = data.transport_name
        this.driver = data.driver_name
        this.plate_number = data.plate_number
        this.pickupTime = this.getTime(data.pickup_datetime)
        this.pickupDate = this.getDate(data.pickup_datetime)
      } catch (err) {
        console.log(err);
      }
    },
  },
  watch: {
    ManageScheduleState(visible) {
      if (visible && this.TempScheduleIdState){
        this.getSchedule()
      }
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
    TempScheduleIdState: {
      get: function() {
        return this.$store.getters.getTempScheduleId;
      },
      set: function(newValue) {
        return newValue;
      },
    },
    OrdersHistoryModeState: {
      get: function() {
        return this.$store.getters.getOrdersHistoryMode;
      },
      set: function(newValue) {
        return newValue;
      },
    },
  },
};
</script>
