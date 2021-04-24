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
            <v-btn class="mr-2" color="primary" @click="editItem(item)">
              View
            </v-btn>
          </template>
          <template v-slot:[`item.goods`]="{ item }">
            <v-btn class="mr-2" color="primary" @click="editItem(item)">
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
      { text: "Goods", value: "goods" },
      { text: "Schedule", value: "schedule" },
      { text: "Created At", value: "created_at" },
      { text: "Modified At", value: "modified_at" },
    ],
    request: [
      {
        name: "Milk",
        weight: "15 kg.",
        quantity: "50",
        created_at: new Date().toDateString(),
        modified_at: new Date().toDateString(),
      },
    ],
  }),
};
</script>
