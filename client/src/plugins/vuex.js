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
        Temp:{
            temp_request_id:'',
            temp_goods_id:'',
            temp_order_id:'',
            temp_operator_contact_id:'',
        },
        Customer:{
            Dashboard:true,
            UploadDocument:false,
            OrdersHistory:false,
            Feedback:false
        },
        Operator:{
            Dashboard:true,
            ManageRequest:false,
            TrackingOrder:false,
            OrdersHistory:false,
        },
        OperatorManage:{
            ManageOrder:false,
            ManageGoods:false,
            ManageSchedule:false
        },
        Goods:{
            createGoods:false
        }
    },
    mutations:{
        setTempOperatorContactId(state, operator_id){
            state.Temp.temp_operator_contact_id = operator_id
        },
        setTempRequestId(state, request_id){
            state.Temp.temp_request_id = request_id
        },
        setTempGoodsId(state, goods_id){
            state.Temp.temp_goods_id = goods_id
        },
        setTempOrderId(state, order_id){
            state.Temp.temp_order_id = order_id
        },
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
        },
        showOperatorPage(state, page){
            if (state.Operator[page]){
                return
            }
            else{
                Object.keys(state.Operator).forEach(key => {
                    state.Operator[key] = false
                })
                state.Operator[page] = true
            }
        },
        showCustomerPage(state, page){
            if (state.Customer[page]){
                return
            }
            else{
                Object.keys(state.Customer).forEach(key => {
                    state.Customer[key] = false
                })
                state.Customer[page] = true
            }
        },
        showOperatorManagePage(state, page){
            state.OperatorManage[page] = !state.OperatorManage[page]
        },
        setGoodsState(state, key){
            state.Goods[key] = !state.Goods[key]
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
        },
        getOperator: state => {
            return state.Operator
        },
        getCustomer: state => {
            return state.Customer
        },
        getOperatorManage: state => {
            return state.OperatorManage
        },
        getTempRequestId: state => {
            return state.Temp.temp_request_id
        },
        getTempOrderId: state => {
            return state.Temp.temp_order_id
        },
        getTempGoodsId: state => {
            return state.Temp.temp_goods_id
        },
        getTempOperatorContactId: state => {
            return state.Temp.temp_operator_contact_id
        },
        getGoods: state => {
            return state.Goods
        },
    }
})

export default store