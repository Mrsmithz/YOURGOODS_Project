<template>
  <div id="navb">
    <v-app-bar fixed dense width="100%">
      <div class="logo">
        <v-toolbar-title>YOURGOODS</v-toolbar-title>
      </div>

      <v-btn color="transparent">ออเดอร์</v-btn>

      <v-spacer></v-spacer>

      <div class="user_id">
        <p>NAME HERE</p>
      </div>
      <v-btn class="btn-icon" icon>
        <i class="fa fa-bell" aria-hidden="true"></i>
      </v-btn>
      <v-btn class="btn-icon" icon>
        <i class="fa fa-cog" aria-hidden="true"></i>
      </v-btn>
    </v-app-bar>
  </div>
</template>
<script>
export default {
  name: "Navbar",
  data: () => ({}),
  mounted() {
    window.onscroll = () => {
      this.changeColor();
    };
  },
  methods: {},
  computed: {},
};
</script>
<style scoped>
#navb {
  font-size: 1rem;
}

p {
  margin-bottom: 0px;
}

.v-app-bar {
  background-color: rgb(248, 248, 248) !important;
}

.logo {
  height: 100%;
  border-right: 2px solid #d3dadb !important;
  display: flex;
  align-items: center;
  padding-right: 1em;
  margin-right: 2em;
}

.v-btn--is-elevated {
  box-shadow: none;
}

.v-btn {
  height: 100% !important;
  font-size: 1.3rem;
  letter-spacing: -0.5px;
}

.user_id {
  display: flex;
  align-items: center;
  margin-right: 1rem;
}

.btn-icon {
  font-size: 1.5rem;
}
</style>
