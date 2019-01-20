<template>
  <table class="calendar-table">
    <thead>
      <tr>
        <th class="prev available" @click="$emit('prevMonth')">
          <i :class="[arrowLeftClass]"></i>
        </th>
        <th colspan="5" class="month">{{ monthName }} {{ year }}</th>
        <th class="next available" @click="$emit('nextMonth')">
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
import moment from "moment";

export default {
  name: "calendar",
  props: ["monthDate", "locale", "hoverStart", "hoverEnd", "start", "end"],
  methods: {
    dayClass(date) {
      let dt = new Date(date);
      let cleanDt = dt.setHours(0, 0, 0, 0);
      let cleanToday = new Date().setHours(0, 0, 0, 0);
      let cleanStart = new Date(this.start).setHours(0, 0, 0, 0);
      let cleanEnd = new Date(this.end).setHours(0, 0, 0, 0);

      // hover 时候的start
      let hoverStart = new Date(this.hoverStart).setHours(0, 0, 0, 0);
      let hoverEnd = new Date(this.hoverEnd).setHours(0, 0, 0, 0);
      return {
        off: date.month() !== this.month,
        weekend: date.isoWeekday() > 5,
        today: cleanDt == cleanToday,
        // dt === start || dt === end
        active:
          cleanDt == cleanStart ||
          cleanDt == cleanEnd ||
          cleanDt == hoverStart ||
          cleanDt == hoverEnd,
        //  start <= dt <= end
        "in-range":
          (dt >= cleanStart && dt <= cleanEnd) ||
          (dt >= hoverStart && dt <= hoverEnd),
        "start-date": cleanDt == cleanStart || cleanDt == hoverStart,
        "end-date": cleanDt == cleanEnd || cleanDt == hoverEnd
      };
    }
  },
  computed: {
    arrowLeftClass() {
      return "fa fa-chevron-left glyphicon glyphicon-chevron-left";
    },
    arrowRightClass() {
      return "fa fa-chevron-right glyphicon glyphicon-chevron-right";
    },
    monthName() {
      return this.locale.monthNames[this.monthDate.getMonth()];
    },
    year() {
      return this.monthDate.getFullYear();
    },
    month() {
      return this.monthDate.getMonth();
    },
    calendar() {
      let month = this.month;
      let year = this.monthDate.getFullYear();
      let daysInMonth = new Date(year, month, 0).getDate();
      let firstDay = new Date(year, month, 1);
      let lastDay = new Date(year, month, daysInMonth);
      let lastMonth = moment(firstDay)
        .subtract(1, "month")
        .month();
      let lastYear = moment(firstDay)
        .subtract(1, "month")
        .year();
      let daysInLastMonth = moment([lastYear, lastMonth]).daysInMonth();

      let dayOfWeek = firstDay.getDay();

      let calendar = [];

      for (let i = 0; i < 6; i++) {
        calendar[i] = [];
      }
      // 确定 6 * 7 日历中的第一天
      let startDay = daysInLastMonth - dayOfWeek + this.locale.firstDay + 1;
      // 2015-02-01，该月第一天是周日，此时 startDay > daysInLastMonth
      // https://user-images.githubusercontent.com/12668546/51437731-43104280-1cdd-11e9-82ae-9c270144b2a9.png
      if (startDay > daysInLastMonth) {
        startDay -= 7;
      }

      if (dayOfWeek === this.locale.firstDay) {
        startDay = daysInLastMonth - 6;
      }

      let curDate = moment([lastYear, lastMonth, startDay, 12, 0, 0]);
      for (
        let i = 0, col = 0, row = 0;
        i < 6 * 7;
        i++, col++, curDate = moment(curDate).add(1, "day")
      ) {
        if (i > 0 && col % 7 === 0) {
          col = 0;
          row++;
        }
        calendar[row][col] = curDate.clone();
        curDate.hour(12);
      }

      return calendar;
    }
  },
  filters: {
    dateNum(value) {
      return value.date();
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../styles/components/calendar.scss';
</style>
