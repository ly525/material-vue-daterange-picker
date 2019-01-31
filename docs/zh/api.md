# API

## Props

<!-- @vuese:VMdDateRangePicker:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|startDate|The beginning date of the initially selected date range.If you provide a string, it must match the date format string set in your locale setting|`String`|`false`| today |
|endDate|-|`String`|`false`| today |
|presets|Set predefined date ranges the user can select from.The range of each object an array with two dates representing the bounds of the range.|`Array`|`false`|defaultPresets|
|opens|Whether the picker appears aligned to the left, to the right, or centered under the HTML element it's attached to.|`String`|`false`|"left"|
|showCustomRangeLabel|Displays "Custom Range" at the end of the list of predefined ranges, when the ranges option is used.This option will be highlighted whenever the current date range selection does not match one of the predefined ranges.Clicking it will display the calendars to select a new range.|`Boolean`|`false`|false|
|showYearSelect|Show year select boxes above calendars to jump to a specific year.|`Boolean`|`false`|false|
|minYear|The minimum year shown in the dropdowns when showYearSelect is set to true.|`String`|`false`|currentYear -100 |
|maxYear|The maximum year shown in the dropdowns when showYearSelect is set to true.|`String`|`false`| currentYear + 100|
|autoApply|Hide the apply and cancel buttons, and automatically apply a new date range as soon as two dates are clicked.|`Boolean`|`false`| true|

<!-- @vuese:VMdDateRangePicker:props:end -->


## Events

<!-- @vuese:VMdDateRangePicker:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|change|-|-|

<!-- @vuese:VMdDateRangePicker:events:end -->


## Slots

<!-- @vuese:VMdDateRangePicker:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|input|-|-|

<!-- @vuese:VMdDateRangePicker:slots:end -->


