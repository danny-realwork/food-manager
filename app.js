const STORAGE_KEY = "homeInventory:v1";
const ACTIVITY_KEY = "homeInventory:activity:v1";
const SHOPPING_KEY = "homeInventory:shopping:v1";

const today = new Date("2026-05-27T09:00:00+09:00");
const oneDay = 24 * 60 * 60 * 1000;
const STORAGE_OPTIONS = ["냉장", "냉동", "실온"];
const CATEGORY_OPTIONS = ["식재료", "과일", "음료", "소스류", "간식", "건강식품", "기타"];

const seedItems = [
  item("삶은계란", "식재료", 1, "개", "냉장", null),
  item("수란", "식재료", 1, "개", "냉장", null),
  item("아보카도", "식재료", 1, "개", "냉장", null),
  item("날계란", "식재료", 70, "알", "냉장", null, "10알 + 2판"),
  item("슬라이스 치즈", "식재료", 1, "팩", "냉장", null),
  item("부침가루", "식재료", 1, "개", "실온", "2027-03-11"),
  item("새우", "식재료", 1, "봉지", "냉동", null),
  item("참치", "식재료", 7, "개", "실온", "2028-10-21"),
  item("스팸", "식재료", 9, "개", "실온", "2028-10-23"),
  item("잇츠팜", "식재료", 3, "개", "실온", "2028-01-21"),
  item("제첩국", "식재료", 1, "개", "냉동", null),
  item("카레", "식재료", 1, "개", "냉동", null),
  item("카레가루", "식재료", 1, "개", "실온", null),
  item("봉지김", "식재료", 6, "개", "실온", "2027-01-23"),
  item("삼양라면", "식재료", 10, "봉", "실온", null),
  item("신라면 컵", "식재료", 6, "개", "실온", "2026-08-09"),
  item("진라면 컵", "식재료", 1, "개", "실온", "2025-09-24"),
  item("사골농축액", "식재료", 1, "개", "실온", "2026-05-21"),
  item("햇반", "식재료", 3, "개", "실온", "2026-06-23"),
  item("스파게티면", "식재료", 2, "봉", "실온", "2028-09-10"),
  item("즉석 된장국", "식재료", 12, "개", "실온", null, "일본"),
  item("블루베리잼", "소스류", 1, "개", "냉장", "2026-05-30"),
  item("마늘칩", "식재료", 2, "통", "실온", "2027-04-06"),
  item("드링킹 요구르트 베리믹스", "음료", 1, "개", "냉장", null),
  item("두유", "음료", 8, "팩", "실온", null),
  item("토레타", "음료", 1, "개", "냉장", null),
  item("우유", "음료", 2, "통", "냉장", null),
  item("테이크핏", "건강식품", 1, "개", "실온", null),
  item("망고", "과일", 1, "알", "냉장", null),
  item("사과", "과일", 1, "알", "냉장", null),
  item("방울토마토", "과일", 1, "박스", "냉장", null),
  item("바나나", "과일", 2, "개", "실온", null),
  item("참외", "과일", 10, "알", "냉장", null),
  item("돈까스 소스", "소스류", 1, "개", "냉장", "2026-06-10"),
  item("스테이크 소스", "소스류", 1, "개", "냉장", "2027-09-11"),
  item("볶음깨", "소스류", 1, "개", "실온", null),
  item("와사비", "소스류", 1, "개", "냉장", "2026-11-30"),
  item("머스타드", "소스류", 1, "개", "냉장", "2026-03-05"),
  item("초고추장", "소스류", 1, "개", "냉장", "2027-06-08"),
  item("초고추장2", "소스류", 1, "개", "냉장", "2026-09-18"),
  item("카스테라", "간식", 2, "조각", "실온", null),
  item("너츠", "간식", 1, "개", "실온", null),
  item("하루견과", "간식", 1, "개", "실온", "2026-02-26"),
  item("밀크 카라멜", "간식", 1, "개", "실온", "2026-11-30", "스누피"),
  item("초콜렛", "간식", 1, "개", "실온", "2026-05-13", "스벅 하트틴"),
  item("솔라C 젤리", "간식", 8, "개", "실온", "2026-11-20"),
  item("단백바", "간식", 3, "개", "실온", "2026-08-19"),
  item("일본캔디", "간식", 1, "봉", "실온", "2027-04-01", "용각산"),
  item("일본 봉지과자", "간식", 3, "개", "실온", null),
  item("비타민C", "건강식품", 1, "개", "실온", null, "메가도스C 포함"),
  item("비타민D", "건강식품", 1, "개", "실온", null),
  item("매일만나", "건강식품", 60, "봉", "실온", null),
  item("프로바이오틱스", "건강식품", 1, "개", "실온", null),
  item("엔도카드", "건강식품", 1, "개", "실온", null, "식전 위보호제"),
  item("흑마늘", "건강식품", 1, "개", "실온", null),
  item("밀크시슬", "건강식품", 1, "개", "실온", null),
  item("MSM", "건강식품", 1, "개", "실온", null),
  item("아연", "건강식품", 1, "개", "실온", null),
  item("홍삼기보", "건강식품", 2, "박스", "실온", "2026-12-18"),
  item("오메가3", "건강식품", 1, "개", "실온", null),
  item("에비오스", "건강식품", 1, "개", "실온", null, "맥주효모"),
  item("숙면보조제", "건강식품", 1, "개", "실온", null)
];

let inventory = [];
let activities = [];
let shopping = [];
let pendingChanges = [];
let receiptCandidates = [];
let addPhotoData = "";
let dialogAddPhotoData = "";
let addDraft = null;
let receiptPhotoData = "";
let selectedInventoryCategory = "all";
let currentDialogSaveHandler = null;
let remoteAvailable = false;
let saveTimer = 0;

const els = {};

document.addEventListener("DOMContentLoaded", () => {
  cacheEls();
  bindEvents();
  initializeUi();
  initializeState();
  renderAll();
  syncWithRemote();
});

function item(name, category, quantity, unit, storage, expiresAt, notes = "") {
  return {
    id: crypto.randomUUID(),
    name,
    category,
    quantity,
    unit,
    storage: normalizeStorage(storage),
    expiresAt,
    notes,
    thumbnail: "",
    status: "active",
    createdAt: "2026-05-26T22:06:00+09:00",
    updatedAt: "2026-05-26T22:06:00+09:00"
  };
}

function cacheEls() {
  document.querySelectorAll("[id]").forEach((node) => {
    els[node.id] = node;
  });
}

function bindEvents() {
  document.querySelectorAll("[data-route]").forEach((button) => {
    button.addEventListener("click", () => setRoute(button.dataset.route));
  });

  document.querySelectorAll("[data-jump]").forEach((button) => {
    button.addEventListener("click", () => setRoute(button.dataset.jump));
  });

  document.querySelectorAll("[data-summary]").forEach((button) => {
    button.addEventListener("click", () => handleSummaryAction(button.dataset.summary));
  });

  [els.searchInput, els.storageFilter, els.statusFilter, els.sortFilter, els.useSearchInput].forEach((input) => {
    input.addEventListener("input", renderAll);
  });

  els.photoInput.addEventListener("change", (event) => readImage(event, "add"));
  els.photoInputCamera.addEventListener("change", (event) => readImage(event, "add"));
  els.receiptInput.addEventListener("change", (event) => readImage(event, "receipt"));
  els.addForm.addEventListener("submit", saveNewItem);
  els.resetAddButton.addEventListener("click", resetAddForm);
  els.openAddButton.addEventListener("click", () => openAddDialog());
  els.dialogCloseButton.addEventListener("click", () => els.itemDialog.close());
  els.dialogSaveButton.addEventListener("click", () => {
    if (currentDialogSaveHandler) currentDialogSaveHandler();
  });

  els.voiceButton.addEventListener("click", startVoice);
  els.analyzeVoiceButton.addEventListener("click", () => {
    queueVoiceChanges(els.voiceText.value);
  });
  els.clearUseButton.addEventListener("click", clearPendingChanges);
  els.applyChangesButton.addEventListener("click", applyPendingChanges);

  els.parseReceiptButton.addEventListener("click", parseReceipt);
  els.addCandidatesButton.addEventListener("click", addSelectedCandidates);
  els.exportButton.addEventListener("click", exportMarkdown);
  els.clearActivityButton.addEventListener("click", () => {
    activities = [];
    saveState();
    renderActivity();
  });

  els.filterToggle.addEventListener("click", () => {
    const isOpen = els.toolbarFilters.classList.toggle("is-open");
    els.filterToggle.textContent = isOpen ? "닫기" : "필터";
    els.filterToggle.classList.toggle("is-active", isOpen);
  });
}

