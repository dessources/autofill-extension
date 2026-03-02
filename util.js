// Shared UI constants for Workday Autofill
// Loaded before content.js in shared scope

const LOGO_FILENAME = "extension-logo.png";

const MODAL_IDS = {
  modal:   "workday-autofill-modal",
  confirm: "workday-autofill-confirm",
  cancel:  "workday-autofill-cancel-btn",
  close:   "workday-autofill-cancel",
};

const MODAL_HTML = `
  <div class="waf-header">
    <img class="waf-logo" src="${chrome.runtime.getURL(LOGO_FILENAME)}" alt="">
    <span class="waf-header-title">Workday Autofill</span>
    <button class="waf-close" id="${MODAL_IDS.close}">✕</button>
  </div>
  <div class="waf-body">
    <p class="waf-headline">Application page detected!</p>
    <p class="waf-sub">Fill your application fields automatically using your saved profile.</p>
    <button class="waf-confirm-btn" id="${MODAL_IDS.confirm}">Autofill Now</button>
    <button class="waf-cancel-btn" id="${MODAL_IDS.cancel}">No Thanks</button>
  </div>
`;

const DEMO_PROFILE = {
  firstName: "John",
  lastName: "Doe",
  email: "your-email@fiu.edu",
  addressLine1: "123 Test Street",
  addressLine2: "Apt 456",
  city: "Miami",
  state: "Florida",
  zipCode: "33199",
  phoneNumber: "3051234567",
  country: "United States",
};
