// Function to populate language select options
function populateLang1Select(apiEndpoint, formId) {
    const form = document.getElementById(formId);
    const lang1Select = form.querySelector('#lang1');  // Use querySelector within the form

    // Fetch data to populate lang1 on page load
    const lang1Url = `${apiEndpoint}/tract/distinct/lang1`;

    fetch(lang1Url)
    .then(response => response.json())
    .then(data => {
        data.forEach(item => {
            const option = new Option(item.lang1, item.lang1);  // Create new option
            lang1Select.appendChild(option);  // Append it to the select
        });
    })
    .catch(error => console.error('Error fetching lang1 data:', error));
}

// Example usage: for bilingual-page and bilingual-booklet
document.addEventListener('DOMContentLoaded', function () {
    const apiEndpoint = RCDSettings.apiEndpoint;

    // Populate for bilingual-page
    populateLang1Select(apiEndpoint, 'rcd-tract-form-bilingual-page');

    // Populate for bilingual-booklet
    populateLang1Select(apiEndpoint, 'rcd-tract-form-bilingual-booklet');
});
