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
              :calendar-month="inside__leftCalendarMonth"
              :locale="locale"
              :start="inside__start"
              :end="inside__end"
              :hover-start="inside__hoverStart"
              :hover-end="inside__hoverEnd"
              @clickNextMonth="clickNextMonth"
              @clickPrevMonth="clickPrevMonth"
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
              :calendar-month="inside__rightCalendarMonth"
              :locale="locale"
              :start="inside__start"
              :end="inside__end"
              :hover-start="inside__hoverStart"
              :hover-end="inside__hoverEnd"
              @clickNextMonth="clickNextMonth"
              @clickPrevMonth="clickPrevMonth"
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
    // TODO 这里的 props 究竟是放在 data 里面进行初始化好，还是放在生命周期中好呢？
    // https://github.com/ly525/blog/issues/252
    data.inside__leftCalendarMonth = moment(this.startDate);
    data.inside__start = moment(this.startDate);
    data.inside__end = moment(this.endDate);
    data.inside__hoverStart = moment(this.startDate);
    data.inside__hoverEnd = moment(this.endDate);
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
    clickNextMonth() {
      // TODO 如果有 linkedCalendars，需要更新代码
      // moment.js 的 add 和 sub tract 的改变自身的行为没有被 watch 到，原因是什么呢？
      this.inside__leftCalendarMonth = this.inside__leftCalendarMonth.clone().add(1, 'month');
    },
    clickPrevMonth() {
      // TODO 如果有 linkedCalendars，需要更新代码
      this.inside__leftCalendarMonth = this.inside__leftCalendarMonth.clone().subtract(1, 'month')
    },
    /**
     * TODO type of value
     */
    dateClick(value) {
      if (this.in_selection) {
        // second click action(第二次点击)
        this.in_selection = false;
        // if second click value is smaller than first, which means user clicked a previous date,
        // so set the smaller date as start date, bigger one as end date
        if (value.isBefore(this.inside__start)) {
          this.inside__hoverEnd = this.inside__end = this.inside__start;
          this.inside__hoverStart = this.inside__start = value.clone();
        } else {
          this.inside__hoverEnd = this.inside__end = value.clone();
        }
      } else {
        // first click action, set value as start and end(第一次点击, 设置起始值皆为点击的值)
        this.in_selection = true;
        this.inside__hoverStart = this.inside__start = value.clone();
        this.inside__hoverEnd = this.inside__end = value.clone();
      }
    },
    hoverDate(value) {
      if (this.in_selection) {
        if (value > this.inside__start) {
          // 参见：https://github.com/ly525/blog/issues/254
          this.inside__hoverStart = this.inside__start.clone();
          this.inside__hoverEnd = value.clone();
        } else {
          this.inside__hoverEnd = this.inside__start.clone();
          this.inside__hoverStart = value.clone();
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
    clickShortcut(range) {
      const [start, end] = range;
      this.inside__hoverStart = this.inside__start = moment(start);
      this.inside__hoverEnd = this.inside__end = moment(end);
    }
  },
  computed: {
    inside__rightCalendarMonth() {
      return this.inside__leftCalendarMonth.clone().add(1, 'month')
    },
    startText() {
      return this.inside__start.format(this.locale.format);
    },
    endText() {
      return this.inside__end.format(this.locale.format);
    },
  },
  watch: {
    startDate(value) {
      this.inside__start = moment(value);
      this.inside__leftCalendarMonth = moment(value);
    },
    endDate(value) {
      this.inside__end = moment(value);
      // TODO not linked calendar
    },
    start(value) {
      this.$emit("update", { startDate: this.inside__start.clone(), endDate: this.inside__end.clone() });
    },
    end(value) {
      this.$emit("update", { startDate: this.inside__start.clone(), endDate: this.inside__end.clone()});
    }
  }
};
</script>
<style lang="scss" scoped>
@import '../styles/components/picker.scss';
</style>
