import Vue from 'vue'
import Router from 'vue-router'
import LoginAndRegister from '../views/LoginAndRegister.vue'
import Home from '../views/Home.vue'
Vue.use(Router)

export default new Router({
    mode:'history',
    routes:[
        {
            path:'/',
            name:'Login',
            component:LoginAndRegister,
        },
        {
            path:'/index',
            name:'Home',
            component: Home,
        },
    ]
})