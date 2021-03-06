import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import store from './plugins/vuex'
import router from './routes/vue_router'
import axios from 'axios'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css';
Vue.config.productionTip = false
axios.defaults.withCredentials = true
Vue.use(VueSweetalert2)
new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
