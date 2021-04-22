<template>
  <v-dialog v-model="ContactModalState" max-width="60rem" @click:outside="showContactModal">
    <v-row class="no-gutters elevation-4">
      <v-col
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
      </v-col>
      <v-col cols="auto" class="flex-grow-1 flex-shrink-0">
        <v-responsive
          v-if="activeChat"
          class="overflow-y-hidden fill-height"
          height="500"
        >
          <v-card flat class="d-flex flex-column fill-height">
            <v-card-title>John Smith</v-card-title>
            <v-card-text class="flex-grow-1 overflow-y-auto">
              <template v-for="msg in messages">
                <div
                  :class="{ 'd-flex flex-row-reverse': msg.me }"
                  :key="msg.content"
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
                @keyup.enter="messages.push(messageForm)"
                @click:append-outer="messages.push(messageForm)"
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
export default {
  name: "Contact",
  data: () => ({
    dialog: true,
    activeChat: true,
    parents: [
      {
        id: 1,
        title: "john doe",
        active: true,
      },
      {
        id: 2,
        title: "scarlett",
        active: false,
      },
      {
        id: 3,
        title: "scarlett",
        active: false,
      },
      {
        id: 4,
        title: "scarlett",
        active: false,
      },
      {
        id: 5,
        title: "scarlett",
        active: false,
      },
      {
        id: 6,
        title: "scarlett",
        active: false,
      },
      {
        id: 7,
        title: "scarlett",
        active: false,
      },
    ],
    messages: [
      {
        content: "lorem ipsum",
        me: true,
        created_at: "11:11am",
      },
      {
        content: "dolor",
        me: false,
        created_at: "11:11am",
      },
      {
        content: "dolor",
        me: false,
        created_at: "11:11am",
      },
      {
        content: "dolor",
        me: false,
        created_at: "11:11am",
      },
      {
        content: "dolor",
        me: false,
        created_at: "11:11am",
      },
      {
        content: "dolor",
        me: false,
        created_at: "11:11am",
      },
      {
        content: "dolor",
        me: false,
        created_at: "11:11am",
      },
      {
        content: "dolor",
        me: false,
        created_at: "11:11am",
      },
      {
        content: "dolor",
        me: false,
        created_at: "11:11am",
      },
    ],
  }),
  methods:{
      showContactModal(){
          this.$store.commit('showContactModal')
      }
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
};
</script>
