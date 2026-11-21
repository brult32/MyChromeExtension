// Pick your replacement color here (example: warm cream/sepia)
const NEW_BG_COLOR = "#f4ecd8";
const NEW_TEXT_COLOR = "#2c2a29"; // Optional: softens pure white text too

function replaceWhite(root = document) {
  const elements = root.querySelectorAll("*");

  for (const el of elements) {
    const styles = getComputedStyle(el);

    // Check if background is pure white: rgb(255, 255, 255)
    if (styles.backgroundColor === "rgb(255, 255, 255)") {
      el.style.setProperty("background-color", NEW_BG_COLOR, "important");
    }

    // Check if text is pure white: rgb(255, 255, 255)
    if (styles.color === "rgb(255, 255, 255)") {
      el.style.setProperty("color", NEW_TEXT_COLOR, "important");
    }
  }
}

// Run when page loads
replaceWhite();

// Watch for new content that loads as you scroll
const observer = new MutationObserver(() => replaceWhite());
observer.observe(document.body, { childList: true, subtree: true });