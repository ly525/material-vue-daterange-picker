---
pageClass: custom-page-class
---

# Installation

## Introduction
在这里，你可以看到如何使用 CDN 直接调用该组件 或者 通过 webpack 等来构建项目

::: tip
你可以根据自己的实际需求来使用这个组件，如果你只想测试一下，推荐使用 CDN 的方式。如果你需要集成这个组件到一个已有的 vue-cli 初始化的项目中，推荐你使用构建工具等来进行集成
:::

## CDN Usage
::: warning
 注意：因为该项目以来 moment.js， 因此你也需要提前引入 moment.js
:::

```html
<html>
  <head>
    <link rel="stylesheet"
      href="https://unpkg.com/https://unpkg.com/v-md-date-range-picker/dist/v-md-date-range-picker.css">
  </head>
  <body>
    <div id="app">
      <v-md-date-range-picker></v-md-date-range-picker>
    </div>
    <script src="https://unpkg.com/vue"></script>
    <script src="https://unpkg.com/moment"></script>
    <script src="https://unpkg.com/v-md-date-range-picker/dist/v-md-date-range-picker.min.js">
    <script>
      const app = new Vue({
        el: '#app'
      })
    </script>
  </body>
 </html>
```

## Bundler Usage

::: warning
假设已经存在了一个使用 [vue-cli](https://github.com/vuejs/vue-cli) 等脚手架初始化的项目
:::

### 安装

```bash
npm install --save v-md-date-range-picker

# or with yarn
yarn add v-md-date-range-picker
```

### 全局使用
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
