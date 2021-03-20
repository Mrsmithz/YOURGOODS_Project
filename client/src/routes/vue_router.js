import Vue from 'vue'
import Router from 'vue-router'
import LoginAndRegister from '../views/LoginAndRegister.vue'
Vue.use(Router)

export default new Router({
    mode:'history',
    routes:[
        {
            path:'/',
            name:'Login',
            component:LoginAndRegister,
        },
    ]
})