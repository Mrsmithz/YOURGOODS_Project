<template>
  <!-- <div v-show="show_login"> -->
    <!-- <v-app id="logregis"> -->
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
                            ref="login_form"
                            v-model="valid"
                            lazy-validation
                            class="text-center"
                            :value="0"
                            @submit="login"
                          >
                          <v-slide-x-transition>
                            <v-alert
                              dense
                              outlined
                              type="error"
                              v-if="login_error">
                              {{login_error}}
                            </v-alert>
                          </v-slide-x-transition>
                            <v-text-field
                              class="pl-15 pr-15 field"
                              prepend-icon="fas fa-user"
                              v-model="username_login"
                              label="Username"
                              color="#aa96da"
                              :rules="usernameRules"
                              required
                              clearable
                            />
                            <v-text-field
                              class="pl-15 pr-15 field"
                              prepend-icon="fas fa-lock"
                              v-model="password_login"
                              type="password"
                              label="Password"
                              color="#aa96da"
                              required
                              clearable
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
                              <v-btn text @click="switchToSignin">
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
                                ref="register_form"
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
                                  clearable
                                ></v-text-field>

                                <v-text-field
                                  v-model="password_register"
                                  :rules="passwordRules"
                                  label="Password"
                                  required
                                  :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
                                  :type="show_password ? 'text' : 'password'"
                                  @click:append="show_password =! show_password"
                                  clearable
                                ></v-text-field>

                                <v-text-field
                                  v-model="email_register"
                                  :rules="emailRules"
                                  label="E-mail"
                                  type="email"
                                  required
                                  clearable
                                ></v-text-field>

                                <v-row>
                                    <div class="col-md-6 mt-0 py-0">
                                      <v-text-field
                                  v-model="fname_register"
                                  :rules="nameRules"
                                  label="Firstname"
                                  required
                                  clearable
                                ></v-text-field>
                                    </div>
                                   
                                    <div class="col-md-6 mt-0 py-0">
                                      <v-text-field
                                  v-model="lname_register"
                                  :rules="nameRules"
                                  label="Lastname"
                                  required
                                  clearable
                                ></v-text-field>
                                    </div>

                                  </v-row>

                                <v-text-field
                                  v-model="tel_register"
                                  :rules="telRules"
                                  label="Mobile number"
                                  required
                                  clearable
                                ></v-text-field>
                                    <v-select
                                      :items="gender"
                                      label="Gender"
                                      v-model="gender_register"
                                      :rules="selectRules"
                                    ></v-select>
                                    <v-textarea
                                      label="Address"
                                      v-model="address_register"
                                      rows="2"
                                      row-height="20"
                                      :rules="addressRules"
                                      clearable
                                    ></v-textarea>
                              <v-select
                              :items="roles"
                              v-model="role_register"
                              label="Role"
                              :rules="selectRoleRules">
                              </v-select>
                              <v-slide-x-transition>
                                <div class="" v-if="role_register != 'Customer' && role_register != null">
                                  <v-text-field
                                    v-model="secret_key"
                                    label="Secret Key"
                                    required
                                    class="pt-0"
                                    :rules="secretKeyRules"
                                    :append-icon="show_secret_key ? 'mdi-eye' : 'mdi-eye-off'"
                                    :type="show_secret_key ? 'text' : 'password'"
                                    @click:append="show_secret_key = !show_secret_key"
                                    clearable
                                  ></v-text-field>
                                </div>
                              </v-slide-x-transition>
                              <v-slide-x-transition>
                                <div class="" v-if="role_register != 'Customer' && role_register != null && role_register != 'Supervisor'">
                                  <v-text-field
                                    v-model="manage_by"
                                    label="Manage By"
                                    required
                                    class="pt-0"
                                    type="text"
                                    clearable
                                    :rules="manageByRules"
                                  ></v-text-field>
                                </div>
                              </v-slide-x-transition>
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
                              <v-slide-y-transition>
                              <v-alert
                              class="mt-6"
                              dense
                              outlined
                              type="error"
                              v-if="register_error">
                              {{register_error}}
                            </v-alert>
                              </v-slide-y-transition>
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
                                class="mb-12 p-3"
                              >
                                <p class="checkAcc">Username : {{username_register}}</p>
                                <p class="checkAcc">Name : {{fname_register + " " + lname_register}}</p>
                                <p class="checkAcc">Email : {{email_register}}</p>
                                <p class="checkAcc">Mobile Number : {{tel_register}}</p>
                                <p class="checkAcc">Gender : {{gender_register}}</p>
                                <p class="checkAcc">Address : {{address_register}}</p>
                              </v-card>
                              <v-btn color="#eabf9f" @click="createAccount">
                                Continue
                              </v-btn>
                              <v-btn text @click="e6 = 2">
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
      </v-main>
    <!-- </v-app> -->
  <!-- </div> -->
