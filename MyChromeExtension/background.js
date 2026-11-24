chrome.commands.onCommand.addListener(async (command) => {
  if (command === "search-image") {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    const tab = tabs.at(0);
    if (!tab || !tab.id) return;

    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => window.getSelection().toString().trim()
    });

    const firstResult = results.at(0);
    const query = firstResult ? firstResult.result : "";
    if (query) {
      const url = "https://google.com/search?num=10&udm=2&q=" + encodeURIComponent(query);
      chrome.tabs.create({ url: url });
    }
  }
});

function openImageSearch(query) {
  if (!query) return;
  const url = "https://google.com/search?num=10&udm=2&q=" + encodeURIComponent(query);
  chrome.tabs.create({ url });
}

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "search-image") {
    openImageSearch(message.query);
  }
});