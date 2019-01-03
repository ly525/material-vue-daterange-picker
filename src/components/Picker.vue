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
              name="daterangepicker_start"
              :value="startText"
            />
            <i class="fa fa-calendar glyphicon glyphicon-calendar"></i>
          </div>
          <!-- <div class="calendar-table"> -->
            <calendar
              :monthDate="monthDate"
              :locale="locale"
              :start="start"
              :end="end"
              :hover-start="hoverStart"
              :hover-end="hoverEnd"
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
              name="daterangepicker_end"
              :value="endText"
            />
            <i class="fa fa-calendar glyphicon glyphicon-calendar"></i>
          </div>
          <!-- <div class="calendar-table"> -->
            <calendar
              :monthDate="nextMonthDate"
              :locale="locale"
              :start="start"
              :end="end"
              :hover-start="hoverStart"
              :hover-end="hoverEnd"
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

    data.monthDate = new Date(this.startDate);
    data.start = new Date(this.startDate);
    data.end = new Date(this.endDate);
    data.hoverStart = new Date(this.startDate);
    data.hoverEnd = new Date(this.endDate);
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
      this.monthDate = nextMonth(this.monthDate);
    },
    prevMonth() {
      this.monthDate = prevMonth(this.monthDate);
    },
    dateClick(value) {
      //  && new Date(value) >= this.start
      if (this.in_selection) {
        // second click action(第二次点击)
        this.in_selection = false;
        // if second click value is smaller than first, which means user clicked a previous date,
        // so set the smaller date as start date, bigger one as end date
        if (new Date(value) <= this.start) {
          this.hoverEnd = this.end = this.start;
          this.hoverStart = this.start = new Date(value);
        } else {
          this.hoverEnd = this.end = new Date(value);
        }
      } else {
        // first click action, set value as start and end(第一次点击, 设置起始值皆为点击的值)
        this.in_selection = true;
        this.hoverStart = this.start = new Date(value);
        this.hoverEnd = this.end = new Date(value);
      }
    },
    hoverDate(value) {
      let dt = new Date(value);
      if (this.in_selection) {
        if (dt > this.start) {
          // this.end = dt;
          this.hoverEnd = dt;
        } else {
          // this.end = this.start
          // this.start = dt
          this.hoverStart = dt;
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
      // this.$emit('update', { startDate: this.start, endDate: this.end })
    },
    clickShortcut(value) {
      this.hoverStart = this.start = new Date(value[0]);
      this.hoverEnd = this.end = new Date(value[1]);
    }
  },
  computed: {
    nextMonthDate() {
      return nextMonth(this.monthDate);
    },
    startText() {
      return this.start.toLocaleDateString();
    },
    endText() {
      return new Date(this.end).toLocaleDateString();
    },
    applyStartText() {
      return this.start.toLocaleDateString();
    },
    applyEndText() {
      return new Date(this.end).toLocaleDateString();
    }
  },
  watch: {
    startDate(value) {
      this.start = new Date(value);
      this.monthDate = new Date(value);
    },
    endDate(value) {
      this.end = new Date(value);
    },
    start(value) {
      this.$emit("update", { startDate: this.start, endDate: this.end });
    },
    end(value) {
      this.$emit("update", { startDate: this.start, endDate: this.end });
    }
  }
};
</script>
<style lang="scss" scoped>
@import '../styles/components/picker.scss';
</style>