</template>
<script>
import AccountService from '../../services/AccountService'

export default {
  name: "Loginregister",
  data: () => ({
    gender: ["Male", "Female", "Other"],
    roles:['Customer', 'Supervisor', 'Operator', 'Driver', 'Transport', 'Shipping'],
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
    role_register:"Customer",
    e6: 1,
    checkbox: false,
    rotation: 0,
    is_supervisor: false,
    select_account_type: "customer",
    is_register_alert: false,
    register_error: "",
    secret_key:"",
    login_error:"",
    manage_by:'',
    show_password:false,
    show_secret_key:false,
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
    ],
    selectRoleRules: [
      (v) => !!v || "Please select role"
    ],
    secretKeyRules: [
      (v) => !!v || "Please enter secret key"
    ],
    manageByRules: [
      (v) => !!v || "Please enter Manager ID"
    ]
  }),
  methods:{
    checkForm(){
      if (this.$refs.register_form.validate()){
        this.e6 = 3;
      }
    },
    switchToSignup(){
      this.clearLoginData()
      this.$store.commit('switch_to_signup')
    },
    switchToSignin(){
      this.clearRegisterData()
      this.$store.commit('switch_to_login')
    },
    async createAccount(){
      try{
        var result = await AccountService.createAccount(this.createJSON());
        console.log(result)
        alert("Register Successfully!!")
        this.switchToSignin()
      }catch(err){
        console.log(err.response)
        this.register_error = err.response.data
        this.e6 = 2
      }
    },
    createJSON(){
      var form = new FormData();
      form.append('username', this.username_register);
      form.append('password', this.password_register);
      form.append('name', this.fname_register + " " + this.lname_register);
      form.append('email', this.email_register);
      form.append('telephone', this.tel_register);
      form.append('type', this.role_register);
      form.append('gender', this.gender_register);
      form.append('address', this.address_register);
      if (this.role_register != 'Customer'){
        form.append('secret_key', this.secret_key)
        if (this.role_register != 'Supervisor'){
          form.append('manage_by', this.manage_by)
        }
      }
      return form
    },
    async login(e){
      e.preventDefault();
      try{
        this.login_error = ''
        var result = await AccountService.Login(this.createLoginJSON());
        console.log(result)
        this.$store.commit('setUser', result.data)
        this.$router.push({name:'Index'})
      }catch(err){
        console.log(err.response)
        this.login_error = err.response.data
      }
    },
    createLoginJSON(){
      var form = new FormData();
      form.append('username', this.username_login);
      form.append('password', this.password_login);
      return form;
    },
    clearRegisterData(){
      this.e6 = 1
      this.register_error = ""
      this.$refs.register_form.reset()
      
    },
    clearLoginData(){
      this.$refs.login_form.reset()
      this.login_error = ""
    }
  },
  computed:{
    show_login(){
      return this.$store.state.show_login
    },
    page(){
      return this.$store.state.login_regis_page
    }
  },
  created(){
    this.$root.$refs.Login = this
  },
  async beforeCreate(){
    try{
      let result = await AccountService.getSession()
      console.log(result)
      this.$store.commit('setUser', result.data)
      this.$router.push({name:'Index'})
    }
      catch(err){
        console.log(err.response)
    }
  }
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
  font-size: 0.75em;
  padding-top: 7.5px;
}
.checkAcc{
  font-size: 0.9em;
  margin-bottom: 5px !important;
}
.secretCode{
  margin-top: 20px;
}
</style>
