# 338 Theory

一个基于 Vue 3 + TypeScript + Vite 的静态页面项目，用来展示“338理论体系”。

## 项目结构

- `src/App.vue`：页面主视图
- `src/data/profiles.json`：338 人员档案数据
- `src/data/theory.json`：理论核心信息与四个因子数据
- `.github/workflows/deploy.yml`：GitHub Pages 自动部署配置

## 本地开发

安装依赖：

```bash
npm install
```

启动开发环境：

```bash
npm run dev
```

构建生产版本：

```bash
npm run build
```

本地预览构建结果：

```bash
npm run preview
```

## 部署

项目配置了 GitHub Actions 自动构建并部署到 GitHub Pages。

触发方式：

- 推送到 `main` 分支
- 在 GitHub Actions 页面手动触发

工作流会自动根据仓库名设置 Vite 的 `base` 路径，适配 GitHub Pages 子路径部署。
