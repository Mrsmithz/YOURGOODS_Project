<template>
  <div>
    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="vehicle"
          data:items-per-page="5"
          :search="search"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>All Vehicles</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="createDialog = true"
                >Add NEW VEHICLE</v-btn
              >
            </v-toolbar>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon class="ml-2 mr-2" @click="showEdit(item)">
              mdi-pencil
            </v-icon>
            <v-icon @click="deleteVehicle(item)">
              mdi-delete
            </v-icon>
          </template>
          <template v-slot:[`item.status`]="{ item }">
            <v-col cols="auto">
              <v-select
                class="statusSelector"
                :items="statusList"
                :value="{ text: item.status, value: item.status.toLowerCase() }"
                item-value="value"
                item-text="text"
                @input="editVehicleStatus(item, $event)"
              ></v-select>
            </v-col>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-dialog v-model="editDialog" max-width="50%" @click:outside="showEdit">
      <v-card>
        <v-card-title>Edit Vehicle</v-card-title>
        <v-card-text>
          <v-form ref="edit_form">
            <v-row>
              <v-col>
                <v-text-field
                  label="Plate Number"
                  v-model="edit_plate_number"
                  :readonly="!editMode"
                  :rules="plateRules"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  label="Name"
                  v-model="edit_name"
                  :readonly="!editMode"
                  :rules="requiredRules"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  label="Type"
                  v-model="edit_type"
                  :readonly="!editMode"
                  :rules="requiredRules"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  label="Brand"
                  v-model="edit_brand"
                  :readonly="!editMode"
                  :rules="requiredRules"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
          <v-btn v-if="!editMode" @click="editMode = true">Edit</v-btn>
          <v-btn v-if="editMode" @click="editVehicle">Save</v-btn>
          <v-btn class="ml-2" v-if="editMode" @click="resetEdit">Reset</v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="createDialog" max-width="50%" @click:outside="resetCreate">
      <v-card>
        <v-card-title>
          Add Vehicle
        </v-card-title>
        <v-card-text>
          <v-form ref="create_form">
            <v-row>
              <v-col>
                <v-text-field
                  label="Plate Number"
                  v-model="create_plate_number"
                  :rules="requiredRules"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  label="Name"
                  v-model="create_name"
                  :rules="requiredRules"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  label="Type"
                  v-model="create_type"
                  :rules="requiredRules"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  label="Brand"
                  v-model="create_brand"
                  :rules="requiredRules"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
          <v-btn color="primary" @click="addVehicle">Add</v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import VehicleService from "../../../services/VehicleService";
export default {
  name: "ManageVehicle",
  data: () => ({
    search: "",
    editMode: "",
    editDialog: false,
    createDialog: false,
    tempEdit: "",
    edit_plate_number: "",
    edit_name: "",
    edit_type: "",
    edit_brand: "",
    create_plate_number: "",
    create_type: "",
    create_name: "",
    create_brand: "",
    headers: [
      {
        text: "Plate Number",
        align: "start",
        value: "plate_number",
      },
      { text: "Vehicle Name", value: "name" },
      { text: "Status", value: "status" },
      { text: "Type", value: "type" },
      { text: "Brand", value: "brand" },
      { text: "Actions", value: "actions", align: "center", sortable: false },
    ],
    statusList: [
      { text: "Available", value: "available" },
      { text: "Not Available", value: "not_available" },
    ],
    vehicle: [],
    requiredRules: [(v) => !!v || "This Field is required"],
    plateRules: [
      (v) => !!v || "This Field is required",
      (v) => (v && v.length <= 20) || "Plate Number is maxed at 20 characters",
    ],
  }),
  methods: {
    async editVehicle() {
      let conf = confirm("Confirm edit ?");
      if (conf && this.$refs.edit_form.validate()) {
        try {
          let form = new FormData();
          form.append("plate_number", this.tempEdit.plate_number);
          form.append("new_plate_number", this.edit_plate_number);
          form.append("type", this.edit_type);
          form.append("name", this.edit_name);
          form.append("brand", this.edit_brand);
          let result = await VehicleService.editVehicle(form);
          console.log(result);
          this.editMode = false;
          this.getAllVehicle();
        } catch (err) {
          console.log(err);
        }
      }
    },
    async addVehicle() {
      if (this.$refs.create_form.validate()) {
        try {
          let form = new FormData();
          form.append('plate_number', this.create_plate_number);
          form.append('name', this.create_name);
          form.append('type', this.create_type);
          form.append('brand', this.create_brand);
          let result = await VehicleService.addVehicle(form)
          console.log(result)
          this.$refs.create_form.reset()
          this.getAllVehicle();
        } catch (err) {
            console.log(err);
        }
      }
    },
    resetCreate(){
        this.$refs.create_form.reset()
    },
    resetEdit() {
      this.edit_plate_number = this.tempEdit.plate_number;
      this.edit_name = this.tempEdit.name;
      this.edit_type = this.tempEdit.type;
      this.edit_brand = this.tempEdit.brand;
      this.editMode = false;
    },
    showEdit(item) {
      if (item) {
        this.tempEdit = item;
        this.edit_plate_number = item.plate_number;
        this.edit_name = item.name;
        this.edit_type = item.type;
        this.edit_brand = item.brand;
      }
      this.editDialog = !this.editDialog;
      if (!this.editDialog) {
        this.tempEdit = "";
        this.$refs.edit_form.reset();
        this.editMode = false;
      }
    },
    async editVehicleStatus(item, event) {
      try {
        let form = new FormData();
        form.append("status", event);
        form.append("plate_number", item.plate_number);
        let result = await VehicleService.updateVehicleStatus(form);
        console.log(result);
      } catch (err) {
        console.log(err);
      }
    },
    async deleteVehicle(item) {
      let conf = confirm("Confirm Delete ?");
      if (conf) {
        try {
          let result = await VehicleService.deleteVehicle(item.plate_number);
          this.getAllVehicle();
          console.log(result);
        } catch (err) {
          console.log(err);
        }
      }
    },
    async getAllVehicle() {
      try {
        let result = await VehicleService.getAllVehicleByManagerId();
        this.vehicle = [];
        for (let item of result.data) {
          let obj = {
            name: item.name,
            brand: item.brand,
            plate_number: item.plate_number,
            status: item.status.toUpperCase(),
            type: item.type,
            manage_by: item.manage_by,
          };
          this.vehicle.push(obj);
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {
    this.getAllVehicle();
  },
};
</script>
