---
version: alpha
name: 庸善文化
description: 宣纸底、墨色字、朱红只作印。极简、古朴、大气的传统编辑排版。原则取自 Oura 的暖纸与克制、WIRED 的杂志级字号阶梯和直角发丝线、Apple 的大片留白与磨砂浮栏。首页对联用青柳隶书，正文用方正仿宋，装饰短句「探五術之理」用芫荽。

colors:
  canvas: "#F6F0E5"
  surface: "#FBF7EF"
  ink: "#49372A"
  ink-soft: "#8B755E"
  ink-mute: "#B09A7D"
  seal: "#9C3B2A"
  cinnabar: "#B85B32"
  gold: "#B28A45"
  hairline: "#E5D3B9"
  hairline-ink: "rgba(73, 55, 42, 0.18)"
  on-ink: "#F6F0E5"

typography:
  display-slogan:
    fontFamily: Aoyagi Reisho
    fontSize: clamp(46px, 4.6vw, 76px)
    fontWeight: 400
    lineHeight: 1.35
    letterSpacing: 0.12em
  heading-1:
    fontFamily: FZFangSong
    fontSize: clamp(40px, 5vw, 64px)
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: 0.24em
  heading-2:
    fontFamily: FZFangSong
    fontSize: 26px
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: 0.28em
  title:
    fontFamily: FZFangSong
    fontSize: 20px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0.08em
  lead:
    fontFamily: FZFangSong
    fontSize: 18px
    fontWeight: 400
    lineHeight: 2.15
    letterSpacing: 0.22em
  body:
    fontFamily: FZFangSong
    fontSize: 17px
    fontWeight: 400
    lineHeight: 1.9
    letterSpacing: 0.02em
  body-sm:
    fontFamily: FZFangSong
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.85
    letterSpacing: 0.06em
  nav:
    fontFamily: FZFangSong
    fontSize: 17px
    fontWeight: 400
    lineHeight: 1
    letterSpacing: 0.2em
  button:
    fontFamily: FZFangSong
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1
    letterSpacing: 0.14em
  caption:
    fontFamily: FZFangSong
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0.14em
  eyebrow:
    fontFamily: FZFangSong
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0.28em
  decorative:
    fontFamily: Iansui
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1
    letterSpacing: 0.42em

rounded:
  none: 0px
  full: 9999px

spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  4xl: 96px

motion:
  ease: cubic-bezier(0.22, 1, 0.36, 1)
  rail: 380ms
  page-out: 360ms
  page-in: 420ms
  hover: 220ms

components:
  masthead:
    backgroundColor: "rgba(246, 240, 229, 0.86)"
    textColor: "{colors.ink}"
    typography: "{typography.nav}"
    height: 64px
    rounded: "{rounded.none}"
  hero-couplet:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.display-slogan}"
    rounded: "{rounded.none}"
  visual-tile:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    borderColor: "{colors.hairline-ink}"
    typography: "{typography.heading-2}"
    rounded: "{rounded.none}"
    padding: 36px 24px 28px
  resource-row:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    borderColor: "{colors.hairline-ink}"
    typography: "{typography.title}"
    rounded: "{rounded.none}"
    padding: 28px 0
  button-ink:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    borderColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    height: 44px
  text-input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    borderColor: "{colors.hairline-ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    height: 48px
  seal:
    backgroundColor: "{colors.seal}"
    rounded: "{rounded.none}"
---

## Overview

庸善文化是一座宣纸上的编辑页面，不是软件仪表盘。底色是米纸 `{colors.canvas}`（#F6F0E5），字是墨褐 `{colors.ink}`（#49372A）。朱红 `{colors.seal}` 只做印：顶栏旁的一枚小菱印，以及手机菜单里当前栏目。赭石 `{colors.cinnabar}` 与泥金 `{colors.gold}` 只出现在图解和条目眉批里，不拿来填按钮。

三份参照各自留下一条原则，没有把它们的品牌色搬过来：

