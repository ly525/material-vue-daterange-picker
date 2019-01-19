<template>
  <div class="md-date-range-picker" v-clickoutside="clickedApply">
    <div class="md-date-range-picker__activator" @click="togglePicker">
      <slot name="input">
        <i class="glyphicon glyphicon-calendar fa fa-calendar"></i>&nbsp;
        <span>{{ startText }} - {{ endText }}</span>
        <!-- <b class="caret"></b> -->
      </slot>
    </div>
    <transition name="slide-fade" mode="out-in">
      <div
        class="daterangepicker dropdown-menu ltr"
        :class="pickerStyles()"
        v-show="open"
      >
        <div class="calendar left">
          <div class="daterangepicker__input-wrapper">
            <input
              class="input-mini form-control"
              type="text"
              name="daterangepicker__start"
              :value="startText"
            />
            <i class="fa fa-calendar glyphicon glyphicon-calendar"></i>
          </div>
          <!-- <div class="calendar-table"> -->
            <calendar
              :monthDate="inside__monthDate"
              :locale="locale"
              :start="inside__start"
              :end="inside__end"
              :hover-start="inside__hoverStart"
              :hover-end="inside__hoverEnd"
              @nextMonth="nextMonth"
              @prevMonth="prevMonth"
              @dateClick="dateClick"
              @hoverDate="hoverDate"
            ></calendar>
          <!-- </div> -->
        </div>
        <div class="calendar right">
          <div class="daterangepicker__input-wrapper">
            <input
              class="input-mini form-control"
              type="text"
              name="daterangepicker__end"
              :value="endText"
            />
            <i class="fa fa-calendar glyphicon glyphicon-calendar"></i>
          </div>
          <!-- <div class="calendar-table"> -->
            <calendar
              :monthDate="nextMonthDate"
              :locale="locale"
              :start="inside__start"
              :end="inside__end"
              :hover-start="inside__hoverStart"
              :hover-end="inside__hoverEnd"
              @nextMonth="nextMonth"
              @prevMonth="prevMonth"
              @dateClick="dateClick"
              @hoverDate="hoverDate"
            ></calendar>
          <!-- </div> -->
        </div>
        <calendar-ranges
          :canSelect="in_selection"
          :presets="presets"
          @clickCancel="open = false"
          @clickApply="clickedApply"
          @clickShortcut="clickShortcut"
        ></calendar-ranges>
      </div>
    </transition>
  </div>
</template>

<script>
import moment from "moment";
import Calendar from "./Calendar.vue";
import CalendarRanges from "./Ranges.vue";
import { nextMonth, prevMonth } from "../util/index";
import clickoutside from "../directives/clickoutside";

import { defaultPresets } from '../constant/index.js';

export default {
  name: "MdDateRangePicker",
  components: { Calendar, CalendarRanges },
  directives: { clickoutside },
  props: {
    startDate: {
      default() {
        return new Date();
      }
    },
    endDate: {
      default() {
        return new Date();
      }
    },
    presets: {
      type: Array,
      default() {
        return defaultPresets;
      }
    },
    opens: {
      type: String,
      default: "left"
    }
  },
  data() {
    let data = {
      locale: {
        direction: "ltr",
        format: moment.localeData().longDateFormat("L"),
        separator: " - ",
        applyLabel: "Apply",
        cancelLabel: "Cancel",
        weekLabel: "W",
        customRangeLabel: "Custom Range",
        daysOfWeek: moment.weekdaysMin(),
        monthNames: moment.monthsShort(),
        firstDay: moment.localeData().firstDayOfWeek()
      }
    };

    data.inside__monthDate = new Date(this.startDate);
    data.inside__start = new Date(this.startDate);
    data.inside__end = new Date(this.endDate);
    data.inside__hoverStart = new Date(this.startDate);
    data.inside__hoverEnd = new Date(this.endDate);
    data.in_selection = false; // in_selection means whether user click once, if user click once, set value true
    data.open = false;

    // update day names order to firstDay
    if (data.locale.firstDay !== 0) {
      let iterator = data.locale.firstDay;
      while (iterator > 0) {
        data.locale.daysOfWeek.push(data.locale.daysOfWeek.shift());
        iterator--;
      }
    }
    return data;
  },
  methods: {
    nextMonth() {
      this.inside__monthDate = nextMonth(this.inside__monthDate);
    },
    prevMonth() {
      this.inside__monthDate = prevMonth(this.inside__monthDate);
    },
    dateClick(value) {
      if (this.in_selection) {
        // second click action(第二次点击)
        this.in_selection = false;
        // if second click value is smaller than first, which means user clicked a previous date,
        // so set the smaller date as start date, bigger one as end date
        if (new Date(value) <= this.inside__start) {
          this.inside__hoverEnd = this.inside__end = this.inside__start;
          this.inside__hoverStart = this.inside__start = new Date(value);
        } else {
          this.inside__hoverEnd = this.inside__end = new Date(value);
        }
      } else {
        // first click action, set value as start and end(第一次点击, 设置起始值皆为点击的值)
        this.in_selection = true;
        this.inside__hoverStart = this.inside__start = new Date(value);
        this.inside__hoverEnd = this.inside__end = new Date(value);
      }
    },
    hoverDate(value) {
      let dt = new Date(value);
      if (this.in_selection) {
        if (dt > this.inside__start) {
          this.inside__hoverEnd = dt;
        } else {
          this.inside__hoverStart = dt;
        }
      }
    },
    togglePicker() {
      this.open = !this.open;
    },
    pickerStyles() {
      return {
        "show-calendar": this.open,
        "opens-arrow-pos-right": this.opens == "right",
        "opens-arrow-pos-left": this.opens == "left",
        "opens-arrow-pos-center": this.opens == "center",
        // opensright: this.opens == "right",
        // opensleft: this.opens == "left"
      };
    },
    clickedApply() {
      this.open = false;
      // this.$emit('update', { startDate: this.inside__start, endDate: this.inside__end })
    },
    clickShortcut(value) {
      this.inside__hoverStart = this.inside__start = new Date(value[0]);
      this.inside__hoverEnd = this.inside__end = new Date(value[1]);
    }
  },
  computed: {
    nextMonthDate() {
      return nextMonth(this.inside__monthDate);
    },
    startText() {
      return new Date(this.inside__start).toLocaleDateString();
    },
    endText() {
      return new Date(this.inside__end).toLocaleDateString();
    },
    applyStartText() {
      return new Date(this.inside__start).toLocaleDateString();
    },
    applyEndText() {
      return new Date(this.inside__end).toLocaleDateString();
    }
  },
  watch: {
    startDate(value) {
      this.inside__start = new Date(value);
      this.inside__monthDate = new Date(value);
    },
    endDate(value) {
      this.inside__end = new Date(value);
    },
    start(value) {
      this.$emit("update", { startDate: this.inside__start, endDate: this.inside__end });
    },
    end(value) {
      this.$emit("update", { startDate: this.inside__start, endDate: this.inside__end });
    }
  }
};
</script>
<style lang="scss" scoped>
@import '../styles/components/picker.scss';
</style>
