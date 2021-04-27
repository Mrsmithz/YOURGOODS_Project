<template>
  <v-dialog
    v-model="GoodsModalState"
    @click:outside="showGoodsModal"
    max-width="50%"
  >
    <v-card>
      <v-card-text>
        <v-data-table :headers="headers" :items="goods" :search="search">
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>{{TempCompanyNameState}}</v-toolbar-title>
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
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import GoodsService from "../../../services/GoodsServices";
export default {
  name: "GoodsModal",
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
    ],
    goods: [],
  }),
  methods: {
    getFullTime(time) {
      var date = new Date(time);
      date.setTime(date.getTime() + 7 * 60 * 60 * 1000);
      return `${
        date.toISOString().match(/\d+:\d+:\d+/)[0]
      } ${date.toDateString()}`;
    },
    showGoodsModal() {
      this.$store.commit("setCustomerGoodsModal");
      this.$store.commit("setTempOrderId", null);
      this.$store.commit('setTempCompanyName', null)
    },
    async getAllGoods() {
      try {
        let result = await GoodsService.getGoodsByOrderId(this.TempOrderIdState);
        this.goods = [];
        for (let item of result.data) {
          var obj = {
            name: item.name,
            weight: item.weight,
            quantity: item.quantity,
            created_at: this.getFullTime(item.created_datetime),
            modified_at: this.getFullTime(item.modified_datetime),
          };
          this.goods.push(obj);
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  watch: {
    GoodsModalState: function(visible) {
      if (visible) {
        this.getAllGoods()
      }
    },
  },
  computed: {
    GoodsModalState: {
      get: function() {
        return this.$store.getters.getCustomerGoodsModal;
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
    TempCompanyNameState: {
      get: function() {
        return this.$store.getters.getTempCompanyName;
      },
      set: function(newValue) {
        return newValue;
      },
    },
  },
};
</script>