function initializeUi() {
  const formatter = new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long"
  });
  els.todayLabel.textContent = formatter.format(today);
}

function initializeState() {
  cleanupLegacyUserState();
  inventory = loadInventory();
  activities = normalizeActivityList(loadJson(ACTIVITY_KEY, []));
  shopping = loadJson(SHOPPING_KEY, []);
  persistLocalState();
}

async function syncWithRemote() {
  const remote = await fetchRemoteState();
  if (!remote) return;

  remoteAvailable = true;
  if (Array.isArray(remote.inventory) && remote.inventory.length) {
    inventory = normalizeInventoryList(remote.inventory);
    activities = normalizeActivityList(remote.activities);
    shopping = Array.isArray(remote.shopping) ? remote.shopping : [];
    saveState();
    renderAll();
    return;
  }

  saveState();
}

function cleanupLegacyUserState() {
  localStorage.removeItem("homeInventory:user:v1");
}

function loadInventory() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedItems));
    return structuredClone(seedItems);
  }

  try {
    return normalizeInventoryList(JSON.parse(stored));
  } catch {
    return structuredClone(seedItems);
  }
}

function normalizeInventoryList(items) {
  if (!Array.isArray(items)) return structuredClone(seedItems);

  return items.map((stock) => {
    const item = { ...stock };
    delete item.addedBy;
    if (isGeneratedThumbnail(item.thumbnail)) {
      item.thumbnail = "";
    }
    item.storage = normalizeStorage(item.storage);
    return item;
  });
}

function normalizeActivityList(records) {
  if (!Array.isArray(records)) return [];

  return records.map((record) => {
    const activity = { ...record };
    delete activity.user;
    return activity;
  });
}

function loadJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback;
  } catch {
    return fallback;
  }
}

function saveJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function saveInventory() {
  saveState();
}

async function fetchRemoteState() {
  try {
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 8000);
    const response = await fetch(`/api/state?t=${Date.now()}`, { signal: controller.signal, cache: "no-store" });
    window.clearTimeout(timer);
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}

function persistLocalState() {
  saveJson(STORAGE_KEY, inventory);
  saveJson(ACTIVITY_KEY, activities);
  saveJson(SHOPPING_KEY, shopping);
}

function saveState() {
  persistLocalState();
  if (!remoteAvailable) return;

  window.clearTimeout(saveTimer);
  saveTimer = window.setTimeout(() => {
    fetch("/api/state", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inventory, activities, shopping })
    }).catch(() => {
      remoteAvailable = false;
      toast("공유 저장소 연결이 끊겼습니다");
    });
  }, 120);
}

function setRoute(route) {
  const titleMap = {
    home: "홈",
    inventory: "상수집 재고",
    add: "추가",
    use: "사용",
    inbox: "입고함"
  };

  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.toggle("is-active", screen.id === `screen-${route}`);
  });

  document.querySelectorAll("[data-route]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.route === route);
  });

  els.pageTitle.textContent = titleMap[route] || "홈";
  window.scrollTo({ top: 0, behavior: "smooth" });
  renderAll();
}

function renderAll() {
  renderSummary();
  renderPriority();
  renderRecent();
  renderActivity();
  renderInventory();
  renderUseGrid();
  renderChanges();
  renderCandidates();
}

function activeItems() {
  return inventory.filter(isActiveStock);
}

function isActiveStock(stock) {
  return stock.status === "active" && Number(stock.quantity) > 0;
}

function isConsumedStock(stock) {
  return stock.status === "consumed" || Number(stock.quantity) <= 0;
}

function groupItems(items = activeItems()) {
  const map = new Map();

  items.forEach((stock) => {
    const key = normalize(stock.name);
    if (!map.has(key)) {
      map.set(key, {
        key,
        name: stock.name,
        category: stock.category,
        storage: stock.storage,
        lots: [],
        quantity: 0,
        unit: stock.unit,
        thumbnail: stock.thumbnail || "",
        earliestExpiry: null,
        consumedEarliestExpiry: null
      });
    }

    const group = map.get(key);
    group.lots.push(stock);
    group.quantity += Number(stock.quantity) || 0;
    if (!group.thumbnail && stock.thumbnail) group.thumbnail = stock.thumbnail;
    if (isActiveStock(stock)) {
      group.earliestExpiry = earlierDate(group.earliestExpiry, stock.expiresAt);
    } else {
      group.consumedEarliestExpiry = earlierDate(group.consumedEarliestExpiry, stock.expiresAt);
    }
  });

  return Array.from(map.values()).map((group) => {
    group.lots.sort(compareLots);
    group.activeLots = group.lots.filter(isActiveStock);
    group.consumedLots = group.lots.filter(isConsumedStock);
    group.consumed = group.activeLots.length === 0;
    group.hasConsumed = group.consumedLots.length > 0;
    group.status = group.consumed ? { type: "consumed", label: "소진" } : expiryStatus(group.earliestExpiry);
    if (group.consumed && !group.earliestExpiry) {
      group.earliestExpiry = group.consumedEarliestExpiry;
    }
    return group;
  });
}

function compareLots(a, b) {
  const aTime = a.expiresAt ? new Date(a.expiresAt).getTime() : Number.MAX_SAFE_INTEGER;
  const bTime = b.expiresAt ? new Date(b.expiresAt).getTime() : Number.MAX_SAFE_INTEGER;
  if (aTime !== bTime) return aTime - bTime;
  return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
}

function earlierDate(current, candidate) {
  if (!candidate) return current || null;
  if (!current) return candidate;
  return new Date(candidate) < new Date(current) ? candidate : current;
}

function renderSummary() {
  const active = activeItems();
  const statuses = active.map((stock) => expiryStatus(stock.expiresAt).type);
  els.expiredCount.textContent = statuses.filter((status) => status === "expired").length;
  els.weekCount.textContent = statuses.filter((status) => status === "soon").length;
  els.activeCount.textContent = active.length;
  els.shoppingCount.textContent = shopping.length;
}

function handleSummaryAction(action) {
  if (action === "shopping") {
    openShoppingList();
    return;
  }

  els.searchInput.value = "";
  els.storageFilter.value = "all";
  els.statusFilter.value = "active";
  els.sortFilter.value = action === "active" ? "name" : "expiry";
  setRoute("inventory");
}

function renderPriority() {
  const priority = activeItems()
    .filter((stock) => stock.expiresAt)
    .map((stock) => ({ stock, status: expiryStatus(stock.expiresAt) }))
    .filter(({ status }) => ["expired", "soon"].includes(status.type))
    .sort((a, b) => new Date(a.stock.expiresAt) - new Date(b.stock.expiresAt))
    .slice(0, 8);

  if (!priority.length) {
    els.priorityList.innerHTML = empty("임박한 재고가 없습니다");
    return;
  }

  els.priorityList.innerHTML = priority.map(({ stock, status }) => `
    <button class="priority-item item-link" data-home-detail="${normalize(stock.name)}" type="button">
      ${thumb(stock)}
      <div>
        <h3>${escapeHtml(stock.name)}</h3>
        <p class="item-meta">${formatQuantity(stock)} · ${stock.storage} · ${formatDate(stock.expiresAt)}</p>
      </div>
      ${statusPill(status)}
    </button>
  `).join("");

  bindHomeDetailButtons(els.priorityList);
}

function renderRecent() {
  const recent = activeItems()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 6);

  if (!recent.length) {
    els.recentGrid.innerHTML = empty("재고가 없습니다");
    return;
  }

  els.recentGrid.innerHTML = recent.map((stock) => `
    <button class="mini-card item-link" data-home-detail="${normalize(stock.name)}" type="button">
      ${thumb(stock)}
      <div class="mini-card-body">
        <h3>${escapeHtml(stock.name)}</h3>
        <p class="item-meta">${formatQuantity(stock)}</p>
      </div>
    </button>
  `).join("");

  bindHomeDetailButtons(els.recentGrid);
}

