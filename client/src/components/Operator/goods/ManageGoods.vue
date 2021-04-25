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
              <v-text-field label="Goods Name" required :rules="requiredRules" v-model="name"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field label="Weight (kg)" required :rules="weightRules" v-model="weight"></v-text-field>
            </v-col>
            <v-col>
              <v-text-field label="Quantity" required :rules="quantityRules" v-model="quantity"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn v-if="!TempGoodsIdState" @click="createGoods">Create</v-btn>
              <v-btn v-if="TempGoodsIdState">Save</v-btn>
              <v-btn class="ml-3">Reset</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import GoodsService from "../../../services/GoodsServices"
export default {
  name: "ManageGoods",
  data: () => ({
    dialog: true,
    id:'',
    name:'',
    weight:'',
    quantity:'',
    requiredRules: [
      (v) => !!v || "This Field is required"
    ],
    quantityRules: [
      (v) => !!v || "This Field is required",
      (v) => /^[1-9]+$/.test(v) || 'Quantity Invalid'
    ],
    weightRules: [
      (v) => !!v || "This Field is required",
      (v) => /(^[0-9]+[.]{1}[0-9]+$)|^[1-9]+$/.test(v) || 'Weight Invalid'
    ],
  }),
  beforeUpdate() {
  },
  methods: {
    showManageGoods() {
    console.log('test')
      this.$store.commit("showOperatorManagePage", "ManageGoods");
      this.$store.commit("setGoodsState", "createGoods", false);
    },
    createFormData(){
        let form = new FormData()
        form.append('name', this.name)
        form.append('weight', this.weight)
        form.append('quantity', this.quantity)
        form.append('order_id', this.TempOrderIdState)
        return form
    },
    async createGoods(){
        if (this.$refs.goods_form.validate()){
            try{
                let result = await GoodsService.createGoods(this.createFormData())
                this.$root.$refs.ManageOrder.getAllGoods()
                alert('Create Success')
                console.log(result)
            }
            catch(err){
                console.log(err)
            }
        }
    },
    async getGoods(){
        try{
            let result = await GoodsService.getGoodsById(this.TempGoodsIdState)
            let data = result.data[0]
            this.id = data.id
            this.name = data.name
            this.weight = data.weight
            this.quantity = data.quantity
        }
        catch(err){
            console.log(err)
        }
    }
  },
  watch:{
      ManageGoodsState(visible){
          if (!visible){
              this.$refs.goods_form.reset()
              this.$store.commit("setTempGoodsId", null);
          }
          else if (visible && this.TempGoodsIdState){
              this.getGoods()
          }
      }
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
  },
};
</script>
