<template>
  <div class="ranges">
    <ul v-if="presets">
      <li
        v-for="(item, index) in presets"
        :key="index"
        @click="$emit('clickShortcut', item.range)"
      >
        {{ item.label }}
      </li>
    </ul>
    <div class="action-buttons">
      <button
        class="btn btn-sm btn-success"
        :disabled="canSelect"
        type="button"
        @click="$emit('clickApply')"
      >
        Apply
      </button>
      <button
        class="btn btn-sm btn-default"
        type="button"
        @click="$emit('clickCancel')"
      >
        Cancel
      </button>
    </div>
  </div>
</template>

<script>

export default {
  props: ["canSelect", "presets"]
};
</script>

<style lang="scss" scoped>
@import '../styles/components/range.scss';
</style>

