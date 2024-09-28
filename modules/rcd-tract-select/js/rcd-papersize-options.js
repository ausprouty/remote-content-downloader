// Function to populate language select options
function populatepapersizeSelect(apiEndpoint, formId) {
    const form = document.getElementById(formId);
    const papersizeSelect = form.querySelector('#papersize');  // Use querySelector within the form

    // Fetch data to populate papersize on page load
    const papersizeUrl = `${apiEndpoint}/tract/distinct/papersize`;

    fetch(papersizeUrl)
    .then(response => response.json())
    .then(data => {
        data.forEach(item => {
            const option = new Option(item.papersize, item.papersize);  // Create new option
            papersizeSelect.appendChild(option);  // Append it to the select
        });
    })
    .catch(error => console.error('Error fetching papersize data:', error));
}

// Example usage: for bilingual-page and bilingual-booklet
document.addEventListener('DOMContentLoaded', function () {
    const apiEndpoint = RCDSettings.apiEndpoint;

    // Populate for bilingual-page
    populatepapersizeSelect(apiEndpoint, 'rcd-tract-form-bilingual-page');

    // Populate for bilingual-booklet
    populatepapersizeSelect(apiEndpoint, 'rcd-tract-form-bilingual-booklet');
});
