// Workday Autofill - Content Script
// Runs on *.myworkdayjobs.com pages

// 1. Identify all fields on the page and their expected values
function getMappedFields() {
  const fields = [];

  // Email (uses data-automation-id)
  const emailField = document.querySelector('[data-automation-id="email"]');
  if (emailField) {
    fields.push({ element: emailField, value: PROFILE.email });
  }

  // Simple Text Fields (use unique IDs)
  const simpleFields = [
    { id: "name--legalName--firstName", value: PROFILE.firstName },
    { id: "name--legalName--lastName", value: PROFILE.lastName },
    { id: "address--city", value: PROFILE.city },
    { id: "address--postalCode", value: PROFILE.zipCode },
    { id: "phoneNumber--phoneNumber", value: PROFILE.phoneNumber },
  ];

  simpleFields.forEach((item) => {
    const el = document.getElementById(item.id);
    if (el) {
      fields.push({ element: el, value: item.value });
    }
  });

  // Address Logic (Line 1 & 2)
  const addr1 = document.getElementById("address--addressLine1");
  const addr2 = document.getElementById("address--addressLine2");

  if (addr1) {
    let val1 = PROFILE.addressLine1;
    // If Line 2 input doesn't exist, combine Line 1 + Line 2
    if (!addr2 && PROFILE.addressLine2) {
      val1 += " " + PROFILE.addressLine2;
    }
    fields.push({ element: addr1, value: val1 });
  }

  if (addr2) {
    fields.push({ element: addr2, value: PROFILE.addressLine2 });
  }

  return fields;
}

// 2. Data Pass: Fill empty fields and dispatch events
function fillData() {
  const fields = getMappedFields();
  let filledCount = 0;

  fields.forEach(({ element, value }) => {
    if (element && !element.value && value) {
      element.value = value;
      element.dispatchEvent(new Event("input", { bubbles: true }));
      filledCount++;
    }
  });

  if (filledCount > 0) {
    console.log(`[Workday Autofill] Filled ${filledCount} fields.`);
  }
}

// 3. Style Pass: Apply visual feedback to matching fields
function applyStyles() {
  const fields = getMappedFields();

  fields.forEach(({ element, value }) => {
    // Only style if the current value matches our data
    if (element && element.value === value) {
      element.style.backgroundColor = STYLES.field.backgroundColor;
      element.style.boxShadow = STYLES.field.boxShadow;
    }
  });
}

// Orchestrator: Run data pass, then wait for React, then run style pass
function runAutofillSequence() {
  fillData();
  // Wait for React re-render cycle to complete
  setTimeout(applyStyles, 50);
}

// Create and show the floating confirmation modal
function showConfirmationBanner() {
  // Don't show if modal already exists
  if (document.getElementById("workday-autofill-modal")) return;

  // Inject modal CSS
  const styleTag = document.createElement("style");
  styleTag.textContent = STYLES.modalCSS;
  document.head.appendChild(styleTag);

  // Build modal
  const modal = document.createElement("div");
  modal.id = "workday-autofill-modal";
  modal.innerHTML = `
    <div class="waf-header">
      <img class="waf-logo" src="${chrome.runtime.getURL("workday_autofill_minimalist.png")}" alt="">
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

  document.body.appendChild(modal);

  const confirmBtn = document.getElementById("workday-autofill-confirm");
  const cancelBtn = document.getElementById("workday-autofill-cancel-btn");
  const closeBtn = document.getElementById("workday-autofill-cancel");

  const dismiss = () => {
    modal.remove();
    styleTag.remove();
    console.log("[Workday Autofill] User declined - autofill disabled");
  };

  confirmBtn.addEventListener("click", () => {
    modal.remove();
    styleTag.remove();
    startAutofill();
    console.log("[Workday Autofill] User confirmed - autofill started");
  });

  cancelBtn.addEventListener("click", dismiss);
  closeBtn.addEventListener("click", dismiss);
}

// Start autofill process with MutationObserver for SPA navigation
function startAutofill() {
  // Fill any existing fields immediately
  runAutofillSequence();

  // Watch for DOM changes (Workday loads fields dynamically)
  const observer = new MutationObserver(() => {
    runAutofillSequence();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

console.log(
  "[Workday Autofill] Content script loaded on:",
  window.location.href,
);

// MVP: Always show banner on page load
showConfirmationBanner();