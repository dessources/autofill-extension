// Workday ATS Driver
// Defines getMappedFields() for *.myworkdayjobs.com
// Note: data-automation-id is on wrapper divs — use input IDs directly (except email)

function getMappedFields() {
  const fields = [];
  const p = activeProfile;

  // Email — data-automation-id is on the input itself for this field
  const emailField = document.querySelector('[data-automation-id="email"]');
  if (emailField) {
    fields.push({ element: emailField, value: p.email });
  }

  // Simple text fields — consistent IDs across all Workday companies
  const simpleFields = [
    { id: "name--legalName--firstName", value: p.firstName },
    { id: "name--legalName--lastName", value: p.lastName },
    { id: "address--city", value: p.city },
    { id: "address--postalCode", value: p.zipCode },
    { id: "phoneNumber--phoneNumber", value: p.phoneNumber },
  ];

  simpleFields.forEach(({ id, value }) => {
    const el = document.getElementById(id);
    if (el) fields.push({ element: el, value });
  });

  // Address: if line 2 input is absent, combine both lines into line 1
  const addr1 = document.getElementById("address--addressLine1");
  const addr2 = document.getElementById("address--addressLine2");

  if (addr1) {
    let val1 = p.addressLine1;
    if (!addr2 && p.addressLine2) val1 += " " + p.addressLine2;
    fields.push({ element: addr1, value: val1 });
  }

  if (addr2) {
    fields.push({ element: addr2, value: p.addressLine2 });
  }

  return fields;
}
