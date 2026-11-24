const DEFAULT_COLOR = "#f4ecd8";
const DEFAULT_KEY = "q";

const colorInput = document.getElementById("whiteColor");
const keyInput = document.getElementById("shortcutKey");
const resetBtn = document.getElementById("resetBtn");

function normalizeKey(value) {
  const clean = (value || "").trim().toLowerCase();
  return /^[a-z0-9]$/.test(clean) ? clean : DEFAULT_KEY;
}

chrome.storage.sync.get({ whiteColor: DEFAULT_COLOR, shortcutKey: DEFAULT_KEY }, (items) => {
  colorInput.value = items.whiteColor;
  keyInput.value = normalizeKey(items.shortcutKey).toUpperCase();
});

colorInput.addEventListener("input", () => {
  chrome.storage.sync.set({ whiteColor: colorInput.value });
});

keyInput.addEventListener("input", () => {
  const key = normalizeKey(keyInput.value);
  keyInput.value = key.toUpperCase();
  chrome.storage.sync.set({ shortcutKey: key });
});

resetBtn.addEventListener("click", () => {
  colorInput.value = DEFAULT_COLOR;
  keyInput.value = DEFAULT_KEY.toUpperCase();
  chrome.storage.sync.set({ whiteColor: DEFAULT_COLOR, shortcutKey: DEFAULT_KEY });
});