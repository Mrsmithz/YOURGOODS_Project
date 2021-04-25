import Vue from 'vue'
import Router from 'vue-router'
import LoginAndRegister from '../views/LoginAndRegister.vue'
import store from '../plugins/vuex'
import Index from '../views/Index.vue'

Vue.use(Router)

const router = new Router({
    mode:'history',
    routes:[
        {
            path:'/login',
            name:'Login',
            component:LoginAndRegister,
        },
        {
            path:'/',
            name:'Index',
            component:Index
        }
    ]
})
router.beforeEach(async (to, from, next) => {
    if (to.name != "Login" && !store.getters.isAuthenticated){
        next({name:"Login"})
    }
    else if (to.name == "Login" && store.getters.isAuthenticated){
        next({name:"Index"})
    }
    else{
        next()
    }
})

export default router