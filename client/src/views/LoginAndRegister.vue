<template>
    <div>
        <Navbar></Navbar>
        <LoginRegister></LoginRegister>
    </div>
</template>

<script>
import Navbar from '../components/Navbar'
import LoginRegister from '../components/Loginregister'
export default {
    name:'LoginAndRegister',
    components:{
        Navbar,
        LoginRegister
    }
}
</script>