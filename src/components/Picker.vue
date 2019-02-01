<template>
  <div class="md-date-range-picker" v-clickoutside="clickedApply">
    <div class="md-date-range-picker__activator" @click="togglePicker">
      <slot name="input">
        <default-activator :value="`${startText} - ${endText}`" readonly />
      </slot>
    </div>
    <transition name="slide-fade" mode="out-in">
      <div
        class="daterangepicker dropdown-menu"
        :class="pickerStyles()"
        v-show="open"
      >
        <calendar-ranges
          :canSelect="in_selection"
          :presets="presets"
          @clickCancel="open = false"
          @clickApply="clickedApply"
          @clickPreset="clickPreset"
        ></calendar-ranges>
        <calendar
          class="calendar left"
          location="left"
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
          @clickYearSelect="clickYearSelect"
        ></calendar>
        <calendar
          class="calendar right"
          location="right"
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
          @clickYearSelect="clickYearSelect"
        ></calendar>
      </div>
    </transition>
  </div>
</template>

<script>
import moment from 'moment';
import Calendar from './Calendar.vue';
import CalendarRanges from './Ranges.vue';
import DefaultActivator from './widgets/activator.vue';

import clickoutside from '../directives/clickoutside';

import { defaultPresets } from '../constant/index.js';

export default {
  name: 'v-md-date-range-picker',
  components: { Calendar, CalendarRanges, DefaultActivator, },
  directives: { clickoutside },
  provide () {
    return {
      'picker': this,
    };
  },
  props: {
    // The beginning date of the initially selected date range.
    // If you provide a string, it must match the date format string set in your locale setting
    startDate: {
      type: String,
      default: moment().format('YYYY-MM-DD'),
    },
    // The end date of the initially selected date range.
    endDate: {
      type: String,
      default: moment().format('YYYY-MM-DD'),
    },
    // Set predefined date ranges the user can select from.
    // The range of each object an array with two dates representing the bounds of the range.
    presets: {
      type: Array,
      default () {
        return defaultPresets;
      },
    },
    // Whether the picker appears aligned to the left, to the right, or centered under the HTML element it's attached to.
    opens: {
      type: String,
      default: 'left',
    },
    // Displays "Custom Range" at the end of the list of predefined ranges, when the ranges option is used.
    // This option will be highlighted whenever the current date range selection does not match one of the predefined ranges.
    // Clicking it will display the calendars to select a new range.
    showCustomRangeLabel: {
      type: Boolean,
      default: false,
    },
    // Show year select boxes above calendars to jump to a specific year.
    showYearSelect: {
      type: Boolean,
      default: false,
    },
    // The minimum year shown in the dropdowns when showYearSelect is set to true.
    minYear: {
      type: String,
      default: moment().subtract(100, 'year').format('YYYY'),
    },
    // The maximum year shown in the dropdowns when showYearSelect is set to true.
    maxYear: {
      type: String,
      default: moment().add(100, 'year').format('YYYY'),
    },
    // Hide the apply and cancel buttons, and automatically apply a new date range as soon as two dates are clicked.
    autoApply: {
      type: Boolean,
      default: true,
    },
    // show label for the default activator (inputbox)
    showActivatorLabel: {
      type: Boolean,
      default: true,
    },
    // show animation bar for the default activator (inputbox)
    showActivatorBar: {
      type: Boolean,
      default: true,
    },
  },
  data () {
    const data = {
      locale: {
        direction: 'ltr',
        format: moment.localeData().longDateFormat('L'),
        separator: ' - ',
        applyLabel: 'Apply',
        cancelLabel: 'Cancel',
        weekLabel: 'W',
        customRangeLabel: 'Custom Range',
        daysOfWeek: moment.weekdaysMin(),
        monthNames: moment.monthsShort(),
        firstDay: moment.localeData().firstDayOfWeek(),
      },
    };
    // TODO 这里的 props 究竟是放在 data 里面进行初始化好，还是放在生命周期中好呢？
    // https://github.com/ly525/blog/issues/252
    // https://github.com/ly525/blog/issues/258
    data.inside__leftCalendarMonth = moment(this.startDate);
    data.inside__rightCalendarMonth = moment(this.endDate);
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
    clickYearSelect ({ location, calendarMonth }) {
      this[`inside__${location}CalendarMonth`] = calendarMonth.clone();
    },
    clickNextMonth () {
      // TODO 如果有 linkedCalendars，需要更新代码
      // moment.js 的 add 和 sub tract 的改变自身的行为没有被 watch 到，原因是什么呢？
      this.inside__leftCalendarMonth = this.inside__leftCalendarMonth.clone().add(1, 'month');
    },
    clickPrevMonth () {
      // TODO 如果有 linkedCalendars，需要更新代码
      this.inside__leftCalendarMonth = this.inside__leftCalendarMonth.clone().subtract(1, 'month');
    },
    /**
     * TODO type of value
     */
    dateClick (value) {
      if (this.in_selection) {
        // second click action(第二次点击)
        this.in_selection = false;
        // if second click value is smaller than first, which means user clicked a previous date,
        // so set the smaller date as start date, bigger one as end date
        if (value.isBefore(this.inside__start)) {
          this.inside__end = this.inside__start;
          this.inside__start = value.clone();
        } else {
          this.inside__end = value.clone();
        }

        // feature #49
        if (this.autoApply) {
          this.clickedApply();
        }
      } else {
        // first click action, set value as start and end(第一次点击, 设置起始值皆为点击的值)
        this.in_selection = true;
        this.inside__start = value.clone();
        this.inside__end = value.clone();
        // Notice: If you watch inside__start, its callback function will be executed after inside__end is assigned, which is exactly what we want.
        // You can add a loop to test here
        // In fact, the callback function is actually updateMonthCalendar, which is to update the date based on the values of start and end.
        // So if the callback is callback after both the inside__start and inside__end, that's right!
        // updateMonthCalendar() === callback function for watch inside__start
      }
    },
    hoverDate (value) {
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
    togglePicker () {
      this.open = !this.open;
    },
    pickerStyles () {
      return {
        'show-calendar': this.open,
        'opens-arrow-pos-right': this.opens === 'right',
        'opens-arrow-pos-left': this.opens === 'left',
        'opens-arrow-pos-center': this.opens === 'center',
      };
    },
    clickedApply () {
      this.open = false;
      this.emitChange();
    },
    clickPreset (preset) {
      if (preset.label === this.locale.customRangeLabel) return;
      const [start, end] = preset.range;
      this.inside__start = moment(start);
      this.inside__end = moment(end);
      // fix #47
      this.inside__leftCalendarMonth = moment(start);
      // TODO 需要想一下，联动情况下，快捷日期，选择范围如果超过两个月，该如何显示？
      // TODO if linkedCalendar, what should the UI show if end - start > 60 days?

      // feature #49
      if (this.autoApply) {
        this.clickedApply();
      }
    },
    emitChange () {
      const start = this.inside__start.clone();
      const end = this.inside__end.clone();
      this.$emit('change', [start, end], [start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD')]);
    },
  },
  computed: {
    startText () {
      return this.inside__start.format(this.locale.format);
    },
    endText () {
      return this.inside__end.format(this.locale.format);
    },
  },
  watch: {
    /**
     * 有两个地方：
     * 1. 点击左侧快捷键(clickPreset)，确认 inside__start
     * 2.
     *
     * 如果使用 计算属性，则 clickPrevMonth 和 clickNextMonth 的时候，需要设置计算属性的 setter，但这时候 setter 就不知道写什么了
     * TODO 值变化的时候，什么时候执行 watch 呢？ nextTick 吗？
     */
    inside__start (value) {
      this.inside__hoverStart = value.clone();
      // inspired by https://github.com/dangrossman/daterangepicker/blob/master/daterangepicker.js#L554
      // fix #43
      if (value.month() === this.inside__end.month()) return;
      this.inside__leftCalendarMonth = value.clone();
    },
    inside__end (value) {
      this.inside__hoverEnd = value.clone();
    },
    inside__leftCalendarMonth: {
      handler (leftMonth) {
        this.inside__rightCalendarMonth = leftMonth.clone().add(1, 'month');
      },
      immediate: true,
    },
    startDate (value) {
      this.inside__start = moment(value);
    },
    endDate (value) {
      this.inside__end = moment(value);
      // TODO not linked calendar
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../styles/components/picker.scss';
</style>
