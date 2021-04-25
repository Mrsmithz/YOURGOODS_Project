<template>
  <div>
    <div
      class="dropZone"
      :class="[dragover ? 'dragenter' : '']"
      @dragover.prevent
      @drop="drop"
      @click="clickToAdd"
      @dragenter="dragover = true"
      @dragleave="dragover = false"
    >
      <p class="text" v-if="files.length">{{ files.length }} files selected</p>
      <p v-if="!files.length">Click or drag and drop files in to the box</p>
      <div class="input-container mb-3">
        <template v-for="file in files">
          <v-input
            append-icon="mdi-close"
            @click:append="remove(file)"
            prepend-icon="mdi-file"
            :key="file.name"
            class="mt-2"
          >
            {{ file.name }}
            <v-slide-x-transition>
              <v-icon
                :key="file.name + 'icon'"
                color="success"
                class="pl-2"
                v-if="file.uploadProgress == 100"
              >
                mdi-checkbox-marked-circle-outline
              </v-icon>
            </v-slide-x-transition>
          </v-input>

          <v-progress-linear
            :value="file.uploadProgress"
            :key="file.name + 'progress'"
            v-show="start_upload"
          ></v-progress-linear>
        </template>
      </div>
      <input
        ref="filebtn"
        class="filebtn"
        type="file"
        accept=".pdf, .jpg, .png, .bmp, .docx, .doc, .ppt, .txt, .xls, .xlsx"
        multiple
        @input="drop"
      />
    </div>
    <v-row class="mt-2">
      <v-col align="center" justify="center">
        <v-btn @click="upload">SUBMIT</v-btn>
        <v-btn class="ml-3 button is-danger" @click="reset">RESET</v-btn>
      </v-col>
    </v-row>
    <v-row class="pt-6">
      <v-col>
        <v-data-table
          :headers="headers_upload_history"
          :items="uploaded"
          :search="search"
          :items-per-page="5"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Upload History</v-toolbar-title>
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
          <template v-slot:[`item.created_datetime`]="{ item }">
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <span v-on="on">{{ item.created_datetime }}</span>
              </template>
              {{ item.full_created_datetime }}
            </v-tooltip>
          </template>
          <template v-slot:[`item.modified_datetime`]="{ item }">
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <span v-on="on">{{ item.modified_datetime }}</span>
              </template>
              {{ item.full_modified_datetime }}
            </v-tooltip>
          </template>
          <template v-slot:[`item.file_name`]="{ item }">
            <div class="text-truncate" style="max-width:20em">
              <v-icon class="ml-1" @click="openDocument(item.file_url)"
                >mdi-file-document-outline</v-icon
              >
              {{ item.file_name }}
            </div>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-badge
              overlap
              :value="item.message_count"
              :content="item.message_count"
            >
              <v-btn
                small
                color="success"
                class="mr-2"
                @click="showContactModal(item)"
              >
                CONTACT
              </v-btn>
            </v-badge>

            <v-icon class="ml-2 mr-2" @click="editUploaded(item)">
              mdi-pencil
            </v-icon>
            <v-icon @click="deleteUploaded(item)">
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import CustomerService from "../../../services/CustomerService";
import ContactsService from "../../../services/ContactsService";
export default {
  name: "UploadDocument",
  components: {},
  data: () => ({
    dragover: false,
    files: [],
    showContact: false,
    start_upload: false,
    search: "",
    sortBy: "created_datetime",
    sortDesc: false,
    editTemp: "",
    unreadMessage: [],
    interval: "",
    headers_upload_history: [
      {
        text: "File Name",
        align: "start",
        value: "file_name",
      },
      { text: "Status", value: "status" },
      { text: "Operator", value: "operator" },
      { text: "Created Date Time", value: "created_datetime" },
      { text: "Modified Date Time", value: "modified_datetime" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    uploaded: [],
  }),
  mounted() {
    this.getUnReadMessage();
    this.getUploadHistory();
    this.interval = setInterval(() => {
      this.getUnReadMessage();
      this.getUploadHistory();
    }, 1000);
    console.log(this.interval);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  beforeUpdate() {
    clearInterval(this.interval);
  },
  computed: {
    ContactModalState: {
      get: function() {
        return this.$store.getters.getContactModal;
      },
      set: function(newValue) {
        return newValue;
      },
    },
  },
  methods: {
    countMessage(id) {
      let result = this.unreadMessage.filter((el) => el.sender_id == id).length;
      return result;
    },
    async getUnReadMessage() {
      try {
        let result = await ContactsService.getUnReadMessageByReceiver();
        this.unreadMessage = result.data;
      } catch (err) {
        console.log(err);
      }
    },
    showContactModal(item) {
      this.$store.commit("setTempOperatorContactId", item.operator_id);
      this.$store.commit("showContactModal");
      setTimeout(() => {
        this.getUnReadMessage();
        this.getUploadHistory();
      }, 1000);
    },
    openDocument(file_url) {
      window.open(file_url);
    },
    async editUploaded(item) {
      this.editTemp = item;
      this.$refs.filebtn.click();
    },
    async deleteUploaded(item) {
      try {
        let result = await CustomerService.deleteRequest(item.id);
        this.getUploadHistory();
        console.log(result);
      } catch (err) {
        console.log(err);
      }
    },
    async upload() {
      this.start_upload = true;
      for (let file of this.files) {
        try {
          if (file.uploadProgress == 0 && file.editTemp) {
            let result = await CustomerService.editRequest(
              file.editTemp.id,
              this.createFormData(file),
              file,
              this.progressBar
            );
            this.editTemp = "";
            file.editTemp = "";
            console.log(result);
          } else if (file.uploadProgress == 0) {
            let result = await CustomerService.createRequest(
              this.createFormData(file),
              file,
              this.progressBar
            );
            console.log(result);
          }
        } catch (err) {
          console.log(err);
        }
      }
      this.getUploadHistory();
    },
    getFullTime(time) {
      var date = new Date(time);
      date.setTime(date.getTime() + 7 * 60 * 60 * 1000);
      return `${
        date.toISOString().match(/\d+:\d+:\d+/)[0]
      } ${date.toDateString()}`;
    },
    async getUploadHistory() {
      try {
        let result = await CustomerService.getAllRequestByCustomerId();
        let data = result.data;
        this.uploaded = [];
        for (let item of data) {
          var obj = {
            id: item.id,
            file_name: item.document.match(/`.+`/)[0].replaceAll("`", ""),
            operator: item.operator_name,
            status: item.status,
            created_datetime: this.getFullTime(item.created_datetime), //new Date(item.created_datetime).toDateString(),
            modified_datetime: this.getFullTime(item.modified_datetime), //new Date(item.modified_datetime).toDateString(),
            full_created_datetime: this.getFullTime(item.created_datetime),
            full_modified_datetime: this.getFullTime(item.modified_datetime),
            operator_id: item.operator_id,
            file_url: `http://localhost:25800/${item.document}`,
            message_count: this.countMessage(item.operator_id),
          };
          this.uploaded.push(obj);
        }
        console.log(this.uploaded);
      } catch (err) {
        console.log(err);
      }
    },
    createFormData(file) {
      var form = new FormData();
      form.append("document", file);
      form.append("status", "pending");
      //form.append("operator_id", 13);
      //form.append("customer_id", this.$store.getters.getUser.id);
      return form;
    },
    progressBar(percent, file) {
      file.uploadProgress = percent;
      this.$forceUpdate();
    },
    remove(file) {
      if (!this.start_upload) {
        this.files = this.files.filter((el) => {
          return el.name != file.name;
        });
      }
    },
    reset() {
      this.getUploadHistory();
      this.files = [];
    },
    drop(e) {
      e.preventDefault();
      var files = e.target.files || e.dataTransfer.files;
      this.dragover = false;
      if (this.editTemp) {
        this.AddToFiles(files, this.editTemp);
        this.upload();
      } else {
        this.AddToFiles(files);
      }
    },
    clickToAdd() {
      this.$refs.filebtn.click();
    },
    AddToFiles(files, editTemp) {
      for (let file of files) {
        let found = false;
        for (let el of this.files) {
          if (file.name == el.name) {
            found = true;
            break;
          }
        }
        if (!found) {
          file.uploadProgress = 0;
          if (editTemp) {
            file.editTemp = editTemp;
          }
          this.files.push(file);
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.dropZone {
  border: 2px dashed #eee;
  min-height: 15rem;
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  //overflow:hidden;
  transition: background-color 0.2s;
  //padding-bottom:15rem
}
.dropZone:hover {
  border: 2px solid #ada;
}
.dragenter {
  border: 2px solid #ada;
}
div.input-container {
  min-width: 50%;
}
p {
  margin: 0;
  font-size: 2em;
  font-weight: 500;
}
// .v-input {
//   ::v-deep div.v-input__control {
//     div.v-input__slot {
//       margin-top: 4px;
//       margin-bottom: 0 !important;
//     }
//     div.v-messages {
//       display: none;
//     }
//   }
// }
input.filebtn {
  display: none;
}
</style>
