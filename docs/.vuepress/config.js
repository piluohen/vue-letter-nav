let component = [
  'vue-letter-nav',
  'vue-letter-nav-demo'
]
module.exports = {
  base: '/docs',
  title: 'vue-letter-nav',
  description: 'vue-letter-nav',
  head: [['link', { rel: 'icon', href: '/images/favicon.ico' }]],
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      {
        text: '组件',
        link: '/component/vue-letter-nav'
      }
    ],
    sidebar: {
      '/component/': component
    },
    lastUpdated: '最后更新',
    repo: 'https://github.com/piluohen/vue-letter-nav.git',
    repoLabel: 'GitHub'
  },
  markdown: {
    anchor: { permalink: true }
  },
  extendMarkdown: md => {
    // 使用更多的 markdown-it 插件!
    md.use(require('markdown-it-checkbox')).use(require('markdown-it-kbd'))
  },
  plugins: ['@vuepress/back-to-top', '@vuepress/medium-zoom', 'demo-block'],
  serviceWorker: true
}
