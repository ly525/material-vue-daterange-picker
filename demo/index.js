import Vue from "vue";
import App from "./App.vue";

import MdDateRangePicker from "../src";

Vue.use(MdDateRangePicker);

// eslint-disable-next-line no-new
new Vue({
  el: "#app",
  render: h => h(App)
});
