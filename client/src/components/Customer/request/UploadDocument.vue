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
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn
              color="success"
              class="mr-2"
              @click="showContactModal"
            >
              CONTACT
            </v-btn>
            <v-icon class="ml-2 mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon @click="deleteItem(item)">
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "UploadDocument",
  components: {
  },
  data: () => ({
    dragover: false,
    files: [],
    showContact: false,
    start_upload: false,
    search: "",
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
    uploaded: [
      {
        file_name: "test.pdf",
        status: "pending",
        operator: "John Smith",
        created_datetime: new Date().toDateString(),
        modified_datetime: new Date().toDateString(),
      },
    ],
  }),
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
    showContactModal(){
        this.$store.commit('showContactModal')
    },
    async upload() {
      this.start_upload = true;
      let delay = 100;
      try {
        await Promise.all(
          this.files.map(async (file) => {
            delay += 50;
            return await this.test(file, delay);
          })
        );
      } catch (err) {
        console.log(err);
      }
    },
    remove(file) {
      if (!this.start_upload) {
        this.files = this.files.filter((el) => {
          return el.name != file.name;
        });
      }
    },
    reset() {
      this.files = [];
    },
    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    async test(file, ms) {
      let interval = setInterval(() => {
        file.uploadProgress += 5;
        console.log(file.uploadProgress);
        this.$forceUpdate();
      }, ms);
      while (file.uploadProgress != 100) {
        await this.sleep(100);
      }
      clearInterval(interval);
      return Promise.resolve();
    },
    drop(e) {
      e.preventDefault();
      var files = e.target.files || e.dataTransfer.files;
      this.AddToFiles(files)
      this.dragover = false;
    },
    clickToAdd() {
      this.$refs.filebtn.click();
    },
    AddToFiles(files) {
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
