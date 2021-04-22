<template>
  <v-app>
    <IndexNavbar></IndexNavbar>
    <ProfileDrawer></ProfileDrawer>
    <ProfileModal></ProfileModal>
    <ChangePasswordModal></ChangePasswordModal>
    <CustomerIndex></CustomerIndex>
  </v-app>
</template>

<script>
import IndexNavbar from "../components/Navbar/IndexNavbar";
import ProfileModal from "../components/Modal/ProfileModal"
import ProfileDrawer from "../components/Navbar/ProfileDrawer"
import ChangePasswordModal from "../components/Modal/ChangePasswordModal"
import CustomerIndex from "../components/Customer/CustomerIndex";
export default {
  name: "Index",
  components: {
    CustomerIndex,
    IndexNavbar,
    ProfileDrawer,
    ProfileModal,
    ChangePasswordModal
  },
};
</script>
