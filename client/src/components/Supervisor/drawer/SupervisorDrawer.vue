<template>
  <v-navigation-drawer
    v-model="sidebarMenuState"
    :permanent="sidebarMenuState"
    floating
    app
    dark
    :mini-variant.sync="mini"
  >
    <v-list dense color="primary" dark>
      <v-list-item @click="showCustomerDrawer">
        <v-list-item-action>
          <v-icon>mdi-chevron-left</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            <h3>Supervisor Drawer</h3>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-list-item @click="toggleMini = !toggleMini">
      <v-list-item-icon>
        <v-icon>{{expandCollapseIcon}}</v-icon>
      </v-list-item-icon>
      <v-list-item-content class="text-truncate">
          USERNAME
      </v-list-item-content>
    </v-list-item>
    <v-list>
      <v-list-item v-for="item in items" :key="item.title" link @click="showPage(item.key)">
        <v-list-item-icon>
          <v-icon color="primary">{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="primary--text">{{
            item.title
          }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
export default {
  name: "OperatorDrawer",
  data: () => ({
    items: [
      { title: "Dashboard", icon: "mdi-account-outline", key:'Dashboard'},
      { title: "Operator", icon: "mdi-account-outline", key:'ManageOperator'},
      { title: "Transport", icon: "mdi-account-outline", key:'ManageTransport'},
      { title: "Driver", icon: "mdi-account-outline", key:'ManageDriver'},
      { title: "Shipping", icon: "mdi-account-outline", key:'ManageShipping'},
      { title: "Feedback", icon: "mdi-account-outline", key:'Feedback'},
    ],
    toggleMini: false,
  }),
  methods: {
    showCustomerDrawer() {
      this.$store.commit("showSideBarMenu");
    },
    showPage(key){
      this.$store.commit('showSupervisorPage', key)
    }
  },
  computed: {
    sidebarMenuState: {
      get: function() {
        return this.$store.getters.getSideBarMenu;
      },
      set: function(newValue) {
        return newValue;
      },
    },
    mini: {
        get:function(){
            return this.$vuetify.breakpoint.smAndDown || this.toggleMini;
        },
        set:function(newValue) {
            return newValue;
        }
    },
    expandCollapseIcon() {
      return this.mini ? "mdi-chevron-right" : "mdi-chevron-left";
    },
  },
};
</script>