function bindHomeDetailButtons(container) {
  container.querySelectorAll("[data-home-detail]").forEach((button) => {
    button.addEventListener("click", () => openGroupDetail(button.dataset.homeDetail));
  });
}

function renderActivity() {
  if (!activities.length) {
    els.activityList.innerHTML = empty("변경 기록이 없습니다");
    return;
  }

  els.activityList.innerHTML = activities.slice(0, 12).map((activity) => `
    <article class="activity-item">
      <div>
        <strong>${escapeHtml(activity.title)}</strong>
        <p class="change-detail">${escapeHtml(activity.detail)}</p>
      </div>
      <span class="activity-time">${relativeTime(activity.at)}</span>
    </article>
  `).join("");
}

function renderInventory() {
  const search = normalize(els.searchInput.value);
  const storage = els.storageFilter.value;
  const status = els.statusFilter.value;
  const sort = els.sortFilter.value;

  let source = inventory.filter((stock) => {
    if (status === "consumed") return isConsumedStock(stock);
    if (status === "all") return isActiveStock(stock) || isConsumedStock(stock);
    return isActiveStock(stock);
  });

  let groups = groupItems(source);
  if (search) {
    groups = groups.filter((group) => normalize(group.name).includes(search));
  }
  if (storage !== "all") {
    groups = groups.filter((group) => group.lots.some((lot) => lot.storage === storage));
  }

  renderCategoryTabs(groups);

  if (selectedInventoryCategory !== "all") {
    groups = groups.filter((group) => group.category === selectedInventoryCategory);
  }

  if (!groups.length) {
    els.inventoryGrid.innerHTML = empty("조건에 맞는 재고가 없습니다");
    return;
  }

  groups.sort((a, b) => compareInventoryGroups(a, b, sort));
  els.inventoryGrid.innerHTML = `
    <div class="inventory-list">
      ${groups.map((group) => inventoryCard(group)).join("")}
    </div>
  `;

  els.inventoryGrid.querySelectorAll("[data-detail]").forEach((button) => {
    button.addEventListener("click", () => openGroupDetail(button.dataset.detail));
  });

  els.inventoryGrid.querySelectorAll("[data-quick]").forEach((button) => {
    button.addEventListener("click", () => adjustGroupQuantity(button.dataset.quick, button.dataset.action));
  });

  els.inventoryGrid.querySelectorAll("[data-restore]").forEach((button) => {
    button.addEventListener("click", () => restoreFirstConsumed(button.dataset.restore));
  });

  els.inventoryGrid.querySelectorAll("[data-shopping]").forEach((button) => {
    button.addEventListener("click", () => addGroupToShopping(button.dataset.shopping));
  });
}

function renderCategoryTabs(groups) {
  const counts = groups.reduce((map, group) => {
    const category = group.category || "기타";
    map.set(category, (map.get(category) || 0) + 1);
    return map;
  }, new Map());

  const tabs = [
    { key: "all", label: "전체", count: groups.length },
    ...CATEGORY_OPTIONS.map((category) => ({
      key: category,
      label: category,
      count: counts.get(category) || 0
    })).filter((tab) => tab.count > 0 || tab.key === selectedInventoryCategory)
  ];

  if (!tabs.some((tab) => tab.key === selectedInventoryCategory)) {
    selectedInventoryCategory = "all";
  }

  els.categoryTabs.innerHTML = tabs.map((tab) => `
    <button
      class="category-tab ${tab.key === selectedInventoryCategory ? "is-active" : ""}"
      data-category-tab="${escapeHtml(tab.key)}"
      role="tab"
      aria-selected="${tab.key === selectedInventoryCategory}"
      type="button"
    >
      <span>${escapeHtml(tab.label)}</span>
      <strong>${tab.count}</strong>
    </button>
  `).join("");

  els.categoryTabs.querySelectorAll("[data-category-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedInventoryCategory = button.dataset.categoryTab;
      renderInventory();
    });
  });
}

function renderCategorySections(groups, sort) {
  return categorySections(groups, sort).map((section) => `
    <section class="inventory-category">
      <div class="category-head">
        <h2>${escapeHtml(section.category)}</h2>
        <span class="category-count">${section.groups.length}개</span>
      </div>
      <div class="inventory-list">
        ${section.groups.map((group) => inventoryCard(group)).join("")}
      </div>
    </section>
  `).join("");
}

function categorySections(groups, sort) {
  const sections = new Map();

  groups.forEach((group) => {
    const category = group.category || "기타";
    if (!sections.has(category)) {
      sections.set(category, []);
    }
    sections.get(category).push(group);
  });

  return Array.from(sections.entries())
    .sort(([a], [b]) => categoryRank(a) - categoryRank(b) || a.localeCompare(b, "ko"))
    .map(([category, categoryGroups]) => ({
      category,
      groups: categoryGroups.sort((a, b) => compareInventoryGroups(a, b, sort))
    }));
}

function compareInventoryGroups(a, b, sort) {
  if (sort === "name") return a.name.localeCompare(b.name, "ko");
  if (sort === "recent") return newestTime(b.lots) - newestTime(a.lots);
  return expiryTime(a.earliestExpiry) - expiryTime(b.earliestExpiry) || a.name.localeCompare(b.name, "ko");
}

function categoryRank(category) {
  const index = CATEGORY_OPTIONS.indexOf(category);
  return index >= 0 ? index : CATEGORY_OPTIONS.length;
}

function inventoryCard(group) {
  const imgHtml = group.thumbnail
    ? `<img class="card-thumb-img" src="${escapeHtml(group.thumbnail)}" alt="" loading="lazy">`
    : `<div class="card-thumb-fallback">${escapeHtml([...group.name][0] || "재")}</div>`;

  const expiryBadge = group.status.type !== "none" && group.status.type !== "consumed" ? statusPill(group.status) : "";

  return `
    <article class="inventory-card${group.consumed ? " is-consumed" : ""}">
      <div class="card-top">
        <div class="card-thumb-wrap">${imgHtml}</div>
        <button class="card-menu-btn" data-detail="${group.key}" type="button" aria-label="${escapeHtml(group.name)} 상세 보기">···</button>
      </div>
      <div class="card-body">
        <h3 class="card-name">${escapeHtml(group.name)}</h3>
        <div class="card-expiry-row">
          <span class="card-expiry-text">${expiryCaption(group)}</span>
          ${expiryBadge}
        </div>
        <div class="card-bottom">
          <div class="quantity-readout">
            <strong data-quantity-readout="${group.key}">${Number(group.quantity).toLocaleString("ko-KR")}</strong>
            <span>${escapeHtml(group.unit || "개")}</span>
          </div>
          ${group.consumed ? consumedCardActions(group) : activeCardActions(group)}
        </div>
      </div>
    </article>
  `;
}

function activeCardActions(group) {
  return `
    <div class="card-qty-actions">
      <button data-quick="${group.key}" data-action="minus1" type="button" aria-label="1 빼기">−</button>
      <button data-quick="${group.key}" data-action="plus1" type="button" aria-label="1 더하기">+</button>
    </div>
  `;
}

function consumedCardActions(group) {
  return `
    <div class="card-qty-actions">
      <button data-quick="${group.key}" data-action="plus1" type="button" aria-label="1 더하기">+</button>
    </div>
  `;
}

