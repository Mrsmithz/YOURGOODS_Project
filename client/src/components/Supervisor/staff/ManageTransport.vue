<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="detail"
      :items-per-page="5"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Transport Detail</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-toolbar>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import StaffService from '../../../services/StaffServices'
export default {
  name: "ManageTransport",
  data: () => ({
    search: "",
    headers: [
      {
        text: "Transporter Name",
        align: "start",
        value: "transport_name",
      },
      { text: "IN PROGRESS", value: "in_progress", align: "center" },
      { text: "COMPLETED", value: "completed", align: "center" },
      { text: "Username", value: "username", align: "center" },
      { text: "Email", value: "email", align: "center" },
      { text: "Telephone", value: "telephone", align: "center" },
    ],
    detail: [],
  }),
  methods: {
    async getTransportDetail() {
      try {
        let result = await StaffService.getStaffDetail();
        this.detail = [];
        for (let staff of result.data) {
          console.log(staff);
          if (staff.type == "transport") {
            let obj = {
              transport_name: staff.name,
              completed: staff.completed ? staff.completed : 0,
              in_progress: staff.in_progress ? staff.in_progress : 0,
              username: staff.username,
              email: staff.email,
              telephone: staff.telephone,
            };
            this.detail.push(obj);
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {
    this.getTransportDetail();
  },
};
</script>