- **Oura**（`design-md/oura/DESIGN.md`）：暖纸是页面的休息态，而不是白底；大块空白是结构；强调色极少，而且不铺在每个控件上。
- **WIRED**（`design-md/wired/DESIGN.md`）：层级靠字号，不靠粗细和阴影；交互是直角；栏目之间用 1px 发丝线分开，像杂志栏。
- **Apple**（`design-md/apple/DESIGN.md`）：界面退后，让罗盘、卦画、星盘这些「器物」占住视线；顶栏是一层磨砂浮条；可点区域至少 44px。

仿宋只有一个字重。层级靠尺寸、字距和墨色深浅，禁止合成粗体（`font-synthesis: none`）。

**Key Characteristics:**

- 宣纸满版，卡片不另起一块白，只用发丝线。
- 顶栏在桌面和手机上都浮起、固定，磨砂纸色，直角。
- 首页对联独占青柳隶书；其余中文用方正仿宋。
- 芫荽只写传统字短句「探五術之理」，因为 cmap 里没有简体「术」。
- 换页时下划线滑到当前栏目，正文淡入。罗盘的转速和墨线不动。
- 三个栏目分开：典藏是书目，明辨是可点的图解，玄机是计算。不把它们合成一页。

## Colors

### Brand & Accent

- **墨**（`{colors.ink}` — #49372A）：标题、正文、描边按钮、罗盘墨线。
- **朱印**（`{colors.seal}` — #9C3B2A）：顶栏菱印，手机菜单的当前项。一页只用一次。
- **赭**（`{colors.cinnabar}` — #B85B32）：图解里的强调，例如日柱、五行里点中的一项。不是按钮色。
- **泥金**（`{colors.gold}` — #B28A45）：条目的分类眉批。

### Surface

- **宣纸**（`{colors.canvas}` — #F6F0E5）：页面底。
- **浅纸**（`{colors.surface}` — #FBF7EF）：输入框和偶发的抬起层。
- **发丝**（`{colors.hairline}` — #E5D3B9，以及 `{colors.hairline-ink}`）：分割线、输入框、图块边。

### Text

- **墨**（`{colors.ink}`）：标题与正文。
- **次墨**（`{colors.ink-soft}` — #8B755E）：副题、说明、导语。
- **淡墨**（`{colors.ink-mute}` — #B09A7D）：最弱的注。
- **纸色字**（`{colors.on-ink}`）：墨底按钮上的字，仍是宣纸色，不用纯白。

### Semantic

工具不另做成功绿或警告黄。算出来的结果用墨色排成表；需要点明的一柱用 `{colors.cinnabar}`。

## Typography

### Font Family

1. **青柳隶书**（`AoyagiReisho`）：只用于首页对联「探五術之理 / 溯萬法之源」，文件 `fonts/AoyagiReisho-slogan.woff2`。
2. **方正仿宋简体**（`FZFangSong`，FZFangSong-Z02S）：正文、导航、栏目标题、卡片、按钮、表单。子集 `fonts/FZFangSong-Z02S.woff2`，`font-display: swap`。
3. **芫荽**（`Iansui`）：只用于手机菜单左侧竖排「探五術之理」。这六个字都在 cmap 里。简体正文不用它。子集 `fonts/Iansui-label.woff2`，许可证 `fonts/OFL-Iansui.txt`。

罗盘上的卦名、时辰、干支仍沿用原来的宋体回退栈，避免换字改变墨盘的字形。

### Hierarchy

| Token | Family | Size | Weight | Line height | Tracking | Use |
|---|---|---|---|---|---|---|
| `{typography.display-slogan}` | 青柳隶书 | clamp(46px, 4.6vw, 76px) | 400 | 1.35 | 0.12em | 首页对联 |
| `{typography.heading-1}` | 仿宋 | clamp(40px, 5vw, 64px) | 400 | 1.15 | 0.24em | 栏目标题 |
| `{typography.heading-2}` | 仿宋 | 26px | 400 | 1.3 | 0.28em | 图块标题 |
| `{typography.title}` | 仿宋 | 20px | 400 | 1.5 | 0.08em | 书名、卦名 |
| `{typography.lead}` | 仿宋 | 18px | 400 | 2.15 | 0.22em | 首页副题 |
| `{typography.body}` | 仿宋 | 17px | 400 | 1.9 | 0.02em | 经文与说明 |
| `{typography.body-sm}` | 仿宋 | 15px | 400 | 1.85 | 0.06em | 图块副行、卡片说明 |
| `{typography.nav}` | 仿宋 | 17px | 400 | 1 | 0.2em | 顶栏栏目 |
| `{typography.button}` | 仿宋 | 15px | 400 | 1 | 0.14em | 按钮 |
| `{typography.caption}` | 仿宋 | 13px | 400 | 1.6 | 0.14em | 眉批 |
| `{typography.eyebrow}` | 仿宋 | 15px | 400 | 1.4 | 0.28em | 小节题 |
| `{typography.decorative}` | 芫荽 | 15px | 400 | 1 | 0.42em | 竖排传统短句 |

