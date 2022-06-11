/* eslint-disable */
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import store from './store';
import axios from 'axios';
import Toast from 'vue-toastification'
// Import the CSS or use your own!
import 'vue-toastification/dist/index.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Toast)

Vue.prototype.$appName = 'WorldGeeks'
Vue.prototype.$http = axios

const token = store.state.user ? store.state.user.token : null
axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common['Accept'] = 'application/json'
axios.defaults.baseURL = process.env.VUE_APP_API_URL

global.axios = axios
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
