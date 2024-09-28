// Function to populate language select options
function populatelang2Select(apiEndpoint, formId) {
    const form = document.getElementById(formId);
    const lang2Select = form.querySelector('#lang2');  // Use querySelector within the form

    // Fetch data to populate lang2 on page load
    const lang2Url = `${apiEndpoint}/tract/distinct/lang2`;

    fetch(lang2Url)
    .then(response => response.json())
    .then(data => {
        data.forEach(item => {
            const option = new Option(item.lang2, item.lang2);  // Create new option
            lang2Select.appendChild(option);  // Append it to the select
        });
    })
    .catch(error => console.error('Error fetching lang2 data:', error));
}

// Example usage: for bilingual-page and bilingual-booklet
document.addEventListener('DOMContentLoaded', function () {
    const apiEndpoint = RCDSettings.apiEndpoint;

    // Populate for bilingual-page
    populatelang2Select(apiEndpoint, 'rcd-tract-form-bilingual-page');

    // Populate for bilingual-booklet
    populatelang2Select(apiEndpoint, 'rcd-tract-form-bilingual-booklet');
});
