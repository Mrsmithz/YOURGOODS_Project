<template>
  <v-app id="creteOrder">
    <v-main class="whole_screen">
      <v-container fluid style="padding-top: 5rem">
        <v-row align="center" justify="center">
          <v-card elevation="1" class="card_1 mb-4">
            <v-btn
              elevation="3"
              x-large
              width="200"
              color="#b68973"
              class="white--text mr-5"
              >สร้างออเดอร์</v-btn
            >

            <v-btn
              elevation="3"
              x-large
              width="120"
              height="40"
              outlined
              dense
              id="btn_filter_all"
              class="mr-2"
              >ทั้งหมด
              <span
                style="
                  background-color: #b68973;
                  color: #fff;
                  border-radius: 10px;
                  padding: 0.1rem 0.4rem;
                  margin-left: 5px;
                "
                >0</span
              ></v-btn
            >

            <v-btn
              elevation="3"
              x-large
              width="170"
              height="40"
              outlined
              dense
              id="btn_filter_all"
              class="mr-2"
              >กำลังดำเนินการ
              <span
                style="
                  background-color: #b68973;
                  color: #fff;
                  border-radius: 10px;
                  padding: 0.1rem 0.4rem;
                  margin-left: 5px;
                "
                >0</span
              ></v-btn
            >

            <v-btn
              elevation="3"
              x-large
              width="150"
              height="40"
              outlined
              dense
              id="btn_filter_all"
              class="mr-2"
              >รอการยืนยัน
              <span
                style="
                  background-color: #b68973;
                  color: #fff;
                  border-radius: 10px;
                  padding: 0.1rem 0.4rem;
                  margin-left: 5px;
                "
                >0</span
              ></v-btn
            >

            <v-btn
              elevation="3"
              x-large
              width="120"
              height="40"
              outlined
              dense
              id="btn_filter_all"
              class="mr-2"
              >เสร็จสิ้น
              <span
                style="
                  background-color: #b68973;
                  color: #fff;
                  border-radius: 10px;
                  padding: 0.1rem 0.4rem;
                  margin-left: 5px;
                "
                >0</span
              ></v-btn
            >
          </v-card>

          <v-card elevation="1" class="card_1 mb-4">
            <v-row>
              <v-col md="6">
                <v-text-field
                    v-model="search"
                    label="ค้นหา"
                  ></v-text-field>
              </v-col>
              <v-col md="6">
              </v-col>
            </v-row>
          </v-card>

          <v-card elevation="1" class="card_1">
            <v-data-table
              :headers="table_header"
              :items="orders"
              :page.sync="page"
              :items-per-page="itemsPerPage"
              hide-default-footer
              class="black-table"
              @page-count="pageCount = $event"
              :search="search"
            >
              
            </v-data-table>
            <div class="text-center pt-2">
              <v-pagination v-model="page" :length="pageCount" circle color="#b68973"></v-pagination>
              <v-text-field
                :value="itemsPerPage"
                label="Items per page"
                type="number"
                min="-1"
                max="15"
                class="input_per_page"
                @input="itemsPerPage = parseInt($event, 10)"
              ></v-text-field>
            </div>
          </v-card>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
export default {
  name: "creteOrder",
  data: () => ({
    name: "",
    page: 1,
    pageCount: 0,
    itemsPerPage: 10,
    search: "",
    table_header: [
      { text: "Order id", value: "id", class: "text-center" },
      { text: "File name", value: "name" },
      { text: "Status", value: "status" },
      { text: "Created date", value: "created_date" },
      { text: "Edited date", value: "edited_date" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    orders: [
      {
        id: 125485,
        name: "file_name",
        status: "pending",
        created_date: "2021-04-06",
        edited_date: "2021-04-06",
      },
    ],
  }),
  methods:{

  }
};
</script>
<style scoped>
.card_1 {
  padding: 1rem;
}

.v-btn {
  letter-spacing: -0.2px;
}

.active {
  background-color: rgb(95, 83, 83) !important;
  color: white !important ;
}

.black-table .v-table tbody tr {
  background: red !important;
}

.input_per_page{
  width: 5rem;
  position: relative; 
  top: -50px;
  margin-left: auto;
}

</style>