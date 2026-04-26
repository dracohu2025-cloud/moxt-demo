import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Moxt 帮助中心',
  description: 'Moxt — AI 原生工作空间使用教程',
  lang: 'zh-CN',
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#29C16A' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Moxt 帮助中心' }],
    ['meta', { property: 'og:description', content: 'AI 原生工作空间 — 使用教程与最佳实践' }],
  ],

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'Moxt 帮助中心',

    nav: [
      { text: '快速开始', link: '/guide/momo' },
      { text: '设置与集成', link: '/setup/import' },
      { text: '进阶玩法', link: '/advanced/entropy-officer' },
      {
        text: '访问 Moxt',
        link: 'https://moxt.ai'
      }
    ],

    sidebar: [
      {
        text: '快速开始',
        items: [
          { text: 'momo 使用指南', link: '/guide/momo' },
          { text: 'AI 同事使用指南', link: '/guide/ai-teammates' },
          { text: '操作技巧与快捷键', link: '/guide/tips' },
        ]
      },
      {
        text: '设置与集成',
        items: [
          { text: '从 Notion / Google Drive 迁入', link: '/setup/import' },
          { text: '接入外部工具', link: '/setup/integrations' },
          { text: '文件格式与导入说明', link: '/setup/file-formats' },
          { text: '邀请你的同事一起来', link: '/setup/invite' },
        ]
      },
      {
        text: '进阶玩法',
        items: [
          { text: '上手配置 · 从熵减官开始', link: '/advanced/entropy-officer' },
          { text: '和 momo 说话需要技巧', link: '/advanced/talking-to-momo' },
          { text: '把思维模型变成 Skill', link: '/advanced/skills' },
          { text: '自主性 · 放手到什么程度', link: '/advanced/autonomy' },
          { text: '一种信息多种表达', link: '/advanced/multi-format' },
        ]
      },
      {
        text: '产品理念',
        items: [
          { text: '欢迎来到 AI 原生的工作空间', link: '/philosophy' },
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/dracohu2025-cloud/moxt-demo' }
    ],

    footer: {
      message: 'AI-native workspace for teams',
      copyright: '© 2025 Moxt'
    },

    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' }
          }
        }
      }
    },

    outline: {
      label: '页面导航',
      level: [2, 3]
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },

    lastUpdated: {
      text: '最后更新于'
    },

    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
  }
})
