---
name: travel-itinerary-designer
description: 提供現代化、互動式旅遊行程網頁的設計指導。強調「分組歸類攻略」、「全量彈窗筆記（Modal）」與「絕對零刪減內容整合原則」。
---

# 旅遊行程設計指南 (Travel Itinerary Designer)

本技能提供製作高品質、高資訊密度且具備深度互動性的旅遊行程計畫網頁之設計規範。

## 1. 核心視覺風格 (Visual Style)

- **設計語言**：極簡主義 (Minimalism)，使用細邊框 (`#e5e7eb`)、大量留白與淡灰背景 (`#f9fafb`)。
- **關鍵色彩**：
  - **Accent**：`#2563eb` (專業藍)，用於進度點、選取態與主要動作按鈕。
  - **Highlight**：`#fef3c7` 背景配 `#92400e` 文字，專用於「詳細筆記」按鈕。
- **字體**：優先使用 `Noto Sans TC`，設定行高 `1.7` 以確保長篇筆記的閱讀舒適度。

## 2. 排版與內容架構 (Information Architecture)

### 獨立日期單元 (Granular Date Units)

- **原則**：行程必須按日拆分單獨展示（如 4/25, 4/26 分開），提供最精確的篩選顆粒度。

### 攻略分組歸類 (Semantic Grouping)

- **原則**：下方的詳細攻略區塊必須依序拆分為：
  1. **🗺️ 景點攻略** (Sightseeing)
  2. **🍱 美食攻略** (Food)
  3. **🏨 住宿攻略** (Accommodation)

### 彈跳視窗筆記架構 (Full-Note Modal System)

- **核心目的**：針對筆記內容極多的情況，使用彈跳視窗 (Modal) 呈現以保持頁面整潔。
- **絕對零刪減原則 (Unabridged Mandate)**：
  - **規範**：整合外部筆記時，**嚴禁任何形式的摘要、簡化或內容篩選**。
  - **要求**：必須包含所有交通細節（含出口編號）、歷史背景故事、所有推薦菜名與價格、每一項注意事項、以及括號內的私人備註。
  - **格式**：筆記中的 Markdown 結構（標題、清單、粗體、警告符號）必須精確轉化為 HTML 標籤。

## 3. 互動與篩選邏輯 (Interactivity)

- **Set 型態篩選**：使用 JavaScript `Set` 管理 `activeDays`，實現單選日期篩選。
- **全域同步**：點選日期圓點時，必須同時篩選「時間軸」與「三大攻略區塊」中的所有相關卡片。
- **Modal 管理**：實作支援傳入 `modalId` 的通用 `openModal(id)` 函數，並支援點選遮罩區域自動關閉與禁止底層捲動。

## 4. 實作規範 (Implementation)

### 絕對零刪減之轉化範例

- **原始筆記**：`* **空中腳踏車：** 每次只要 100 日圓，性價比極高。`
- **正確實作**：應保留「100 日圓」與「性價比極高」等所有修飾語與數據。

### Modal 控制邏輯

```javascript
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = "block";
    document.body.style.overflow = "hidden"; // 禁止底層捲動，維持閱讀專注
  }
}
```

## 5. 升級為通用型：NOTE.md -> HTML 的 SOP（彈跳視窗 Modal 設定重點）

1. 確認目標頁面與來源筆記
   - 目標檔案：任一行程頁面（例：`your-itinerary.html`、`index.html`）
   - 來源檔案：`NOTE.md`（或其他 Markdown/文字筆記）
2. 匹配景點/餐廳名稱與 modal id
   - 每個詳細筆記應有一個唯一 `modal` (e.g. `id="xxxxModal"`)
   - 卡片行為集中在按鈕：`onclick="openModal('xxxxModal')"`
   - Timeline 篩選要求單選：「全部」 vs 單一日期（Radio 風格）
3. Markdown → HTML 轉換規則
   - `#`、`##`、`###` 等標題轉為 `<h1>`、`<h2>`、`<h3>`
   - 無序列表 `-` / `*` 轉 `<ul><li>`；有序列表 `1.` `2.` 轉 `<ol><li>`
   - 字體格式：`**bold**` → `<strong>`、`*italic*` → `<em>`
   - 把所有原文內容完整維持（不做剪裁、概括、或拆句）
4. 嵌入現有風格與模態格式
   - 在目標 `modal` `.modal-body` 內嵌入 HTML
   - 注意韌體：防呆加入 `.warning-box` 以強調注意事項
   - 若需要地圖/導航鏈接，採標準按鈕：`<a class="btn btn-outline" href="..." target="_blank">地圖</a>`
5. 設定彈跳視窗 Modal 樣式與行為
   - **CSS 設定**：新增 `.modal`（全螢幕遮罩）、`.modal-content`（內容盒）、`.modal-header`（標題與關閉按鈕）、`.modal-body`（內容區）、`.warning-box`（警告提示）
   - **JS 設定**：實作 `openModal(id)`（顯示 modal 並禁止 body 捲動）、`closeModal(id)`（隱藏 modal 並恢復捲動）、`handleModalBackdrop(event)`（點擊遮罩關閉）、ESC 鍵監聽關閉
   - **互動邏輯**：確保 modal 支援滾動（`overflow-y: auto`）、z-index 高於其他元素（`z-index: 999`）、響應式設計（`max-width: 820px`）
6. 檢查互動邏輯一致性
   - 確認每個 `openModal('x')` 對應到 `<div id="x">`
   - 所有 `closeModal('x')` 與 backdrop 點擊關閉能正常運作
   - 篩選邏輯（`activeDays`）同步影響 timeline 與 card 顯示
7. 測試與驗證
   - 在瀏覽器開啟目標 html，逐一點按每個「詳細筆記」按鈕，確認內容呈現、捲動正常
   - 檢查 console 無錯誤、無重複 id、無缺失 modal
   - 驗證 modal 關閉後頁面狀態恢復（捲動解鎖）
8. 紀錄與版本控管
   - `git diff` / `git status` 確認更改
   - `git commit -m "docs: add NOTE.md to itinerary modal - generic procedure"`
   - 建議小步驟 commit 方便 rollback 和 review
