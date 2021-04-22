<template>
  <v-dialog
    v-model="ProfileModalState"
    max-width="60rem"
    @click:outside="showProfileModal"
  >
    <v-card>
      <v-card-title>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="6" md="4" align="center" justify="center">
            <v-avatar size="200">
              <img
                alt="user"
                src="https://randomuser.me/api/portraits/women/81.jpg"
              />
            </v-avatar>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form ref="profile_form">
            <v-row align="center" justify="center">
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="First Name"
                  required
                  :readonly="edit_firstname"
                  v-model="first_name"
                  :append-icon="
                    edit_firstname ? 'mdi-pencil-off' : 'mdi-pencil'
                  "
                  :rules="first_nameRules"
                  @click:append="toggleEditFirstname"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Last Name"
                  required
                  v-model="last_name"
                  :readonly="edit_lastname"
                  :append-icon="edit_lastname ? 'mdi-pencil-off' : 'mdi-pencil'"
                  :rules="last_nameRules"
                  @click:append="toggleEditLastname"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row align="center" justify="center">
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Email"
                  required
                  v-model="email"
                  :readonly="edit_email"
                  :append-icon="edit_email ? 'mdi-pencil-off' : 'mdi-pencil'"
                  :rules="emailRules"
                  @click:append="toggleEditEmail"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Telephone"
                  required
                  v-model="telephone"
                  :readonly="edit_tel"
                  :append-icon="edit_tel ? 'mdi-pencil-off' : 'mdi-pencil'"
                  :rules="telRules"
                  @click:append="toggleEditTel"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row align="center" justify="center">
              <v-col cols="12" sm="6" md="4">
                <v-textarea
                  label="Address"
                  required
                  counter
                  rows="1"
                  auto-grow
                  v-model="address"
                  :readonly="edit_address"
                  :append-icon="edit_address ? 'mdi-pencil-off' : 'mdi-pencil'"
                  :rules="addressRules"
                  @click:append="toggleEditAddress"
                ></v-textarea>
              </v-col>
            </v-row>
            <v-row align="center" justify="center">
              <v-col
                cols="12"
                sm="6"
                md="4"
                align="center"
                justify="center"
                v-show="email == user.email && !edit_profile"
              >
                <v-btn
                  text
                  class="button is-danger is-outlined"
                  @click="showProfileModal"
                  >Close</v-btn
                >
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
                align="center"
                justify="center"
                v-show="edit_profile && email == user.email"
              >
                <v-btn text class="button is-primary" @click="test">Update Profile</v-btn>
                <v-btn
                  text
                  class="button is-danger is-outlined ml-3"
                  @click="getData"
                  >Reset</v-btn
                >
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
                align="center"
                justify="center"
                v-show="email != user.email"
              >
                <v-btn text class="button is-primary" @click="test">Update Email</v-btn>
                <v-btn
                  text
                  class="button is-danger is-outlined ml-3"
                  @click="getData"
                  >Reset</v-btn
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
export default {
  name: "ProfileModal",
  data: () => ({
    dialog: false,
    edit_firstname: true,
    edit_lastname: true,
    edit_email: true,
    edit_tel: true,
    edit_address: true,
    first_name: "",
    last_name: "",
    email: "",
    telephone: "",
    address: "",
    first_nameRules: [(v) => !!v || "Firstname is required"],
    last_nameRules: [(v) => !!v || "Lastname is required"],
    addressRules: [(v) => !!v || "Address is required"],
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) =>
        /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          v
        ) || "E-mail must be valid",
    ],
    telRules: [
      (v) => !!v || "Mobile number is required",
      (v) => /^0\d{9}$/.test(v) || "Mobile number is invalid.",
    ],
  }),
  created() {
    this.$root.$refs.ProfileModal = this;
    this.getData();
  },
  methods: {
    toggleEditFirstname() {
      this.edit_firstname = !this.edit_firstname;
    },
    toggleEditLastname() {
      this.edit_lastname = !this.edit_lastname;
    },
    toggleEditEmail() {
      this.edit_email = !this.edit_email;
    },
    toggleEditTel() {
      this.edit_tel = !this.edit_tel;
    },
    toggleEditAddress() {
      this.edit_address = !this.edit_address;
    },
    showProfileModal() {
      this.$store.commit("showProfileModal");
      this.getData();
    },
    getData() {
      this.first_name = this.user.name.split(" ")[0];
      this.last_name = this.user.name.split(" ")[1];
      this.email = this.user.email;
      this.telephone = this.user.telephone;
      this.address = this.user.address;
      this.edit_firstname = true;
      this.edit_lastname = true;
      this.edit_email = true;
      this.edit_tel = true;
      this.edit_address = true;
    },
    test() {
      if (this.$refs.profile_form.validate()) {
        console.log("test");
      }
    },
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
    edit_profile() {
      return (
        this.user.name.split(" ")[0] != this.first_name ||
        this.user.name.split(" ")[1] != this.last_name ||
        this.telephone != this.user.telephone ||
        this.address != this.user.address
      );
    },
    ProfileModalState: {
      get: function() {
        return this.$store.getters.getProfileModal;
      },
      set: function(newValue) {
        return newValue;
      },
    },
  },
};
</script>
