<template>
  <div>
    <v-row>
      <v-col>
        <v-data-table
          :headers="headers_not_confirmed"
          :items="unconfirmed_orders"
          :items-per-page="5"
          :search="search"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Not Confirmed</v-toolbar-title>
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
          <template v-slot:[`item.goods`]="{ item }">
            <v-btn small color="primary" @click="showGoodsModal(item)"
              >view</v-btn
            >
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn
              small
              class="mr-2"
              color="primary"
              @click="confirmOrder(item)"
            >
              CONFIRM
            </v-btn>
            <v-btn small color="error" @click="rejectOrder(item)">
              REJECT
            </v-btn>
          </template>
          <template v-slot:[`item.pickup_address`]="{ item }">
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <div class="text-truncate" v-on="on" style="max-width:10em">
                  {{ item.pickup_address }}
                </div>
              </template>
              {{ item.pickup_address }}
            </v-tooltip>
          </template>
          <template v-slot:[`item.receiver_address`]="{ item }">
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <div class="text-truncate" v-on="on" style="max-width:10em">
                  {{ item.receiver_address }}
                </div>
              </template>
              {{ item.receiver_address }}
            </v-tooltip>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-row class="pt-6">
      <v-col>
        <v-data-table
          :headers="headers_history"
          :items="orders"
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
          <template v-slot:[`item.goods`]="{ item }">
            <v-btn small color="primary" @click="showGoodsModal(item)"
              >view</v-btn
            >
          </template>
          <template v-slot:[`item.pickup_address`]="{ item }">
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <div class="text-truncate" v-on="on" style="max-width:10em">
                  {{ item.pickup_address }}
                </div>
              </template>
              {{ item.pickup_address }}
            </v-tooltip>
          </template>
          <template v-slot:[`item.receiver_address`]="{ item }">
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <div class="text-truncate" v-on="on" style="max-width:10em">
                  {{ item.receiver_address }}
                </div>
              </template>
              {{ item.receiver_address }}
            </v-tooltip>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import CustomerService from "../../../services/CustomerService";
import OperatorService from "../../../services/OperatorService";
export default {
  name: "OrdersHistory",
  data: () => ({
    search: "",
    headers_not_confirmed: [
      {
        text: "Company Name",
        align: "start",
        value: "company_name",
      },
      { text: "Pickup Address", value: "pickup_address" },
      { text: "Receiver Address", value: "receiver_address" },
      { text: "Goods", value: "goods", align: "center" },
      { text: "Invoice ID", value: "invoice_id" },
      { text: "Container ID", value: "container_id" },
      { text: "Created Date Time", value: "created_datetime" },
      { text: "Modified Date Time", value: "modified_datetime" },
      { text: "Actions", value: "actions", sortable: false, align: "center" },
    ],
    headers_history: [
      {
        text: "Company Name",
        align: "start",
        value: "company_name",
      },
      { text: "Pickup Address", value: "pickup_address" },
      { text: "Receiver Address", value: "receiver_address" },
      { text: "Goods", value: "goods", align: "center" },
      { text: "Invoice ID", value: "invoice_id" },
      { text: "Container ID", value: "container_id" },
      { text: "Status", value: "status" },
      { text: "Created Date Time", value: "created_datetime" },
      { text: "Modified Date Time", value: "modified_datetime" },
    ],
    unconfirmed_orders: [],
    orders: [],
  }),
  mounted() {
    this.getOrderUnConfirmedHistory();
    this.getOrdersHistory();
  },
  methods: {
    showGoodsModal(item) {
      this.$store.commit("setTempOrderId", item.id);
      this.$store.commit("setTempCompanyName", item.company_name);
      this.$store.commit("setCustomerGoodsModal");
    },
    getFullTime(time) {
      var date = new Date(time);
      date.setTime(date.getTime() + 7 * 60 * 60 * 1000);
      return `${
        date.toISOString().match(/\d+:\d+:\d+/)[0]
      } ${date.toDateString()}`;
    },
    async confirmOrder(item) {
      let conf = confirm("Confirm Order ?");
      if (conf) {
        try {
          let form = new FormData();
          form.append("status", "confirmed");
          await OperatorService.updateRequestStatus(item.request_id, form);
          alert("Order confirmed");
          this.getOrderUnConfirmedHistory();
          this.getOrdersHistory();
        } catch (err) {
          console.log(err);
        }
      }
    },
    async rejectOrder(item) {
      let conf = confirm("Reject Order ?");
      if (conf) {
        try {
          let form = new FormData();
          form.append("status", "reject");
          await OperatorService.updateRequestStatus(item.request_id, form);
          alert("Order rejected");
          this.getOrderUnConfirmedHistory();
          this.getOrdersHistory();
        } catch (err) {
          console.log(err);
        }
      }
    },
    async getOrderUnConfirmedHistory() {
      try {
        let result = await CustomerService.getOrdersHistory();
        this.unconfirmed_orders = [];
        for (let item of result.data) {
          if (item.status == "unconfirmed") {
            var obj = {
              id: item.id,
              company_name: item.company_name,
              pickup_address: item.pickup_address,
              receiver_address: item.receiver_address,
              invoice_id: item.invoice_id,
              container_id: item.container_id,
              status: item.status,
              created_datetime: this.getFullTime(item.created_datetime),
              modified_datetime: this.getFullTime(item.modified_datetime),
              request_id: item.request_id,
              operator_id: item.operator_id,
            };
            this.unconfirmed_orders.push(obj);
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
    async getOrdersHistory() {
      try {
        let result = await CustomerService.getOrdersHistory();
        this.orders = [];
        for (let item of result.data) {
          if (
            item.status != "unconfirmed" &&
            item.status != "pending" &&
            item.status != "reject"
          ) {
            var obj = {
              id: item.id,
              company_name: item.company_name,
              pickup_address: item.pickup_address,
              receiver_address: item.receiver_address,
              invoice_id: item.invoice_id,
              container_id: item.container_id,
              status: item.status.toUpperCase(),
              created_datetime: this.getFullTime(item.created_datetime),
              modified_datetime: this.getFullTime(item.modified_datetime),
              request_id: item.request_id,
              operator_id: item.operator_id,
            };
            this.orders.push(obj);
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
<style>
.v-data-table-header th,
.v-data-table td {
  border: none !important;
  vertical-align: inherit !important;
}
.v-data-table td {
  font-weight: 400;
}
.v-data-footer {
  border: none !important;
}
.v-data-table-header th {
  color: white !important;
  background: skyblue !important;
  font-size: 0.9em !important;
}
</style>
