import Vue from "vue";
import Router from "vue-router";
import LoginAndRegister from "../views/LoginAndRegister.vue";
import store from "../plugins/vuex";
import Index from "../views/Index.vue";
import AccountService from '../services/AccountService'
Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/login",
      name: "Login",
      component: LoginAndRegister,
    },
    {
      path: "/",
      name: "Index",
      component: Index,
    },
  ],
});
router.beforeEach(async (to, from, next) => {
  if (to.name != "Login" && !store.getters.isAuthenticated) {
    try {
      let result = await AccountService.getSession();
      store.commit("setUser", result.data);
      next({ name: "Index" });
    } catch (err) {
      console.log(err);
      next({ name: "Login" });
    }
  } else if (to.name == "Login" && store.getters.isAuthenticated) {
    next({ name: "Index" });
  } else if (to.name != "Index" && store.getters.isAuthenticated) {
    next({ name: "Index" });
  } else {
    next();
  }
  // if (to.name == 'Index'){
  //     try{
  //         let result = await AccountService.getSession()
  //         store.commit('setUser', result.data)
  //         next({name:"Index"})
  //         console.log(to)
  //     }
  //     catch(err){
  //         console.log(err)
  //     }
  // }
});

export default router;