function renderUseGrid() {
  const search = normalize(els.useSearchInput.value);
  let groups = groupItems();

  if (search) {
    groups = groups.filter((group) => normalize(group.name).includes(search));
  }

  groups.sort((a, b) => {
    const statusRank = { expired: 0, soon: 1, ok: 2, none: 3, consumed: 4 };
    return statusRank[a.status.type] - statusRank[b.status.type] || a.name.localeCompare(b.name, "ko");
  });

  if (!groups.length) {
    els.useGrid.innerHTML = empty("차감할 재고가 없습니다");
    return;
  }

  els.useGrid.innerHTML = groups.map((group) => `
    <article class="use-card">
      <div>
        <h3>${escapeHtml(group.name)}</h3>
        <p class="item-meta">${formatGroupQuantity(group)} · ${group.storage}</p>
      </div>
      <div class="use-actions">
        <button data-queue="${group.key}" data-action="minus1" type="button">-1</button>
        <button data-queue="${group.key}" data-action="plus1" type="button">+1</button>
        <button data-queue="${group.key}" data-action="all" type="button">다 씀</button>
        <button data-queue="${group.key}" data-action="low" type="button">얼마 안 남음</button>
      </div>
    </article>
  `).join("");

  els.useGrid.querySelectorAll("[data-queue]").forEach((button) => {
    button.addEventListener("click", queueManualChange(button.dataset.queue, button.dataset.action));
  });
}

function renderChanges() {
  els.applyChangesButton.disabled = pendingChanges.length === 0;

  if (!pendingChanges.length) {
    els.changeList.innerHTML = empty("대기 중인 변경안이 없습니다");
    return;
  }

  els.changeList.innerHTML = pendingChanges.map((change, index) => `
    <article class="change-item">
      <div>
        <strong>${escapeHtml(change.name)}</strong>
        <p class="change-detail">${escapeHtml(change.detail)}</p>
      </div>
      <button class="ghost-button" data-remove-change="${index}" type="button">삭제</button>
    </article>
  `).join("");

  els.changeList.querySelectorAll("[data-remove-change]").forEach((button) => {
    button.addEventListener("click", () => {
      pendingChanges.splice(Number(button.dataset.removeChange), 1);
      renderChanges();
    });
  });
}

function renderCandidates() {
  els.addCandidatesButton.disabled = receiptCandidates.length === 0;

  if (!receiptCandidates.length) {
    els.candidateList.innerHTML = empty("입고 후보가 없습니다");
    return;
  }

  els.candidateList.innerHTML = receiptCandidates.map((candidate, index) => `
    <article class="candidate-item">
      <div>
        <label class="candidate-toggle">
          <input data-candidate-check="${index}" type="checkbox" ${candidate.selected ? "checked" : ""}>
          <span>${escapeHtml(candidate.name)}</span>
        </label>
        <p class="candidate-detail">${candidate.quantity}${escapeHtml(candidate.unit)} · ${escapeHtml(candidate.category)} · ${escapeHtml(candidate.storage)}</p>
      </div>
      <button class="ghost-button" data-edit-candidate="${index}" type="button">제외</button>
    </article>
  `).join("");

  els.candidateList.querySelectorAll("[data-candidate-check]").forEach((input) => {
    input.addEventListener("change", () => {
      receiptCandidates[Number(input.dataset.candidateCheck)].selected = input.checked;
    });
  });

  els.candidateList.querySelectorAll("[data-edit-candidate]").forEach((button) => {
    button.addEventListener("click", () => {
      receiptCandidates.splice(Number(button.dataset.editCandidate), 1);
      renderCandidates();
    });
  });
}

function queueManualChange(groupKey, action) {
  return () => {
    const group = groupItems().find((candidate) => candidate.key === groupKey);
    if (!group) return;
    const lot = group.lots[0];

    if (action === "minus1") {
      pendingChanges.push({
        type: "decrement",
        itemId: lot.id,
        name: group.name,
        amount: 1,
        detail: `${formatQuantity(lot)}에서 1${lot.unit || "개"} 차감`
      });
    }

    if (action === "plus1") {
      pendingChanges.push({
        type: "increment",
        itemId: lot.id,
        name: group.name,
        amount: 1,
        detail: `${formatQuantity(lot)}에서 1${lot.unit || "개"} 추가`
      });
    }

    if (action === "all") {
      pendingChanges.push({
        type: "consumeGroup",
        groupKey,
        name: group.name,
        detail: `${formatGroupQuantity(group)} 전체 소진`
      });
    }

    if (action === "low") {
      pendingChanges.push({
        type: "markLow",
        groupKey,
        name: group.name,
        detail: "상태를 얼마 안 남음으로 표시"
      });
    }

    setRoute("use");
    renderChanges();
    toast("변경안에 담았습니다");
  };
}

function restoreFirstConsumed(groupKey) {
  const stock = inventory.find((candidate) => normalize(candidate.name) === groupKey && isConsumedStock(candidate));
  if (!stock) return;

  stock.status = "active";
  stock.quantity = Math.max(Number(stock.quantity) || 0, 1);
  stock.updatedAt = new Date().toISOString();
  saveInventory();
  recordActivity("소진 되돌리기", `${stock.name}: 1${stock.unit || "개"}로 복구`);
  renderAll();
  toast("소진 항목을 되돌렸습니다");
}

function adjustGroupQuantity(groupKey, action) {
  const group = groupItems(inventory).find((candidate) => candidate.key === groupKey);
  if (!group) return;

  const lot = action === "minus1"
    ? (group.activeLots[0] || group.lots[0])
    : (group.activeLots[0] || group.lots[0]);
  if (!lot) return;

  const before = Number(lot.quantity) || 0;
  if (action === "minus1") {
    lot.quantity = Math.max(0, before - 1);
    if (lot.quantity <= 0) lot.status = "consumed";
  }

  if (action === "plus1") {
    lot.quantity = before + 1;
    lot.status = "active";
  }

  lot.updatedAt = new Date().toISOString();
  saveInventory();
  recordActivity("수량 변경", `${lot.name}: ${before}${lot.unit} → ${lot.quantity}${lot.unit}`);
  renderAll();
}

function addGroupToShopping(groupKey) {
  const group = groupItems(inventory.filter((stock) => normalize(stock.name) === groupKey)).at(0);
  if (!group) return;

  addShopping(group.name);
  recordActivity("다시 살 것 추가", `${group.name} 다시 사기`);
  renderAll();
  toast("다시 살 것에 담았습니다");
}

function openShoppingList() {
  setDialogSave("", null);
  els.dialogTitle.textContent = "다시 살 것";

  if (!shopping.length) {
    els.dialogBody.innerHTML = empty("다시 살 품목이 없습니다");
  } else {
    els.dialogBody.innerHTML = `
      <div class="shopping-list">
        ${shopping.map((name, index) => {
          const group = groupItems(inventory.filter((stock) => normalize(stock.name) === normalize(name))).at(0);
          const stock = group?.lots?.[0] || { name, category: "기타", thumbnail: "" };
          return `
            <article class="shopping-item">
              ${thumb(stock)}
              <div>
                <strong>${escapeHtml(name)}</strong>
                <p class="item-meta">${group ? `${escapeHtml(group.category)} · ${group.consumed ? "소진됨" : formatGroupQuantity(group)}` : "직접 추가한 품목"}</p>
              </div>
              <div class="shopping-actions">
                ${group ? `<button data-shopping-detail="${group.key}" type="button">재고 보기</button>` : ""}
                <button data-shopping-remove="${index}" type="button">삭제</button>
              </div>
            </article>
          `;
        }).join("")}
      </div>
    `;
  }

  els.dialogBody.querySelectorAll("[data-shopping-detail]").forEach((button) => {
    button.addEventListener("click", () => {
      els.itemDialog.close();
      openGroupDetail(button.dataset.shoppingDetail);
    });
  });

  els.dialogBody.querySelectorAll("[data-shopping-remove]").forEach((button) => {
    button.addEventListener("click", () => removeShoppingItem(Number(button.dataset.shoppingRemove)));
  });

  if (!els.itemDialog.open) {
    els.itemDialog.showModal();
  }
}

function removeShoppingItem(index) {
  const [removed] = shopping.splice(index, 1);
  if (!removed) return;

  saveState();
  renderAll();
  openShoppingList();
  toast("다시 살 것에서 뺐습니다");
}

function queueVoiceChanges(text) {
  const changes = parseUsageText(text);
  if (!changes.length) {
    toast("재고명과 수량을 찾지 못했습니다");
    return;
  }

  pendingChanges = [...pendingChanges, ...changes];
  renderChanges();
  toast(`${changes.length}개 변경안을 만들었습니다`);
}

