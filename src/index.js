import "./styles/index.scss";

import DateRangePicker from "./components/Picker.vue";

const install = function(Vue) {
  Vue.component(DateRangePicker.name, DateRangePicker);
};

// auto install
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  DateRangePicker
};
