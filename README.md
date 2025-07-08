# 療心智能部落格

這是療心智能官方部落格，使用 Hugo 靜態網站生成器建立，主要用於分享技術文章、產業洞察和團隊動態。

## 🚀 快速開始

### 環境需求

- [Hugo](https://gohugo.io/) (Extended版本 >= 0.104.0)
- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (可選，用於進階功能)

### 安裝 Hugo

#### macOS
```bash
brew install hugo
```

#### Windows
```bash
choco install hugo-extended
```

#### Linux
```bash
sudo snap install hugo --channel=extended
```

### 本地開發

1. **Clone 專案**
```bash
git clone <repository-url>
cd TeamBlog
```

2. **啟動本地伺服器**
```bash
hugo server -D
```

3. **瀏覽網站**
開啟瀏覽器訪問 `http://localhost:1313`

### 建立靜態檔案

```bash
hugo --minify
```

生成的檔案將在 `public/` 目錄中。

## 📝 文章管理

### 建立新文章

```bash
hugo new blog/your-post-title.md
```

### 文章前置資料 (Front Matter)

```yaml
---
title: "文章標題"
date: 2025-07-08T10:00:00+08:00
draft: false
tags: ["標籤1", "標籤2"]
categories: ["分類名稱"]
description: "文章描述，用於 SEO 和社群分享"
---

文章內容使用 Markdown 格式...
```

### 文章狀態

- `draft: true` - 草稿，不會在生產環境顯示
- `draft: false` - 已發布，會在網站上顯示

## 🎨 主題功能

### 內建功能

- ✅ 響應式設計
- ✅ 深色主題
- ✅ SEO 優化
- ✅ 社群媒體分享
- ✅ 文章分類和標籤
- ✅ 相關文章推薦
- ✅ JSON Feed 支援
- ✅ RSS 訂閱
- ✅ 404 錯誤頁面
- ✅ 圖片懶載入
- ✅ 平滑滾動
- ✅ 返回頂部按鈕

### 自訂配置

主要配置檔案：`hugo.toml`

#### 網站基本資訊
```toml
baseURL = "https://healthymind-tech.com/blog/"
languageCode = "zh-tw"
title = "療心智能部落格"
```

#### 社群媒體連結
```toml
[params.social]
  instagram = "https://www.instagram.com/healthymind.tech"
  threads = "https://www.threads.com/@healthymind.tech"
  email = "support@healthymind-tech.com"
```

#### 首頁設定
```toml
[params.home]
  posts = 6  # 首頁顯示的文章數量
```

## 🏗️ 專案結構

```
TeamBlog/
├── content/
│   └── blog/              # 部落格文章
├── themes/
│   └── healthymind/       # 自訂主題
│       ├── layouts/       # 模板檔案
│       └── static/        # 靜態資源
├── static/                # 全域靜態檔案
├── public/                # 生成的網站檔案
└── hugo.toml              # Hugo 配置檔案
```

## 🎯 部署

### Cloudflare Pages

1. 連結 GitHub 倉庫到 Cloudflare Pages
2. 設定建置命令：`hugo --minify`
3. 設定輸出目錄：`public`
4. 設定環境變數：
   - `HUGO_VERSION`: `0.104.0` (或更新版本)

### GitHub Actions (自動部署)

建立 `.github/workflows/deploy.yml`：

```yaml
name: Deploy Hugo site to Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

defaults:
  run:
    shell: bash

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v2
        with:
          hugo-version: 'latest'
          extended: true
          
      - name: Build with Hugo
        run: hugo --minify
        
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: ./public

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2
```

## 📱 主題自訂

### 顏色配置

編輯 `themes/healthymind/static/css/style.css` 中的 CSS 變數：

```css
:root {
  --primary: #00f5ff;      /* 主色調 */
  --secondary: #7b66ff;    /* 次要色調 */
  --accent: #ff3366;       /* 強調色 */
  --dark: #0a0a1f;         /* 背景色 */
  --light: #f0f0f5;        /* 文字色 */
}
```

### 字體設定

在 `baseof.html` 中修改 Google Fonts 連結：

```html
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;700&display=swap" rel="stylesheet">
```

### Logo 設定

將 Logo 圖片放置在 `static/images/logo.png`，並在 `hugo.toml` 中設定：

```toml
[params.site]
  logo = "/images/logo.png"
```

## 🔧 進階功能

### 搜尋功能

主題已預留搜尋功能介面，可整合：
- [Algolia](https://www.algolia.com/)
- [Lunr.js](https://lunrjs.com/)
- [Fuse.js](https://fusejs.io/)

### 評論系統

可整合第三方評論系統：
- [Disqus](https://disqus.com/)
- [Utterances](https://utteranc.es/)
- [Giscus](https://giscus.app/)

在 `hugo.toml` 中啟用：

```toml
[params.comments]
  enable = true
  provider = "disqus"  # 或其他提供商
```

### Google Analytics

在 `hugo.toml` 中設定：

```toml
[params.seo]
  googleAnalytics = "G-XXXXXXXXXX"
```

## 📊 SEO 優化

### 已實現的 SEO 功能

- Meta tags 最佳化
- Open Graph 支援
- Twitter Cards 支援
- JSON-LD 結構化資料
- XML Sitemap
- Robots.txt
- 圖片 Alt 標籤
- 語義化 HTML

### SEO 最佳實踐

1. **文章標題**：簡潔有力，包含關鍵字
2. **描述**：每篇文章都應有 `description`
3. **圖片**：使用有意義的檔名和 Alt 標籤
4. **內部連結**：適當連結相關文章
5. **載入速度**：使用 `--minify` 選項

## 🛠️ 疑難排解

### 常見問題

**Q: Hugo 版本過舊導致建置失敗**
A: 升級到 Hugo Extended 版本 >= 0.104.0

**Q: 樣式沒有載入**
A: 檢查主題路徑是否正確，確認 `hugo.toml` 中的 `theme = "healthymind"`

**Q: 圖片無法顯示**
A: 確認圖片路徑正確，使用 `![alt text](image-path)` 格式

**Q: 草稿文章不顯示**
A: 使用 `hugo server -D` 來顯示草稿文章

### 除錯方法

1. **檢查 Hugo 版本**
```bash
hugo version
```

2. **清除快取**
```bash
hugo --cleanDestinationDir
```

3. **詳細錯誤資訊**
```bash
hugo server --verbose
```

## 📞 支援

如有任何問題或建議，請聯繫：

- 📧 Email: support@healthymind-tech.com
- 📱 電話: 0978-110-677
- 🌐 官網: https://healthymind-tech.com/

## 📄 授權

本專案採用 MIT 授權條款。

---

**療心智能團隊** © 2025
