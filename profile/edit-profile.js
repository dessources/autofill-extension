// Workday Autofill — Edit Profile Logic

const FIELDS = [
  "firstName",
  "lastName",
  "email",
  "phoneNumber",
  "phoneType",
  "addressLine1",
  "addressLine2",
  "city",
  "state",
  "zipCode",
  "country",
];

document.getElementById("logo").src =
  chrome.runtime.getURL("extension-logo.png");

// Load saved profile into form fields
chrome.storage.sync.get(["profile"], (data) => {
  const profile = data.profile || {};
  FIELDS.forEach((key) => {
    const input = document.getElementById(key);
    if (input && profile[key] != null) input.value = profile[key];
  });
});

// Save profile on button click
document.getElementById("save-btn").addEventListener("click", () => {
  const profile = {};
  FIELDS.forEach((key) => {
    const input = document.getElementById(key);
    if (input) profile[key] = input.value.trim();
  });

  chrome.storage.sync.set({ profile }, () => {
    const status = document.getElementById("status");
    if (chrome.runtime.lastError) {
      status.textContent = "Error saving. Please try again.";
      status.className = "status error visible";
    } else {
      status.textContent = "Profile saved!";
      status.className = "status success visible";
      setTimeout(() => {
        status.className = "status";
      }, 3000);
    }
  });
});
