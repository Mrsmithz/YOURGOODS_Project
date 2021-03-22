import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{

        login_regis_page: 1,
        navbar_show_signin_button: false,
        navbar_show_signup_button: true,
        show_login:true,

        userData: {},

    },
    mutations:{
        show_login(state){
            state.show_login = !state.show_login
        },
        toggle_navbar_signInOut_button(state){
            state.navbar_show_signin_button = !state.navbar_show_signin_button
            state.navbar_show_signup_button = !state.navbar_show_signup_button
        },
        switch_to_login(state){
            state.login_regis_page--;
            store.commit('toggle_navbar_signInOut_button')
        },
        switch_to_signup(state){
            state.login_regis_page++;
            store.commit('toggle_navbar_signInOut_button')
        },
        setUserData(state, payload){
            state.userData = payload;
        }
    }
})

export default store