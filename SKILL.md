---
name: travel-itinerary-designer
description: 提供現代化、互動式旅遊行程網頁的設計概念與實作指導。強調「獨立日期拆分」、「航班資訊整合」與「圓點式多重篩選」。
---

# 旅遊行程設計指南 (Travel Itinerary Designer)

本技能總結了製作現代化、高互動性旅遊計畫網頁的核心架構，特別針對多天數行程的精細化管理。

## 1. 核心視覺風格 (Visual Style)

- **極簡主義 (Minimalism)**：使用清晰的邊框（`--border: #e5e7eb`）與淡灰背景（`--section-bg: #f9fafb`）。
- **關鍵色彩**：
  - **主色調 (Accent)**：`#2563eb` (藍色)，代表專業與科技感。
  - **國王節/警示色 (King)**：`#f97316` (橘色)，用於特殊亮點。
- **字體規範**：選用 `Noto Sans TC`，設定合理的行高 (`1.7`)。

## 2. 排版架構概念 (Layout Principles)

### 獨立日期管理 (Granular Date Splitting)
- **原則**：避免合併日期（如 4/25-26），應將每一天拆分為獨立的資料單元。
- **好處**：提高篩選精確度，讓用戶能專注於特定日期的航班或行程。

### 圓點式橫向時間軸 (Horizontal Dot Timeline)
- **視覺隱喻**：圓點（Dot）代表時間節點，橫線（Line）代表旅程連續性。
- **設計規範**：
  - **純圓點設計**：移除 Checkbox，改以圓點填滿狀態表示選取。
  - **縮放效果**：Hover 時圓點放大，選取時增加外陰影 (`box-shadow`)。

### 航班資訊整合 (Flight Integration)
- **實作方式**：不設立獨立區塊，而是將航班明細（航班號、機場代碼、時間）直接嵌入對應日期的時間軸卡片中。
- **CSS 元件**：使用 `.flight-tag`（淡藍背景藍字）標記航班號碼。

## 3. 互動與篩選邏輯 (Interactivity)

- **多重選取機制**：使用 `new Set()` 管理 `activeDays`。
- **自動化邏輯**：
  - 點選「全部」時，清除所有特定日期選取。
  - 點選特定日期時，自動取消「全部」選取。
  - 當所有特定日期都被取消時，自動跳回「全部」。
- **DOM 連動**：同時篩選 `.day-block`（行程細節）與 `.card`（景點指南）。

## 4. 實作代碼片段 (Code Snippet)

```javascript
function toggleFilter(dayId, element) {
    if (dayId === 'all') {
        activeDays = new Set(['all']);
        // ... 重設樣式
    } else {
        if (activeDays.has('all')) activeDays.clear();
        activeDays.has(dayId) ? activeDays.delete(dayId) : activeDays.add(dayId);
        if (activeDays.size === 0) activeDays.add('all');
    }
    applyFilters();
}
```
