<template>
  <div class="ranges">
    <ul v-if="ranges">
      <li
        v-for="(value, key) in ranges"
        :key="key"
        @click="$emit('clickShortcut', value)"
      >
        {{ key }}
      </li>
    </ul>
    <div class="range_inputs drp-buttons">
      <button
        class="applyBtn btn btn-sm btn-success md-picker-btn"
        :disabled="canSelect"
        type="button"
        @click="$emit('clickApply')"
      >
        Apply
      </button>
      <button
        class="cancelBtn btn btn-sm btn-default"
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
  props: ["canSelect", "ranges"]
};
</script>
