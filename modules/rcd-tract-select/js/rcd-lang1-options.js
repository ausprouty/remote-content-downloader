document.addEventListener('DOMContentLoaded', function () {
    const apiEndpoint = RCDSettings.apiEndpoint;

    // Get the form type from the data attribute or hidden input
    const form = document.getElementById('rcd-tract-form');
    if (form) {
        const formType = form.getAttribute('data-form-type');  // Or use hidden input if needed
        const lang1Select = form.querySelector('#lang1');
        
        // Create the URL with formType embedded
        const lang1Url = `${apiEndpoint}/tracts/options//lang1/${formType}`;

        // Fetch data for the language selection
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
});