### Principles

- 感觉靠隶书对联，阅读靠仿宋。仿宋不代替对联，隶书不进入导航。
- 字重永远 400。要强调，就加大字号或改成朱印色，不要加粗。
- 中文标题用正字距（0.2em 左右），正文几乎不拉开。
- 手机上栏目标题可以竖排，像书脊；正文保持横排。

## Layout

### Spacing System

- **Base unit**: 8px。
- **Tokens**: `{spacing.xxs}` 4 · `{spacing.xs}` 8 · `{spacing.sm}` 12 · `{spacing.md}` 16 · `{spacing.lg}` 24 · `{spacing.xl}` 32 · `{spacing.2xl}` 48 · `{spacing.3xl}` 64 · `{spacing.4xl}` 96。
- 栏与栏之间用 `{spacing.3xl}` 到 `{spacing.4xl}`。卡片内部用 `{spacing.lg}`。控件之间用 `{spacing.md}`。

### Grid & Container

- 正文栏宽 `{1120px}`，首页为了罗盘放到 `{1240px}`，都居中。
- 典藏分类 3 列，窄屏 2 列，再窄 1 列。
- 明辨落地页 2 列图块；玄机五件工具在宽屏上 3+2。
- 四柱、十二宫、六爻表保持原来的格子，只改字号和线，不改计算。

### Whitespace Philosophy

空白是纸，不是没排完。首页第一屏把对联和罗盘分开，下面只留一行落款。说明能折叠的就折叠，图先出来。

### Responsive Strategy

#### Breakpoints

| Name | Width | Key changes |
|---|---|---|
| Desktop | ≥ 981px | 顶栏横排四栏目，首页对联与罗盘两列 |
| Narrow desktop | 769–980px | 顶栏仍横排，字距收紧；首页改为上下叠 |
| Mobile | ≤ 768px | 顶栏只留站名和菜单；栏目变成全屏竖排；标题可竖排 |
| Phone | 360–420px | 单列图块；按钮和输入框拉满宽；菜单字号 24px |

#### Touch Targets

按钮、导航项、菜单项、输入、选择、卦爻行，最小 44×44px。输入字号 16px，避免手机浏览器聚焦时放大页面。

#### Collapsing Strategy

- 桌面四字栏目横排；768px 以下收进全屏菜单，当前项用朱印色。
- 图块 2 列收到 1 列。典藏九类在手机上 2 列，很窄时仍保持可点的高度。
- 宽表只在自己的框里横向滚动，不带动整页。

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| 0 | 无阴影，宣纸连续 | 默认 |
| 1 | 1px `{colors.hairline-ink}` | 图块、书目行、输入框、顶栏 |
| 2 | 宣纸 86% 不透明度 + 16px 模糊 | 只有顶栏，让正文从下面滚过去 |

卡片不用投影，也不在悬停时抬起。悬停只把纸色稍微染深，或把按钮填成墨色。

## Shapes

### Border Radius Scale

| Token | Value | Use |
|---|---|---|
| `{rounded.none}` | 0 | 顶栏、按钮、输入、图块、书目。印刷品的直角 |
| `{rounded.full}` | 9999px | 罗盘、干支圆盘、铜钱、卦爻圆点。这些是器物，不是控件 |

### Photography Geometry

分类水印图贴在内容区右侧，multiply，透明度约 0.16，左侧渐隐，不挡住字，也不接受点击。

## Components

### Navigation

**`masthead`** — 桌面与手机共用的浮顶栏。

