<template>
    <v-app>
        <Navbar></Navbar>
        <LoginRegister></LoginRegister>
    </v-app>
</template>

<script>
import Navbar from '../components/Navbar/Navbar'
import LoginRegister from '../components/LoginRegister/Loginregister'
export default {
    name:'LoginAndRegister',
    components:{
        Navbar,
        LoginRegister
    }
}
</script>