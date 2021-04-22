<template>
  <div>
    <v-row>
      <v-col>
        <v-data-table 
        :headers="headers_not_confirmed"
        :items="orders"
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
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn class="mr-2" color="primary" @click="editItem(item)">
              CONFIRM
            </v-btn>
            <v-btn color="error" @click="deleteItem(item)">
              REJECT
            </v-btn>
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
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon @click="deleteItem(item)">
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  name: "OrdersHistory",
  data: () => ({
      search:'',
      headers_not_confirmed: [
        {
          text: 'Company Name',
          align: 'start',
          value: 'company_name',
        },
        { text: 'Pickup Address', value: 'pickup_address' },
        { text: 'Receiver Address', value: 'receiver_address' },
        { text: 'Invoice ID', value: 'invoice_id' },
        { text: 'Container ID', value: 'container_id' },
        { text: 'Created Date Time', value: 'created_datetime' },
        { text: 'Modified Date Time', value: 'modified_datetime' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      headers_history: [
        {
          text: 'Company Name',
          align: 'start',
          value: 'company_name',
        },
        { text: 'Pickup Address', value: 'pickup_address' },
        { text: 'Receiver Address', value: 'receiver_address' },
        { text: 'Invoice ID', value: 'invoice_id' },
        { text: 'Container ID', value: 'container_id' },
        { text: 'Status', value: 'status' },
        { text: 'Created Date Time', value: 'created_datetime' },
        { text: 'Modified Date Time', value: 'modified_datetime' },
        // { text: 'Actions', value: 'actions', sortable: false },
      ],
      orders:[
          {
            company_name: 'Frozen Yogurt',
            pickup_address:'123/123 test test 10520',
            receiver_address:'123/123 test2 test2 9999',
            invoice_id:'123ABCD',
            container_id:'123456ABCD',
            status:'pending',
            created_datetime: (new Date()).toDateString(),
            modified_datetime: (new Date()).toDateString()
          },
          {
            company_name: 'Frozen Yogurt',
            pickup_address:'123/123 test test 10520',
            receiver_address:'123/123 test2 test2 9999',
            invoice_id:'123ABCD',
            container_id:'123456ABCD',
            status:'pending',
            created_datetime: (new Date()).toDateString(),
            modified_datetime: (new Date()).toDateString()
          },
      ]
  })
};
</script>
<style>
.v-data-table-header th, .v-data-table td{
    border: none !important;
    vertical-align:inherit !important;
}
.v-data-table td{
    font-weight:400;

}
.v-data-footer{
    border: none !important;
}
.v-data-table-header th{
    color:white !important;
    background:skyblue !important;
    font-size:0.9em !important;
}

</style>

