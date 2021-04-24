<template>
  <div>
    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="request"
          :items-per-page="5"
          :search="search"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Orders History</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-toolbar>
          </template>
          <template v-slot:[`item.schedule`]="{ item }">
            <v-btn class="mr-2" color="primary" @click="showManageSchedule(item.id)">
              View
            </v-btn>
          </template>
          <template v-slot:[`item.detail`]="{ item }">
            <v-btn class="mr-2" color="primary" @click="showManageOrder(item.id)">
              View
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  name: "OrderHistory",
  methods:{
    showManageOrder(order_id) {
      this.$store.commit("setTempRequestId", order_id);
      this.$store.commit("showOperatorManagePage", "ManageOrder");
    },
    showManageSchedule(order_id) {
      this.$store.commit("setTempOrderId", order_id);
      this.$store.commit("showOperatorManagePage", "ManageSchedule");
    },
  },
  data: () => ({
    search: "",
    headers: [
      {
        text: "Company Name",
        align: "start",
        value: "company_name",
      },
      { text: "Pickup Address", value: "pickup_address" },
      { text: "Receiver Address", value: "receiver_address" },
      { text: "Status", value: "status" },
      { text: "Detail", value: "detail" },
      { text: "Schedule", value: "schedule" },
      { text: "Created At", value: "created_at" },
      { text: "Modified At", value: "modified_at" },
    ],
    request: [
      {
        id:1,
        company_name:'NongGen ExpressJS',
        pickup_address:'132/1333 asdsa',
        receiver_address:'555/55 asd1sa23d',
        status:'completed',
        created_at: new Date().toDateString(),
        modified_at: new Date().toDateString(),
      },
    ],
  }),
};
</script>
