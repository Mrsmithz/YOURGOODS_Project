<template>
    <div>
        <NavbarCustomer></NavbarCustomer>
        <Homes></Homes>
    </div>
</template>

<script>
import NavbarCustomer from '../components/Navbar/Navbar_customer'
import Homes from '../components/Index/Home'
export default {
    name:'Home',
    components:{
        Homes,
        NavbarCustomer
    }
}
</script>