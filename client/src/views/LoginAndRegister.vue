<template>
    <div>
        <Navbar></Navbar>
        <LoginRegister></LoginRegister>
    </div>
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