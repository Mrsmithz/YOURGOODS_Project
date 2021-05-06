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
          <template v-slot:[`item.status`]="{ item }">
            <v-col cols="auto">
              <v-select
                class="statusSelector"
                :items="getSelect(item.status)"
                v-model="item.status"
                item-value="value"
                item-text="text"
                :disabled="item.status == 'reject'"
                @input="updateRequestStatus($event, item.id)"
              ></v-select>
            </v-col>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-badge
              overlap
              :value="countMessage(item.operator_id)"
              :content="countMessage(item.operator_id)"
            >
              <v-btn
                small
                class="mr-2"
                color="success"
                @click="showContactModal(item)"
              >
                CHAT
              </v-btn>
            </v-badge>
            <!-- <v-btn small class="mr-2" color="primary" @click="editItem(item)">
              CONFIRM
            </v-btn> -->
          </template>
          <template v-slot:[`item.order`]="{ item }">
            <v-btn
              small
              class="mr-2"
              color="primary"
              v-if="item.order_id"
              @click="showManageOrder(item)"
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
              v-if="item.schedule_id"
              @click="showManageSchedule(item.schedule_id)"
            >
              View
            </v-btn>
            <v-btn
              small
              class="mr-2"
              color="primary"
              v-if="!item.schedule_id"
              @click="showCreateSchedule(item.order_id)"
            >
              Create
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-row> </v-row>
  </div>
</template>
<script>
import ContactsService from "../../../services/ContactsService";
import OperatorService from "../../../services/OperatorService";
import Socket from "../../../services/SocketIO";
export default {
  name: "ManageRequest",
  data: () => ({
    search: "",
    interval: "test",
    newMsg: [],
    select: [
      { text: "Pending", value: "pending" },
      { text: "Unconfirmed", value: "unconfirmed" },
      { text: "Reject", value: "reject", disabled: true },
    ],
    select2: [
      { text: "In Progress", value: "in progress" },
      { text: "Confirmed", value: "confirmed", disabled: true },
    ],
    statusList: [],
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
    request: [],
    unreadMessage: [],
  }),
  watch: {
    newMessage(message) {
      this.unreadMessage.push(message);
    },
    ManageOrderState(visible) {
      if (!visible) {
        this.getAllRequest();
      }
    },
  },
  computed: {
    newMessage() {
      Socket.on(`new-message-${this.UserState.id}`, (data) => {
        this.newMsg = data;
      });
      return this.newMsg;
    },
    ManageOrderState: {
      get: function() {
        return this.$store.getters.getOperatorManage.ManageOrder;
      },
      set: function(newValue) {
        return newValue;
      },
    },
    UserState: {
      get: function() {
        return this.$store.getters.getUser;
      },
      set: function(newValue) {
        return newValue;
      },
    },
  },
  methods: {
    getSelect(status) {
      if (
        status == "pending" ||
        status == "reject" ||
        status == "unconfirmed"
      ) {
        return this.select;
      } else if (
        status == "in progress" ||
        status == "completed" ||
        status == "confirmed"
      ) {
        return this.select2;
      }
    },
    showManageOrder(item) {
      this.$store.commit("setTempRequest", item.id);
      this.$store.commit("setTempOrderId", item.order_id);
      this.$store.commit("showOperatorManagePage", "ManageOrder");
    },
    showCreateOrder(request_id) {
      this.$store.commit("setTempRequestId", request_id);
      this.$store.commit("showOperatorManagePage", "ManageOrder");
    },
    showManageSchedule(schedule_id) {
      this.$store.commit("setTempScheduleId", schedule_id);
      this.$store.commit("showOperatorManagePage", "ManageSchedule");
    },
    showCreateSchedule(order_id) {
      this.$store.commit("setTempOrderId", order_id);
      this.$store.commit("showOperatorManagePage", "ManageSchedule");
    },
    showContactModal(item) {
      this.$store.commit("showContactModal");
      this.$store.commit("setTempOperatorContactId", item.customer_id);
      this.getUnReadMessage();
    },
    async updateRequestStatus(input, id) {
      try {
        let form = new FormData();
        form.append("status", input);
        let result = await OperatorService.updateRequestStatus(id, form);
        this.getAllRequest();
        console.log(result);
        this.$swal({
          title: "Update Status Successfully",
          icon: "success",
          timer: 1000,
          showConfirmButton: false,
          showCancelButton: false,
        });
      } catch (err) {
        console.log(err);
        this.$swal({
          title: "Update Fail, Please try again",
          icon: "error",
          timer: 1000,
          showConfirmButton: false,
          showCancelButton: false,
        });
      }
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
    countMessage(id) {
      let result = this.unreadMessage.filter((el) => el.sender_id == id).length;
      return result;
    },
    async getUnReadMessage() {
      try {
        let result = await ContactsService.getUnReadMessageByReceiver();
        this.unreadMessage = result.data;
      } catch (err) {
        console.log(err);
      }
    },
    async getAllRequest() {
      try {
        let result = await OperatorService.getRequestByOperatorId();
        let data = result.data;
        this.request = [];
        for (let item of data) {
          if (item.status != "completed") {
            var obj = {
              id: item.id,
              document: item.document.match(/`.+`/)[0].replaceAll("`", ""),
              customer_name: item.customer_name,
              status: item.status,
              created_at: this.getFullTime(item.created_datetime),
              modified_at: this.getFullTime(item.modified_datetime),
              operator_id: item.operator_id,
              file_url: `http://localhost:25800/${item.document}`,
              message_count: this.countMessage(item.customer_id),
              order_id: item.order_id,
              customer_id: item.customer_id,
              schedule_id: item.schedule_id,
            };
            this.statusList.push(status);
            this.request.push(obj);
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {
    this.getUnReadMessage();
    this.getAllRequest();
    // this.interval = setInterval(() => {
    //   this.getUnReadMessage();
    //   this.getAllRequest();
    // }, 1000);
  },
  created() {
    this.$root.$refs.ManageRequest = this;
  },
  beforeDestroy() {
    //clearInterval(this.interval);
  },
};
</script>
<style>
.statusSelector input {
  display: none;
}
</style>
