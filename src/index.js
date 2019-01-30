// import "./styles/index.scss";

import VMdDateRangePicker from './components/Picker.vue';

const install = function (Vue) {
  Vue.component(VMdDateRangePicker.name, VMdDateRangePicker);
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  VMdDateRangePicker,
};
