<template>
  <v-navigation-drawer
    v-model="sidebarMenuState"
    :permanent="sidebarMenuState"
    floating
    app
    :mini-variant.sync="mini"
  >
    <v-list dense color="primary" dark>
      <v-list-item @click="showCustomerDrawer">
        <v-list-item-action>
          <v-icon>mdi-chevron-left</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            <h3 class="title white--text">MENU</h3>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-list-item @click="toggleMini = !toggleMini">
      <v-list-item-icon>
        <v-icon>{{expandCollapseIcon}}</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
          <strong class="overline text-truncate">{{getUser.name}}</strong>
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
import {mapGetters} from 'vuex'
export default {
  name: "OperatorDrawer",
  data: () => ({
    items: [
      { title: "Dashboard", icon: "mdi-view-dashboard-variant-outline", key:'Dashboard'},
      { title: "Manage Schedule", icon: "mdi-clipboard-list-outline", key:'ManageSchedule'},
      { title: "Manage Vehicle", icon: "mdi-car-lifted-pickup", key:'ManageVehicle'},
    ],
    toggleMini: false,
  }),
  methods: {
    showCustomerDrawer() {
      this.$store.commit("showSideBarMenu");
    },
    showPage(key){
      this.$store.commit('showTransportPage', key)
    }
  },
  computed: {
    ...mapGetters([
      'getUser'
    ]),
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
