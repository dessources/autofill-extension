// Orchestrator: Run data pass, then wait for React, then run style pass
function runAutofillSequence() {
  fillData();
  // Wait for React re-render cycle to complete
  setTimeout(applyStyles, 50);
}
