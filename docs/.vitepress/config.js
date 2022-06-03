export default {
  lang: "en-US",
  title: "Campaign Wizard",
  description: "Just playing around.",

  lastUpdated: true,

  themeConfig: {
    repo: "https://github.com/khanhledev/sample-docs.git",
    docsRepo: "https://github.com/khanhledev/sample-docs.git",
    docsDir: "docs",
    docsBranch: "master",
    nav: nav(),

    sidebar: {
      "/guide/": sidebarGuide(),
    },

    editLink: false,

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],

    footer: {
      copyright: "Created by Khanh Le",
    },

    algolia: {
      appId: "8J64VVRP8K",
      apiKey: "a18e2f4cc5665f6602c5631fd868adfd",
      indexName: "vitepress",
    },
  },
};

function nav() {
  return [
    {
      text: "Guide",
      link: "/guide/what-is-cw",
      activeMatch: "/guide/what-is-cw",
    },
    {
      text: "Contribute",
      link: "/guide/best-practice",
      activeMatch: "/guide/best-practice",
    },
  ];
}

function sidebarGuide() {
  return [
    {
      text: "Introduction",
      collapsible: true,
      items: [
        { text: "What is Campaign Wizard?", link: "/guide/what-is-cw" },
        { text: "Configuration", link: "/guide/configuration" },
        { text: "Router ", link: "/guide/router" },
        { text: "State Management ", link: "/guide/state" },
        { text: "Deploying", link: "/guide/deploying" },
      ],
    },
    {
      text: "Contribute",
      collapsible: true,
      items: [
        { text: "ESLint", link: "/guide/eslint" },
        { text: "Best practice", link: "/guide/best-practice" },
      ],
    },
  ];
}
