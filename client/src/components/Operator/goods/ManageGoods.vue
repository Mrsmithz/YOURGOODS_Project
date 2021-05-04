<template>
  <v-dialog
    v-model="ManageGoodsState"
    max-width="50%"
    @click:outside="showManageGoods"
    @keydown.esc="showManageGoods"
  >
    <v-card>
      <v-card-title>
        <span class="Headline">Manage Goods</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="goods_form">
          <v-row>
            <v-col>
              <v-text-field
                label="Goods Name"
                required
                :rules="requiredRules"
                v-model="name"
                :readonly="!!TempGoodsIdState && !editMode"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                label="Weight (kg)"
                required
                :rules="weightRules"
                v-model="weight"
                :readonly="!!TempGoodsIdState && !editMode"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                label="Quantity"
                required
                :rules="quantityRules"
                v-model="quantity"
                :readonly="!!TempGoodsIdState && !editMode"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn v-if="!TempGoodsIdState && !OrdersHistoryModeState" @click="createGoods"
                >Create</v-btn
              >
              <v-btn
                v-if="TempGoodsIdState && !editMode && !OrdersHistoryModeState"
                @click="editMode = true"
                >Edit</v-btn
              >
              <v-btn
                class="ml-3"
                v-if="TempGoodsIdState && !editMode && !OrdersHistoryModeState"
                @click="deleteGoods"
                >Delete</v-btn
              >
              <v-btn v-if="TempGoodsIdState && editMode" @click="editGoods"
                >Save</v-btn
              >
              <v-btn class="ml-3" v-if="TempGoodsIdState && editMode"
                @click="getGoods">Reset</v-btn
              >
              <v-btn v-if="OrdersHistoryModeState" @click="showManageGoods">CLOSE</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import GoodsService from "../../../services/GoodsServices";
export default {
  name: "ManageGoods",
  data: () => ({
    dialog: true,
    id: "",
    name: "",
    weight: "",
    quantity: "",
    editMode: false,
    requiredRules: [(v) => !!v || "This Field is required"],
    quantityRules: [
      (v) => !!v || "This Field is required",
      (v) => /^[1-9]+[0-9]*$/.test(v) || "Quantity Invalid",
    ],
    weightRules: [
      (v) => !!v || "This Field is required",
      (v) => /(^[0-9]+[.]{1}[0-9]+$|^[1-9]+[0-9]*$)/.test(v) || "Weight Invalid",
    ],
  }),
  beforeUpdate() {},
  methods: {
    showManageGoods() {
      this.$store.commit("showOperatorManagePage", "ManageGoods");
      this.$store.commit("setGoodsState", "createGoods", false);
      this.editMode = false;
    },
    createFormData() {
      let form = new FormData();
      form.append("name", this.name);
      form.append("weight", this.weight);
      form.append("quantity", this.quantity);
      form.append("order_id", this.TempOrderIdState);
      return form;
    },
    async editGoods() {
      if (this.$refs.goods_form.validate()) {
        let r = confirm("Confirm Edit ?");
        if (r == true) {
          try {
            let result = await GoodsService.editGoodsById(
              this.TempGoodsIdState,
              this.createFormData()
            );
            this.$root.$refs.ManageOrder.getAllGoods();
            this.editMode = false;
            console.log(result);
          } catch (err) {
            console.log(err);
          }
        }
        else{
          this.getGoods()
          this.editMode = false;
        }
      }
    },
    async deleteGoods() {
      try {
        let r = confirm("Confirm Delete ?");
        if (r == true) {
          let result = await GoodsService.deleteGoodsById(
            this.TempGoodsIdState
          );
          this.$root.$refs.ManageOrder.getAllGoods();
          this.showManageGoods()
          console.log(result);
        }
      } catch (err) {
        console.log(err);
      }
    },
    async createGoods() {
      if (this.$refs.goods_form.validate()) {
        try {
          let result = await GoodsService.createGoods(this.createFormData());
          this.$root.$refs.ManageOrder.getAllGoods();
          alert("Create Success");
          this.showManageGoods()
          console.log(result);
        } catch (err) {
          console.log(err);
        }
      }
    },
    async getGoods() {
      try {
        let result = await GoodsService.getGoodsById(this.TempGoodsIdState);
        let data = result.data[0];
        this.id = data.id;
        this.name = data.name;
        this.weight = data.weight;
        this.quantity = data.quantity;
        this.editMode = false
      } catch (err) {
        console.log(err);
      }
    },
  },
  watch: {
    ManageGoodsState(visible) {
      if (!visible) {
        this.$refs.goods_form.reset();
        this.$store.commit("setTempGoodsId", null);
      } else if (visible && this.TempGoodsIdState) {
        this.getGoods();
      }
    },
  },
  computed: {
    ManageGoodsState: {
      get: function() {
        return this.$store.getters.getOperatorManage.ManageGoods;
      },
      set: function(newValue) {
        return newValue;
      },
    },
    TempGoodsIdState: {
      get: function() {
        return this.$store.getters.getTempGoodsId;
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
    CreateGoodsState: {
      get: function() {
        return this.$store.getters.getGoods.createGoods;
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
};
</script>
