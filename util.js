// Shared UI constants for Workday Autofill
// Loaded before content.js in shared scope

const MODAL_ID = "extension-logo";
const LOGO_FILENAME = "extension-logo.png";

const MODAL_HTML = `
  <div class="waf-header">
    <img class="waf-logo" src="${chrome.runtime.getURL(LOGO_FILENAME)}" alt="">
    <span class="waf-header-title">Workday Autofill</span>
    <button class="waf-close" id="workday-autofill-cancel">✕</button>
  </div>
  <div class="waf-body">
    <p class="waf-headline">Application page detected!</p>
    <p class="waf-sub">Fill your application fields automatically using your saved profile.</p>
    <button class="waf-confirm-btn" id="workday-autofill-confirm">Autofill Now</button>
    <button class="waf-cancel-btn" id="workday-autofill-cancel-btn">No Thanks</button>
  </div>
`;
