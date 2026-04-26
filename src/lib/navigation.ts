export interface NavItem {
  label: string;
  href: string;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export type NavEntry = NavItem | NavGroup;

function isGroup(entry: NavEntry): entry is NavGroup {
  return "items" in entry;
}

export { isGroup };

export const navigation: NavEntry[] = [
  {
    label: "快速开始",
    items: [
      { label: "momo 使用指南", href: "/guide/momo" },
      { label: "AI 同事使用指南", href: "/guide/ai-teammates" },
      { label: "操作技巧与快捷键", href: "/guide/tips" },
    ],
  },
  {
    label: "设置与集成",
    items: [
      { label: "从 Notion / Google Drive 迁入", href: "/setup/import" },
      { label: "接入外部工具", href: "/setup/integrations" },
      { label: "文件格式与导入说明", href: "/setup/file-formats" },
      { label: "邀请同事", href: "/setup/invite" },
    ],
  },
  {
    label: "进阶玩法",
    items: [
      { label: "熵减官配置", href: "/advanced/entropy-officer" },
      { label: "和 momo 说话的技巧", href: "/advanced/talking-to-momo" },
      { label: "把思维模型变成 Skill", href: "/advanced/skills" },
      { label: "自主性控制", href: "/advanced/autonomy" },
      { label: "一种信息多种表达", href: "/advanced/multi-format" },
      { label: "可视化一切", href: "/advanced/showcase" },
    ],
  },
  { label: "产品理念", href: "/philosophy" },
];
