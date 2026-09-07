// IBM ATS Driver for careers.ibm.com

// Hardcoded defaults for IBM-specific questions.
// Modify these values to change how the IBM form is automatically answered.
const IBM_DEFAULTS = {
  // Page 1
  privacyAgreement: "I agree",
  residentChinaKorea: "No",
  consentProcessing: "I consent to IBM processing the information",
  hasPreferredName: "No",

  // Page 2
  source: "IBM Careers website",
  authorizedToWork: "Yes",
  requireSponsorship: "No",
  gender: "Male",
  ethnicity: "Non-Hispanic",
  race: "Black",
  veteran: "No",
  protectedVeteran: "No",
  veteranStatus: "Non-Veteran",
  disability: "No, I do not have a disability and have not had one in the past",

  // Education & Relocation
  attendedUniversity: "Yes",
  universityCountry: "United States",
  universityName: "OTHER",
  universityNameText: "Florida International University",
  degree: "Bachelor's Degree",
  studySpecialization: "Computer Science",
  relocate: "Yes",

  // Additional Compliance / Context
  otherLocations: "Yes",
  differentAddress: "No",
  workedAtIBM: "No",
  certifyInaccurate: true,
  
  // Consents
  consentEngagements: true,
  consentCulture: true,
};

function getIbmMappedFields() {
  const simpleMappedFields = [];
  const complexMappedFields = [];
  const p = activeProfile || {};
  const d = IBM_DEFAULTS;

  // Flexible resolver that works whether IBM renders the question as a radio group (legend) or dropdown (label)
  function addFieldFlexible(labelText, profileValue) {
    if (!profileValue) return;

    // 1. Try resolving as a radio group (via legend)
    const legends = Array.from(
      document.querySelectorAll("legend.tc_formLabel"),
    );
    const legend = legends.find((l) =>
      l.textContent.trim().toLowerCase().includes(labelText.toLowerCase()),
    );
    if (legend) {
      const fieldset = legend.closest("fieldset");
      if (fieldset) {
        const labels = Array.from(
          fieldset.querySelectorAll("label.WizardFieldInput"),
        );
        const match = labels.find(
          (l) =>
            l.textContent.trim().toLowerCase() ===
            profileValue.trim().toLowerCase(),
        );
        if (match) {
          const radio = document.getElementById(match.getAttribute("for"));
          if (radio) {
            simpleMappedFields.push({ element: radio, value: true });
            return; // found it as a radio!
          }
        }
      }
    }

    // 2. Try resolving as a standard input/dropdown (via label for=...)
    const labels = Array.from(document.querySelectorAll("label.tc_formLabel"));
    const label = labels.find((l) =>
      l.textContent.trim().toLowerCase().includes(labelText.toLowerCase()),
    );
    if (label) {
      const forAttr = label.getAttribute("for");
      if (forAttr) {
        const el = document.getElementById(forAttr);
        if (el) {
          simpleMappedFields.push({ element: el, value: profileValue });
          return;
        }
      }
    }
  }

  function addRadioByExactOption(profileValue) {
    if (!profileValue) return;
    const labels = Array.from(
      document.querySelectorAll("label.WizardFieldInput"),
    );
    const match = labels.find(
      (l) =>
        l.textContent.trim().toLowerCase() ===
        profileValue.trim().toLowerCase(),
    );
    if (match) {
      const radio = document.getElementById(match.getAttribute("for"));
      if (radio) simpleMappedFields.push({ element: radio, value: true });
    }
  }

  function addCheckboxByLabel(labelText, isChecked) {
    if (!isChecked) return;
    const labels = Array.from(
      document.querySelectorAll("label.WizardFieldInput"),
    );
    const match = labels.find((l) =>
      l.textContent.trim().toLowerCase().includes(labelText.toLowerCase()),
    );
    if (match) {
      const checkbox = document.getElementById(match.getAttribute("for"));
      if (checkbox) simpleMappedFields.push({ element: checkbox, value: true });
    }
  }

  // Map Standard Profile Data
  addFieldFlexible("Legal first name", p.firstName);
  addFieldFlexible("Legal last name", p.lastName);
  addFieldFlexible("Address line 1", p.addressLine1);
  addFieldFlexible("Address line 2", p.addressLine2);
  addFieldFlexible("City", p.city);
  addFieldFlexible("Zip code", p.zipCode);
  addFieldFlexible("Postal code", p.zipCode);
  addFieldFlexible("Home Email", p.email);
  addFieldFlexible("Phone number", p.phoneNumber);
  addFieldFlexible("Country", p.country);
  addFieldFlexible("State", p.state);
  addFieldFlexible("Province", p.state);
  
  if (p.firstName && p.lastName) {
      addFieldFlexible("Your name", p.firstName + " " + p.lastName);
  }

  // Map IBM-Specific Questions (Page 1)
  addRadioByExactOption(d.privacyAgreement);
  addFieldFlexible("resident of China or South Korea", d.residentChinaKorea);
  addRadioByExactOption(d.consentProcessing);
  addFieldFlexible("If you have a preferred name", d.hasPreferredName);

  // Map IBM-Specific Questions (Page 2)
  addFieldFlexible("How did you hear about this opportunity", d.source);
  addFieldFlexible(
    "authorized to work in the United States",
    d.authorizedToWork,
  );
  addFieldFlexible("require IBM sponsorship", d.requireSponsorship);
  addFieldFlexible("Gender", d.gender);
  addFieldFlexible("Ethnicity", d.ethnicity);
  addFieldFlexible("Race", d.race);

  addFieldFlexible("Are you a veteran?", d.veteran);
  addFieldFlexible("Are you a protected veteran?", d.protectedVeteran);
  addFieldFlexible("Veteran status", d.veteranStatus);
  addRadioByExactOption(d.disability);

  addFieldFlexible("Attended university", d.attendedUniversity);
  addFieldFlexible("country where your University", d.universityCountry);
  addFieldFlexible("institution where you completed", d.universityName);
  addFieldFlexible(
    "Please tell us the name of you University",
    d.universityNameText,
  );
  addFieldFlexible("Degree obtained", d.degree);
  addFieldFlexible("Study/Specialization", d.studySpecialization);
  addFieldFlexible("willing to relocate", d.relocate);

  addFieldFlexible(
    "considered for positions in other locations",
    d.otherLocations,
  );
  addFieldFlexible("different from your permanent address", d.differentAddress);
  addFieldFlexible("worked at IBM before", d.workedAtIBM);
  addFieldFlexible("available to start full time", p.availableStartDate);
  
  addFieldFlexible("Month", p.birthMonth);
  addFieldFlexible("Day", p.birthDay);

  addCheckboxByLabel("I certify", d.certifyInaccurate);
  addCheckboxByLabel("invited to engagements", d.consentEngagements);
  addCheckboxByLabel("Company's Culture and Inclusion program", d.consentCulture);

  return { simpleMappedFields, complexMappedFields };
}
