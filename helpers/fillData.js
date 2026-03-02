// Data Pass: Fill empty fields and dispatch events
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
