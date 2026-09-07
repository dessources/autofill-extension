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
  attendedUniversity: "Yes",
  universityCountry: "United States",
  universityName: "OTHER",
  certifyInaccurate: true 
};

function getIbmMappedFields() {
  const simpleMappedFields = [];
  const complexMappedFields = []; 
  const p = activeProfile || {};
  const d = IBM_DEFAULTS;

  function addFieldByLabel(labelText, profileValue) {
    if (!profileValue) return;
    const labels = Array.from(document.querySelectorAll('label.tc_formLabel'));
    const label = labels.find(l => l.textContent.trim().toLowerCase().includes(labelText.toLowerCase()));
    if (label) {
      const forAttr = label.getAttribute('for');
      if (forAttr) {
        const el = document.getElementById(forAttr);
        if (el) simpleMappedFields.push({ element: el, value: profileValue });
      }
    }
  }

  function addRadioGroup(legendText, profileValue) {
    if (!profileValue) return;
    const legends = Array.from(document.querySelectorAll('legend.tc_formLabel'));
    const legend = legends.find(l => l.textContent.trim().toLowerCase().includes(legendText.toLowerCase()));
    if (legend) {
        const fieldset = legend.closest('fieldset');
        if (fieldset) {
            const labels = Array.from(fieldset.querySelectorAll('label.WizardFieldInput'));
            const match = labels.find(l => l.textContent.trim().toLowerCase() === profileValue.trim().toLowerCase());
            if (match) {
                const radio = document.getElementById(match.getAttribute('for'));
                if (radio) simpleMappedFields.push({ element: radio, value: true });
            }
        }
    }
  }

  function addRadioByExactOption(profileValue) {
    if (!profileValue) return;
    const labels = Array.from(document.querySelectorAll('label.WizardFieldInput'));
    const match = labels.find(l => l.textContent.trim().toLowerCase() === profileValue.trim().toLowerCase());
    if (match) {
        const radio = document.getElementById(match.getAttribute('for'));
        if (radio) simpleMappedFields.push({ element: radio, value: true });
    }
  }

  function addCheckboxByLabel(labelText, isChecked) {
    if (!isChecked) return;
    const labels = Array.from(document.querySelectorAll('label.WizardFieldInput'));
    const match = labels.find(l => l.textContent.trim().toLowerCase().includes(labelText.toLowerCase()));
    if (match) {
        const checkbox = document.getElementById(match.getAttribute('for'));
        if (checkbox) simpleMappedFields.push({ element: checkbox, value: true });
    }
  }

  // Map Standard Profile Data
  addFieldByLabel('Legal first name', p.firstName);
  addFieldByLabel('Legal last name', p.lastName);
  addFieldByLabel('Address line 1', p.addressLine1);
  addFieldByLabel('Address line 2', p.addressLine2);
  addFieldByLabel('City', p.city);
  addFieldByLabel('Zip code', p.zipCode);
  addFieldByLabel('Postal code', p.zipCode); // Alternative label
  addFieldByLabel('Home Email', p.email);
  addFieldByLabel('Phone number', p.phoneNumber);
  addFieldByLabel('Country', p.country);
  addFieldByLabel('State', p.state);
  addFieldByLabel('Province', p.state); // Alternative label
  
  // Map IBM-Specific Questions (Page 1)
  addRadioByExactOption(d.privacyAgreement);
  addRadioGroup('resident of China or South Korea', d.residentChinaKorea);
  addRadioByExactOption(d.consentProcessing);
  addRadioGroup('If you have a preferred name', d.hasPreferredName);

  // Map IBM-Specific Questions (Page 2)
  addFieldByLabel('How did you hear about this opportunity', d.source);
  addRadioGroup('authorized to work in the United States', d.authorizedToWork);
  addRadioGroup('require IBM sponsorship', d.requireSponsorship);
  addRadioGroup('Gender', d.gender);
  addRadioGroup('Ethnicity', d.ethnicity);
  addFieldByLabel('Race', d.race); 
  
  addRadioGroup('Are you a veteran?', d.veteran);
  addRadioGroup('Are you a protected veteran?', d.protectedVeteran);
  addFieldByLabel('Veteran status', d.veteranStatus); 
  addRadioByExactOption(d.disability);
  
  addRadioGroup('Attended university', d.attendedUniversity);
  addFieldByLabel('country where your University', d.universityCountry);
  addFieldByLabel('institution where you completed', d.universityName);
  
  addCheckboxByLabel('I certify', d.certifyInaccurate);

  return { simpleMappedFields, complexMappedFields };
}
