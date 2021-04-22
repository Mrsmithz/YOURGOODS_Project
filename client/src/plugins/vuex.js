import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

const store = new Vuex.Store({
    plugins: [createPersistedState({
        storage: window.sessionStorage,
    })],
    state:{
        login_regis_page: 1,
        navbar_show_signin_button: false,
        navbar_show_signup_button: true,
        show_login:true,
        user:{},
        ProfileModal:false,
        ChangePasswordModal:false,
        ProfileDrawer:false,
        sidebarMenu:true,
        ContactModal:false,
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
        setUser(state, user){
            state.user = user
        },
        showProfileModal(state){
            state.ProfileModal = !state.ProfileModal
        },
        showChangePasswordModal(state){
            state.ChangePasswordModal = !state.ChangePasswordModal
        },
        showProfileDrawer(state){
            state.ProfileDrawer = !state.ProfileDrawer
        },
        showSideBarMenu(state){
            state.sidebarMenu = !state.sidebarMenu
        },
        showContactModal(state){
            state.ContactModal = !state.ContactModal
        }
    },
    getters:{
        isAuthenticated: (state) => {
            return state.user.username ? true : false
        },
        getUser: state => {
            return state.user
        },
        getProfileModal: (state) => {
            return state.ProfileModal
        },
        getProfileDrawer: state => {
            return state.ProfileDrawer
        },
        getChangePasswordModal: state => {
            return state.ChangePasswordModal
        },
        getSideBarMenu: state => {
            return state.sidebarMenu
        },
        getContactModal: state => {
            return state.ContactModal
        }
    }
})

export default store