document.addEventListener('DOMContentLoaded', function () {
    const apiEndpoint = RCDSettings.apiEndpoint;
    const form = document.getElementById('rcd-tract-form');

    if (form) {
        const formType = form.getAttribute('data-form-type');
        const lang1Select = form.querySelector('#lang1');
        const lang2Select = form.querySelector('#lang2');
        const audienceSelect = form.querySelector('#audience');
        const papersizeSelect = form.querySelector('#papersize');
        const contactSelect = form.querySelector('#contact');
        const approvalContainer = form.querySelector('#approval-container');

        // Populate the first language field on load
        populateLang1Select(apiEndpoint, formType);

        function populateLang1Select(apiEndpoint, formType) {
            const lang1Url = `${apiEndpoint}/tracts/options/lang1/${formType}`;
            console.log(`Fetching from: ${lang1Url}`); // Debug: Log the URL
        
            // Clear previous options and add a placeholder
            clearSelect(lang1Select);
            addPlaceholder(lang1Select, 'Select a language...');
        
            fetch(lang1Url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Network response was not ok: ${response.statusText}`);
                    }
                    return response.json();
                })
                .then(data => {
                    if (Array.isArray(data) && data.length > 0) {
                        data.forEach(item => {
                            lang1Select.add(new Option(item.lang1, item.lang1));
                        });
                        lang1Select.style.display = 'block'; // Make the select field visible
                    } else {
                        console.warn('No data found for Lang1'); // Warn if no data returned
                    }
                })
                .catch(error => {
                    console.error('Error fetching lang1 data:', error); // Debug: Log any errors
                });
        }
        

        lang1Select.addEventListener('change', function () {
            resetSelections('lang1');
            if (lang1Select.value) {
                populateLang2Select(apiEndpoint, formType, lang1Select.value);
            }
        });

        function populateLang2Select(apiEndpoint, formType, lang1) {
            const lang2Url = `${apiEndpoint}/tracts/options/lang2/${formType}/${lang1}`;
            clearSelect(lang2Select);
            addPlaceholder(lang2Select, 'Select a language...');

            fetch(lang2Url)
                .then(response => response.json())
                .then(data => {
                    data.forEach(item => {
                        lang2Select.add(new Option(item.lang2, item.lang2));
                        lang2Select.style.display = 'block'; // Make the select field visible
                    });
                })
                .catch(error => console.error('Error fetching lang2 data:', error));
        }

        lang2Select.addEventListener('change', function () {
            resetSelections('lang2');
            if (lang2Select.value) {
                populateAudienceSelect(apiEndpoint, formType, lang1Select.value, lang2Select.value);
            }
        });

        function populateAudienceSelect(apiEndpoint, formType, lang1, lang2 = '') {
            const audienceUrl = `${apiEndpoint}/tracts/options/audience/${formType}/${lang1}/${lang2}`;
            clearSelect(audienceSelect);
            addPlaceholder(audienceSelect, 'Select an audience...');

            fetch(audienceUrl)
                .then(response => response.json())
                .then(data => {
                    const seenOptions = new Set();
                    data.forEach(item => {
                        if (!seenOptions.has(item.audience)) {
                            audienceSelect.add(new Option(item.audience, item.audience));
                            seenOptions.add(item.audience);
                        }
                    });
                    audienceSelect.style.display = 'block'; // Make the select field visible
                })
                .catch(error => console.error('Error fetching audience data:', error));
        }

        audienceSelect.addEventListener('change', function () {
            resetSelections('audience');
            if (audienceSelect.value) {
                populatePapersizeSelect(apiEndpoint, formType, lang1Select.value, lang2Select.value, audienceSelect.value);
            }
        });

        function populatePapersizeSelect(apiEndpoint, formType, lang1, lang2, audience) {
            const papersizeUrl = `${apiEndpoint}/tracts/options/papersize/${formType}/${lang1}/${lang2}/${audience}`;
            clearSelect(papersizeSelect);
            addPlaceholder(papersizeSelect, 'Select paper size...');

            fetch(papersizeUrl)
                .then(response => response.json())
                .then(data => {
                    const seenOptions = new Set();
                    data.forEach(item => {
                        if (!seenOptions.has(item.paper_size)) {
                            papersizeSelect.add(new Option(item.paper_size, item.paper_size));
                            seenOptions.add(item.paper_size);
                            papersizeSelect.style.display = 'block'; // Make the select field visible
                        }
                    });
                })
                .catch(error => console.error('Error fetching paper size data:', error));
        }

        papersizeSelect.addEventListener('change', function () {
            resetSelections('papersize');
            if (papersizeSelect.value) {
                populateContactSelect(apiEndpoint, formType, lang1Select.value, lang2Select.value, audienceSelect.value, papersizeSelect.value);
            }
        });

        function populateContactSelect(apiEndpoint, formType, lang1, lang2, audience, papersize) {
            const contactUrl = `${apiEndpoint}/tracts/options/contacts/${formType}/${lang1}/${lang2}/${audience}/${papersize}`;
            clearSelect(contactSelect);
            addPlaceholder(contactSelect, 'Select Country...');

            fetch(contactUrl)
                .then(response => response.json())
                .then(data => {
                    data.forEach(item => {
                        contactSelect.add(new Option(item.contact, item.contact));
                    });
                    contactSelect.style.display = 'block'; // Make the select field visible

                })
                .catch(error => console.error('Error fetching contact data:', error));
        }

        contactSelect.addEventListener('change', function () {
            if (contactSelect.value) {
                console.log ('Contact selected: ' + contactSelect.value);
                approvalContainer.style.display = 'block'; // Make the approval container visible
            }
        });

        /**
         * Completely resets a <select> element by removing all child options.
         * @param {HTMLSelectElement} selectElement - The <select> element to clear.
         */
        function clearSelect(selectElement) {
            while (selectElement.options.length > 0) {
                selectElement.remove(0); // Remove each option
            }
            selectElement.value = ''; // Reset to default value
            selectElement.style.display = 'none'; // Hide the select field  
        }

        /**
         * Adds a placeholder option to a <select> element.
         * @param {HTMLSelectElement} selectElement - The <select> element.
         * @param {string} placeholderText - The placeholder text.
         */
        function addPlaceholder(selectElement, placeholderText) {
            const placeholder = new Option(placeholderText, '');
            placeholder.disabled = true;
            placeholder.selected = true;
            selectElement.add(placeholder);
        }

        /**
         * Resets selections based on the field that triggered the reset.
         * @param {string} from - The field from which to reset ('lang1', 'lang2', 'audience', 'papersize').
         */
        function resetSelections(from) {
            if (from === 'lang1') {
                clearSelect(lang2Select);
                clearSelect(audienceSelect);
                clearSelect(papersizeSelect);
                clearSelect(contactSelect);
            } else if (from === 'lang2') {
                clearSelect(audienceSelect);
                clearSelect(papersizeSelect);
                clearSelect(contactSelect);
            } else if (from === 'audience') {
                clearSelect(papersizeSelect);
                clearSelect(contactSelect);
            } else if (from === 'papersize') {
                clearSelect(contactSelect);
            }
        }
    }
});
