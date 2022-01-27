module.exports =  {
  title: 'Components',
  description: 'My Components ~',
  head: [
    ['link', { rel: 'icon', href: '/public/favicon.ico' }] // 增加一个自定义的 favicon(网页标签的图标)
  ],
  base: '/', // 这是部署到github相关的配置 下面会讲
  port: 8864,
  hot: true,
  bundler: '@vuepress/bundler-vite',
  bundlerConfig: {
    //  Vite 打包工具的配置项，TO DO
  },
  locales: {
    '/': {
      lang: 'en-US',
    },
    '/zh/': {
      lang: 'zh-CN',
    },
  },
  themeConfig: {
    locales: {
      '/': {
        selectLanguageName: 'English',
      },
      '/zh/': {
        selectLanguageName: '简体中文',
      },
    },
    navbar: [
      // NavbarItem
      {
        text: 'Documents',
        link: '/documents/',
      },
      // NavbarGroup
      {
        text: 'Group',
        children: ['/group/foo.md', '/group/bar.md'],
      },
      // 字符串 - 页面文件路径
      '/docs/README.md',
    ],
    sidebar: [
      // SidebarItem
      {
        text: 'Documents',
        link: '../documents/',
        children: [
          // SidebarItem
          {
            text: 'day',
            link: 'https://www.kancloud.cn/freya001/interview/1264040',
          },
          {
            text: 'practice',
            link: '/documents/practice.md',
          },
        ],
      },
      {
        text: 'Components',
        link: '../components/',
        children: [
          // SidebarItem
          {
            text: 'Option',
            link: '../components/Option/index.md',
            children: [],
          },
          {
            text: 'Layout',
            link: '../components/Layout/index.md',
            children: [],
          },
        ],
      },
    ],  
  }, 
}