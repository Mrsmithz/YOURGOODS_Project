<template>
  <v-dialog
    v-model="ContactModalState"
    max-width="50%"
    @click:outside="showContactModal"
    eager
  >
    <v-row class="no-gutters elevation-4">
      <!-- <v-col
        cols="12"
        sm="3"
        class="flex-grow-1 flex-shrink-0"
        style="border-right: 1px solid #0000001f;"
      >
        <v-responsive class="overflow-y-auto fill-height" height="500">
          <v-list subheader :class="{ 'fill-height': parents.length < 8 }">
            <v-list-item-group v-model="activeChat">
              <template v-for="(item, index) in parents">
                <v-list-item :key="`parent${index}`" :value="item.id">
                  <v-list-item-avatar color="grey lighten-1 white--text">
                    <v-icon>
                      mdi-checkbox-blank
                    </v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.title"></v-list-item-title>
                    <v-list-item-subtitle v-text="'hi'"></v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-icon>
                    <v-icon color="grey">
                      mdi-checkbox-blank
                    </v-icon>
                  </v-list-item-icon>
                </v-list-item>
                <v-divider
                  :key="`chatDivider${index}`"
                  class="my-0"
                ></v-divider>
              </template>
            </v-list-item-group>
          </v-list>
        </v-responsive>
      </v-col> -->
      <v-col cols="auto" class="flex-grow-1 flex-shrink-0">
        <v-responsive class="overflow-y-hidden fill-height" height="500">
          <v-card flat class="d-flex flex-column fill-height">
            <v-card-title>{{receiver_name}}</v-card-title>
            <v-card-text
              class="flex-grow-1 overflow-y-auto"
              ref="chatBox"
              id="chatBox"
            >
              <template v-for="msg in messages">
                <div
                  :class="{ 'd-flex flex-row-reverse': msg.me }"
                  :key="msg.id"
                >
                  <v-menu offset-y>
                    <template v-slot:activator="{ on }">
                      <v-chip
                        :color="msg.me ? 'primary' : ''"
                        dark
                        style="height:auto;white-space: normal;"
                        class="pa-4 mb-2"
                        v-on="on"
                      >
                        {{ msg.content }}
                        <sub class="ml-2" style="font-size: 0.5rem;">{{
                          msg.created_at
                        }}</sub>
                      </v-chip>
                    </template>
                  </v-menu>
                </div>
              </template>
            </v-card-text>
            <v-card-text class="flex-shrink-1">
              <v-text-field
                label="type a message"
                type="text"
                no-details
                outlined
                :append-outer-icon="'mdi-send'"
                v-model="message"
                @keyup.enter="sendMessage"
                @click:append-outer="sendMessage"
                hide-details
              />
            </v-card-text>
          </v-card>
        </v-responsive>
      </v-col>
    </v-row>
  </v-dialog>
</template>
<script>
import ContactsService from "../../services/ContactsService";
export default {
  name: "Contact",
  data: () => ({
    dialog: true,
    activeChat: true,
    message: "",
    msgkey: 13244,
    messages: [],
    receiver_name:''
  }),
  async mounted() {
    //this.$root.$refs.Contact = this
    try {
      await this.getName()
      await this.getMessageBySender();
      await this.updateMessageStatus()
      this.scrollToTop();
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    async updateMessageStatus(){
      try{
        let form = new FormData()
        form.append('status', 'readed')
        form.append('sender_id', this.TempOperatorContactIdState)
        let result = await ContactsService.UpdateMessageStatusByReceiver(form)
        console.log(result)
        return Promise.resolve()
      }
      catch(err){
        console.log(err)
        return Promise.reject()
      }
    },
    showContactModal() {
      this.$store.commit("showContactModal");
    },
    getFullTime(time) {
      var date = new Date(time);
      date.setTime(date.getTime() + 7 * 60 * 60 * 1000);
      return `${date.toISOString().match(/\d+:\d+:\d+/)[0]}`;
    },
    createFormData(receiver_id, message) {
      var form = new FormData();
      form.append("receiver_id", receiver_id);
      if (message) {
        form.append("message", message);
      }
      return form;
    },
    createGetMessageFormData(sender_id) {
      var form = new FormData();
      form.append("sender_id", sender_id);
      return form;
    },
    sortByCreatedDateTime(a, b) {
      if (new Date(a.created_datetime) < new Date(b.created_datetime)) {
        return -1;
      }
      if (new Date(a.created_datetime) > new Date(b.created_datetime)) {
        return 1;
      }
      return 0;
    },
    scrollToTop() {
      this.$refs.chatBox.scrollTop = this.$refs.chatBox.scrollHeight;
    },
    async getName(){
      try{
        let result = await ContactsService.getNameById(this.TempOperatorContactIdState)
        this.receiver_name = result.data[0].name
        return Promise.resolve()
      }
      catch(err){
        console.log(err)
        return Promise.reject()
      }
    },
    async sendMessage() {
      try {
        if (this.message != "") {
          await ContactsService.sendMessage(
            this.createFormData(this.TempOperatorContactIdState, this.message)
          );
          this.message = "";
          await this.getMessageBySender();
          this.scrollToTop()
        }
      } catch (err) {
        console.log(err);
      }
    },
    async getMessageBySender() {
      try {
        let send = await ContactsService.getMessageBySender(
          this.createFormData(this.TempOperatorContactIdState)
        );
        let receive = await ContactsService.getMessageByReceiver(
          this.createGetMessageFormData(this.TempOperatorContactIdState)
        );
        let result = [...send.data, ...receive.data];
        result.sort(this.sortByCreatedDateTime);
        this.messages = [];
        for (let item of result) {
          var obj = {
            id: item.id,
            content: item.message,
            me: item.sender_id == this.UserState.id ? true : false,
            created_at: this.getFullTime(item.created_datetime),
            status:item.status
          };
          this.messages.push(obj);
        }
        return Promise.resolve();
      } catch (err) {
        console.log(err);
        return Promise.reject();
      }
    },
  },
  computed: {
    UserState: {
      get: function() {
        return this.$store.getters.getUser;
      },
      set: function(newValue) {
        return newValue;
      },
    },
    ContactModalState: {
      get: function() {
        return this.$store.getters.getContactModal;
      },
      set: function(newValue) {
        return newValue;
      },
    },
    TempOperatorContactIdState: {
      get: function() {
        return this.$store.getters.getTempOperatorContactId;
      },
      set: function(newValue) {
        return newValue;
      },
    },
  },
};
</script>
