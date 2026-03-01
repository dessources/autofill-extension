// Workday Autofill — Popup Logic

document.getElementById("logo").src = chrome.runtime.getURL("extension-logo.png");

const globalToggle = document.getElementById("global-toggle");
const domainToggle = document.getElementById("domain-toggle");
const domainLabel = document.getElementById("domain-label");

let currentDomain = null;

// Detect current tab's Workday subdomain
chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
  try {
    const hostname = new URL(tab.url).hostname; // e.g. "github.myworkdayjobs.com"
    if (hostname.endsWith(".myworkdayjobs.com")) {
      currentDomain = hostname.split(".")[0]; // e.g. "github"
    }
  } catch (_) {}

  if (!currentDomain) {
    domainToggle.disabled = true;
    domainLabel.classList.add("muted");
  }

  // Load saved settings
  chrome.storage.sync.get(["enabled_global", "enabled_domains"], (data) => {
    globalToggle.checked = data.enabled_global !== false; // default: true

    if (currentDomain) {
      const domains = data.enabled_domains || {};
      domainToggle.checked = domains[currentDomain] !== false; // default: true
    }
  });
});

// Persist global toggle
globalToggle.addEventListener("change", () => {
  chrome.storage.sync.set({ enabled_global: globalToggle.checked });
});

// Persist domain toggle
domainToggle.addEventListener("change", () => {
  chrome.storage.sync.get(["enabled_domains"], (data) => {
    const domains = data.enabled_domains || {};
    domains[currentDomain] = domainToggle.checked;
    chrome.storage.sync.set({ enabled_domains: domains });
  });
});

// Open edit profile in a new tab
document.getElementById("edit-profile-btn").addEventListener("click", () => {
  chrome.tabs.create({ url: chrome.runtime.getURL("edit-profile.html") });
});
