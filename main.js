// Workday Autofill - Main Entry Point
// Runs on *.myworkdayjobs.com pages

// Active profile: set by startAutofill(), read by getMappedFields() in the active driver
let activeProfile = null;

// getMappedFields() is provided by the active ATS driver (e.g. drivers/workday.js)

console.log(
  "[Workday Autofill] Content script loaded on:",
  window.location.href,
);

chrome.storage.sync.get(
  ["enabled_global", "enabled_domains", "confirmed_domains"],
  (data) => {
    const domain = window.location.hostname.split(".")[0]; // e.g. "github" from "github.myworkdayjobs.com"
    const enabledDomains = data.enabled_domains || {};
    const domainAllowed = enabledDomains[domain] !== false;

    if (data.enabled_global === false) return; // globally disabled

    if (data.confirmed_domains?.[domain]) {
      // already consented to this company
      startAutofill();
    } else if (domainAllowed) {
      showConfirmationBanner(); // only called when actually needed
    }
  },
);
