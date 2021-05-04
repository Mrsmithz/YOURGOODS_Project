<template>
  <v-dialog
    v-model="ManageOrderState"
    max-width="60%"
    @click:outside="showManageOrder"
    @keydown.esc="showManageOrder"
    :stateless="ManageGoodsState"
  >
    <v-card>
      <v-card-title>
        <span class="headline">Manage Order</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="order_form">
          <v-row>
            <v-col>
              <v-text-field
                label="Company Name"
                required
                :rules="requiredRules"
                v-model="company_name"
                :readonly="checkReadOnly()"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                label="Pickup Address"
                required
                :rules="requiredRules"
                v-model="pickup_address"
                :readonly="checkReadOnly()"
              >
              </v-text-field>
            </v-col>
            <v-col
              ><v-text-field
                label="Receiver Address"
                required
                :rules="requiredRules"
                v-model="receiver_address"
                :readonly="checkReadOnly()"
              >
              </v-text-field
            ></v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                label="Invoice ID"
                required
                :rules="requiredRules"
                v-model="invoice_id"
                :readonly="checkReadOnly()"
              >
              </v-text-field>
            </v-col>
            <v-col
              ><v-text-field
                label="Container ID"
                required
                :rules="requiredRules"
                v-model="container_id"
                :readonly="checkReadOnly()"
              >
              </v-text-field
            ></v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field label="Created At" disabled v-model="created_at">
              </v-text-field>
            </v-col>
            <v-col
              ><v-text-field label="Modified At" disabled v-model="modified_at">
              </v-text-field
            ></v-col>
          </v-row>
        </v-form>
        <v-row>
          <v-col>
            <v-data-table
              :headers="headers"
              :items="goods"
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
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-if="TempOrderIdState && !OrdersHistoryModeState"
                    @click="showCreateGoods()"
                  >
                    New Item
                  </v-btn>
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
        <v-row>
          <v-col>
            <v-btn v-if="OrdersHistoryModeState" @click="showManageOrder">CLOSE</v-btn>
            <v-btn @click="createOrder" v-if="TempRequestIdState && !OrdersHistoryModeState">Create</v-btn>
            <v-btn @click="editOrder" v-if="TempOrderIdState && editMode && !OrdersHistoryModeState"
              >Save</v-btn
            >
            <v-btn
              @click="editMode = true"
              v-if="!editMode && !TempRequestIdState && !OrdersHistoryModeState"
              >Edit</v-btn
            >
            <v-btn
              class="ml-3"
              @click="deleteOrder"
              v-if="!editMode && !TempRequestIdState && !OrdersHistoryModeState"
              >Delete</v-btn
            >
            <v-btn
              class="ml-3"
              v-if="TempOrderIdState && editMode && !OrdersHistoryModeState"
              @click="[getOrder, getAllGoods, editMode = false]">BACK</v-btn
            >
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import OrderService from "../../../services/OrderService";
import GoodsService from "../../../services/GoodsServices";
export default {
  name: "ManageOrder",
  beforeUpdate() {},
  mounted() {},
  created() {
    this.$root.$refs.ManageOrder = this;
  },
  methods: {
    checkReadOnly() {
      if (this.TempRequestIdState) {
        return false;
      } else if (
        !this.TempRequestIdState &&
        !this.editMode &&
        this.TempOrderIdState
      ) {
        return true;
      } else {
        return false;
      }
    },
    getDate(date) {
      return date.match(/.+(?=T)/)[0];
    },
    getTime(time) {
      return time.match(/\d+:\d+/)[0];
    },
    async checkGoods() {
      try {
        let result = await GoodsService.getGoodsByOrderId(
          this.TempOrderIdState
        );
        console.log(result.data.length);
        if (result.data.length < 1) {
          return false;
        } else {
          return true;
        }
      } catch (err) {
        console.log(err);
        return false;
      }
    },
    async getOrder() {
      try {
        let result = await OrderService.getOrderById(this.TempOrderIdState);
        let data = result.data[0];
        this.company_name = data.company_name;
        this.pickup_address = data.pickup_address;
        this.receiver_address = data.receiver_address;
        this.invoice_id = data.invoice_id;
        this.container_id = data.container_id;
        this.created_at = `${this.getTime(data.created_datetime)} ${this.getDate(data.created_datetime)}`;
        this.modified_at = `${this.getTime(data.modified_datetime)} ${this.getDate(data.modified_datetime)}`;
      } catch (err) {
        console.log(err);
      }
    },
    async getAllGoods() {
      try {
        let result = await GoodsService.getGoodsByOrderId(
          this.TempOrderIdState
        );
        let data = result.data;
        this.goods = [];
        for (let item of data) {
          var obj = {
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            weight: item.weight,
            created_at: this.getFullTime(item.created_datetime),
            modified_at: this.getFullTime(item.modified_datetime),
          };
          this.goods.push(obj);
        }
      } catch (err) {
        console.log(err);
      }
    },
    getFullTime(time) {
      var date = new Date(time);
      date.setTime(date.getTime() + 7 * 60 * 60 * 1000);
      return `${
        date.toISOString().match(/\d+:\d+:\d+/)[0]
      } ${date.toDateString()}`;
    },
    showManageOrder() {
      this.$store.commit("setTempOrderId", null);
      this.$store.commit('setTempRequest', null)
      this.$store.commit('setOrdersHistoryMode', false)
      this.$store.commit("showOperatorManagePage", "ManageOrder");
    },
    showManageGoods(goods_id) {
      this.$store.commit("setTempGoodsId", goods_id);
      this.$store.commit("showOperatorManagePage", "ManageGoods");
    },
    showCreateGoods() {
      this.$store.commit('setTempGoodsId', null)
      this.$store.commit("showOperatorManagePage", "ManageGoods");
    },
    createOrderFormData() {
      let form = new FormData();
      form.append("company_name", this.company_name);
      form.append("receiver_address", this.receiver_address);
      form.append("pickup_address", this.pickup_address);
      form.append("invoice_id", this.invoice_id);
      form.append("container_id", this.container_id);
      form.append("request_id", this.TempRequestIdState);
      return form;
    },
    async createOrder() {
      if (this.$refs.order_form.validate()) {
        try {
          let result = await OrderService.createOrder(
            this.createOrderFormData()
          );
          this.$root.$refs.ManageRequest.updateRequestStatus('unconfirmed', this.TempRequestIdState)
          this.$store.commit("setTempRequestId", null);
          this.$store.commit("setTempOrderId", result.data.id);
          console.log(result);
        } catch (err) {
          console.log(err);
        }
      }
    },
    async deleteOrder(){
      let r = confirm('Confirm Delete ?')
      if (r == true){
        try{
          let result = await OrderService.deleteOrderById(this.TempOrderIdState)
          this.$root.$refs.ManageRequest.getAllRequest()
          this.showManageOrder()
          console.log(result)
        }
        catch(err){
          console.log(err)
        }
      }
    },
    async editOrder() {
      if (this.$refs.order_form.validate()) {
        let r = confirm("Confirm Edit ?");
        if (r == true) {
          try {
            let result = await OrderService.editOrderById(
              this.TempOrderIdState,
              this.createOrderFormData()
            );
            this.$root.$refs.ManageRequest.updateRequestStatus('unconfirmed', this.TempRequestState)
            this.getOrder();
            this.getAllGoods();
            this.editMode = false
            this.showManageOrder()
            console.log(result);
          } catch (err) {
            console.log(err);
          }
        }
        else{
          this.getOrder();
          this.getAllGoods();
          this.editMode = false
        }
      }
    },
  },
  watch: {
    ManageOrderState(visible) {
      if (visible && this.TempOrderIdState) {
        this.getOrder();
        this.getAllGoods();
        this.$forceUpdate()
      } else if (visible && this.TempRequestIdState) {
        console.log(this.TempRequestIdState);
      } else if (!visible) {
        this.$store.commit("setTempOrderId", null);
        this.$store.commit("setTempRequestId", null);
        this.$refs.order_form.reset();
        this.goods = [];
        this.editMode = false;
      }
    },
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
    TempOrderIdState: {
      get: function() {
        return this.$store.getters.getTempOrderId;
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
    TempRequestState: {
      get: function() {
        return this.$store.getters.getTempRequest;
      },
      set: function(newValue) {
        return newValue;
      },
    },
    OrdersHistoryModeState: {
      get: function() {
        return this.$store.getters.getOrdersHistoryMode;
      },
      set: function(newValue) {
        return newValue;
      },
    },
  },
  data: () => ({
    editMode: false,
    search: "",
    company_name: "",
    pickup_address: "",
    receiver_address: "",
    invoice_id: "",
    container_id: "",
    created_at: "",
    modified_at: "",
    requiredRules: [(v) => !!v || "This Field is required"],
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
    goods: [],
  }),
};
</script>
