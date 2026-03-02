// Create and show the floating confirmation modal
function showConfirmationBanner() {
  // Don't show if modal already exists
  if (document.getElementById(MODAL_IDS.modal)) return;

  // Inject modal CSS
  const styleTag = document.createElement("style");
  styleTag.textContent = STYLES.modalCSS;
  document.head.appendChild(styleTag);

  // Build modal
  const modal = document.createElement("div");
  modal.id = MODAL_IDS.modal;
  modal.innerHTML = MODAL_HTML;

  document.body.appendChild(modal);

  const confirmBtn = document.getElementById(MODAL_IDS.confirm);
  const cancelBtn = document.getElementById(MODAL_IDS.cancel);
  const closeBtn = document.getElementById(MODAL_IDS.close);

  const dismiss = () => {
    modal.remove();
    styleTag.remove();
    console.log("[Workday Autofill] User declined - autofill disabled");
  };

  confirmBtn.addEventListener("click", () => {
    const domain = window.location.hostname.split(".")[0];
    chrome.storage.sync.get(["confirmed_domains"], (data) => {
      const confirmed = data.confirmed_domains || {};
      confirmed[domain] = true;
      chrome.storage.sync.set({ confirmed_domains: confirmed }, () => {
        modal.remove();
        styleTag.remove();
        startAutofill();
        console.log(`[Workday Autofill] Consent saved for ${domain} - autofill started`);
      });
    });
  });

  cancelBtn.addEventListener("click", dismiss);
  closeBtn.addEventListener("click", dismiss);
}
