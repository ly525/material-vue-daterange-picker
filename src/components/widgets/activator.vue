<template>
  <div class="activator-wrapper">
    <input v-bind="$attrs" class="text-field" :class="inputClass" type="text" :value="value">
    <span v-if="picker.showActivatorBar" class="bar"></span>
    <label v-if="picker.showActivatorLabel">{{ label }}</label>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  inject: ['picker'],
  props: {
      value: String,
      label: {
        type: String,
        default: "Select Date"
      }
  },
  computed: {
    inputClass () {
      return {
        'text-field__filled': this.value.trim().length > 0,
      };
    },
  },
};
</script>


<style lang="scss">
@import '../../styles/components/activator.scss';
</style>
