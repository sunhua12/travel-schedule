---
name: travel-itinerary-designer
description: 提供現代化、沈浸式旅遊行程網頁的設計指導。強調「自然色調系統」、「元件化分離架構」、「動態彈窗載入」與「絕對零刪減內容整合原則」。
---

# 旅遊行程設計指南 (Travel Itinerary Designer)

本技能提供製作高品質、沈浸式且具備深度互動性的旅遊行程計畫網頁之設計規範。

## 1. 核心視覺風格 (Visual Style)

- **設計語言**：沈浸式自然風格 (Immersive Nature Style)，強調大圖背景與現代排版。
- **關鍵色彩**：
  - **Primary (Nature)**：`#30af5b` (Green-50)，用於選取態、邊框與重點強調。
  - **Text Main**：`#141414` (Dark-90)，高對比深色，提供極佳閱讀性。
  - **Accent**：`#ff814c` (Orange) 或 `#fec601` (Yellow)，用於標籤與提醒。
- **視覺特效**：
  - **毛玻璃 (Glassmorphism)**：使用 `backdrop-filter: blur(8px)` 與半透明背景營造層次感。
  - **懸停動畫**：卡片在 Hover 時應有 `translateY(-8px)` 與深陰影反饋。

## 2. 排版與內容架構 (Information Architecture)

### 沈浸式 Hero 區塊
- **原則**：每個行程頁面頂部必須包含一個全寬 Hero 橫幅。
- **要素**：高品質背景圖、漸層遮罩、以及行程日期摘要。

### 視覺敘事卡片 (Visual Storytelling Cards)
- **結構**：
  1. `card-img`：位於卡片頂部，固定高度 (`200px`)，`object-fit: cover`。
  2. `card-body`：包含標題、分類標籤、簡介與操作按鈕。

### 攻略分組歸類 (Semantic Grouping)
- **順序**：1. 🗺️ 景點攻略 | 2. 🍱 美食攻略 | 3. 🏨 住宿攻略。

## 3. 互動與篩選邏輯 (Interactivity)

- **Radio 風格導覽**：天數篩選器採用按鈕/標籤樣式，選中態需具備明顯的深色背景。
- **絕對零刪減原則 (Unabridged Mandate)**：
  - 整合外部筆記時，**嚴禁任何形式的摘要、簡化或內容篩選**。詳細筆記必須完整保留所有細節（含出口編號、價格、私人備註）。

## 4. 實作規範 (Implementation)

### 元件化管理 (Component Separation)
為了保持主頁面 HTML 清爽，必須採取以下拆分模式：
1.  **`Nagoya.html`**：僅保留 UI 結構與卡片。
2.  **`modals.html`**：存放所有 `<div class="modal">` 彈窗內容。
3.  **`script.js`**：負責行為控制與動態內容加載。

### 動態彈窗載入邏輯
在 `script.js` 中使用 `fetch` 自動載入彈窗庫：
```javascript
document.addEventListener("DOMContentLoaded", () => {
  fetch("modals.html")
    .then(r => r.text())
    .then(data => {
      const div = document.createElement("div");
      div.innerHTML = data;
      document.body.appendChild(div);
    });
});
```

### 自定義 Hero 背景實作
```html
<header class="hero" style="background-image: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url('images/Nagoya.png');">
  ...
</header>
```

## 5. 現代化升級 SOP：從筆記到沈浸式網頁

1.  **規劃階段**：
    - 確認目標地點並挑選 1600px 本地圖片作為 Hero 背景。
    - 準備 `NOTE.md` 作為全量筆記來源。
2.  **視覺基調設定**：載入最新 `travel.css` 色調系統。
3.  **元件化拆分**：
    - 建立 `script.js` 與 `modals.html`。
    - 在主 HTML 底部引入 `<script src="script.js"></script>`。
4.  **圖文卡片轉換**：
    - 將 `NOTE.md` 條目轉換為 `.card`。
    - 圖片統一使用 `images/` 相對路徑。
5.  **筆記全量注入**：
    - 將 Markdown 精確轉化為 HTML 結構並放入 `modals.html`。
    - **嚴禁內容刪減**。
6.  **互動驗證**：
    - 測試天數過濾功能。
    - 驗證 Modal 彈出時的背景模糊與捲動鎖定。

## 6. 注意事項 (Precautions)

- **檔名一致性**：HTML 路徑必須與 `images/` 實體檔案完全一致（含副檔名）。
- **非同步加載**：確保 `fetch` 載入 `modals.html` 後，`openModal` 函數能正確找到對應的 ID。
- **文字對比**：視背景圖明暗調整 `linear-gradient` 的 alpha 值。
