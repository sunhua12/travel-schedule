---
name: travel-itinerary-designer
description: 提供現代化、互動式旅遊行程網頁的設計概念與實作指導。強調「獨立日期拆分」、「景點/餐廳全量補完」與「Set型態篩選邏輯」。
---

# 旅遊行程設計指南 (Travel Itinerary Designer)

本技能提供製作高品質、互動性強的旅遊行程計畫網頁之設計規範與實作邏輯。

## 1. 核心視覺風格 (Visual Style)

- **設計語言**：極簡主義 (Minimalism)，大量運用留白、細邊框 (`#e5e7eb`) 與層級清晰的字體排版。
- **關鍵色彩**：
  - **Accent**：`#2563eb` (標準藍)，用於進度點、選取態與主要按鈕。
  - **Highlight**：`#f97316` (亮橘)，標註特殊活動（如國王節、立山雪牆）。
- **字體**：優先使用 `Noto Sans TC`，設定合理的行高 (`1.7`) 確保閱讀舒適度。

## 2. 排版架構概念 (Layout Principles)

### 獨立日期單元 (Granular Data Units)
- **原則**：行程必須按日拆分，避免日期段合併（如 4/25-26 應拆為兩張卡片）。
- **意義**：提供更精確的篩選顆粒度，方便使用者查看特定日期的航班或行程細節。

### 全量景點指南 (Comprehensive Detail Supplement)
- **原則**：在「行程時間軸」中出現的**所有景點、餐廳、飯店**，都必須在下方的「景點/美食指南」區塊中有對應的小卡片。
- **內容要求**：每張卡片應包含：標題、分類標籤 (Tags)、簡短描述、以及行動呼籲按鈕 (如：地點連結、預訂官網)。

### 響應式佈局 (Responsive Layout)
- **時間軸**：橫向滾動容器 (`overflow-x: auto`) 配合純圓點連線設計。
- **網格系統**：使用 `repeat(auto-fill, minmax(300px, 1fr))` 確保卡片在各尺寸螢幕下整齊排列。

## 3. 互動與篩選邏輯 (Interactivity)

- **狀態管理**：使用原生 JavaScript `Set` 物件 (`activeDays`) 管理多重選取狀態。
- **航班整合**：不設立獨立航班區塊，而是將航班資訊（航班號、機場、時段）使用 `.flight-tag` 直接嵌入對應日期的時間軸卡片中。
- **雙向同步**：篩選器必須同時控制時間軸區塊 (`.day-block`) 與下方指南卡片 (`.card`)。

## 4. 實作規範 (Implementation)

### 篩選邏輯片段
```javascript
function toggleFilter(dayId, element) {
    if (dayId === 'all') {
        activeDays = new Set(['all']);
        // 清除其餘 active 樣式
    } else {
        if (activeDays.has('all')) activeDays.clear();
        activeDays.has(dayId) ? activeDays.delete(dayId) : activeDays.add(dayId);
        if (activeDays.size === 0) activeDays.add('all'); // 保底邏輯
    }
    applyFilters();
}
```

### HTML 結構標記
- 所有的 `.day-block` 與 `.card` 必須帶有正確的 `data-day="dayX"` 屬性以供 JavaScript 識別。
