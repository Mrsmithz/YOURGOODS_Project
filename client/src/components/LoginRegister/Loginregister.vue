<template>
  <div v-show="show_login">
    <v-app id="logregis">
      <v-main class="whole_screen">
        <v-container class="fill-height" fluid>
          <v-row align="center" justify="center">
            <v-col cols="12" sm="10" md="10">
              <v-card class="elevation-12" :style="`transform: rotate(${rotation}deg);`">
                <div class="pa-6 whole_pane">
                  <v-window v-model="page" >
                    <v-window-item :value="1">
                      <v-row>
                        <v-col
                          class="login_pane pl-6 pt-6 pb-6"
                          cols="12"
                          md="8"
                        >
                          <v-card-text class="mt12">
                            <h1
                              class="text-center pt-10 pb-10 login_head has-text-weight-bold is-size-1"
                              style="color:#1e212d"
                            >
                              Sign In
                            </h1>
                          </v-card-text>
                          <v-form
                            ref="form"
                            v-model="valid"
                            lazy-validation
                            class="text-center"
                            :value="0"
                            @submit="login"
                          >
                            <v-text-field
                              class="pl-15 pr-15 field"
                              prepend-icon="fas fa-user"
                              v-model="username_login"
                              label="Username"
                              color="#aa96da"
                              :rules="usernameRules"
                              required
                            />
                            <v-text-field
                              class="pl-15 pr-15 field"
                              prepend-icon="fas fa-lock"
                              v-model="password_login"
                              type="password"
                              label="Password"
                              color="#aa96da"
                              required
                            />
                            <v-btn
                              elevation="2"
                              x-large
                              class="button mt-6 mb-8 pa-10 is-size-3 login_button has-text-weight-bold has-text-white"
                              color="#b68973"
                              type="submit"
                              >Login</v-btn
                            >
                          </v-form>
                        </v-col>
                        <v-col cols="12" md="4" class="text-center">
                          <p class="pt-16 has-text-weight-bold login_font">
                            You don't have any account?
                          </p>
                          <v-btn
                            class="signout_button"
                            elevation="2"
                            @click="switchToSignup"
                            >Sign up</v-btn
                          >
                        </v-col>
                      </v-row>
                    </v-window-item>

                    <v-window-item :value="2">
                      <v-row>
                        <v-col cols="12" md="4" class="text-center">
                          <p class="pt-16 has-text-weight-bold login_font">
                            You Already have an account?
                          </p>
                          <v-btn
                            class="signin_button"
                            elevation="2"
                            @click="switchToSignin"
                            >Sign in</v-btn
                          >
                        </v-col>
                        <v-col
                          class="register_pane px-6 pt-6 pb-6"
                          cols="12"
                          md="8"
                        >
                          <v-card-text class="mt12">
                            <h1
                              class="text-center pt-10 pb-10 register_head has-text-weight-bold is-size-1"
                              style="color: #1e212d"
                            >
                              Sign Up
                            </h1>
                          </v-card-text>
                          <!-- <v-form
                            ref="form"
                            v-model="valid"
                            lazy-validation
                            class="text-center"
                          >
                            <v-text-field
                              class="pl-15 pr-15 field"
                              v-model="name"
                              :counter="10"
                              label="Username"
                              color="#aa96da"
                              required
                            />
                            <v-text-field
                              class="pl-15 pr-15 field"
                              v-model="email"
                              type="password"
                              label="Password"
                              color="#aa96da"
                              required
                            />
                            <v-btn
                              elevation="2"
                              x-large
                              class="button mt-6 mb-8 pa-10 is-size-3 login_button has-text-weight-bold has-text-white"
                              color="#aa96da"
                              >Login</v-btn
                            >
                          </v-form> -->
                          <v-stepper v-model="e6" vertical>
                            <v-stepper-step
                              color="#eabf9f"
                              :complete="e6 > 1"
                              step="1"
                            >
                              Read Before Do
                              <small>Description</small>
                            </v-stepper-step>

                            <v-stepper-content step="1">
                              <v-btn class="text-white" color="#eabf9f" @click="e6 = 2">
                                Continue
                              </v-btn>
                              <v-btn text>
                                Cancel
                              </v-btn>
                            </v-stepper-content>

                            <v-stepper-step
                              color="#eabf9f"
                              :complete="e6 > 2"
                              step="2"
                            >
                              Fill your form
                            </v-stepper-step>

                            <v-stepper-content step="2">
                              <v-form
                                ref="form"
                                v-model="valid"
                                lazy-validation
                                @submit="createAccount"
                                method="POST"
                              >
                                <v-text-field
                                  v-model="username_register"
                                  :rules="usernameRules"
                                  label="Username"
                                  required
                                ></v-text-field>

                                <v-text-field
                                  v-model="password_register"
                                  :rules="passwordRules"
                                  label="Password"
                                  type="password"
                                  required
                                ></v-text-field>

                                <v-text-field
                                  v-model="email_register"
                                  :rules="emailRules"
                                  label="E-mail"
                                  type="email"
                                  required
                                ></v-text-field>

                                <v-row>
                                    <div class="col-md-6 mt-0 py-0">
                                      <v-text-field
                                  v-model="fname_register"
                                  :rules="nameRules"
                                  label="Firstname"
                                  required
                                ></v-text-field>
                                    </div>
                                   
                                    <div class="col-md-6 mt-0 py-0">
                                      <v-text-field
                                  v-model="lname_register"
                                  :rules="nameRules"
                                  label="Lastname"
                                  required
                                ></v-text-field>
                                    </div>

                                  </v-row>

                                <v-text-field
                                  v-model="tel_register"
                                  :rules="telRules"
                                  label="Mobile number"
                                  required
                                ></v-text-field>

                                <v-slide-y-transition>
                                  <div v-show="checkIsSpecialType()">
                                    <v-select
                                      :items="gender"
                                      label="Gender"
                                      v-model="gender_register"
                                      :rules="selectRules"
                                      v-if="checkIsSpecialType()"
                                    ></v-select>

                                    <v-textarea
                                      label="Address"
                                      v-model="address_register"
                                      rows="2"
                                      row-height="20"
                                      :rules="addressRules"
                                      v-if="checkIsSpecialType()"
                                    ></v-textarea>
                                  </div>
                                </v-slide-y-transition>

                                <v-radio-group v-model="select_account_type">

                                  <v-row>
                                    <div class="col-md-5 mt-0 py-0">
                                      <v-radio
                                    label="Are you customer?"
                                    required
                                    class="my-0"
                                    style="padding-bottom: 34px"
                                    :value="'customer'"
                                  ></v-radio>
                                    </div>
                                  </v-row>

                                  <v-row>
                                    <div class="col-md-5 mt-0 py-0">
                                      <v-radio
                                    label="Are you supervisor?"
                                    required
                                    class="my-0"
                                    style="padding-bottom: 34px"
                                    :value="'supervisor'"
                                  ></v-radio>
                                    </div>
                                    <v-slide-x-transition>
                                    <div class="col-md-7 mt-0 py-0" v-show="select_account_type == 'supervisor'">
                                      <v-text-field
                                    v-model="supervisor_password"
                                    label="Supervisor code"
                                    required
                                    class="pt-0"
                                  ></v-text-field>
                                    </div>
                                    </v-slide-x-transition>
                                  </v-row>

                                  <v-row>
                                    <div class="col-md-5 mt-0 py-0">
                                      <v-radio
                                    label="Are you order manager?"
                                    required
                                    class="my-0"
                                    style="padding-bottom: 34px"
                                    :value="'order_manager'"
                                  ></v-radio>
                                    </div>
                                    <v-slide-x-transition>
                                    <div class="col-md-7 mt-0 py-0" v-show="select_account_type == 'order_manager'">
                                      <v-text-field
                                    v-model="order_manager_password"
                                    label="Your supervisor's code"
                                    required
                                    class="pt-0"
                                  ></v-text-field>
                                    </div>
                                    </v-slide-x-transition>
                                  </v-row>

                                  <v-row>
                                    <div class="col-md-5 mt-0 py-0">
                                      <v-radio
                                    label="Are you messenger?"
                                    required
                                    class="my-0"
                                    style="padding-bottom: 34px"
                                    :value="'messenger'"
                                  ></v-radio>
                                    </div>
                                    <v-slide-x-transition>
                                    <div class="col-md-7 mt-0 py-0" v-show="select_account_type == 'messenger'">
                                      <v-text-field
                                    v-model="messenger_password"
                                    label="Your Order Manager's code"
                                    required
                                    class="pt-0"
                                  ></v-text-field>
                                    </div>
                                    </v-slide-x-transition>
                                  </v-row>

                                </v-radio-group>

                              <v-checkbox
                                  v-model="checkbox"
                                  :rules="[
                                    (v) => !!v || 'You must agree to continue!',
                                  ]"
                                  label="Do you agree to the policy?"
                                  required
                                  class="mt-0 mb-5"
                                ></v-checkbox>
                              </v-form>
                              <v-btn color="#eabf9f" @click="checkForm()">
                                Continue
                              </v-btn>
                              <v-btn text @click="e6 = 1">
                                Cancel
                              </v-btn>
                              
                            </v-stepper-content>

                            <v-stepper-step
                              color="#eabf9f"
                              :complete="e6 > 3"
                              step="3"
                            >
                              Check your account
                            </v-stepper-step>

                            <v-stepper-content step="3">
                              <v-card
                                color="#faf3e0"
                                class="p-3"
                              >
                                <p class="checkAcc">Username : {{username_register}}</p>
                                <p class="checkAcc">Name : {{fname_register + " " + lname_register}}</p>
                                <p class="checkAcc">Email : {{email_register}}</p>
                                <p class="checkAcc">Mobile Number : {{tel_register}}</p>

                                <div v-show="checkIsSpecialType()">
                                  <p class="checkAcc">Gender : {{gender_register}}</p>
                                  <p class="checkAcc">Address : {{address_register}}</p>
                                </div>

                                <div class="secretCode" v-show="select_account_type == 'supervisor'">
                                  <p class="checkAcc">Supervisor code : {{supervisor_password}}</p>
                                </div>

                                <div class="secretCode" v-show="select_account_type == 'order_manager'">
                                  <p class="checkAcc">Your supervisor's code : {{order_manager_password}}</p>
                                </div>

                                <div class="secretCode" v-show="select_account_type == 'messenger'">
                                  <p class="checkAcc">Your order manager's code : {{messenger_password}}</p>
                                </div>
                              </v-card>
                              <v-slide-y-transition>
                              <p v-show="is_register_alert" class="regis_alert">{{register_alert_message}}</p>
                              </v-slide-y-transition>
                              <v-btn class="mt-12" color="#eabf9f" @click="createAccount">
                                Continue
                              </v-btn>
                              <v-btn class="mt-12" text @click="e6 = 2">
                                Cancel
                              </v-btn>
                            </v-stepper-content>
                          </v-stepper>
                        </v-col>
                      </v-row>
                    </v-window-item>
                  </v-window>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
        <v-dialog v-model="registerSuccess" width="500">

        </v-dialog>
      </v-main>
    </v-app>
  </div>
