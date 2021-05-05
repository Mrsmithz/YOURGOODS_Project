<template>
  <v-dialog v-model="ChangePasswordModalState" max-width="60rem" @click:outside="[clearForm(), showChangePasswordModal()]">
    <v-card>
      <v-card-title>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="6" md="4" align="center" justify="center">
            <h1>Change Password</h1>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row align="center" justify="center" v-if="password_error">
            <v-col cols="12" sm="6" md="4" align="center" justify="center">
              <v-slide-x-transition>
                <v-alert dense outlined type="error" max-width="20rem">
                  {{password_error}}
                </v-alert>
              </v-slide-x-transition>
            </v-col>
          </v-row>
          <v-form ref="password_form">
            <v-row align="center" justify="center">
              <v-col cols="12" sm="6" md="4" align="center" justify="center">
                <v-text-field
                  label="Current Password"
                  :append-icon="
                    show_current_password ? 'mdi-eye' : 'mdi-eye-off'
                  "
                  :type="show_current_password ? 'text' : 'password'"
                  :rules="passwordRules"
                  v-model="current_password"
                  @click:append="show_current_password = !show_current_password"
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row align="center" justify="center">
              <v-col cols="12" sm="6" md="4" align="center" justify="center">
                <v-text-field
                  label="New Password"
                  :append-icon="show_new_password ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show_new_password ? 'text' : 'password'"
                  :rules="passwordRules"
                  v-model="new_password"
                  @click:append="show_new_password = !show_new_password"
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row align="center" justify="center">
              <v-col cols="12" sm="6" md="4" align="center" justify="center">
                <v-text-field
                  label="Confirm New Password"
                  :append-icon="
                    show_confirm_password ? 'mdi-eye' : 'mdi-eye-off'
                  "
                  :type="show_confirm_password ? 'text' : 'password'"
                  :rules="[...passwordRules, passwordConfirmRules]"
                  v-model="confirm_password"
                  @click:append="show_confirm_password = !show_confirm_password"
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row align="center" justify="center">
              <v-col cols="12" sm="6" md="4" align="center" justify="center">
                <v-btn text class="button is-primary" @click="updatePassword"
                  >Update Password</v-btn
                >
                <v-btn text class="button is-danger is-outlined ml-3" @click="showChangePasswordModal"
                  >Close</v-btn
                >
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import AccountService from '../../services/AccountService'
export default {
  name: "ChangePasswordModal",
  data: () => ({
    dialog: false,
    show_confirm_password: false,
    show_new_password: false,
    show_current_password: false,
    current_password: "",
    new_password: "",
    confirm_password: "",
    password_error:"",
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) =>
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(v) ||
        "Password must contain at least lowercase letter, one number, and one uppercase letter and has at least 8 characters",
    ],
  }),
  methods: {
    async updatePassword() {
      if (this.$refs.password_form.validate()) {
        try{
          let form = new FormData()
          form.append('old_password', this.current_password)
          form.append('new_password', this.new_password)
          form.append('confirmed_new_password', this.confirm_password)
          let result = await AccountService.updatePassword(form)
          console.log(result)
          this.$refs.password_form.reset()
          alert('Success')
        }
        catch(err){
          console.log(err.response)
        }
      }
    },
    clearForm(){
        this.$refs.password_form.reset()
    },
    showChangePasswordModal(){
        this.$store.commit('showChangePasswordModal')
    }
  },
  computed: {
    passwordConfirmRules() {
      return () =>
        this.confirm_password == this.new_password || "New Password and Confirm Password Must Matched";
    },
    ChangePasswordModalState:{
        get:function(){
            return this.$store.getters.getChangePasswordModal
        },
        set:function(newValue){
            return newValue
        }
    }
  },
  created(){
      this.$root.$refs.ChangePasswordModal = this
  }
};
</script>
