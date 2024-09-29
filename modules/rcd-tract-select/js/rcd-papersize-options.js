document.addEventListener('DOMContentLoaded', function () {
    const apiEndpoint = RCDSettings.apiEndpoint;

    // Get the form element
    const form = document.getElementById('rcd-tract-form');
    if (form) {
        const formType = form.getAttribute('data-form-type');
        const lang1Select = form.querySelector('#lang1');
        const lang2Container = form.querySelector('#lang2-container');
        const lang2Select = form.querySelector('#lang2');
        const papersizeSelect = form.querySelector('#papersize');

        let selectedLang1 = '';
        let selectedLang2 = '';

        // Function to populate papersize options
        function populatePapersizeSelect(apiEndpoint, formType, lang1, lang2 = null) {
            // Construct the URL based on whether lang2 is needed
            let papersizeUrl = lang2
                ? `${apiEndpoint}/tracts/${formType}/papersize/${lang1}/${lang2}`
                : `${apiEndpoint}/tracts/${formType}/papersize/${lang1}/${lang1}`;

            // Clear any existing options
            papersizeSelect.innerHTML = '';

            fetch(papersizeUrl)
            .then(response => response.json())
            .then(data => {
                data.forEach(item => {
                    const option = new Option(item.papersize, item.papersize);
                    papersizeSelect.appendChild(option);
                });
            })
            .catch(error => console.error('Error fetching papersize data:', error));
        }

        // Handle lang1 selection
        lang1Select.addEventListener('change', function () {
            selectedLang1 = lang1Select.value;

            // Bilingual case: Check if lang2Container exists, and handle accordingly
            if (lang2Container && selectedLang1) {
                lang2Container.style.visibility = 'visible';
                const lang2Url = `${apiEndpoint}/tracts/${formType}/lang2?lang1=${selectedLang1}`;

                fetch(lang2Url)
                    .then(response => response.json())
                    .then(data => {
                        lang2Select.innerHTML = '';  // Clear previous options
                        data.forEach(item => {
                            const option = new Option(item.lang2, item.lang2);
                            lang2Select.appendChild(option);
                        });
                    })
                    .catch(error => console.error('Error fetching lang2 data:', error));
                
                // Handle lang2 selection to trigger papersize population
                lang2Select.addEventListener('change', function () {
                    selectedLang2 = lang2Select.value;
                    if (selectedLang1 && selectedLang2) {
                        populatePapersizeSelect(apiEndpoint, formType, selectedLang1, selectedLang2);
                    }
                });
            } else {
                // Single-language case: No lang2, so populate papersize directly
                populatePapersizeSelect(apiEndpoint, formType, selectedLang1);
            }
        });
    }
});
