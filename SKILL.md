---
name: travel-itinerary-designer
description: 提供現代化、沈浸式旅遊行程網頁的設計指導。強調「雙佈局切換系統」、「固定高度卡片設計」、「元件化分離架構」與「絕對零刪減整合原則」。
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
  - **毛玻璃 (Glassmorphism)**：使用 `backdrop-filter: blur(12px)` 與半透明背景營造層次感。
  - **陰影系統**：使用層次分明的陰影 (`0 10px 15px -3px rgba(0,0,0,0.1)`) 提升 UI 深度。

## 2. 雙排版系統規範 (Dual Layout System)

為了兼顧「視覺衝擊」與「快速檢索」，頁面應支援兩種排版模式並可即時切換：

### 網格排版 (Grid Mode) - 預設
- **特點**：大圖呈現，適合視覺瀏覽。
- **實作**：套用 `.grid-view` 類別，使用 `repeat(auto-fill, minmax(240px, 1fr))`。
- **卡片高度**：自動撐開，最小高度約 `380px`。

### 橫列排版 (List Mode)
- **特點**：精簡清單，適合快速比對。
- **結構 (150px 固定高度)**：
  1. **左側 (220px)**：固定寬度圖片。
  2. **中間 (Flexible)**：標題、標籤、兩行描述 (需截斷)。
  3. **右側 (150px)**：獨立功能按鈕區，帶有左側邊框分隔。
- **文字保護**：必須使用 `white-space: nowrap` 與 `ellipsis` 處理標題，`-webkit-line-clamp: 2` 處理描述。

## 3. 內容架構與分組 (Information Architecture)

### 攻略分組標準順序
1.  **🗺️ 景點攻略**
2.  **🌃 夜景攻略** (新增：針對名古屋等城市特色加入)
3.  **🍱 美食攻略**
4.  **🏨 住宿攻略**

### 每日行程摘要 (Timeline)
- **佈局**：在寬螢幕下應採四欄排列 (`repeat(4, 1fr)`)，以最大化利用螢幕空間。

## 4. 實作規範 (Implementation)

### 元件化管理 (Component Separation)
1.  **`Nagoya.html`**：UI 結構，卡片容器預設需包含 `grid-view` 類別。
2.  **`modals.html`**：存放全量筆記彈窗。
3.  **`script.js`**：負責篩選、排版切換及 `localStorage` 持久化。

### 排版切換邏輯
```javascript
function toggleLayout() {
  const grids = document.querySelectorAll(".card-grid");
  const willBeGrid = !grids[0].classList.contains("grid-view");
  grids.forEach(g => willBeGrid ? g.classList.add("grid-view") : g.classList.remove("grid-view"));
  localStorage.setItem("preferredLayout", willBeGrid ? "grid" : "list");
}
```

## 5. 跨檔案整合 SOP (Integration Workflow)

1.  **全量筆記提取**：從 `NOTE.md` 提取資訊時，遵循**絕對零刪減原則**。
2.  **HTML 注入**：
    - 在主頁面建立 `.card`，填入 `data-day` 用於篩選。
    - 確保按鈕 `onclick` 的 ID 與 `modals.html` 完全對應。
3.  **防跑版處理**：
    - 卡片圖片寬度、高度需在 CSS 中硬性規定。
    - 按鈕區域需加上 `box-sizing: border-box` 並設定固定寬度 (如 `150px`)。
4.  **預設值設定**：
    - `DOMContentLoaded` 時檢查 `localStorage` 的 `preferredLayout`。
    - 若無值，則預設為 `grid`。

## 6. 注意事項 (Precautions)

- **溢出保護**：固定高度的小卡必須設定 `overflow: hidden`，防止標籤過多或字數過長導致跑版。
- **手機版自動降級**：在 `@media (max-width: 768px)` 時，不論當前模式為何，一律強制切換為垂直單欄佈局。
- **內容完整性**：彈窗 (`modal-body`) 是唯一允許呈現細節（地圖編號、價格、詳細交通）的地方，主頁面小卡僅作為入口。
