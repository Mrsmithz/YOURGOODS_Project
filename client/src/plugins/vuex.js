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
        CustomerGoodsModal:false,
        OrderHistoryMode:false,
        LocationModal:false,
        Temp:{
            temp_request_id:'',
            temp_request:'',
            temp_goods_id:'',
            temp_order_id:'',
            temp_operator_contact_id:'',
            temp_company_name:'',
            temp_schedule_id:'',
            temp_driver_data:{}
        },
        Customer:{
            Dashboard:true,
            UploadDocument:false,
            OrdersHistory:false,
            Feedback:false,
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
        },
        Transport:{
            Dashboard:true,
            ManageSchedule:false,
            ManageVehicle:false
        },
        Driver:{
            Dashboard:true,
            ViewOrders:false,
            SentLocation:false
        },
        Supervisor:{
            Dashboard:true,
            ManageOperator:false,
            ManageTransport:false,
            ManageDriver:false,
            ManageShipping:false,
            Feedback:false
        },
        Shipping:{
            Dashboard:true,
            ViewOrders:false,
            TrackingOrder:false
        }
    },
    mutations:{
        setTempDriverData(state, data){
            state.Temp.temp_driver_data = data
        },
        setLocationModal(state, mode){
            state.LocationModal = mode
        },
        setOrdersHistoryMode(state, mode){
            state.OrderHistoryMode = mode
        },
        setTempOperatorContactId(state, operator_id){
            state.Temp.temp_operator_contact_id = operator_id
        },
        setTempRequestId(state, request_id){
            state.Temp.temp_request_id = request_id
        },
        setTempRequest(state, request){
            state.Temp.temp_request = request
        },
        setTempGoodsId(state, goods_id){
            state.Temp.temp_goods_id = goods_id
        },
        setTempCompanyName(state, company_name){
            state.Temp.temp_company_name = company_name
        },
        setTempOrderId(state, order_id){
            state.Temp.temp_order_id = order_id
        },
        setTempScheduleId(state, schedule_id){
            state.Temp.temp_schedule_id = schedule_id
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
        showDriverPage(state, page){
            if (state.Driver[page]){
                return
            }
            else{
                Object.keys(state.Driver).forEach(key => {
                    state.Driver[key] = false
                })
                state.Driver[page] = true
            }
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
        showTransportPage(state, page){
            if (state.Transport[page]){
                return
            }
            else{
                Object.keys(state.Transport).forEach(key => {
                    state.Transport[key] = false
                })
                state.Transport[page] = true
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
        showSupervisorPage(state, page){
            if (state.Supervisor[page]){
                return
            }
            else{
                Object.keys(state.Supervisor).forEach(key => {
                    state.Supervisor[key] = false
                })
                state.Supervisor[page] = true
            }
        },
        showShippingPage(state, page){
            if (state.Shipping[page]){
                return
            }
            else{
                Object.keys(state.Shipping).forEach(key => {
                    state.Shipping[key] = false
                })
                state.Shipping[page] = true
            }
        },
        showOperatorManagePage(state, page){
            state.OperatorManage[page] = !state.OperatorManage[page]
        },
        setGoodsState(state, key){
            state.Goods[key] = !state.Goods[key]
        },
        setCustomerGoodsModal(state){
            state.CustomerGoodsModal = !state.CustomerGoodsModal
        }
    },
    getters:{
        isAuthenticated: (state) => {
            return state.user.username ? true : false
        },
        getTempDriverData:state => {
            return state.Temp.temp_driver_data
        },
        getOrdersHistoryMode: state => {
            return state.OrderHistoryMode
        },
        getCustomerGoodsModal: state => {
            return state.CustomerGoodsModal
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
        getTransport: state => {
            return state.Transport
        },
        getDriver: state => {
            return state.Driver
        },
        getSupervisor: state => {
            return state.Supervisor
        },
        getShipping: state => {
            return state.Shipping
        },
        getOperatorManage: state => {
            return state.OperatorManage
        },
        getTempRequestId: state => {
            return state.Temp.temp_request_id
        },
        getTempRequest: state => {
            return state.Temp.temp_request
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
        getTempCompanyName: state => {
            return state.Temp.temp_company_name
        },
        getTempScheduleId: state => {
            return state.Temp.temp_schedule_id
        },
        getGoods: state => {
            return state.Goods
        },
        getLocationModal: state => {
            return state.LocationModal
        },
    }
})

export default store