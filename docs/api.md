# API
# VMdDateRangePicker

## Props

<!-- @vuese:VMdDateRangePicker:props:start -->
<span style="color:#3eaf7c">startDate</span>
`String`

> Default: today<br>
> Description: The beginning date of the initially selected date range.
If you provide a Desc: string, it must match the date format string set in your locale setting

<span style="color:#3eaf7c">endDate</span> `String`
> Default: today<br>

<span style="color:#3eaf7c">presets</span> `Array`
> Description: Set predefined date ranges the user can select from.The range of each object an array with two dates representing the bounds of the range.

<span style="color:#3eaf7c">opens</span> `String`
> Default: left<br>
> Avaiable: left、center、right<br>
> Description: Whether the picker appears aligned to the left, to the right, or centered under the HTML element it's attached to

<span style="color:#3eaf7c">showCustomRangeLabel</span> `Boolean`
> Default: false<br>
> Description: Displays "Custom Range" at the end of the list of predefined ranges, when the ranges option is used.This option will be highlighted whenever the current date range selection does not match one of the predefined ranges.Clicking it will display the calendars to select a new range.

<span style="color:#3eaf7c">showYearSelect</span>`Boolean`
> Default: false

<span style="color:#3eaf7c">maxYear</span> `String` `Number`
> Default: currentYear + 100<br>
> Description: The maximum year shown in the dropdowns when showYearSelect is set to true

<span style="color:#3eaf7c">minYear</span> `String` `Number`
> Default: currentYear - 100<br>
> Description: The minimum year shown in the dropdowns when showYearSelect is set to true

<!-- @vuese:VMdDateRangePicker:props:end -->


## Events

<!-- @vuese:VMdDateRangePicker:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|update|-|-|

<!-- @vuese:VMdDateRangePicker:events:end -->


## Slots

<!-- @vuese:VMdDateRangePicker:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|input|-|-|

<!-- @vuese:VMdDateRangePicker:slots:end -->


