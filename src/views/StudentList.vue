<template>
  <div class="m-2">
    <b-table
      :items="items.data"
      :busy="loading"
      :fields="fields"
      striped
      responsive="sm"
      table-busy
    >
      <template #table-busy>
        <div class="text-center text-dark my-2">
          <b-spinner class="align-middle"></b-spinner>
        </div>
      </template>
      <template #cell(course)="row">
        <b-button size="sm" @click="row.toggleDetails" class="mr-2">
          {{ row.detailsShowing ? "Hide" : "Show" }} Details
        </b-button>
      </template>

      <template #row-details="row">
        <b-card>
          <b-row
            class="mb-2"
            v-for="(data, index) in row.item.courses"
            :key="index"
          >
            <b-col sm="3" class="text-sm-right"><b>Courses:</b></b-col>
            <b-col>{{ data.course }}</b-col>
          </b-row>
        </b-card>
      </template>
    </b-table>
    <!-- Pagination -->
    <div v-if="totalRows" class="d-flex justify-content-center">
      <b-pagination
        v-model="currentPage"
        :total-rows="totalRows"
        :per-page="perPage"
        last-number
        first-number
        @change="paginationChanged"
      ></b-pagination>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  beforeMount() {
    this.loadPage();
  },
  data() {
    return {
      loading: true,
      currentPage: 1,
      perPage: 10,
      totalRows: 0,
      fields: ["first_name", "last_name", "email", "course"],
      items: [],
    };
  },
  methods: {
    // Pagination "Change" event listener
    paginationChanged(page) {
      this.currentPage = page;
      this.loadPage();
    },
    loadPage() {
      this.$store
        .dispatch("HTTP_GET_REQUEST", {
          url: "students",
          page: this.currentPage,
        })
        .then((response) => {
          this.loading = false;
          this.items = response.data.data;
          this.totalRows = response.data.data.total;
        })
        .catch((errors) => {
          this.loading = false;
          console.log(errors);
          if (errors.response.data) {
            this.errors = errors.response.data.errors;
            this.$toast.error(errors.response.data.message, {
              position: "top-right",
              closeButton: "button",
              icon: true,
              rtl: false,
            });
          }
        });
    },
  },
};
</script>