</template>
<script>
import AccountService from '../../services/AccoundService'

export default {
  name: "Loginregister",
  data: () => ({
    gender: ["Male", "Female"],
    username_login: "",
    valid: "",
    password_login: "",
    username_register: "",
    password_register: "",
    email_register: "",
    fname_register: "",
    lname_register: "",
    tel_register: "",
    gender_register: "",
    address_register: "",
    supervisor_password: "",
    order_manager_password: "",
    messenger_password: "",
    e6: 1,
    checkbox: false,
    rotation: 0,
    is_supervisor: false,
    select_account_type: "customer",
    is_register_alert: false,
    register_alert_message: "",
    registerSuccess: false,
    usernameRules:[
      (v) => !!v || "Username is required",
      (v) => /^(\w|\d)+$/.test(v) || "Username must contain only letter or number only",
      (v) => v.length > 5 || "Username much contain character at least 6",
    ],
    nameRules: [
      (v) => !!v || "Name is required",
    ],
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) =>
        /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          v
        ) || "E-mail must be valid",
    ],
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) =>
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(v) ||
        "Password must contain at least lowercase letter, one number, a special character and one uppercase letter",
    ],
    telRules: [
      (v) => !!v || "Mobile number is required",
      (v) => /^0\d{9}$/.test(v) || "Mobile number is invalid."
    ],
    selectRules: [
      (v) => !!v || "Please select gender"
    ],
    addressRules: [
      (v) => !!v || "Address is required"
    ]
  }),
  methods:{
    checkForm(){
      if (this.$refs.form.validate()){
        this.e6 = 3;
        this.is_register_alert = false;
      }
    },
    switchToSignup(){
      this.$store.commit('switch_to_signup')
      //this.rotate().then((value) => {this.$
      //store.commit('switch_to_signup'); console.log(value); this.rotateToNormal()})
      //this.rotate()
    },
    switchToSignin(){
      this.$store.commit('switch_to_login')
    },
    async createAccount(){
      try{
        var result = await AccountService.createAccount(this.createJSON());
        //this.registerSuccess = true;
        console.log(result)
      }catch(err){
        console.log(err)
      }

      //var result = 1;

      if(result.status == 201){
        this.$store.commit('switch_to_login');
        this.clearRegisterData();
        this.$refs.form.resetValidation()
        
      } else if(result.status == 200){
        if (result.data == "Username duplicated"){
          this.register_alert_message = "This username has already been used.";
        }
        else if (result.data == "Email duplicated"){
          this.register_alert_message = "This e-mail has already been used.";
        }
        else if (result.data == "secret key did not match"){
          this.register_alert_message = "Your supervisor code is incorrect.";
        }
        else if (result.data == false){
          this.register_alert_message = "Your supervisor's key is incorrect.";
        }
        else if (result.data == "id not found"){
          this.register_alert_message = "Your order manager's key is incorrect.";
        }
        this.is_register_alert = true;
      } else if(result.status == 400){
        //
      }
    },
    createJSON(){
      var form = new FormData();
      form.append('username', this.username_register);
      form.append('password', this.password_register);
      form.append('name', this.fname_register + " " + this.lname_register);
      form.append('email', this.email_register);
      form.append('tel', this.tel_register);
      form.append('register_type', this.select_account_type);
      form.append('api_key', 'my_doggo_name_jeff');

      if (this.select_account_type == "supervisor" || this.select_account_type == 'order_manager' || this.select_account_type == 'messenger'){
        form.append('gender', this.gender_register);
        form.append('address', this.address_register);
      }

      if (this.select_account_type == "supervisor"){
        form.append('secret_key', this.supervisor_password);
      }

      if (this.select_account_type == 'order_manager'){
        form.append('supervisor_id', this.order_manager_password);
      }

      if (this.select_account_type == 'messenger'){
        form.append('order_manager_id', this.messenger_password);
      }
      return form;
    },
    checkIsSpecialType(){
      return (this.select_account_type == 'supervisor' || this.select_account_type == 'order_manager' || this.select_account_type == 'messenger')
    },
    async login(e){
      e.preventDefault();
      try{
        var result = await AccountService.Login(this.createLoginJSON());
        console.log(result)
      }catch(err){
        //
      }

      if (result.status == 200){
        this.$router.push(`/index`)
        this.$router.go()
      }
    },
    createLoginJSON(){
      var form = new FormData();
      form.append('username', this.username_login);
      form.append('password', this.password_login);
      form.append('api_key', 'my_doggo_name_jeff');
      return form;
    },
    clearRegisterData(){
      this.username_register = "";
      this.password_register = "";
      this.email_register = "";
      this.fname_register = "";
      this.lname_register = "";
      this.tel_register = "";
      this.gender_register = "";
      this.address_register = "";
      this.supervisor_password = "";
      this.order_manager_password = "";
      this.messenger_password = "";
      this.e6 = 1;
      this.select_account_type = "customer";
    }
    // rotate(){
    //   return new Promise(resolve => {
    //     var self = this;
    //     var ms = 100;
    //     var inteval = setInterval(function(){ self.rotation += 1 * 100-ms; ms -= 5; if(ms < 1){clearInterval(inteval);resolve();}}, ms);
    //   });
    // },
    // rotateToNormal(){
    //   return new Promise(resolve => {
    //     var self = this;
    //     var ms = 1;
    //     var inteval = setInterval(function(){ self.rotation += 1 * 100-ms; ms += 5; if(self.rotation%360 == 0){clearInterval(inteval);resolve();}}, ms);
    //   });
    // }
  },
  computed:{
    show_login(){
      return this.$store.state.show_login
    },
    page(){
      return this.$store.state.login_regis_page
    }
  },
  async beforeCreate(){

    try{
      var result = await AccountService.getSession()
      console.log(result)
      console.log(this.$router.currentRoute)
      if (this.$router.currentRoute.path != "/index"){
        this.$router.push(`/index`)
      }
    }
    catch(err){
      if (this.$router.currentRoute.path != "/"){
         this.$router.push(`/`)
      }
    }

  },
};
</script>
<style>
.whole_pane {
  background: linear-gradient(90deg, #b68973, #eac09fe3);
  opacity: 1;
}
.whole_screen{
  background: linear-gradient(90deg, #eac09fe3, #faf3e0);
}
h1.login_head {
  color: #aa96da;
}
.login_button {
  -webkit-text-stroke: none;
}
.login_font {
  font-size: 2rem;
  color: white;
  -webkit-text-stroke: 0.25px black;
}
h1.register_head {
  color: #fcbad3;
  font-size: 10em;
}
.v-stepper__step__step.primary {
  background-color: red !important;
  border-color: red !important;
}
.signin_button.theme--light.v-btn.v-btn--has-bg {
  background-color:  #faf3e0;
  color: #1e212d;
  width: 7em;
  height: 4em;
  font-size: 1rem;
}
.signout_button.theme--light.v-btn.v-btn--has-bg {
  background-color: #faf3e0;
  color: #1e212d;
  width: 7em;
  height: 4em;
  font-size: 1rem;
}
.login_pane{
  background-color: #fdfaf2 !important;
}
.register_pane{
  background-color: #fdfaf2 !important;
}
.regis_alert{
  color: #FF5252;
  font-size: 0.8em;
  padding-top: 7.5px;
  padding-left: 5px;
  margin-bottom: 0px !important;
}
.checkAcc{
  font-size: 0.9em;
  margin-bottom: 5px !important;
}
.secretCode{
  margin-top: 20px;
}
</style>
