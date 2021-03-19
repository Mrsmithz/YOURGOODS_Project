import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        show_login:true
    },
    mutations:{
        show_login(state){
            state.show_login = !state.show_login
        }
    }
})

export default store