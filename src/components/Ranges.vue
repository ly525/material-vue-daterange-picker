<template>
  <div class="ranges">
    <ul v-if="presets">
      <li
        v-for="(item, index) in inside__presets"
        :key="index"
        :class="{'active': item.label === chosenLabel}"
        @click="$emit('clickPreset',item)"
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
  props: ['canSelect', 'presets'],
  inject: ['picker'],
  computed: {
    chosenLabel () {
      let chosenLabel = '';
      let customRange = true;
      const picker = this.picker;
      const ftm = 'YYYY-MM-DD';
      for (const preset of this.presets) {
        const [start, end] = preset.range;
        // ignore times when comparing dates if time picker is not enabled
        if (picker.inside__start.format(ftm) === start.format(ftm) && picker.inside__end.format(ftm) === end.format(ftm)) {
          customRange = false;
          chosenLabel = preset.label;
          break;
        }
      }

      if (customRange) {
        if (this.picker.showCustomRangeLabel) {
          chosenLabel = this.picker.locale.customRangeLabel;
        } else {
          chosenLabel = null;
        }
      }
      return chosenLabel;
    },
    inside__presets () {
      if (this.picker.showCustomRangeLabel) {
        return [
          ...this.presets,
          {
            label: this.picker.locale.customRangeLabel,
            range: '',
          },
        ];
      }
      return this.presets;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/components/range.scss';
</style>

