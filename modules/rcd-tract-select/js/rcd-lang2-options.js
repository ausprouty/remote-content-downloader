document.addEventListener('DOMContentLoaded', function () {
    const apiEndpoint = RCDSettings.apiEndpoint;

    // Get the form element
    const form = document.getElementById('rcd-tract-form');
    if (form) {
        const formType = form.getAttribute('data-form-type');  // Get form type from data attribute
        const lang1Select = form.querySelector('#lang1');
        const lang2Container = form.querySelector('#lang2-container');
        const lang2Select = form.querySelector('#lang2');

        // Add event listener for lang1 selection to populate lang2
        lang1Select.addEventListener('change', function () {
            const selectedLang1 = lang1Select.value;

            // Only proceed if lang2-container exists and lang1 has a selected value
            if (lang2Container && selectedLang1) {
                // Clear any existing options in lang2
                lang2Select.innerHTML = '';

                // Show lang2 container and fetch new lang2 options based on selected lang1
                lang2Container.style.visibility = 'visible';

                const lang2Url = `${apiEndpoint}/tracts/${formType}/lang2/${selectedLang1}`
                fetch(lang2Url)
                    .then(response => response.json())
                    .then(data => {
                        data.forEach(item => {
                            const option = new Option(item.lang2, item.lang2);
                            lang2Select.appendChild(option);
                        });
                    })
                    .catch(error => console.error('Error fetching lang2 data:', error));
            } else {
                // Hide the lang2 container if no lang1 is selected
                lang2Container.style.visibility = 'hidden';
            }
        });
    }
});
