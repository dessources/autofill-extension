// Data Pass: Fill empty fields and dispatch events
function fillData() {
  let attempt = 0;
  const maxAttempts = 15; // Allow 7.5 seconds for all API cascades
  
  function doPass() {
    attempt++;
    let filledCount = 0;
    let openedDropdownThisSweep = false;
    const { simpleMappedFields, complexMappedFields } = getMappedFields();

    simpleMappedFields.forEach(({ element, value }) => {
      if (!element || value === undefined || value === null) return;
      
      if (element.tagName === "SELECT") {
        if (!element.value || element.value === "") { 
          // 1. Is there an open Select2 dropdown right now?
          const isOpen = document.querySelector('.select2-container--open');
          if (isOpen && element.nextElementSibling && element.nextElementSibling.classList.contains('select2-container--open')) {
              // The dropdown for THIS specific element is open! Look for our option in the rendered list.
              const results = Array.from(document.querySelectorAll('.select2-results__option'));
              const targetResult = results.find(o => o.textContent.trim().toLowerCase() === value.trim().toLowerCase());
              
              if (targetResult) {
                  // Click the option to select it and close the dropdown
                  targetResult.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
                  targetResult.click(); // fallback
                  filledCount++;
              }
              return; // Whether we clicked or are still waiting for API, move to next field for now
          }

          // 2. If not open, maybe the options are already natively there (static load)
          let optionFound = false;
          for (const option of element.options) {
            if (option.text.trim().toLowerCase() === value.trim().toLowerCase() ||
                (option.dataset && option.dataset.optionName && option.dataset.optionName.trim().toLowerCase() === value.trim().toLowerCase())) {
              element.value = option.value;
              element.dispatchEvent(new Event("input", { bubbles: true }));
              element.dispatchEvent(new Event("change", { bubbles: true }));
              filledCount++;
              optionFound = true;
              break;
            }
          }
          
          // 3. If options are missing natively, we must trigger the fetch by clicking the UI
          if (!optionFound) {
              const select2 = element.nextElementSibling;
              if (select2 && select2.classList.contains('select2-container')) {
                  const selection = select2.querySelector('.select2-selection');
                  // Only click if NO dropdown is currently open, to prevent closing others
                  if (selection && !document.querySelector('.select2-container--open') && !openedDropdownThisSweep) {
                      selection.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
                      openedDropdownThisSweep = true; // Block other dropdowns from opening this sweep
                      
                      // Simulate a user typing the answer into the Select2 search box to trigger the API
                      setTimeout(() => {
                          const searchBox = document.querySelector('body > .select2-container--open .select2-search__field');
                          if (searchBox) {
                              searchBox.value = value;
                              searchBox.dispatchEvent(new Event('input', { bubbles: true }));
                          }
                      }, 50);
                  }
              } else {
                  // Fallback for non-Select2 dropdowns
                  element.focus();
                  element.click();
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

    // Also support Workday's custom div dropdowns
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
      console.log(`[Job Autofill] Pass ${attempt}: Filled ${filledCount} fields.`);
    }

    if (attempt < maxAttempts) {
      setTimeout(doPass, 500); 
    }
  }

  doPass();
}
