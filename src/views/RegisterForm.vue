<template>
  <div>
    <div v-if="errors" class="text-danger">
      <div v-for="(v, k) in errors" :key="k">
        <p v-for="error in v" :key="error" class="text-sm">
          {{ error }}
        </p>
      </div>
    </div>
    <b-form @submit="onSubmit" @reset="onReset">
      <b-card bg-variant="light">
        <b-form-group
          label-cols-lg="3"
          label="Student Registration Form"
          label-size="lg"
          label-class="font-weight-bold pt-0"
          class="mb-0"
        >
          <b-form-group
            label="Frist Name:"
            label-for="nested-street"
            label-cols-sm="3"
            label-align-sm="right"
          >
            <b-form-input
              required
              id="nested-street"
              v-model="form.first_name"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label="Last Name:"
            label-for="nested-city"
            label-cols-sm="3"
            label-align-sm="right"
          >
            <b-form-input
              id="nested-city"
              required
              v-model="form.last_name"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label="Email:"
            label-for="nested-state"
            label-cols-sm="3"
            label-align-sm="right"
          >
            <b-form-input id="nested-state" v-model="form.email"></b-form-input>
          </b-form-group>
          <b-form-group
            label="Interested Course:"
            label-for="nested-country"
            label-cols-sm="3"
            label-align-sm="right"
          >
            <div class="row">
              <div class="col-10">
                <div v-for="(course, index) in form.courses" :key="index">
                  <div class="row">
                    <div class="col-8">
                      <input
                        style="width: 100%"
                        required
                        v-model="course.courseName"
                        placeholder="Enter your Course Name"
                        class="w-full py-2 border border-indigo-500 rounded form-control mb-2"
                      />
                    </div>
                    <div class="col-4">
                      <b-button
                        type="reset"
                        class="ml-2 mb-2"
                        variant="danger"
                        @click="remove(index)"
                        v-show="index != 0"
                        >x</b-button
                      >
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-2">
                <b-button
                  variant="success"
                  type="button"
                  class="flex justify-start ml-2 rounded-md border px-3 py-2 bg-pink-600"
                  @click="addMore()"
                >
                  +
                </b-button>
              </div>
            </div>
          </b-form-group>

          <b-button type="submit" class="ml-2" variant="primary"
            >Submit</b-button
          >
        </b-form-group>
      </b-card>
    </b-form>
  </div>
</template>
<script>
/* eslint-disable */
import { mapGetters } from "vuex";
export default {
  name: "HomeView",
  data() {
    return {
      form: {
        first_name: "",
        last_name: "",
        email: "",
        courses: [
          {
            courseName: "",
          },
        ],
      },
      errors: "",
      message: "",
    };
  },
  computed: {
    ...mapGetters(["getUser"]),
    errorMsg() {
      return this.message;
    },
  },
  methods: {
    addMore() {
      this.form.courses.push({
        courseName: "",
      });
    },
    remove(index) {
      this.form.courses.splice(index, 1);
    },
    onSubmit(event) {
      event.preventDefault();
      const vm = this;
      if (this.email === "" && this.first_names === "") {
        return;
      }
      const url = process.env.VUE_APP_API_URL + "/students";

      this.$store
        .dispatch("HTTP_POST_REQUEST", {
          url: url,
          payload: this.form,
        })
        .then((response) => {
          this.$toast.success(response.data.message, {
            position: "top-right",
            closeButton: "button",
            icon: true,
            rtl: false,
          });
          this.onReset();
        })
        .catch((errors) => {
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
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.first_names = "";
      this.form.last_name = null;
      this.form.courses = [
        {
          courseName: "",
        },
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
.login-page-content {
  width: 450px;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
