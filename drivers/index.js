// Router for ATS Drivers

function getMappedFields() {
  if (window.location.hostname.includes("ibm.com")) {
    return getIbmMappedFields();
  }
  return getWorkdayMappedFields();
}
