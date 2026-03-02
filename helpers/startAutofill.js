// Start autofill process with MutationObserver for SPA navigation
function startAutofill() {
  // Load saved profile from storage, fall back to hardcoded DEMO_PROFILE
  chrome.storage.sync.get(["profile"], (data) => {
    activeProfile = data.profile?.firstName ? data.profile : DEMO_PROFILE;

    // Fill any existing fields immediately
    runAutofillSequence();

    // Watch for DOM changes
    const observer = new MutationObserver(() => {
      runAutofillSequence();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}