function parseUsageText(text) {
  const source = normalizeSpeech(text);
  if (!source) return [];

  const groups = groupItems();
  const changes = [];

  groups.forEach((group) => {
    const nameKey = normalizeSpeech(group.name);
    const context = contextAroundName(source, nameKey);
    if (!context) return;

    const amount = findAmountNearName(source, nameKey);
    const usedAll = /다썼|다씀|다먹|다먹었|소진|없어졌|끝났/.test(context);
    const low = /조금|거의다|얼마안남|얼마안남았/.test(context);

    if (low && !amount) {
      changes.push({
        type: "markLow",
        groupKey: group.key,
        name: group.name,
        detail: "상태를 얼마 안 남음으로 표시"
      });
      return;
    }

    if (usedAll) {
      changes.push({
        type: "consumeGroup",
        groupKey: group.key,
        name: group.name,
        detail: `${formatGroupQuantity(group)} 전체 소진`
      });
      return;
    }

    const quantity = amount || 1;
    changes.push({
      type: "decrement",
      itemId: group.lots[0].id,
      name: group.name,
      amount: quantity,
      detail: `${quantity}${group.unit || "개"} 차감`
    });
  });

  return changes;
}

function contextAroundName(source, nameKey) {
  const index = source.indexOf(nameKey);
  if (index < 0) return "";
  return source.slice(Math.max(0, index - 12), index + nameKey.length + 14);
}

function findAmountNearName(source, nameKey) {
  const numbers = {
    한: 1,
    하나: 1,
    일: 1,
    두: 2,
    둘: 2,
    이: 2,
    세: 3,
    셋: 3,
    삼: 3,
    네: 4,
    넷: 4,
    사: 4,
    다섯: 5,
    오: 5,
    여섯: 6,
    육: 6,
    일곱: 7,
    칠: 7,
    여덟: 8,
    팔: 8,
    아홉: 9,
    구: 9,
    열: 10,
    십: 10
  };
  const numberToken = "(\\d+|하나|한|일|둘|두|이|셋|세|삼|넷|네|사|다섯|오|여섯|육|일곱|칠|여덟|팔|아홉|구|열|십)";
  const unitToken = "(개|장|봉|팩|알|통|조각|캔|박스|구)?";
  const escaped = escapeRegex(nameKey);
  const after = new RegExp(`${escaped}.{0,8}${numberToken}\\s*${unitToken}`);
  const before = new RegExp(`${numberToken}\\s*${unitToken}.{0,8}${escaped}`);
  const match = source.match(after) || source.match(before);
  if (!match) return null;
  const token = match[1];
  return Number(token) || numbers[token] || null;
}

function applyPendingChanges() {
  if (!pendingChanges.length) return;

  const applied = [];

  pendingChanges.forEach((change) => {
    if (change.type === "decrement") {
      const stock = inventory.find((candidate) => candidate.id === change.itemId);
      if (!stock || stock.status !== "active") return;
      const before = Number(stock.quantity) || 0;
      stock.quantity = Math.max(0, before - change.amount);
      stock.updatedAt = new Date().toISOString();
      if (stock.quantity <= 0) stock.status = "consumed";
      applied.push(`${stock.name}: ${before}${stock.unit} → ${stock.quantity}${stock.unit}`);
    }

    if (change.type === "increment") {
      const stock = inventory.find((candidate) => candidate.id === change.itemId);
      if (!stock) return;
      const before = Number(stock.quantity) || 0;
      stock.quantity = before + change.amount;
      stock.status = "active";
      stock.updatedAt = new Date().toISOString();
      applied.push(`${stock.name}: ${before}${stock.unit} → ${stock.quantity}${stock.unit}`);
    }

    if (change.type === "consumeGroup") {
      const groupLots = inventory.filter((stock) => normalize(stock.name) === change.groupKey && stock.status === "active");
      groupLots.forEach((stock) => {
        stock.quantity = 0;
        stock.status = "consumed";
        stock.updatedAt = new Date().toISOString();
      });
      applied.push(`${change.name}: 소진`);
      addShopping(change.name);
    }

    if (change.type === "markLow") {
      inventory
        .filter((stock) => normalize(stock.name) === change.groupKey && stock.status === "active")
        .forEach((stock) => {
          stock.notes = stock.notes ? `${stock.notes}, 얼마 안 남음` : "얼마 안 남음";
          stock.updatedAt = new Date().toISOString();
        });
      applied.push(`${change.name}: 얼마 안 남음`);
    }
  });

  saveInventory();
  if (applied.length) {
    recordActivity("재고 사용", applied.join(" · "));
  }
  pendingChanges = [];
  renderAll();
  toast("재고에 반영했습니다");
}

function clearPendingChanges() {
  pendingChanges = [];
  els.voiceText.value = "";
  renderChanges();
}

function saveNewItem(event) {
  event.preventDefault();

  const itemName = els.itemName.value.trim();
  const newItem = makeInventoryItem({
    name: itemName,
    category: els.itemCategory.value,
    quantity: Number(els.itemQuantity.value) || 1,
    unit: els.itemUnit.value.trim() || "개",
    storage: normalizeStorage(els.itemStorage.value),
    expiresAt: els.itemExpiry.value || null,
    notes: els.itemNotes.value.trim(),
    thumbnail: addPhotoData
  });

  inventory.push(newItem);
  saveInventory();
  recordActivity("재고 추가", `${newItem.name} ${formatQuantity(newItem)} · ${newItem.storage}`);
  resetAddForm();
  renderAll();
  toast("재고에 추가했습니다");
}

function openAddDialog(draft = null) {
  setDialogSave("", null);
  const values = draft || {
    name: "",
    category: "식재료",
    quantity: 1,
    unit: "개",
    storage: "실온",
    expiresAt: "",
    notes: "",
    thumbnail: ""
  };

  dialogAddPhotoData = values.thumbnail || "";
  els.dialogTitle.textContent = "재고 추가";
  els.dialogBody.innerHTML = `
    <form class="dialog-add-form" id="dialogAddForm">
      <div class="dialog-add-grid">
        <label>
          <span>품목명</span>
          <input id="dialogItemName" required placeholder="예: 계란" value="${escapeHtml(values.name)}">
        </label>
        <label>
          <span>카테고리</span>
          <select id="dialogItemCategory">
            ${CATEGORY_OPTIONS.map((category) => `<option ${category === values.category ? "selected" : ""}>${escapeHtml(category)}</option>`).join("")}
          </select>
        </label>
        <label>
          <span>수량</span>
          <input id="dialogItemQuantity" type="number" min="1" step="1" required value="${Number(values.quantity) || 1}">
        </label>
        <label>
          <span>단위</span>
          <input id="dialogItemUnit" placeholder="개" value="${escapeHtml(values.unit || "개")}">
        </label>
        <label>
          <span>보관</span>
          <select id="dialogItemStorage">
            ${STORAGE_OPTIONS.map((storage) => `<option ${storage === normalizeStorage(values.storage) ? "selected" : ""}>${escapeHtml(storage)}</option>`).join("")}
          </select>
        </label>
        <label>
          <span>유통기한</span>
          <input id="dialogItemExpiry" type="date" value="${escapeHtml(values.expiresAt || "")}">
        </label>
      </div>
      <label>
        <span>구성/재료</span>
        <textarea id="dialogItemNotes" rows="3" placeholder="예: 10알 + 2판, 구성품, 구매처">${escapeHtml(values.notes || "")}</textarea>
      </label>
      <div class="dialog-photo-row">
        <div class="dialog-photo-preview" data-add-photo-preview>
          ${dialogAddPhotoData ? `<img src="${escapeHtml(dialogAddPhotoData)}" alt="">` : `<span>사진 없음</span>`}
        </div>
        <div class="dialog-photo-pickers">
          <label class="dialog-photo-picker">
            <input id="dialogItemPhoto" type="file" accept="image/*">
            <span>갤러리</span>
          </label>
          <label class="dialog-photo-picker">
            <input id="dialogItemPhotoCamera" type="file" accept="image/*" capture="environment">
            <span>카메라</span>
          </label>
        </div>
      </div>
      <div class="form-actions">
        <button class="secondary-action" type="button" data-add-cancel>취소</button>
        <button class="primary-action" type="submit">입력 확인</button>
      </div>
    </form>
  `;

  els.dialogBody.querySelector("#dialogAddForm").addEventListener("submit", showAddConfirmation);
  els.dialogBody.querySelector("#dialogItemPhoto").addEventListener("change", (event) => readDialogAddPhoto(event.target.files?.[0]));
  els.dialogBody.querySelector("#dialogItemPhotoCamera").addEventListener("change", (event) => readDialogAddPhoto(event.target.files?.[0]));
  els.dialogBody.querySelector("[data-add-cancel]").addEventListener("click", () => els.itemDialog.close());

  if (!els.itemDialog.open) {
    els.itemDialog.showModal();
  }
}

