<template>
  <v-app id="home">
    <createOrder></createOrder>
  </v-app>
</template>
<script>
import createOrder from "../customer/order";
export default {
  components: {
    createOrder,
  },
  name: "Home",
  data: () => ({
    name: "",
  }),
};
</script>