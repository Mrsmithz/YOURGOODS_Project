import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import store from './plugins/vuex'
import router from './routes/vue_router'
import axios from 'axios'
Vue.config.productionTip = false
axios.defaults.withCredentials = true
new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
