# 中文学日语

面向中文母语者的零基础日语学习网站，使用 React + TypeScript + Vite + Tailwind CSS 构建。内容目前全部来自本地 TypeScript 数据文件，无需后端或付费 API。

GitHub Pages: https://marksui.github.io/nihongo-learning/

## 功能

- 五十音图：平假名、片假名、romaji、例词和中文意思。
- 数字读法：复杂数字、价格、日期、人数、年龄、楼层和电话号码的读法速查。
- 常用单词：10 个分类、83 个入门词、例句、中文翻译和发音按钮；食物、水果、蔬菜配插图。
- 基础语法：8 个初级句型，包含中文讲解、例句和中文母语者常见误区。
- 日常会话：13 个场景对话，支持情景筛选、单句播放和整段播放。
- 快捷朗读：常用句整理成表格，直接点击日语文字即可朗读。

## 本地运行

```bash
npm install
npm run dev
```

然后打开终端显示的本地地址，例如 `http://localhost:5173/`。不要直接双击根目录的 `index.html`，因为浏览器不会编译 Vite 的 React/TypeScript 源码。

如果 Windows PowerShell 的执行策略拦截 `npm.ps1`，可以在同一目录使用：

```bash
npm.cmd install
npm.cmd run dev
```

## 预览生产版本

```bash
npm run build
npm run preview
```

## 发音说明

发音使用浏览器内置 Web Speech API：`SpeechSynthesisUtterance`，并设置 `lang = "ja-JP"`。如果浏览器或系统没有可用日语语音，页面会提示安装日语语音包或尝试 Chrome / Edge / Safari。
