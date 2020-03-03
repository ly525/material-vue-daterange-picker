<template>
  <div class="ranges">
    <ul>
      <li
        v-for="(item, index) in presets_"
        :key="index"
        :class="{'active': item.label === chosenLabel}"
        @click="$emit('clickPreset',item)"
      >
        {{ item.label }}
      </li>
    </ul>
    <!-- feature #49 -->
    <div class="action-buttons" v-if="!picker.autoApply">
      <button
        class="btn btn-sm btn-success"
        :disabled="canSelect"
        type="button"
        @click="$emit('clickApply')"
      >
        {{ applyLabel }}
      </button>
      <button
        class="btn btn-sm btn-default"
        type="button"
        @click="$emit('clickCancel')"
      >
        {{ cancelLabel }}
      </button>
    </div>
  </div>
</template>

<script>

import moment from "moment";
import {defaultPresets} from "../constant";

export default {
  props: {
      canSelect: {
          type: Boolean,
          default: false,
      },
      presets: {
          type: Array,
          default () {
              return [];
          },
      },
      applyLabel: {
          type: String,
          default: 'Apply',
      },
      cancelLabel: {
          type: String,
          default: 'Cancel',
      },
  },
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
        if (picker.start_.format(ftm) === start.format(ftm) && picker.end_.format(ftm) === end.format(ftm)) {
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
    presets_ () {
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

