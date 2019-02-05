---
pageClass: custom-page-class
---

# Examples

## basic usage
```vue
<v-md-date-range-picker></v-md-date-range-picker>
```

::: demo
```html
<template>
  <div>
    <v-md-date-range-picker></v-md-date-range-picker>
  </div>
</template>
<script>
export default {
}
</script>
```
:::

## init with startDate and endDate

#### startDate.month `is same with` endDate.month
```vue
  <v-md-date-range-picker
    start-date="2019-01-01"
    end-date="2019-01-02"
  ></v-md-date-range-picker>
```

::: demo
```html
<template>
  <div>
    <v-md-date-range-picker
      start-date="2019-01-01"
      end-date="2019-01-02"
    ></v-md-date-range-picker>
  </div>
</template>
<script>
export default {
}
</script>
```
:::

#### endDate.month - startDate.month `= 1`
```vue
  <v-md-date-range-picker
    start-date="2019-01-01"
    end-date="2019-02-02"
  ></v-md-date-range-picker>
```

::: demo
```html
<template>
  <div>
    <v-md-date-range-picker
      start-date="2019-01-01"
      end-date="2019-02-02"
    ></v-md-date-range-picker>
  </div>
</template>
<script>
export default {
}
</script>
```
:::
<!-- ############################## -->

<!-- ####### endDate.month - startDate.month > 1   ########## -->
#### endDate.month - startDate.month `> 1`
This also depends on whether you have set `linkedCalendar`: whether the left and right calendars are linked. The default value is `true`.

这个也取决于你是否设置了：linkedCalendar 即左右两个日历是否联动

讨论：这里如果设置成联动了，该怎么处理比较好呢？
个人意见，因为是初始化，左右日历月份相差过大的情况并不是常见需求。因此更多的好似考虑常见需求，既然起
既然设置为联动，说明用户明确是想两者为联动。联动可以理解，如果设置了联动，结果却没有联动则会视为Bug

```vue
  <v-md-date-range-picker
    start-date="2019-01-01"
    end-date="2019-03-02"
  ></v-md-date-range-picker>
```

::: demo
```html
<template>
  <div>
    <v-md-date-range-picker
      start-date="2019-01-01"
      end-date="2019-03-02"
    ></v-md-date-range-picker>
  </div>
</template>
<script>
export default {
}
</script>
```
:::
<!-- ###### END ###### -->


<!-- ###### START ###### -->



## maxYear and minYear `need improvement`
> Default range of [minYear, maxYear] is [currentYear-100, currentYear+100].<br>
Firstly, you should set `showYearSelect: true`

TODO:
- [ ] minDate limit may be wrong when click previous month before the minYear
- [ ] maxDate limit may be wrong when click next month before the maxYear

```vue
  <v-md-date-range-picker
    start-date="2019-01-01"
    end-date="2019-01-02"
    max-year="2030"
    min-year="2010"
    show-year-select
  ></v-md-date-range-picker>
```

::: demo
```html
<template>
  <div>
    <v-md-date-range-picker
      start-date="2019-01-01"
      end-date="2019-01-02"
      max-year="2030"
      min-year="2010"
      show-year-select
    ></v-md-date-range-picker>
  </div>
</template>
<script>
export default {
}
</script>
```
:::

## maxDate and minDate `TODO`

## Predefined Date Presets
> or Ranges or Shortcuts

#### Basic
```vue
  <v-md-date-range-picker
    start-date="2019-01-01"
    end-date="2019-01-02"
  ></v-md-date-range-picker>
```

::: demo
```html
<template>
  <div>
    <v-md-date-range-picker
      start-date="2019-01-01"
      end-date="2019-01-02"
    ></v-md-date-range-picker>
  </div>
</template>
<script>
export default {
}
</script>
```
:::



#### Custom Presets

::: demo
```html
<template>
  <div>
    <v-md-date-range-picker
      start-date="2019-01-01"
      end-date="2019-01-02"
      :presets="presets"
    ></v-md-date-range-picker>
  </div>
</template>
<script>
  export default {
    data: () => ({
      presets: [
        {
          label: 'This Week',
        range: [
          moment().subtract(6, 'day'),
          moment()
        ]
      },
      {
        label: 'Last Week',
        range: [
          moment().subtract(13, 'day'),
          moment().subtract(7, 'day'),
        ]
      }
    ]
  })
}
</script>
```
:::

#### showCustomRangeLabel
> Displays "Custom Range" at the end of the list of predefined ranges, when the ranges option is used. This option will be highlighted whenever the current date range selection does not match one of the predefined ranges. Clicking it will display the calendars to select a new range.


::: demo
```html
<template>
  <div>
    <div class="demo-props-switch-wrapper">
      <span>showCustomRangeLabel: </span>
      <input type="checkbox" id="auto-apply-id" v-model="value">
      <label for="auto-apply-id">{{ value }}</label>
    </div>
    <v-md-date-range-picker
      start-date="2019-01-01"
      end-date="2019-01-02"
      :show-custom-range-label="value"
    ></v-md-date-range-picker>
  </div>
</template>
<script>
  export default {
    data: () => ({
      value: true,
    })
  }
</script>
```
:::


#### autoApply
> Boolean, default is `true`

> Hide the apply and cancel buttons, and automatically apply a new date range as soon as two dates are clicked.



::: demo
```html
<template>
  <div>
    <div class="demo-props-switch-wrapper">
      <span>autoApply</span>
      <input type="checkbox" id="auto-apply-id" v-model="value">
      <label for="auto-apply-id">{{ value }}</label>
    </div>
    <v-md-date-range-picker
      start-date="2019-01-01"
      end-date="2019-01-02"
      :auto-apply="value"
    ></v-md-date-range-picker>
  </div>
</template>
<script>
  export default {
    data: () => ({
      value: true,
    })
  }
</script>
```
:::



#### alwaysShowCalendars `TODO`

## Position

### opens
> opens: ('left'/'right'/'center') Whether the picker appears aligned to the left, to the right, or centered under the HTML element it's attached to. default value is left.

TODO:
- [ ] now only control the alignment of the arrow, not really control the alignment of picker

::: demo
```html
<template>
  <div>
    <div class="demo-props-switch-wrapper">
      <span>Opens: </span>
      <select v-model="opens">
        <option disabled value="">Please select a item</option>
        <option>left</option>
        <option>center</option>
        <option>right</option>
      </select>
    </div>
    <v-md-date-range-picker
      :opens="opens"
      start-date="2019-01-01"
      end-date="2019-01-02"
    ></v-md-date-range-picker>
  </div>
</template>
<script>
export default {
  data: () => ({
    opens: 'left',
  })
}
</script>
```
:::
