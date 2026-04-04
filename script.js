let activeDays = new Set(["all"]);

// 動態載入彈窗內容
document.addEventListener("DOMContentLoaded", () => {
  fetch("modals.html")
    .then((response) => response.text())
    .then((data) => {
      const modalContainer = document.createElement("div");
      modalContainer.id = "modal-container";
      modalContainer.innerHTML = data;
      document.body.appendChild(modalContainer);
    })
    .catch((error) => console.error("載入彈窗失敗:", error));

  // 恢復先前儲存的排版偏好，若無儲存則預設為 grid
  const savedLayout = localStorage.getItem("preferredLayout");
  if (savedLayout === "list") {
    document.querySelectorAll(".card-grid").forEach((grid) => {
      grid.classList.remove("grid-view");
    });
  } else {
    // 預設或是 savedLayout === "grid"
    document.querySelectorAll(".card-grid").forEach((grid) => {
      grid.classList.add("grid-view");
    });
  }
});

/**
 * 切換排版 (橫列 / 網格)
 */
function toggleLayout() {
  const grids = document.querySelectorAll(".card-grid");
  // 以第一個 grid 的現狀來決定要切換成什麼
  const willBeGridView = !grids[0].classList.contains("grid-view");

  grids.forEach((grid) => {
    if (willBeGridView) {
      grid.classList.add("grid-view");
    } else {
      grid.classList.remove("grid-view");
    }
  });

  // 儲存偏好
  localStorage.setItem("preferredLayout", willBeGridView ? "grid" : "list");
}

function toggleFilter(dayId, element) {
  // Single-select radio behavior for timeline filters
  document.querySelectorAll(".summary-item").forEach((el) => {
    el.classList.remove("active");
  });

  if (dayId === "all") {
    activeDays = new Set(["all"]);
    element.classList.add("active");
  } else {
    activeDays = new Set([dayId]);
    element.classList.add("active");
  }

  applyFilters();
}

function applyFilters() {
  document.querySelectorAll(".day-block").forEach((block) => {
    const day = block.getAttribute("data-day");
    block.style.display =
      activeDays.has("all") || activeDays.has(day) ? "flex" : "none";
  });
  document.querySelectorAll(".card").forEach((card) => {
    const day = card.getAttribute("data-day");
    card.style.display =
      activeDays.has("all") || activeDays.has(day) ? "flex" : "none";
  });
}

/* Modal Logic */
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
}

window.onclick = function (event) {
  if (event.target.classList.contains("modal")) {
    event.target.style.display = "none";
    document.body.style.overflow = "auto";
  }
};
