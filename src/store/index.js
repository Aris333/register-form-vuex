/* eslint-disable */
import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VuexPersist from "vuex-persist";

const vuexPersist = new VuexPersist({
  key: "my-app",
  storage: window.localStorage,
});

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [vuexPersist.plugin],
  state: {
    student: null,
  },

  getters :{
    getUser(state) {
      return state.student;
    }
  },

  mutations: {

    SET_USER(state, data) {
      state.student = data;
    }
  },
  actions: {
    HTTP_POST_REQUEST({ commit, state },data){

      return new Promise((resolve,reject)=>{
     axios.post(data.url,data.payload)
        .then(function (response) {
          resolve(response)
        })
        .catch(function (error) {
          reject(error)
        })
      })
    },

    HTTP_GET_REQUEST({ commit, state },data){
      return new Promise((resolve,reject)=>{
         axios.get(data.url,data.payload)
          .then(function (response) {
            resolve(response)
          })
          .catch(function (error) {
            reject(error)
          });
      })
    },

  },
});


