---
home: true
actionText: Get Started →
actionLink: /guide
features:
- title: Easy API
  details: Simple and small as possible component APIs, without reinventing HTML.
- title: Support DateRange and Single Calendar Picker
  details: Default is DateRagePicker, you can set it as a single DatePicker.
- title: Timezone Support[TODO]
  details: Specify timezone or use local timezone of user.
footer: MIT Licensed | Copyright © 2018-present | PR is welcome
---

:::warning
Note that it's still in alpha stage and things may change or break until we reach beta phase,for now we recommend that you use it in the dev environment.
:::

## Quick Start

```bash
npm install --save v-md-date-range-picker

# or with yarn
yarn add v-md-date-range-picker
```

### Global Usage
```vue
<template>
  <v-md-date-range-picker></v-md-date-range-picker>
</template>
```

```js
<script>
import Vue from 'vue';
import VMdDateRangePicker from "v-md-date-range-picker";
import "v-md-date-range-picker/dist/v-md-date-range-picker.css";

Vue.use(VMdDateRangePicker);
</script>
```
