[English Version](README_EN.md) | [中文版](README.md)

# Mermaid to SVG 转换工具

一个简单易用的Chrome扩展，用于将Mermaid图表代码转换为SVG格式。

## 功能特点

- 实时预览：输入Mermaid代码时即时渲染预览
- 主题切换：支持明暗两种主题模式
- 自定义文件名：下载SVG时可自定义文件名
- 优雅动画：平滑的过渡动画提升用户体验
- 错误提示：友好的错误提示信息

## 使用方法

1. 在Chrome浏览器中安装此扩展
2. 点击工具栏中的扩展图标打开编辑器
3. 在左侧编辑器中输入Mermaid图表代码
4. 右侧实时预览生成的图表
5. 输入自定义文件名（可选）
6. 点击"下载SVG"按钮保存图表

## 安装步骤

1. 克隆此仓库到本地：
   ```bash
   git clone https://github.com/zym9863/Mermaid-to-SVG.git
   ```

2. 安装依赖：
   ```bash
   npm install
   ```

3. 在Chrome浏览器中加载扩展：
   - 打开Chrome扩展管理页面 (chrome://extensions/)
   - 启用"开发者模式"
   - 点击"加载已解压的扩展程序"
   - 选择项目目录

## 技术栈

- Mermaid.js：图表渲染引擎
- 原生JavaScript：核心功能实现
- CSS3：样式和动画效果

## 贡献

欢迎提交Issue和Pull Request来帮助改进这个项目！