<template>
  <div>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            <span class="headline">Tracking Order</span>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="4">
                <v-text-field label="Enter Order ID"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-data-table
                  :headers="headers"
                  :items="tracking"
                  :items-per-page="5"
                  :search="search"
                  class="elevation-1"
                >
                  <template v-slot:top>
                    <v-toolbar flat>
                      <v-toolbar-title>Goods Detail</v-toolbar-title>
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
                    <v-btn
                      class="mr-2"
                      color="primary"
                      @click="showManageGoods(item.id)"
                    >
                      View
                    </v-btn>
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  name: "TrackingOrder",
  data: () => ({
    search: "",
    headers: [
      {
        text: "Company Name",
        align: "start",
        value: "company_name",
      },
      { text: "Location", value: "location" },
      { text: "Created At", value: "created_at" },
      { text: "Driver", value: "driver" },
    ],
    tracking: [
      {
        company_name: "nong gen za",
        location: "lat krabang bangkok",
        created_at: new Date().toDateString(),
        driver: "A",
      },
      {
        company_name: "aaa",
        location: "asd",
        created_at: new Date().toDateString(),
        driver: "D",
      },
      {
        company_name: "bbb",
        location: "zxczxc",
        created_at: new Date().toDateString(),
        driver: "E",
      },
    ],
  }),
};
</script>