- 距视口上沿 16px（手机再加安全区），左右留边，高 64px（手机 52px，滚动后 44px）。
- 左：站名「庸善文化」加一枚 7px 朱印菱形。右：四个栏目。
- 当前栏目下有一条 1px 墨线。换页时这条线滑过去，正文以 16px 的距离淡入。动效曲线 `{motion.ease}`，时长 `{motion.rail}` / `{motion.page-in}`。
- 手机：站名 + 菜单按钮。打开后是整屏宣纸，四行大字，中间一枚圆印「庸」，左侧竖排芫荽「探五術之理」（屏宽小于 340px 时收起，以免挤到字）。

### Hero

**`hero-couplet`** — 首页。

- 左对联，右罗盘。罗盘的绘制、墨色和旋转逻辑不改。
- 对联第二行缩进一个字，下面一条短墨线，再是两行仿宋副题。
- 罗盘上方是当日干支，页脚一行落款。

### Buttons

**`button-ink`** — 唯一的按钮。

- 透明底，1px 墨边，仿宋 15px，高 44px，直角。
- 悬停或当前：填墨，字改宣纸色。
- 禁用：透明度 0.35，悬停不变色。

### Inputs & Forms

**`text-input`** — 搜索和排盘表单。

- 高至少 44px（搜索 48px），直角，浅纸底，发丝边。
- 聚焦时边改为半墨，不改成金色光晕。
- 标签用 `{typography.caption}` 的次墨。

### Cards & Containers

**`visual-tile`** — 明辨、玄机的入口。

- 无填充，发丝边，图在上，标题在下。最小高度约 340px。悬停只染一层浅纸。

**`resource-row`** — 典藏书目。

- 没有卡片盒。书名、眉批、简介上下排，底边一条发丝线。「获取资源」靠右，手机上改到下一行并保持 44px 高。

**`category-card`** — 典藏九类。

- 直角线框，序号和「典藏」是眉批，类名是 `{typography.heading-2}` 一级的 24px。

### Signature Components

**`compass`** — 首页罗盘。转速、悬停暂停、墨线和太极不改。

**`seal`** — 7px 旋转方块，或菜单中央的圆印。颜色只用 `{colors.seal}`。

**`hairline-divider`** — 1px `rgba(73, 55, 42, 0.18)`。

## Motion

- 换页：下划线 380ms 滑到新栏目；正文 360ms 淡出、420ms 淡入，位移 12–16px。曲线 `cubic-bezier(0.22, 1, 0.36, 1)`。支持跨页 View Transition；不支持时用同样的淡出再跳转。
- 罗盘：沿用现有的时辰转速和悬停暂停。这一份设计系统不给它加新动画。
- 悬停：200–220ms 的颜色或底色，不位移、不放大、不投影。
- 卦爻演练里原有的画出和翻转保留。
- `prefers-reduced-motion: reduce` 时关掉换页、菜单和罗盘的连续动画。
- 不加弹跳、视差、循环闪光。

## Do's and Don'ts

### Do

- 新表面先问它是不是宣纸。是的话不要另铺白卡片。
- 新文字先问它是不是简体正文。是的话用仿宋。
- 把说明收进折叠，把图和解盘留在外面。
- 可点的东西做到 44px，手机上单列，表格自己滚动。
- 三个栏目维持三条路：典藏、明辨、玄机。

### Don't

- 不要改罗盘的画法和转速，也不要给它换一套彩色。
- 不要用芫荽写简体「术」「阴」「阳」「传」「统」。用之前对一下 cmap。
- 不要给仿宋加粗，不要用投影把书目抬起来。
- 不要把朱红铺成大按钮，不要新增一套紫或蓝。
- 不要改八字、紫微、六爻、六壬的计算。
- 不要把路径写成域名绝对地址。这是 GitHub Pages，链接保持相对。

## Responsive Behavior

见上一节的断点和触控。手机菜单用复选框打开，Esc 和点空白关闭；换页前先收起，避免过渡把整屏菜单拍进动画。

## Agent Prompt Guide

做这一站的新页面时：宣纸 #F6F0E5，墨 #49372A，发丝线，直角，仿宋 400，标题加大并拉开字距，按钮描边 44px，顶栏浮起。朱红 #9C3B2A 只做印。首页对联继续用青柳隶书。不要卡片阴影，不要新的循环动画。
