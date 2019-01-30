<template>
  <table class="calendar-table">
    <thead>
      <tr>
        <th class="prev available" @click="$emit('clickPrevMonth')">
          <i :class="[arrowLeftClass]"></i>
        </th>
        <th colspan="5" class="month">
          {{ monthName }}
          <!-- select year start -->
          <select class="yearselect" v-model="activeYear" v-if="picker.showYearSelect">
            <option v-for="(year, index) in RangeOfYear" :value="year" :key="index">{{year}}</option>
          </select>
          <span v-else>{{ activeYear }}</span>
          <!-- select year end -->
        </th>
        <th class="next available" @click="$emit('clickNextMonth')">
          <i :class="[arrowRightClass]"></i>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th v-for="(weekDay, dayIndex) in locale.daysOfWeek" :key="dayIndex">
          {{ weekDay }}
        </th>
      </tr>
      <tr v-for="(dateRow, rowIndex) in calendar" :key="rowIndex">
        <slot name="date-slot" v-for="(date, dateIndex) in dateRow">
          <td
            :key="dateIndex"
            :class="dayClass(date)"
            @click="$emit('dateClick', date)"
            @mouseover="$emit('hoverDate', date)"
          >
            {{ date | dateNum }}
          </td>
        </slot>
      </tr>
    </tbody>
  </table>
</template>

<script>
import moment from 'moment';

function clean (momentDate) {
  /* eslint-disable */
  return momentDate.clone().hour(0).minute(0).second(0).millisecond(0);
}

// _.range([start=0], end, [step=1])
function range (start = 0, end, step = 1) {
  const arr = [];
  start = +start;
  end = +end;
  for (let i = start; i <= end; i += step) {
    arr.push(i);
  }
  return arr;
}

export default {
  name: 'calendar',
  inject: ['picker'],
  props: ['location', 'calendarMonth', 'locale', 'start', 'end'],
  methods: {
    dayClass (date) {
      const dt = date.clone();
      const cleanDt = clean(dt.clone());
      const cleanToday = clean(moment());
      const cleanStart = clean(this.start);
      const cleanEnd = clean(this.end);
      const hoverStart = clean(this.picker.inside__hoverStart);
      const hoverEnd = clean(this.picker.inside__hoverEnd);

      return {
        off: dt.month() !== this.month,
        // TODO what isoWeekday means ??
        weekend: dt.isoWeekday() > 5,
        today: cleanDt.isSame(cleanToday),
        // dt === start || dt === end
        active: cleanDt.isSame(cleanStart) || cleanDt.isSame(cleanEnd),
        //  start <= dt <= end || hoverStart <= dt <= hoverEnd
        // 当第一次点击(确认了 start )之后，此时 endDate === startDate，鼠标 hover 和 click 都需要显示一个范围
        'in-range':
          (dt >= cleanStart && dt <= cleanEnd) ||
          (dt >= hoverStart && dt <= hoverEnd),
        'start-date': cleanDt.isSame(cleanStart),
        'end-date': cleanDt.isSame(cleanEnd),
      };
    },
  },
  computed: {
    arrowLeftClass () {
      return 'fa fa-chevron-left glyphicon glyphicon-chevron-left';
    },
    arrowRightClass () {
      return 'fa fa-chevron-right glyphicon glyphicon-chevron-right';
    },
    // { Number } the month value for current calendar
    month () {
      return this.calendarMonth.month();
    },
    // TODO 这种有有依赖关系的 computed 是怎么处理的？
    monthName () {
      return this.locale.monthNames[this.month];
    },
    year () {
      return this.calendarMonth.year();
    },
    /**
     * TODO 这是一个数组，computed 数组的值 变化的时候，template 是怎么知道更新的呢
     */
    calendar () {
      // Build the matrix of dates that will populate the calendar

      const calendarMonth = this.calendarMonth;
      const month = calendarMonth.month();
      const year = calendarMonth.year();
      const hour = calendarMonth.hour();
      const minute = calendarMonth.minute();
      const second = calendarMonth.second();
      const daysInMonth = moment([year, month]).daysInMonth();
      const firstDay = moment([year, month, 1]);
      const lastDay = moment([year, month, daysInMonth]);
      const lastMonth = moment(firstDay).subtract(1, 'month').month();
      const lastYear = moment(firstDay).subtract(1, 'month').year();
      const daysInLastMonth = moment([lastYear, lastMonth]).daysInMonth();
      const dayOfWeek = firstDay.day();

      // initialize a 6 rows x 7 columns array for the calendar
      const calendar = [];
      calendar.firstDay = firstDay;
      calendar.lastDay = lastDay;

      for (let i = 0; i < 6; i++) {
        calendar[i] = [];
      }

      // populate the calendar with date objects
      // 确定 6 * 7 日历中的第一天
      let startDay = daysInLastMonth - dayOfWeek + this.locale.firstDay + 1;
       // 2015-02-01，该月第一天是周日，此时 startDay > daysInLastMonth
      // https://user-images.githubusercontent.com/12668546/51437731-43104280-1cdd-11e9-82ae-9c270144b2a9.png
      if (startDay > daysInLastMonth) { startDay -= 7; }
      if (dayOfWeek === this.locale.firstDay) { startDay = daysInLastMonth - 6; }

      let curDate = moment([lastYear, lastMonth, startDay, 12, minute, second]);

      for (let i = 0, col = 0, row = 0; i < 42; i++, col++, curDate = moment(curDate).add(24, 'hour')) {
        if (i > 0 && col % 7 === 0) {
          col = 0;
          row++;
        }
        calendar[row][col] = curDate.clone().hour(hour).minute(minute).second(second);
        curDate.hour(12);

        // check for minDate and maxDate
        // if (this._minDate && calendar[row][col].format('YYYY-MM-DD') === this._minDate.format('YYYY-MM-DD') && calendar[row][col].isBefore(this._minDate) && side === 'left') {
        //   calendar[row][col] = this._minDate.clone();
        // }

        // if (this._maxDate && calendar[row][col].format('YYYY-MM-DD') === this._maxDate.format('YYYY-MM-DD') && calendar[row][col].isAfter(this._maxDate) && side === 'right') {
        //   calendar[row][col] = this._maxDate.clone();
        // }
      }

      return calendar;
    },
    // if show year select
    RangeOfYear () {
      if (!this.picker.showYearSelect) return [];
      // TODO 这边因为依赖计算属性：this.calendar 那么是否需要处理 this.calendar[1]为空的情况？
      // const currentYear = this.calendar[1][1].year();

      const picker = this.picker;
      const maxYear = (picker.maxDate && picker.maxDate.year()) || picker.maxYear;
      const minYear = (picker.minDate && picker.minDate.year()) || picker.minYear;
      return range(minYear, maxYear, 1);
    },
    activeYear: {
      get () {
        return this.calendarMonth.year();
      },
      set (newYear) {
        const calendarMonth = moment([newYear, this.month]);
        this.$emit('clickYearSelect', {
          location: this.location,
          calendarMonth,
        });
      },
    },
  },
  filters: {
    dateNum (value) {
      return value.date();
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/components/calendar.scss';
</style>
