# 中文学日语

面向中文母语者的零基础日语学习网站，使用 React + TypeScript + Vite + Tailwind CSS 构建。内容目前全部来自本地 TypeScript 数据文件，无需后端或付费 API。

## 功能

- 五十音图：平假名、片假名、romaji、例词和中文意思。
- 常用单词：8 个分类、64 个入门词、例句、中文翻译和发音按钮。
- 基础语法：8 个初级句型，包含中文讲解、例句和中文母语者常见误区。
- 日常会话：5 个场景对话，支持单句播放和整段播放。
- 练习测试：从本地数据生成 32 道假名、词义和语法题，提交后显示分数和正确答案。

## 本地运行

```bash
npm install
npm run dev
```

如果 Windows PowerShell 的执行策略拦截 `npm.ps1`，可以在同一目录使用：

```bash
npm.cmd install
npm.cmd run dev
```

## 发音说明

发音使用浏览器内置 Web Speech API：`SpeechSynthesisUtterance`，并设置 `lang = "ja-JP"`。如果浏览器或系统没有可用日语语音，页面会提示安装日语语音包或尝试 Chrome / Edge / Safari。
