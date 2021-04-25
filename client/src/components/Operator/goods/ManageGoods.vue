<template>
  <v-dialog v-model="ManageGoodsState" max-width="50%" @click:outside="showManageGoods">
    <v-card>
      <v-card-title>
        <span class="Headline">Manage Goods</span>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <v-text-field label="name"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field label="weight"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="quantity"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn>Save</v-btn>
            <v-btn>Reset</v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: "ManageGoods",
  data: () => ({
    dialog: true,
  }),
  beforeUpdate(){
    console.log(this.TempGoodsIdState)
  },
  methods:{
      showManageGoods(){
          this.$store.commit("showOperatorManagePage", "ManageGoods");
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
  },
};
</script>
