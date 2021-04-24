<template>
  <v-dialog v-model="ManageOrderState" max-width="60%" @click:outside="showManageOrder"
  :stateless="ManageGoodsState">
    <v-card>
      <v-card-title>
        <span class="headline">Manage Order {{ order_id }}</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="order_form">
          <v-row>
            <v-col>
              <v-text-field label="Company Name" required> </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field label="Pickup Address" required> </v-text-field>
            </v-col>
            <v-col
              ><v-text-field label="Receiver Address" required> </v-text-field
            ></v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field label="Invoice ID" required> </v-text-field>
            </v-col>
            <v-col
              ><v-text-field label="Container ID" required> </v-text-field
            ></v-col>
          </v-row>
        </v-form>
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
                <v-btn class="mr-2" color="primary" @click="showManageGoods(item.id)">
                  View
                </v-btn>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn>Save</v-btn>
            <v-btn>RESET</v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: "ManageOrder",
  props: ["order_id"],
  beforeUpdate(){
    console.log(this.TempRequestIdState)
  },
  methods: {
    showManageOrder() {
      this.$store.commit("showOperatorManagePage", "ManageOrder");
    },
    showManageGoods(goods_id){
      this.$store.commit("setTempGoodsId", goods_id)
      this.$store.commit("showOperatorManagePage", "ManageGoods")
    }
  },
  computed: {
    ManageOrderState: {
      get: function() {
        return this.$store.getters.getOperatorManage.ManageOrder;
      },
      set: function(newValue) {
        return newValue;
      },
    },
    ManageGoodsState: {
      get: function() {
        return this.$store.getters.getOperatorManage.ManageGoods;
      },
      set: function(newValue) {
        return newValue;
      },
    },
    TempRequestIdState: {
      get: function() {
        return this.$store.getters.getTempRequestId;
      },
      set: function(newValue) {
        return newValue;
      },
    },
  },
  data: () => ({
    search: "",
    headers: [
      {
        text: "Name",
        align: "start",
        value: "name",
      },
      { text: "Weight", value: "weight" },
      { text: "Quantity", value: "quantity" },
      { text: "Created At", value: "created_at" },
      { text: "Modified At", value: "modified_at" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    request: [
      {
        id:555,
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