function readDialogAddPhoto(file) {
  if (!file) return;

  compressAndUpload(file).then((url) => {
    dialogAddPhotoData = url;
    const preview = els.dialogBody.querySelector("[data-add-photo-preview]");
    if (preview) {
      preview.innerHTML = `<img src="${escapeHtml(url)}" alt="">`;
    }
  }).catch(() => {
    toast("사진 업로드에 실패했습니다");
  });
}

function showAddConfirmation(event) {
  event.preventDefault();
  setDialogSave("", null);

  const draft = collectAddDraft();
  if (!draft) return;

  addDraft = draft;
  els.dialogTitle.textContent = "추가 내용 확인";
  els.dialogBody.innerHTML = `
    <div class="add-confirm">
      <div class="add-confirm-photo">
        ${draft.thumbnail ? `<img src="${escapeHtml(draft.thumbnail)}" alt="">` : `<span>사진 없음</span>`}
      </div>
      <div class="add-confirm-main">
        <h3>입력될 재료</h3>
        <dl class="confirm-list">
          <div>
            <dt>품목명</dt>
            <dd>${escapeHtml(draft.name)}</dd>
          </div>
          <div>
            <dt>분류</dt>
            <dd>${escapeHtml(draft.category)} · ${escapeHtml(draft.storage)}</dd>
          </div>
          <div>
            <dt>수량</dt>
            <dd>${Number(draft.quantity).toLocaleString("ko-KR")}${escapeHtml(draft.unit)}</dd>
          </div>
          <div>
            <dt>유통기한</dt>
            <dd>${draft.expiresAt ? formatDate(draft.expiresAt) : "유통기한 없음"}</dd>
          </div>
          <div>
            <dt>구성/재료</dt>
            <dd>${draft.notes ? escapeHtml(draft.notes) : "메모 없음"}</dd>
          </div>
        </dl>
      </div>
      <div class="form-actions add-confirm-actions">
        <button class="secondary-action" type="button" data-add-edit>수정</button>
        <button class="primary-action" type="button" data-add-final>최종 추가</button>
      </div>
    </div>
  `;

  els.dialogBody.querySelector("[data-add-edit]").addEventListener("click", () => openAddDialog(addDraft));
  els.dialogBody.querySelector("[data-add-final]").addEventListener("click", confirmAddDraft);
}

function collectAddDraft() {
  const nameInput = els.dialogBody.querySelector("#dialogItemName");
  const quantityInput = els.dialogBody.querySelector("#dialogItemQuantity");
  const itemName = nameInput?.value.trim();
  const quantity = Number(quantityInput?.value);

  if (!itemName) {
    toast("품목명을 입력해주세요");
    nameInput?.focus();
    return null;
  }

  if (!Number.isFinite(quantity) || quantity < 1 || !Number.isInteger(quantity)) {
    toast("수량은 1개 단위로 입력해주세요");
    quantityInput?.focus();
    return null;
  }

  return {
    name: itemName,
    category: els.dialogBody.querySelector("#dialogItemCategory").value,
    quantity,
    unit: els.dialogBody.querySelector("#dialogItemUnit").value.trim() || "개",
    storage: normalizeStorage(els.dialogBody.querySelector("#dialogItemStorage").value),
    expiresAt: els.dialogBody.querySelector("#dialogItemExpiry").value || null,
    notes: els.dialogBody.querySelector("#dialogItemNotes").value.trim(),
    thumbnail: dialogAddPhotoData
  };
}

function confirmAddDraft() {
  if (!addDraft) return;

  const newItem = makeInventoryItem(addDraft);
  inventory.push(newItem);
  saveInventory();
  recordActivity("재고 추가", `${newItem.name} ${formatQuantity(newItem)} · ${newItem.storage}`);
  addDraft = null;
  dialogAddPhotoData = "";
  renderAll();
  els.itemDialog.close();
  toast("재고에 추가했습니다");
}

function makeInventoryItem(draft) {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    name: draft.name,
    category: draft.category,
    quantity: Number(draft.quantity) || 1,
    unit: draft.unit || "개",
    storage: normalizeStorage(draft.storage),
    expiresAt: draft.expiresAt || null,
    notes: draft.notes || "",
    thumbnail: draft.thumbnail || "",
    status: "active",
    createdAt: now,
    updatedAt: now
  };
}

function resetAddForm() {
  els.addForm.reset();
  els.itemQuantity.value = "1";
  els.itemUnit.value = "개";
  addPhotoData = "";
  els.photoInput.value = "";
  els.photoPreview.hidden = true;
  els.photoPreview.removeAttribute("src");
  els.photoPlaceholder.hidden = false;
}

function readImage(event, target) {
  const file = event.target.files?.[0];
  if (!file) return;

  if (target === "add") {
    els.photoPlaceholder.textContent = "업로드 중…";
    compressAndUpload(file).then((url) => {
      addPhotoData = url;
      els.photoPreview.src = url;
      els.photoPreview.hidden = false;
      els.photoPlaceholder.hidden = true;
    }).catch(() => {
      els.photoPlaceholder.textContent = "촬영 또는 업로드";
      toast("사진 업로드에 실패했습니다");
    });
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    receiptPhotoData = reader.result;
    els.receiptPreview.src = receiptPhotoData;
    els.receiptPreview.hidden = false;
    els.receiptPlaceholder.hidden = true;
  };
  reader.readAsDataURL(file);
}

async function compressAndUpload(file) {
  const bitmap = await createImageBitmap(file);
  const maxSize = 600;
  let { width, height } = bitmap;
  if (width > maxSize || height > maxSize) {
    const scale = maxSize / Math.max(width, height);
    width = Math.round(width * scale);
    height = Math.round(height * scale);
  }
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  canvas.getContext("2d").drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.75));
  const res = await fetch("/api/upload", {
    method: "POST",
    body: blob,
    headers: { "Content-Type": "image/jpeg" }
  });
  if (!res.ok) throw new Error("upload failed");
  const { url } = await res.json();
  return url;
}

function startVoice() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    toast("이 브라우저는 음성 인식을 지원하지 않습니다");
    els.voiceText.focus();
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "ko-KR";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  els.voiceButton.textContent = "듣는 중";
  els.voiceButton.disabled = true;

  recognition.onresult = (event) => {
    els.voiceText.value = event.results[0][0].transcript;
    queueVoiceChanges(els.voiceText.value);
  };

  recognition.onerror = () => {
    toast("음성을 다시 시도해주세요");
  };

  recognition.onend = () => {
    els.voiceButton.textContent = "녹음";
    els.voiceButton.disabled = false;
  };

  recognition.start();
}

function parseReceipt() {
  const text = els.receiptText.value.trim();
  if (!text) {
    toast("구매 텍스트를 넣어주세요");
    return;
  }

  receiptCandidates = text
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map(parsePurchaseLine)
    .filter(Boolean);

  renderCandidates();
  toast(`${receiptCandidates.length}개 후보를 찾았습니다`);
}

