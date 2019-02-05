---
pageClass: custom-page-class
---

# 例子

## 基本用法
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

## 使用 startDate 和 endDate 初始化

#### startDate 和 endDate 的月份相同
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


## maxYear and minYear `need improvement`
> [minYear, maxYear] 的默认范围是 [当前年份 - 100，当前年份 + 100]
首先，你需要设置 `showYearSelect` 的值为 `true`

TODO:
- [ ] 当前日历是 minYear 的 01 月的时候，点击 前一个月，日历可能显示错误
- [ ] 当前日历是 maxYear 的 12 月的时候，点击 下一个月，日历可能显示错误

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

#### maxDate and minDate `TODO`

## 快捷选项

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



#### 自定义快捷选项

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
> 在预定义的快捷选项的下方是否显示 "Custom Range"。当日历中时间(start、end) 与 预定义的快捷选项任意一个都不匹配的时候，该选项会高亮选中。

::: demo
```html
<template>
  <div>
    <div class="demo-props-switch-wrapper">
      <span>showCustomRangeLabel: </span>
      <input type="checkbox" id="custom-range-id" v-model="value">
      <label for="ustom-range-id">{{ value }}</label>
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

> 隐藏 apply 和 cancel 按钮，当 start 和 end 都被点击之后，会自动 emit 一个新的 date range

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
> opens: ('left'/'right'/'center') 对齐方式

TODO:
- [ ] 现在只支持了箭头的位置，并没有支持下拉菜单的位置

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
