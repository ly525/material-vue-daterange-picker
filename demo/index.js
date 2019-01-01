import Vue from "vue";
import App from "./App.vue";

import MdDateRangePicker from "../src";
// import MdDateRangePicker from 'v-md-date-range-picker';
// import 'v-md-date-range-picker/dist/md-date-range-picker.css';

Vue.use(MdDateRangePicker);

// eslint-disable-next-line no-new
new Vue({
  el: "#app",
  render: h => h(App)
});