function parsePurchaseLine(line) {
  const ignored = /(배송|주문|결제|총|할인|쿠팡|로켓|무료|원$|리뷰|교환|반품)/;
  if (ignored.test(line) && !/\d+\s*(개|팩|봉|알|구|통|박스|캔|장)/.test(line)) return null;

  const cleaned = line
    .replace(/\[[^\]]+\]/g, "")
    .replace(/\([^)]*원[^)]*\)/g, "")
    .replace(/[0-9,]+원/g, "")
    .replace(/\s+/g, " ")
    .trim();

  const match = cleaned.match(/(.+?)\s*(\d+)\s*(개|팩|봉|알|구|통|박스|캔|장|입|매|병)?\s*$/);
  const name = match ? match[1].trim() : cleaned;
  const quantity = match ? Number(match[2]) : 1;
  const unit = match?.[3] || guessUnit(name);
  const category = guessCategory(name);

  if (!name || name.length < 2) return null;

  return {
    id: crypto.randomUUID(),
    name: cleanProductName(name),
    quantity,
    unit,
    category,
    storage: normalizeStorage(guessStorage(name, category)),
    selected: category !== "기타",
    thumbnail: ""
  };
}

function addSelectedCandidates() {
  const selected = receiptCandidates.filter((candidate) => candidate.selected);
  if (!selected.length) {
    toast("선택된 후보가 없습니다");
    return;
  }

  const now = new Date().toISOString();
  selected.forEach((candidate) => {
    inventory.push({
      id: crypto.randomUUID(),
      name: candidate.name,
      category: candidate.category,
      quantity: candidate.quantity,
      unit: candidate.unit,
      storage: normalizeStorage(candidate.storage),
      expiresAt: null,
      notes: "구매내역 입고",
      thumbnail: candidate.thumbnail || "",
      status: "active",
      createdAt: now,
      updatedAt: now
    });
  });

  saveInventory();
  recordActivity("구매 입고", selected.map((candidate) => `${candidate.name} ${candidate.quantity}${candidate.unit}`).join(" · "));
  receiptCandidates = [];
  els.receiptText.value = "";
  renderAll();
  toast("입고 후보를 재고에 반영했습니다");
}

function openGroupDetail(groupKey) {
  const group = groupItems(inventory).find((candidate) => candidate.key === groupKey);
  if (!group) return;

  setDialogSave("저장", () => saveGroupDetail(group.key));
  els.dialogTitle.textContent = group.name;
  els.dialogBody.innerHTML = `
    <div class="detail-editor">
      <label>
        <span>품목명</span>
        <input data-group-name="${group.key}" value="${escapeHtml(group.name)}">
      </label>
      <div class="detail-photo-editor">
        ${group.thumbnail ? thumb({ name: group.name, thumbnail: group.thumbnail }) : `<div class="photo-empty">사진 없음</div>`}
        <div class="detail-photo-actions">
          <label>
            <input data-group-photo="${group.key}" type="file" accept="image/*">
            갤러리
          </label>
          <label>
            <input data-group-photo-camera="${group.key}" type="file" accept="image/*" capture="environment">
            카메라
          </label>
          <button data-clear-group-photo="${group.key}" type="button">사진 삭제</button>
        </div>
      </div>
    </div>
    <div class="lot-list">
      ${group.lots.map((lot) => `
        <article class="lot-row">
          <div class="detail-lot-fields">
            <label>
              <span>남은 수량</span>
              <input data-lot-input="${lot.id}" type="number" min="0" step="1" value="${Number(lot.quantity) || 0}">
            </label>
            <label>
              <span>단위</span>
              <input data-lot-unit="${lot.id}" value="${escapeHtml(lot.unit || "개")}" placeholder="개">
            </label>
            <label class="lot-full">
              <span>보관</span>
              <select data-lot-storage="${lot.id}">
                ${STORAGE_OPTIONS.map((s) => `<option ${s === lot.storage ? "selected" : ""}>${escapeHtml(s)}</option>`).join("")}
              </select>
            </label>
            <label class="lot-full">
              <span>유통기한</span>
              <input data-lot-expiry="${lot.id}" type="date" value="${escapeHtml(lot.expiresAt || "")}">
            </label>
            <label class="lot-full">
              <span>메모</span>
              <input data-lot-notes="${lot.id}" value="${escapeHtml(lot.notes || "")}" placeholder="구성, 구매처 등">
            </label>
          </div>
        </article>
      `).join("")}
    </div>
  `;

  els.dialogBody.querySelectorAll("[data-group-photo]").forEach((input) => {
    input.addEventListener("change", () => updateGroupPhoto(input.dataset.groupPhoto, input.files?.[0]));
  });
  els.dialogBody.querySelectorAll("[data-group-photo-camera]").forEach((input) => {
    input.addEventListener("change", () => updateGroupPhoto(input.dataset.groupPhotoCamera, input.files?.[0]));
  });

  els.dialogBody.querySelectorAll("[data-clear-group-photo]").forEach((button) => {
    button.addEventListener("click", () => clearGroupPhoto(button.dataset.clearGroupPhoto));
  });

  if (!els.itemDialog.open) {
    els.itemDialog.showModal();
  }
}

function saveGroupDetail(groupKey) {
  const lots = inventory.filter((stock) => normalize(stock.name) === groupKey);
  if (!lots.length) return;

  const nameInput = els.dialogBody.querySelector("[data-group-name]");
  const nextName = nameInput?.value.trim();
  if (!nextName) {
    toast("품목명을 입력해주세요");
    nameInput?.focus();
    return;
  }

  const updates = [];
  for (const stock of lots) {
    const quantityInput = els.dialogBody.querySelector(`[data-lot-input="${stock.id}"]`);
    const unitInput = els.dialogBody.querySelector(`[data-lot-unit="${stock.id}"]`);
    const storageInput = els.dialogBody.querySelector(`[data-lot-storage="${stock.id}"]`);
    const expiryInput = els.dialogBody.querySelector(`[data-lot-expiry="${stock.id}"]`);
    const notesInput = els.dialogBody.querySelector(`[data-lot-notes="${stock.id}"]`);
    const nextQuantity = Number(quantityInput?.value);
    const nextUnit = unitInput?.value.trim() || "개";
    const nextStorage = normalizeStorage(storageInput?.value);
    const nextExpiry = expiryInput?.value || "";
    const nextNotes = notesInput?.value.trim() || "";

    if (!Number.isFinite(nextQuantity) || nextQuantity < 0 || !Number.isInteger(nextQuantity)) {
      toast("남은 수량은 0 이상의 정수로 입력해주세요");
      quantityInput?.focus();
      return;
    }

    if (stock.name !== nextName) updates.push(`${stock.name} → ${nextName}`);
    if (Number(stock.quantity) !== nextQuantity) updates.push(`${stock.name}: ${stock.quantity}${stock.unit || "개"} → ${nextQuantity}${nextUnit}`);

    stock.name = nextName;
    stock.quantity = nextQuantity;
    stock.unit = nextUnit;
    stock.storage = nextStorage;
    stock.expiresAt = nextExpiry || null;
    stock.notes = nextNotes;
    stock.status = nextQuantity > 0 ? "active" : "consumed";
    stock.updatedAt = new Date().toISOString();
  }

  saveInventory();
  if (updates.length) {
    recordActivity("상세 저장", updates.slice(0, 4).join(" · "));
  }
  renderAll();
  els.itemDialog.close();
  toast("상세 정보를 저장했습니다");
}

function updateGroupName(groupKey) {
  const input = els.dialogBody.querySelector("[data-group-name]");
  const nextName = input?.value.trim();
  if (!nextName) {
    toast("품목명을 입력해주세요");
    return;
  }

  const lots = inventory.filter((stock) => normalize(stock.name) === groupKey);
  if (!lots.length) return;

  const before = lots[0].name;
  lots.forEach((stock) => {
    stock.name = nextName;
    stock.updatedAt = new Date().toISOString();
  });
  saveInventory();
  recordActivity("품목명 변경", `${before} → ${nextName}`);
  renderAll();
  openGroupDetail(normalize(nextName));
  toast("품목명을 바꿨습니다");
}

function updateGroupPhoto(groupKey, file) {
  const lots = inventory.filter((stock) => normalize(stock.name) === groupKey);
  if (!lots.length || !file) return;

  toast("사진 업로드 중…");
  compressAndUpload(file).then((url) => {
    lots.forEach((stock) => {
      stock.thumbnail = url;
      stock.updatedAt = new Date().toISOString();
    });
    saveInventory();
    recordActivity("사진 변경", `${lots[0].name} 사진 업로드`);
    renderAll();
    openGroupDetail(groupKey);
    toast("사진을 올렸습니다");
  }).catch(() => {
    toast("사진 업로드에 실패했습니다");
  });
}

