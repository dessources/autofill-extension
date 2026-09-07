// Shared UI constants for Job Autofill
// Loaded before content.js in shared scope

const LOGO_FILENAME = "extension-logo.png";

const MODAL_IDS = {
  modal:   "job-autofill-modal",
  confirm: "job-autofill-confirm",
  cancel:  "job-autofill-cancel-btn",
  close:   "job-autofill-cancel",
};

const MODAL_HTML = `
  <div class="jaf-header">
    <img class="jaf-logo" src="${chrome.runtime.getURL(LOGO_FILENAME)}" alt="">
    <span class="jaf-header-title">Job Autofill</span>
    <button class="jaf-close" id="${MODAL_IDS.close}">✕</button>
  </div>
  <div class="jaf-body">
    <p class="jaf-headline">Application page detected!</p>
    <p class="jaf-sub">Fill your application fields automatically using your saved profile.</p>
    <button class="jaf-confirm-btn" id="${MODAL_IDS.confirm}">Autofill Now</button>
    <button class="jaf-cancel-btn" id="${MODAL_IDS.cancel}">No Thanks</button>
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
  birthMonth: "November",
  birthDay: "7",
  availableStartDate: "05/2027",
};

function getCompanyId() {
  const host = window.location.hostname;
  if (host.includes("ibm.com")) return "ibm";
  return host.split(".")[0];
}
