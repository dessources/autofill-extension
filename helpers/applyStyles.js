// Style Pass: Apply visual feedback to auto-filled fields
function applyStyles() {
  const { simpleMappedFields, complexMappedFields } = getMappedFields();

  [...simpleMappedFields, ...complexMappedFields].forEach(
    ({ element, value }) => {
      // Only style if the current value matches our data
      if (
        element &&
        (element.value === value || element.textContent === value)
      ) {
        element.style.backgroundColor = STYLES.field.backgroundColor;
        element.style.boxShadow = STYLES.field.boxShadow;
      }
    },
  );
}
