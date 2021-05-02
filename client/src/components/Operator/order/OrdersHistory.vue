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
          <template v-slot:[`item.document`]="{ item }">
            <div class="text-truncate" style="max-width:15em">
              <v-icon class="ml-1" @click="openDocument(item)"
                >mdi-file-document-outline</v-icon
              >
              {{ item.document }}
            </div>
          </template>
          <template v-slot:[`item.schedule`]="{ item }">
            <v-btn class="mr-2" color="primary" @click="showManageSchedule(item)">
              View
            </v-btn>
          </template>
          <template v-slot:[`item.detail`]="{ item }">
            <v-btn class="mr-2" color="primary" @click="showManageOrder(item)">
              View
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import OperatorService from '../../../services/OperatorService'
export default {
  name: "OrderHistory",
  data: () => ({
    search: "",
    headers: [
      {
        text: "Customer Name",
        align: "start",
        value: "customer_name",
      },
      { text: "Document", value: "document" },
      { text: "Status", value: "status" },
      { text: "Detail", value: "detail" },
      { text: "Schedule", value: "schedule" },
      { text: "Created At", value: "created_at" },
      { text: "Modified At", value: "modified_at" },
    ],
    request: [],
  }),
  mounted(){
    this.getAllRequest()
  },
  computed:{
    
  },
  methods:{
    showManageOrder(item) {
      this.$store.commit("setTempOrderId", item.order_id);
      this.$store.commit('setOrdersHistoryMode', true)
      this.$store.commit("showOperatorManagePage", "ManageOrder");
    },
    showManageSchedule(item) {
      this.$store.commit('setTempScheduleId', item.schedule_id)
      this.$store.commit('setOrdersHistoryMode', true)
      this.$store.commit("showOperatorManagePage", "ManageSchedule");
    },
    getFullTime(time) {
      var date = new Date(time);
      date.setTime(date.getTime() + 7 * 60 * 60 * 1000);
      return `${
        date.toISOString().match(/\d+:\d+:\d+/)[0]
      } ${date.toDateString()}`;
    },
    async getAllRequest() {
      try {
        let result = await OperatorService.getRequestByOperatorId();
        let data = result.data;
        this.request = [];
        for (let item of data) {
          if (item.status == 'completed'){
            var obj = {
            id: item.id,
            document: item.document.match(/`.+`/)[0].replaceAll("`", ""),
            customer_name: item.customer_name,
            status: item.status.toUpperCase(),
            created_at: this.getFullTime(item.created_datetime),
            modified_at: this.getFullTime(item.modified_datetime),
            operator_id: item.operator_id,
            file_url: `http://localhost:25800/${item.document}`,
            order_id: item.order_id,
            customer_id: item.customer_id,
            schedule_id:item.schedule_id
          };
          this.request.push(obj);
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
