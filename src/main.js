import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import "./plugins/bootstrap-vue";
import store from "./store/Store";
import router from "./router/Router";
import "./assets/scss/style.scss";
import App from "./App.vue";
import VueFeather from "vue-feather";
import InstantSearch from "vue-instantsearch";
// i18n
import i18n from './i18n/i18n.js'
import "vue-hljs/dist/style.css";
Vue.use(VueFeather);

Vue.config.productionTip = false;

import vueHljs from "vue-hljs";
import hljs from "highlight.js";
import axios from "axios";


axios.defaults.baseURL = 'http://localhost:8000/api/';
//axios.defaults.baseURL = 'http://localhost/factures/dashboard/api/';
//axios.defaults.baseURL = 'https://mega-tech.dev/factures/dashboard/api/';
axios.defaults.headers.common = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest"
};
Vue.prototype.$http = axios


//use
Vue.use(vueHljs, { hljs });
Vue.use(InstantSearch);
new Vue({ store, router,i18n, render: (h) => h(App) }).$mount("#app");
