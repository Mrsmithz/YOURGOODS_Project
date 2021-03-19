<template>
  <div v-show="show_login">
    <v-app id="logregis">
      <v-content class="whole_screen">
        <v-container class="fill-height" fluid>
          <v-row align="center" justify="center">
            <v-col cols="12" sm="10" md="10">
              <v-card class="elevation-12">
                <div class="pa-6 whole_pane">
                  <v-window v-model="page">
                    <v-window-item :value="1">
                      <v-row>
                        <v-col
                          class="white login_pane pl-6 pt-6 pb-6"
                          cols="12"
                          md="8"
                        >
                          <v-card-text class="mt12">
                            <h1
                              class="text-center pt-10 pb-10 login_head has-text-weight-bold is-size-1"
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
                          >
                            <v-text-field
                              class="pl-15 pr-15 field"
                              prepend-icon="fas fa-user"
                              v-model="name"
                              :counter="10"
                              label="Username"
                              color="#aa96da"
                              :rules="nameRules"
                              required
                            />
                            <v-text-field
                              class="pl-15 pr-15 field"
                              prepend-icon="fas fa-lock"
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
                            @click="page++"
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
                            @click="page--"
                            >Sign in</v-btn
                          >
                        </v-col>
                        <v-col
                          class="white register_pane pl-6 pt-6 pb-6"
                          cols="12"
                          md="8"
                        >
                          <v-card-text class="mt12">
                            <h1
                              class="text-center pt-10 pb-10 register_head has-text-weight-bold is-size-1"
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
                              color="#fcbad3"
                              :complete="e6 > 1"
                              step="1"
                            >
                              Read Before Do
                              <small>Description</small>
                            </v-stepper-step>

                            <v-stepper-content step="1">
                              <v-btn color="#fcbad3" @click="e6 = 2">
                                Continue
                              </v-btn>
                              <v-btn text>
                                Cancel
                              </v-btn>
                            </v-stepper-content>

                            <v-stepper-step
                              color="#fcbad3"
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
                              >
                                <v-text-field
                                  v-model="username_register"
                                  :counter="10"
                                  :rules="nameRules"
                                  label="Username"
                                  required
                                ></v-text-field>

                                <v-text-field
                                  v-model="email_register"
                                  :rules="emailRules"
                                  label="E-mail"
                                  required
                                ></v-text-field>

                                <v-text-field
                                  v-model="password_register"
                                  :rules="passwordRules"
                                  label="Password"
                                  required
                                ></v-text-field>

                                <v-checkbox
                                  v-model="checkbox"
                                  :rules="[
                                    (v) => !!v || 'You must agree to continue!',
                                  ]"
                                  label="Do you agree?"
                                  required
                                ></v-checkbox>
                              </v-form>
                              <v-btn color="#fcbad3" @click="e6 = 3">
                                Continue
                              </v-btn>
                              <v-btn text @click="e6 = 1">
                                Cancel
                              </v-btn>
                            </v-stepper-content>

                            <v-stepper-step
                              color="#fcbad3"
                              :complete="e6 > 3"
                              step="3"
                            >
                              Check your account
                            </v-stepper-step>

                            <v-stepper-content step="3">
                              <v-card
                                color="grey lighten-1"
                                class="mb-12"
                                height="200px"
                              ></v-card>
                              <v-btn color="#fcbad3" @click="e6 = 4">
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
      </v-content>
    </v-app>
  </div>
</template>
<script>
export default {
  name: "Loginregister",
  data: () => ({
    page: 1,
    name: "",
    valid: "",
    email: "",
    username_register: "",
    password_register: "",
    email_register: "",
    e6: 1,
    checkbox: false,
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
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
  }),
  methods:{
  },
  computed:{
    show_login(){
      return this.$store.state.show_login
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
  -webkit-text-stroke: 0.5px #ffffd2;
}
.login_button {
  -webkit-text-stroke: 0.5px #ffffd2;
}
.login_font {
  font-size: 2rem;
  color: white;
  -webkit-text-stroke: 0.5px black;
}
h1.register_head {
  color: #fcbad3;
  font-size: 10em;
  -webkit-text-stroke: 0.5px #ffffd2;
}
.v-stepper__step__step.primary {
  background-color: red !important;
  border-color: red !important;
}
.signin_button.theme--light.v-btn.v-btn--has-bg {
  background-color: white;
  color: #aa96da;
  width: 7em;
  height: 4em;
  font-size: 1rem;
}
.signout_button.theme--light.v-btn.v-btn--has-bg {
  background-color: white;
  color: #fcbad3;
  width: 7em;
  height: 4em;
  font-size: 1rem;
}
</style>
