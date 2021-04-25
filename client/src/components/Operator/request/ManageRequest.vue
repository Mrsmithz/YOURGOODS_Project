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
              <v-toolbar-title>Requested</v-toolbar-title>
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
            <div class="text-truncate" style="max-width:20em">
              <v-icon class="ml-1" @click="openDocument(item)"
              >mdi-file-document-outline</v-icon
              >
              {{ item.document }}
            </div>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn small class="mr-2" color="primary" @click="showContactModal">
              CHAT
            </v-btn>
            <v-btn small class="mr-2" color="primary" @click="editItem(item)">
              CONFIRM
            </v-btn>
          </template>
          <template v-slot:[`item.order`]="{ item }">
            <v-btn
              small
              class="mr-2"
              color="primary"
              v-if="item.order_id"
              @click="showManageOrder(item.order_id)"
            >
              View
            </v-btn>
            <v-btn
              small
              class="mr-2"
              color="primary"
              v-if="!item.order_id"
              @click="showCreateOrder(item.id)"
            >
              Create
            </v-btn>
          </template>
          <template v-slot:[`item.schedule`]="{ item }">
            <v-btn
              small
              class="mr-2"
              color="primary"
              @click="showManageSchedule(item.id)"
            >
              View
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import OperatorService from "../../../services/OperatorService";
export default {
  name: "ManageRequest",
  methods: {
    showManageOrder(order_id) {
      this.$store.commit("setTempOrderId", order_id);
      this.$store.commit("showOperatorManagePage", "ManageOrder");
    },
    showCreateOrder(request_id) {
      this.$store.commit("setTempRequestId", request_id);
      this.$store.commit("showOperatorManagePage", "ManageOrder");
    },
    showManageSchedule(order_id) {
      this.$store.commit("setTempOrderId", order_id);
      this.$store.commit("showOperatorManagePage", "ManageSchedule");
    },
    showContactModal() {
      this.$store.commit("showContactModal");
    },
    getFullTime(time) {
      var date = new Date(time);
      date.setTime(date.getTime() + 7 * 60 * 60 * 1000);
      return `${
        date.toISOString().match(/\d+:\d+:\d+/)[0]
      } ${date.toDateString()}`;
    },
    openDocument(item) {
      window.open(item.file_url);
    },
    async getAllRequest() {
      try {
        let result = await OperatorService.getRequestByOperatorId();
        let data = result.data
        console.log(data)
        this.request = []
        for (let item of data) {
          var obj = {
            id: item.id,
            document: item.document.match(/`.+`/)[0].replaceAll("`", ""),
            customer_name: item.customer_name,
            status: item.status,
            created_at: this.getFullTime(item.created_datetime),
            modified_at: this.getFullTime(item.modified_datetime),
            operator_id: item.operator_id,
            file_url: `http://localhost:25800/${item.document}`,
            //message_count: this.countMessage(item.operator_id),
            order_id:item.order_id
          };
          this.request.push(obj);
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  async mounted() {
    this.getAllRequest()
  },
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
      { text: "Order", value: "order", align: "center" },
      { text: "Schedule", value: "schedule", align: "center" },
      { text: "Created At", value: "created_at" },
      { text: "Modified At", value: "modified_at" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    request: [
      {
        id: 1,
        customer_name: "John Smith",
        document: "Yogurt.pdf",
        status: "pending",
        created_at: new Date().toDateString(),
        modified_at: new Date().toDateString(),
      },
    ],
  }),
};
</script>