function clearGroupPhoto(groupKey) {
  const lots = inventory.filter((stock) => normalize(stock.name) === groupKey);
  if (!lots.length) return;

  lots.forEach((stock) => {
    stock.thumbnail = "";
    stock.updatedAt = new Date().toISOString();
  });
  saveInventory();
  recordActivity("사진 변경", `${lots[0].name} 사진 삭제`);
  renderAll();
  openGroupDetail(groupKey);
  toast("사진을 삭제했습니다");
}

function handleLotAction(id, action) {
  const stock = inventory.find((candidate) => candidate.id === id);
  if (!stock) return;

  if (action === "set") {
    const input = els.dialogBody.querySelector(`[data-lot-input="${id}"]`);
    const nextQuantity = Number(input?.value);
    if (!Number.isFinite(nextQuantity) || nextQuantity < 0) {
      toast("남은 수량을 0 이상으로 입력해주세요");
      return;
    }

    const before = Number(stock.quantity) || 0;
    stock.quantity = nextQuantity;
    stock.status = nextQuantity > 0 ? "active" : "consumed";
    recordActivity("수량 수정", `${stock.name}: ${before}${stock.unit} → ${stock.quantity}${stock.unit}`);
  }

  if (action === "minus1") {
    const before = Number(stock.quantity) || 0;
    stock.quantity = Math.max(0, before - 1);
    if (stock.quantity <= 0) stock.status = "consumed";
    recordActivity("직접 수정", `${stock.name}: ${before}${stock.unit} → ${stock.quantity}${stock.unit}`);
  }

  if (action === "plus1") {
    const before = Number(stock.quantity) || 0;
    stock.quantity = before + 1;
    stock.status = "active";
    recordActivity("직접 수정", `${stock.name}: ${before}${stock.unit} → ${stock.quantity}${stock.unit}`);
  }

  if (action === "all") {
    stock.quantity = 0;
    stock.status = "consumed";
    addShopping(stock.name);
    recordActivity("소진 처리", `${stock.name} 소진`);
  }

  if (action === "undo") {
    stock.status = "active";
    stock.quantity = Math.max(Number(stock.quantity) || 0, 1);
    recordActivity("되돌리기", `${stock.name} 활성화`);
  }

  stock.updatedAt = new Date().toISOString();
  saveInventory();
  renderAll();
  openGroupDetail(normalize(stock.name));
}

function exportMarkdown() {
  const rows = activeItems()
    .sort(compareLots)
    .map((stock) => `| ${stock.name} | ${stock.category} | ${stock.quantity} | ${stock.unit} | ${stock.storage} | ${stock.expiresAt || ""} | ${stock.notes || ""} |`);

  const markdown = [
    "# 상수집 식재료관리",
    "",
    `업데이트: ${new Intl.DateTimeFormat("ko-KR", { dateStyle: "medium", timeStyle: "short" }).format(new Date())}`,
    "",
    "| 품목 | 카테고리 | 수량 | 단위 | 보관 | 유통기한 | 메모 |",
    "|---|---:|---:|---|---|---|---|",
    ...rows
  ].join("\n");

  const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "상수집-식재료관리.md";
  a.click();
  URL.revokeObjectURL(url);
}

function addShopping(name) {
  if (shopping.some((candidate) => normalize(candidate) === normalize(name))) return;
  shopping.push(name);
  saveState();
}

function recordActivity(title, detail) {
  activities.unshift({
    id: crypto.randomUUID(),
    title,
    detail,
    at: new Date().toISOString()
  });
  activities = activities.slice(0, 40);
  saveState();
}

function setDialogSave(label, handler) {
  currentDialogSaveHandler = handler;
  els.dialogSaveButton.textContent = label || "저장";
  els.dialogSaveButton.hidden = !handler;
}

function expiryStatus(date) {
  if (!date) return { type: "none", label: "" };
  const diff = Math.ceil((new Date(`${date}T00:00:00+09:00`) - startOfDay(today)) / oneDay);
  if (diff < 0) return { type: "expired", label: `${Math.abs(diff)}일 지남` };
  if (diff <= 30) return { type: "soon", label: `${diff}일 남음` };
  return { type: "ok", label: `${diff}일 남음` };
}

function statusPill(status) {
  return `<span class="status-pill ${status.type}">${status.label}</span>`;
}

function formatQuantity(stock) {
  return `${Number(stock.quantity).toLocaleString("ko-KR")}${stock.unit || "개"}`;
}

function formatGroupQuantity(group) {
  return `${Number(group.quantity).toLocaleString("ko-KR")}${group.unit || "개"}`;
}

function expiryCaption(group) {
  if (!group.earliestExpiry) return "유통기한 없음";
  const [year, month, day] = group.earliestExpiry.split("-");
  return `${year.slice(2)}.${month}.${day}까지`;
}

function formatDate(date) {
  if (!date) return "";
  return date.replaceAll("-", ".");
}

function expiryTime(date) {
  return date ? new Date(date).getTime() : Number.MAX_SAFE_INTEGER;
}

function newestTime(lots) {
  return Math.max(...lots.map((lot) => new Date(lot.createdAt).getTime()));
}

function thumb(stock) {
  if (stock.thumbnail) return `<img class="thumb" src="${escapeHtml(stock.thumbnail)}" alt="" loading="lazy">`;
  return fallbackThumb(stock.name);
}

function isGeneratedThumbnail(value) {
  return String(value || "").startsWith("https://loremflickr.com");
}

function fallbackThumb(name) {
  const letter = [...name][0] || "재";
  return `<div class="fallback-thumb" aria-hidden="true">${escapeHtml(letter)}</div>`;
}

function empty(message) {
  return `<div class="empty-state">${escapeHtml(message)}</div>`;
}

function normalize(value) {
  return String(value || "").replace(/\s+/g, "").toLowerCase();
}

function normalizeStorage(value) {
  return STORAGE_OPTIONS.includes(value) ? value : "실온";
}

function normalizeSpeech(value) {
  return normalize(value).replace(/[.,!?~]/g, "");
}

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function relativeTime(iso) {
  const diff = Math.max(0, Date.now() - new Date(iso).getTime());
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "방금";
  if (minutes < 60) return `${minutes}분 전`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}시간 전`;
  return `${Math.floor(hours / 24)}일 전`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function toast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("is-visible");
  window.clearTimeout(toast.timer);
  toast.timer = window.setTimeout(() => {
    els.toast.classList.remove("is-visible");
  }, 2200);
}

function guessCategory(name) {
  const value = normalize(name);
  if (/(우유|두유|음료|토레타|요구르트|주스|커피|차|물)/.test(value)) return "음료";
  if (/(사과|바나나|망고|참외|토마토|과일|딸기|포도|귤|오렌지)/.test(value)) return "과일";
  if (/(소스|고추장|와사비|머스타드|잼|깨|드레싱|케첩|마요)/.test(value)) return "소스류";
  if (/(과자|젤리|초콜|카라멜|견과|너츠|단백바|캔디|카스테라)/.test(value)) return "간식";
  if (/(비타민|오메가|프로바이오틱|홍삼|밀크시슬|아연|msm|보조제)/.test(value)) return "건강식품";
  if (/(계란|햇반|라면|참치|스팸|치즈|새우|카레|김|면|국|된장|가루|마늘)/.test(value)) return "식재료";
  return "기타";
}

function guessStorage(name, category) {
  const value = normalize(name);
  if (/(냉동|새우|카레)/.test(value)) return "냉동";
  if (/(우유|요구르트|계란|치즈|잼|소스|와사비|토마토|참외|망고|사과)/.test(value)) return "냉장";
  return "실온";
}

function guessUnit(name) {
  const value = normalize(name);
  if (/계란|달걀/.test(value)) return "알";
  if (/두유|우유|음료/.test(value)) return "팩";
  if (/라면|과자|면/.test(value)) return "봉";
  if (/햇반|참치|스팸/.test(value)) return "개";
  return "개";
}

function cleanProductName(name) {
  return name
    .replace(/곰곰|쿠팡|로켓프레시|로켓배송|국내산|무료배송/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}
