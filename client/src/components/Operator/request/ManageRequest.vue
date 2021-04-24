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
            {{item.document}}
            <v-icon class="ml-1" @click="test(item)" >mdi-file-document-outline</v-icon>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn class="mr-2" color="primary" @click="showContactModal">
              CHAT
            </v-btn>
            <v-btn class="mr-2" color="primary" @click="editItem(item)">
              CONFIRM
            </v-btn>
          </template>
          <template v-slot:[`item.order`]="{ item }">
            <v-btn
              class="mr-2"
              color="primary"
              @click="showManageOrder(item.id)"
            >
              View
            </v-btn>
          </template>
          <template v-slot:[`item.schedule`]="{ item }">
            <v-btn
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
export default {
  name: "ManageRequest",
  methods: {
    showManageOrder(order_id) {
      this.$store.commit("setTempRequestId", order_id);
      this.$store.commit("showOperatorManagePage", "ManageOrder");
    },
    showManageSchedule(order_id) {
      this.$store.commit("setTempOrderId", order_id);
      this.$store.commit("showOperatorManagePage", "ManageSchedule");
    },
    showContactModal() {
      this.$store.commit("showContactModal");
    },
    test(item){
      console.log(item)
    }
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
