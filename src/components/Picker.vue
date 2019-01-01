<template>
  <div class="gs-drp-container" v-clickoutside="clickedApply">
    <div class="gs-drp-text" @click="togglePicker">
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
          <div class="daterangepicker_input">
            <input
              class="input-mini form-control"
              type="text"
              name="daterangepicker_start"
              :value="startText"
            />
            <i class="fa fa-calendar glyphicon glyphicon-calendar"></i>
          </div>
          <div class="calendar-table">
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
          </div>
        </div>
        <div class="calendar right">
          <div class="daterangepicker_input">
            <input
              class="input-mini form-control"
              type="text"
              name="daterangepicker_end"
              :value="endText"
            />
            <i class="fa fa-calendar glyphicon glyphicon-calendar"></i>
          </div>
          <div class="calendar-table">
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
          </div>
        </div>
        <calendar-ranges
          :canSelect="in_selection"
          :ranges="ranges"
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
    ranges: {
      type: Object,
      default() {
        // return {
        //     Today: new Date(),
        //     Yesterday: new Date(),
        //     'This month': new Date(),
        //     'This year': new Date(),
        //     'Last week': new Date(),
        //     'Last month': new Date()
        // }
        return {
          Today: [
            moment()
              .subtract(0, "days")
              .startOf("day"),
            moment().endOf("day")
          ],
          Yesterday: [
            moment()
              .subtract(1, "days")
              .startOf("day"),
            moment().endOf("day")
          ],
          "Last 7 Days": [
            moment()
              .subtract(6, "days")
              .startOf("day"),
            moment().endOf("day")
          ],
          "Last 30 Days": [
            moment()
              .subtract(29, "days")
              .startOf("day"),
            moment().endOf("day")
          ],
          "This Month": [moment().startOf("month"), moment().endOf("month")],
          "Last Month": [
            moment()
              .subtract(1, "month")
              .startOf("month"),
            moment()
              .subtract(1, "month")
              .endOf("month")
          ]
        };
      }
    },
    opens: {
      type: String,
      default: "right"
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
        opensright: this.opens == "right",
        opensleft: this.opens == "left"
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
<style lang="scss" scoped>
/**
 * =============================================================================
 * ************   日期范围选择器   ************
 * =============================================================================
 *
 * Inspired by https://github.com/zdhxiong/mdui
 * Inspired by bootstrap.daterangepicker
 * add
 */

 table {
  border-spacing: 0;
  border-collapse: collapse;
}

.table-condensed > tbody > tr > td,
.table-condensed > tbody > tr > th,
.table-condensed > tfoot > tr > td,
.table-condensed > tfoot > tr > th,
.table-condensed > thead > tr > td,
.table-condensed > thead > tr > th {
  padding: 5px;
}

/**
 * =============================================================================
 * ************   日期范围选择器   ************
 * =============================================================================
 *
 * Inspired by https://github.com/zdhxiong/mdui
 * Inspired by bootstrap.daterangepicker
 */

.daterangepicker {
  position: absolute;
  color: inherit;
  background-color: #fff;
  border-radius: 4px;
  width: 278px;
  padding: 4px;
  margin-top: 1px;
  top: 100px;
  left: 20px;
  /* Calendars */
}
.daterangepicker:before,
.daterangepicker:after {
  position: absolute;
  display: inline-block;
  border-bottom-color: rgba(0, 0, 0, 0.2);
  content: "";
}
.daterangepicker:before {
  top: -7px;
  border-right: 7px solid transparent;
  border-left: 7px solid transparent;
  border-bottom: 7px solid #ccc;
}
.daterangepicker:after {
  top: -6px;
  border-right: 6px solid transparent;
  border-bottom: 6px solid #fff;
  border-left: 6px solid transparent;
}
.daterangepicker.opensleft:before {
  right: 9px;
}
.daterangepicker.opensleft:after {
  right: 10px;
}
.daterangepicker.openscenter:before {
  left: 0;
  right: 0;
  width: 0;
  margin-left: auto;
  margin-right: auto;
}
.daterangepicker.openscenter:after {
  left: 0;
  right: 0;
  width: 0;
  margin-left: auto;
  margin-right: auto;
}
.daterangepicker.opensright:before {
  left: 9px;
}
.daterangepicker.opensright:after {
  left: 10px;
}
.daterangepicker.dropup {
  margin-top: -5px;
}
.daterangepicker.dropup:before {
  top: initial;
  bottom: -7px;
  border-bottom: initial;
  border-top: 7px solid #ccc;
}
.daterangepicker.dropup:after {
  top: initial;
  bottom: -6px;
  border-bottom: initial;
  border-top: 6px solid #fff;
}
.daterangepicker.dropdown-menu {
  max-width: none;
  z-index: 3001;
}
.daterangepicker.single .ranges,
.daterangepicker.single .calendar {
  float: none;
}
.daterangepicker.show-calendar .calendar {
  display: block;
}
.daterangepicker .calendar {
  display: none;
  max-width: 270px;
  margin: 4px;
}
.daterangepicker .calendar.single .calendar-table {
  border: none;
}
.daterangepicker .calendar th,
.daterangepicker .calendar td {
  white-space: nowrap;
  text-align: center;
  min-width: 32px;
}
.daterangepicker .calendar-table {
  border: 1px solid #fff;
  padding: 4px;
  border-radius: 4px;
  background-color: #fff;
}
.daterangepicker table {
  width: 100%;
  margin: 0;
}
.daterangepicker td,
.daterangepicker th {
  text-align: center;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 1px solid transparent;
  white-space: nowrap;
  cursor: pointer;
}
.daterangepicker td.available:hover,
.daterangepicker th.available:hover {
  background-color: #eee;
  border-color: transparent;
  color: inherit;
}
.daterangepicker td.week,
.daterangepicker th.week {
  font-size: 80%;
  color: #ccc;
}
.daterangepicker td.off,
.daterangepicker td.off.in-range,
.daterangepicker td.off.start-date,
.daterangepicker td.off.end-date {
  background-color: #fff;
  border-color: transparent;
  color: #999;
}
.daterangepicker td.in-range {
  background-color: #ebf4f8;
  border-color: transparent;
  color: #000;
  border-radius: 0;
}
.daterangepicker td.start-date {
  border-radius: 4px 0 0 4px;
}
.daterangepicker td.end-date {
  border-radius: 0 4px 4px 0;
}
.daterangepicker td.start-date.end-date {
  border-radius: 4px;
}
.daterangepicker td.active,
.daterangepicker td.active:hover {
  background-color: #357ebd;
  border-color: transparent;
  color: #fff;

  &.start-date {
    border: 4px 0 0 0;
  }

  &.end-date {
    border: 4px 0 0 0;

  }
}


.daterangepicker th.month {
  width: auto;
}
.daterangepicker td.disabled,
.daterangepicker option.disabled {
  color: #999;
  cursor: not-allowed;
  text-decoration: line-through;
}
.daterangepicker select.monthselect,
.daterangepicker select.yearselect {
  font-size: 12px;
  padding: 1px;
  height: auto;
  margin: 0;
  cursor: default;
}
.daterangepicker select.monthselect {
  margin-right: 2%;
  width: 56%;
}
.daterangepicker select.yearselect {
  width: 40%;
}
.daterangepicker select.hourselect,
.daterangepicker select.minuteselect,
.daterangepicker select.secondselect,
.daterangepicker select.ampmselect {
  width: 50px;
  margin-bottom: 0;
}
.daterangepicker .input-mini {
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #555;
  height: 30px;
  line-height: 30px;
  display: block;
  vertical-align: middle;
  margin: 0 0 5px 0;
  padding: 0 6px 0 28px;
  width: 100%;
}
.daterangepicker .input-mini.active {
  border: 1px solid #08c;
  border-radius: 4px;
}
.daterangepicker .daterangepicker_input {
  position: relative;
}
.daterangepicker .daterangepicker_input i {
  position: absolute;
  left: 8px;
  top: 8px;
}
.daterangepicker.rtl .input-mini {
  padding-right: 28px;
  padding-left: 6px;
}
.daterangepicker.rtl .daterangepicker_input i {
  left: auto;
  right: 8px;
}
.daterangepicker .calendar-time {
  text-align: center;
  margin: 5px auto;
  line-height: 30px;
  position: relative;
  padding-left: 28px;
}
.daterangepicker .calendar-time select.disabled {
  color: #ccc;
  cursor: not-allowed;
}

.ranges {
  font-size: 11px;
  float: none;
  margin: 4px;
  text-align: left;
}
.ranges ul {
  list-style: none;
  margin: 0 auto;
  padding: 0;
  width: 100%;
}
.ranges li {
  font-size: 13px;
  background-color: #f5f5f5;
  border: 1px solid #f5f5f5;
  border-radius: 4px;
  color: #08c;
  padding: 3px 12px;
  margin-bottom: 8px;
  cursor: pointer;
}
.ranges li:hover {
  background-color: #08c;
  border: 1px solid #08c;
  color: #fff;
}
.ranges li.active {
  background-color: #08c;
  border: 1px solid #08c;
  color: #fff;
}

/*  Larger Screen Styling */
@media (min-width: 564px) {
  .daterangepicker {
    width: auto;
  }
  .daterangepicker .ranges ul {
    width: 160px;
  }
  .daterangepicker.single .ranges ul {
    width: 100%;
  }
  .daterangepicker.single .calendar.left {
    clear: none;
  }
  .daterangepicker.single.ltr .ranges,
  .daterangepicker.single.ltr .calendar {
    float: left;
  }
  .daterangepicker.single.rtl .ranges,
  .daterangepicker.single.rtl .calendar {
    float: right;
  }
  .daterangepicker.ltr {
    direction: ltr;
    text-align: left;
  }
  .daterangepicker.ltr .calendar.left {
    clear: left;
    margin-right: 0;
  }
  .daterangepicker.ltr .calendar.left .calendar-table {
    border-right: none;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .daterangepicker.ltr .calendar.right {
    margin-left: 0;
  }
  .daterangepicker.ltr .calendar.right .calendar-table {
    border-left: none;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  .daterangepicker.ltr .left .daterangepicker_input {
    padding-right: 12px;
  }
  .daterangepicker.ltr .calendar.left .calendar-table {
    padding-right: 12px;
  }
  .daterangepicker.ltr .ranges,
  .daterangepicker.ltr .calendar {
    float: left;
  }
  .daterangepicker.rtl {
    direction: rtl;
    text-align: right;
  }
  .daterangepicker.rtl .calendar.left {
    clear: right;
    margin-left: 0;
  }
  .daterangepicker.rtl .calendar.left .calendar-table {
    border-left: none;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  .daterangepicker.rtl .calendar.right {
    margin-right: 0;
  }
  .daterangepicker.rtl .calendar.right .calendar-table {
    border-right: none;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .daterangepicker.rtl .left .daterangepicker_input {
    padding-left: 12px;
  }
  .daterangepicker.rtl .calendar.left .calendar-table {
    padding-left: 12px;
  }
  .daterangepicker.rtl .ranges,
  .daterangepicker.rtl .calendar {
    text-align: right;
    float: right;
  }
}
@media (min-width: 730px) {
  .daterangepicker .ranges {
    width: auto;
  }
  .daterangepicker.ltr .ranges {
    float: left;
  }
  .daterangepicker.rtl .ranges {
    float: right;
  }
  .daterangepicker .calendar.left {
    clear: none !important;
  }
}

/* gs-date-range-picker-container */
.gs-drp-container {
  position: relative;
}

.range_inputs {
  margin-bottom: 10px;
}

.gs-drp-text {
  /* background: #fff;
    cursor: pointer;
    width: 100%;
    height: 37px;
    padding: 6px 34px 6px 12px;
    border: 1px solid #7e848c;
    color: #7e848c;
    border-radius: 5px; */
  color: #7e848c;
  display: inline-block;
  width: 100%;
  background: #fff;
  cursor: pointer;
  border: 1px solid #7e848c;
  border-radius: 5px;
  line-height: 35px;
  padding: 0 20px 0 10px;
}

.show-calendar {
  display: block;
}

div.daterangepicker.opensleft {
  top: 35px;
  right: 10px;
  left: auto;
}

div.daterangepicker.opensright {
  top: 35px;
  left: 10px;
  right: auto;
}

/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all 0.2s ease;
}

.slide-fade-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

.caret {
  border: none;
  height: 34px;
  display: inline-block;
  position: absolute;
  top: 0;
  right: 0;
}

.caret::after {
  content: "\F107";
  font-family: FontAwesome;
  position: absolute;
  right: 10px;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
}

@media screen and (min-width: 768px) {
  .daterangepicker.show-calendar {
    display: inline-flex;
  }
}
</style>
