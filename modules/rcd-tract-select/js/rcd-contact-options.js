// Function to populate language select options
function populatecontactSelect(apiEndpoint, formId) {
    const form = document.getElementById(formId);
    const contactSelect = form.querySelector('#contact');  // Use querySelector within the form

    // Fetch data to populate contact on page load
    const contactUrl = `${apiEndpoint}/tract/distinct/contact`;

    fetch(contactUrl)
    .then(response => response.json())
    .then(data => {
        data.forEach(item => {
            const option = new Option(item.contact, item.contact);  // Create new option
            contactSelect.appendChild(option);  // Append it to the select
        });
    })
    .catch(error => console.error('Error fetching contact data:', error));
}

// Example usage: for bilingual-page and bilingual-booklet
document.addEventListener('DOMContentLoaded', function () {
    const apiEndpoint = RCDSettings.apiEndpoint;

    // Populate for bilingual-page
    populatecontactSelect(apiEndpoint, 'rcd-tract-form-bilingual-page');

    // Populate for bilingual-booklet
    populatecontactSelect(apiEndpoint, 'rcd-tract-form-bilingual-booklet');
});
