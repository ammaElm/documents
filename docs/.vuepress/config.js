module.exports = {
  title: "Documents",
  description: "~ ~ ~",
  head: [
    ["link", { rel: "icon", href: "/public/favicon.ico" }], // 增加一个自定义的 favicon(网页标签的图标)
  ],
  base: "/", // 这是部署到github相关的配置 下面会讲
  port: 8864,
  hot: true,
  bundler: "@vuepress/bundler-vite",
  bundlerConfig: {
    //  Vite 打包工具的配置项，TO DO
  },
  locales: {
    "/": {
      lang: "en-US",
    },
    "/zh/": {
      lang: "zh-CN",
    },
  },
  themeConfig: {
    locales: {
      "/": {
        selectLanguageName: "English",
      },
      "/zh/": {
        selectLanguageName: "简体中文",
      },
    },
    navbar: [
      // NavbarItem
      {
        text: "Documents",
        link: "/documents/",
      },
      // NavbarGroup
      {
        text: "links",
        children: [
          {
            text: "day",
            link: "https://www.kancloud.cn/freya001/interview/1264040",
          },
        ],
      },
      // 字符串 - 页面文件路径
      "/docs/README.md",
    ],
    sidebar: [
      // SidebarItem
      {
        text: "Documents",
        link: "../documents/",
        children: [
          {
            text: "practice",
            link: "/documents/practice.md",
          },
          {
            text: "notice",
            link: "/documents/notice.md",
          },
        ],
      },
      {
        text: "Components",
        link: "../components/",
        children: [
          {
            text: "option",
            link: "/components/option/doc.md",
            children: [],
          },
          {
            text: "select",
            link: "/components/select/doc.md",
            children: [],
          },
          {
            text: "layout",
            link: "/components/layout/doc.md",
            children: [],
          },
        ],
      },
    ],
  },
};
