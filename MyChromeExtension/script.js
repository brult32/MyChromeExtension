const DEFAULT_WHITE_COLOR = "#f4ecd8";
const DEFAULT_SHORTCUT_KEY = "q";

let currentWhiteColor = DEFAULT_WHITE_COLOR;
let currentShortcutKey = DEFAULT_SHORTCUT_KEY;

function replaceWhite(root = document) {
  if (!root || !root.querySelectorAll) return;
  const elements = root.querySelectorAll("*");

  for (const el of elements) {
    const styles = getComputedStyle(el);

    if (styles.backgroundColor === "rgb(255, 255, 255)") {
      el.style.setProperty("background-color", currentWhiteColor, "important");
    }

    if (styles.color === "rgb(255, 255, 255)") {
      el.style.setProperty("color", currentWhiteColor, "important");
    }
  }
}

chrome.storage.sync.get(
  { whiteColor: DEFAULT_WHITE_COLOR, shortcutKey: DEFAULT_SHORTCUT_KEY },
  (items) => {
    currentWhiteColor = items.whiteColor;
    currentShortcutKey = (items.shortcutKey || DEFAULT_SHORTCUT_KEY).toLowerCase();
    replaceWhite();
  }
);

chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== "sync") return;
  if (changes.whiteColor) {
    currentWhiteColor = changes.whiteColor.newValue;
    replaceWhite();
  }
  if (changes.shortcutKey && changes.shortcutKey.newValue) {
    currentShortcutKey = changes.shortcutKey.newValue.toLowerCase();
  }
});

const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    for (const node of mutation.addedNodes) {
      if (node.nodeType === Node.ELEMENT_NODE) {
        replaceWhite(node);
      }
    }
  }
});

if (document.body) {
  observer.observe(document.body, { childList: true, subtree: true });
}

document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && !e.altKey && !e.shiftKey && e.key.toLowerCase() === currentShortcutKey) {
    const query = window.getSelection().toString().trim();
    if (query) {
      e.preventDefault();
      chrome.runtime.sendMessage({ action: "search-image", query });
    }
  }
});