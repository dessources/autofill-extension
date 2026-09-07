// Data Pass: Fill empty fields and dispatch events
function fillData() {
  let newFields = 0;
  const { simpleMappedFields, complexMappedFields } = getMappedFields();
  let filledCount = 0;

  simpleMappedFields.forEach(({ element, value }) => {
    if (!element || value === undefined || value === null) return;
    if (element.tagName === "SELECT") {
      if (!element.value) {
        for (const option of element.options) {
          if (option.text.trim().toLowerCase() === value.trim().toLowerCase() ||
              option.dataset?.optionName?.trim().toLowerCase() === value.trim().toLowerCase()) {
            element.value = option.value;
            element.dispatchEvent(new Event("change", { bubbles: true }));
            filledCount++;
            break;
          }
        }
      }
    } else if (element.type === "radio" || element.type === "checkbox") {
        if (!element.checked && value === true) {
            element.click();
            filledCount++;
        }
    } else {
      if (!element.value) {
        element.value = value;
        element.dispatchEvent(new Event("input", { bubbles: true }));
        element.dispatchEvent(new Event("change", { bubbles: true }));
        filledCount++;
      }
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
