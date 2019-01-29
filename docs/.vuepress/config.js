module.exports = {
  locales: {
    '/': {
      lang: 'en-US',
      title: 'v-md-date-range-picker(alpha)',
      description: `a daterangepicker for vue.js and material design.`

    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'v-md-date-range-picker(alpha)',
      description: `
        支持 Material Design 的日期选择器
      `
    }
  },
  ga: 'UA-133346622-1',
  serviceWorker: true,
  themeConfig: {
    repo: 'ly525/v-md-date-range-picker',
    editLinks: true,
    docsDir: 'docs',
    nav: [
      { text: 'Guide', link: '/guide' },
      { text: 'API', link: '/api' },
      { text: 'Examples', link: '/examples' },
      { text: 'TODO', link: 'https://github.com/ly525/v-md-date-range-picker/issues/32' },
    ],
    locales: {
      '/': {
        label: 'English',
        selectText: 'Languages',
        editLinkText: 'Edit this page on GitHub',
        lastUpdated: 'Last Updated',
        serviceWorker: {
          updatePopup: {
            message: "New content is available.",
            buttonText: "Refresh"
          }
        },
        sidebar: {
          '/': genSidebarConfig('Guide')
        }
      },
      '/zh/': {
        label: '简体中文',
        selectText: '选择语言',
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdated: '上次更新',
        serviceWorker: {
          updatePopup: {
            message: "发现新内容可用",
            buttonText: "刷新"
          }
        },
        sidebar: {
          '/zh/': genSidebarConfig('指南')
        }
      }
    },
  },
  base: '/v-md-date-range-picker/',
  head: [
    ['script', { src: 'https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js' }],
    // ['script', { src: 'https://cdn.jsdelivr.net/npm/@babel/standalone/babel.min.js' }],
    // ['script', { src: 'https://cdn.jsdelivr.net/npm/numerify/lib/index.umd.min.js' }],
    ['script', { src: 'https://unpkg.com/moment/moment.js', }],
    ['script', { src: 'https://www.googletagmanager.com/gtag/js?id=UA-133346622-1' }],
    ['script', { src: '/ga.js' }],
    ['script', { src: '/bt.js' }],
    ['script', { src: '/yandex.js' }],
  ],
  plugins: [
    ['demo-block', {
      settings: {
        jsLib: [
          'https://unpkg.com/v-md-date-range-picker/dist/v-md-date-range-picker.min.js',
          'https://unpkg.com/moment/moment.js',
        ], // 在线示例(jsfiddle, codepen)中的js依赖
        cssLib: ['https://unpkg.com/v-md-date-range-picker/dist/v-md-date-range-picker.css'], // 在线示例中的css依赖
        vue: 'https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js', // 在线示例中的vue依赖
        jsfiddle: true, // 是否显示 jsfiddle 链接
        codepen: true, // 是否显示 codepen 链接
        horizontal: false // 是否展示为横向样式
      }
    }],
  ]
}
function genSidebarConfig (title) {
  return [
    {
      title,
      collapsable: false,
      children: [
        '',
        'guide',
        'examples',
        'api'
      ]
    }
  ]
}
