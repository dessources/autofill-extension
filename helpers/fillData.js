// Data Pass: Fill empty fields and dispatch events
function fillData() {
  let newFields = 0;
  const { simpleMappedFields, complexMappedFields } = getMappedFields();
  let filledCount = 0;

  simpleMappedFields.forEach(({ element, value }) => {
    if (element && !element.value && value) {
      element.value = value;
      element.dispatchEvent(new Event("input", { bubbles: true }));
      filledCount++;
    }
  });

  complexMappedFields.forEach(({ element, value, id, profileKey }) => {
    if (element && value) {
      if (element.textContent == "Select One") {
        element.click();

        setTimeout(() => {
          const popupId = document
            .querySelector(`#${id}`)
            .getAttribute("aria-controls");
          if (!popupId) return;

          const popupEl = document.getElementById(popupId);
          if (!popupEl) return;

          const options = popupEl.querySelectorAll('li[role="option"]');
          for (const option of options) {
            if (option.textContent === value) {
              option.click();
              filledCount++;
              break;
            }
          }
        }, 0);
      }
    }
  });

  if (filledCount > 0) {
    console.log(`[Workday Autofill] Filled ${filledCount} fields.`);
  }
}
