---
name: travel-itinerary-designer
description: 提供現代化、沈浸式旅遊行程網頁的設計指導。強調「自然色調系統」、「視覺敘事卡片」、「毛玻璃彈窗」與「絕對零刪減內容整合原則」。
---

# 旅遊行程設計指南 (Travel Itinerary Designer)

本技能提供製作高品質、沈浸式且具備深度互動性的旅遊行程計畫網頁之設計規範。

## 1. 核心視覺風格 (Visual Style)

- **設計語言**：沈浸式自然風格 (Immersive Nature Style)，強調大圖背景與現代排版。
- **關鍵色彩** (參考 Next.js 旅遊專案)：
  - **Primary (Nature)**：`#30af5b` (Green-50)，用於選取態、邊框與重點強調。
  - **Text Main**：`#141414` (Dark-90)，高對比深色，提供極佳閱讀性。
  - **Accent**：`#ff814c` (Orange) 或 `#fec601` (Yellow)，用於標籤與提醒。
- **視覺特效**：
  - **毛玻璃 (Glassmorphism)**：使用 `backdrop-filter: blur(8px)` 與半透明背景營造層次感。
  - **懸停動畫**：卡片在 Hover 時應有 `translateY(-8px)` 與深陰影反饋。

## 2. 排版與內容架構 (Information Architecture)

### 沈浸式 Hero 區塊

- **原則**：每個行程頁面頂部必須包含一個全寬 Hero 橫幅。
- **要素**：高品質背景圖（如立山黑部雪牆）、毛玻璃處理的標題容器、以及行程日期摘要。

### 視覺敘事卡片 (Visual Storytelling Cards)

- **原則**：攻略卡片不再只是文字，必須包含與內容相關的主題圖像。
- **結構**：
  1. `card-img`：位於卡片頂部，固定高度 (`200px`) 並使用 `object-fit: cover`。
  2. `card-body`：包含標題、分類標籤、簡介與操作按鈕。

### 攻略分組歸類 (Semantic Grouping)

- **順序**：1. 🗺️ 景點攻略 | 2. 🍱 美食攻略 | 3. 🏨 住宿攻略。

## 3. 互動與篩選邏輯 (Interactivity)

- **Radio 風格導覽**：天數篩選器應採用按鈕/標籤樣式，選中態需具備明顯的深色背景與陰影。
- **絕對零刪減原則 (Unabridged Mandate)**：
  - **規範**：整合外部筆記時，**嚴禁任何形式的摘要、簡化或內容篩選**。
  - **要求**：詳細筆記必須完整保留所有細節（含出口編號、價格、私人備註）。

## 4. 實作規範 (Implementation)

### 現代化 Modal 樣式

```css
.modal {
  display: none;
  position: fixed;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px); /* 毛玻璃遮罩 */
}
.modal-content {
  border-radius: 28px;
  animation: modalFadeIn 0.3s ease-out; /* 彈入動畫 */
}
```

### 主題圖像選取與管理

- **初期開發**：使用 `images.unsplash.com` 的占位圖快速建立視覺基調。
- **自定義轉換**：
  - 在專案根目錄建立 `images/` 資料夾。
  - 將自定義照片放入，建議採用英文命名或具備辨識度的中文檔名。
  - **路徑規範**：統一使用相對路徑 `<img src="images/檔名.副檔名">`。

### 自定義 Hero 背景實作

為了確保 Hero 區塊的標題在任何背景圖下都具備優良的易讀性，必須採用「漸層遮罩 + 本地圖片」的組合樣式：

```html
<header class="hero" style="background-image: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url('images/Nagoya.png');">
  ...
</header>
```
- **rgba(0,0,0,0.3)**：頂部較淺的遮罩。
- **rgba(0,0,0,0.5)**：底部較深的遮罩，增加文字與背景的對比。

## 5. 現代化升級 SOP：從筆記到沈浸式網頁

1. **規劃階段**：
   - 確認目標地點（如：名古屋），挑選一張代表性的 1600px 本地圖片作為 Hero 背景。
   - 準備 `NOTE.md` 作為全量筆記來源。
2. **視覺基調設定**：
   - 確保 `travel.css` 已載入最新的自然色調系統與毛玻璃樣式。
3. **Hero 與導覽實作**：
   - 插入 `.hero` 區塊，並使用行內樣式 (`inline style`) 指定本地背景圖與漸層遮罩。
   - 將 `itinerary-summary` 調整為現代導覽列。
4. **圖文卡片轉換與資產本地化**：
   - 將 `NOTE.md` 的條目轉換為 `.card`。
   - **資產更換**：將原本的 Unsplash URL 替換為 `images/` 下的對應圖片。
   - **驗證**：確保檔名與副檔名（如 `.webp`, `.jpg`, `.png`）完全匹配。
5. **筆記全量注入**：
   - 在頁面底部建立 Modal 容器。
   - 將 Markdown 結構（`###` -> `<h3>`）精確轉化，**不做任何內容刪減**。
6. **互動驗證**：
   - 測試天數切換是否能正確過濾「時間軸」與「下方卡片」。
   - 驗證 Modal 彈出時背景是否模糊，且捲動鎖定正常。
7. **響應式檢查**：
   - 確認手機版 Hero 區塊縮小高度，卡片改為單欄顯示。

## 6. 注意事項 (Precautions)

- **檔名一致性**：HTML 中的 `src` 路徑必須與 `images/` 資料夾內的實際檔名完全一致（含大小寫）。
- **圖片比例**：攻略卡片圖片建議選用橫向照片，CSS 會自動透過 `object-fit: cover` 進行裁切。
- **文字對比**：若更換 Hero 背景後文字不明顯，應調整 `linear-gradient` 中的 alpha 透明度值。
