// Wait for the DOM to fully load before executing the script
document.addEventListener('DOMContentLoaded', function () {
    // Define the API endpoint from global RCDSettings
    const apiEndpoint = RCDSettings.apiEndpoint;

    // Get the form element by its ID
    const form = document.getElementById('rcd-tract-form');
    
    // If the form exists, proceed with the logic
    if (form) {
        // Get the form attributes and elements for different form sections
        const formType = form.getAttribute('data-form-type');
        const lang1Select = form.querySelector('#lang1');
        const lang2Container = form.querySelector('#lang2-container');
        const lang2Select = form.querySelector('#lang2');
        const audienceContainer = form.querySelector('#audience-container');
        const audienceSelect = form.querySelector('#audience');
        const papersizeContainer = form.querySelector('#papersize-container');
        const papersizeSelect = form.querySelector('#papersize');
        const contactContainer = form.querySelector('#contact-container');
        const contactSelect = form.querySelector('#contact');
        const approvalContainer = form.querySelector('#approval-container');

        // Variables to store selected options
        let selectedLang1 = '';
        let selectedLang2 = '';
        let selectedAudience = '';
        let selectedPapersize = '';
        let selectedContact = '';

        // Populate language 1 (lang1) select dropdown on form load
        populateLang1Select(apiEndpoint, formType);

        /**
         * Function to populate the lang1 select dropdown with options fetched from the API.
         * @param {string} apiEndpoint - The base API URL.
         * @param {string} formType - The type of form (e.g., 'bilingual-book').
         */
        function populateLang1Select(apiEndpoint, formType) {
            const lang1Url = `${apiEndpoint}/tracts/options/lang1/${formType}`;
            lang1Select.innerHTML = ''; // Clear any existing options

            fetch(lang1Url)
            .then(response => response.json())
            .then(data => {
                addPlaceholder(lang1Select, 'Select a language...'); // Add a placeholder option
                data.forEach(item => {
                    const option = new Option(item.lang1, item.lang1); // Create an option for each language
                    lang1Select.appendChild(option);
                });
            })
            .catch(error => console.error('Error fetching lang1 data:', error));
        }

        // Handle lang1 selection and populate subsequent fields
        lang1Select.addEventListener('change', function () {
            selectedLang1 = lang1Select.value;
            resetSelections('lang1');

            // If lang2Container exists (bilingual case), populate lang2 select dropdown
            if (lang2Container && selectedLang1) {
                const lang2Url = `${apiEndpoint}/tracts/options/lang2/${formType}/${selectedLang1}`;
                fetch(lang2Url)
                    .then(response => response.json())
                    .then(data => {
                        lang2Select.innerHTML = '';  // Clear previous options
                        addPlaceholder(lang2Select, 'Select a language...'); // Add placeholder
                        data.forEach(item => {
                            const option = new Option(item.lang2, item.lang2); // Add each lang2 option
                            lang2Select.appendChild(option);
                        });
                        lang2Container.style.visibility = 'visible'; // Show the lang2 container
                    })
                    .catch(error => console.error('Error fetching lang2 data:', error));

                // Handle lang2 selection to trigger audience population
                lang2Select.addEventListener('change', function () {
                    selectedLang2 = lang2Select.value;
                    if (selectedLang1 && selectedLang2) {
                        resetSelections('lang2');
                        populateAudienceSelect(apiEndpoint, formType, selectedLang1, selectedLang2);
                    }
                });
            } else {
                // Single-language case: no lang2, so populate audience directly
                populateAudienceSelect(apiEndpoint, formType, selectedLang1);
            }
        });

        /**
         * Function to populate the audience select dropdown based on lang1 and lang2.
         * @param {string} apiEndpoint - The base API URL.
         * @param {string} formType - The type of form.
         * @param {string} lang1 - The selected lang1.
         * @param {string} [lang2] - The selected lang2. (use lang1 for monolingual forms)
         */
        function populateAudienceSelect(apiEndpoint, formType, lang1, lang2 = '') {
            const audienceUrl = `${apiEndpoint}/tracts/options/audience/${formType}/${lang1}/${lang2}`;
            audienceSelect.innerHTML = '';  // Clear previous options

            fetch(audienceUrl)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    addPlaceholder(audienceSelect, 'Select an audience...');
                    data.forEach(item => {
                        const option = new Option(item.audience, item.audience); // Add audience options
                        audienceSelect.appendChild(option);
                    });
                    audienceContainer.style.visibility = 'visible'; // Show audience container

                    // Handle audience selection and populate papersize options
                    audienceSelect.addEventListener('change', function () {
                        selectedAudience = audienceSelect.value;
                        if (selectedAudience) {
                            resetSelections('audience');
                            populatePapersizeSelect(apiEndpoint, formType, selectedLang1, selectedLang2, selectedAudience);
                        }
                    });
                } else {
                    // If no audience is needed, move directly to papersize selection
                    resetSelections('audience');
                    populatePapersizeSelect(apiEndpoint, formType, lang1, lang2, null);
                }
            })
            .catch(error => console.error('Error fetching audience data:', error));
        }

        /**
         * Function to populate the papersize select dropdown based on the selected audience.
         * @param {string} apiEndpoint - The base API URL.
         * @param {string} formType - The type of form.
         * @param {string} lang1 - The selected lang1.
         * @param {string} [lang2] - The selected lang2 . (use lang1 for monolingual forms)
         * @param {string} [audience] - The selected audience.
         */
        function populatePapersizeSelect(apiEndpoint, formType, lang1, lang2, audience) {
            const papersizeUrl = `${apiEndpoint}/tracts/options/papersize/${formType}/${lang1}/${lang2}/${audience}`;
            papersizeSelect.innerHTML = '';  // Clear previous options

            fetch(papersizeUrl)
            .then(response => response.json())
            .then(data => {
                addPlaceholder(papersizeSelect, 'Select paper size...');
                data.forEach(item => {
                    const option = new Option(item.paper_size, item.paper_size); // Add paper size options
                    papersizeSelect.appendChild(option);
                });
                papersizeContainer.style.visibility = 'visible'; // Show papersize container

                // Handle papersize selection to populate contact options
                papersizeSelect.addEventListener('change', function () {
                    selectedPapersize = papersizeSelect.value;
                    if (selectedPapersize) {
                        resetSelections('papersize');
                        populateContactSelect(apiEndpoint, formType, selectedLang1, selectedLang2, selectedAudience, selectedPapersize);
                    }
                });
            })
            .catch(error => console.error('Error fetching papersize data:', error));
        }

        /**
         * Function to populate the contact select dropdown.
         * @param {string} apiEndpoint - The base API URL.
         * @param {string} formType - The type of form.
         * @param {string} lang1 - The selected lang1.
         * @param {string} [lang2] - The selected lang2.
         * @param {string} [audience] - The selected audience.
         * @param {string} papersize - The selected paper size.
         */
        function populateContactSelect(apiEndpoint, formType, lang1, lang2, audience, papersize) {
            const contactUrl = `${apiEndpoint}/tracts/options/contacts/${formType}/${lang1}/${lang2}/${audience}/${papersize}`;
            contactSelect.innerHTML = '';  // Clear previous options

            fetch(contactUrl)
            .then(response => response.json())
            .then(data => {
                addPlaceholder(contactSelect, 'Select Country...');
                data.forEach(item => {
                    const option = new Option(item.contact, item.contact); // Add contact options
                    contactSelect.appendChild(option);
                });
                contactContainer.style.visibility = 'visible'; // Show contact container

                // Handle contact selection and fetch tract info
                contactSelect.addEventListener('change', function () {
                    selectedContact = contactSelect.value;
                    if (selectedContact) {
                        const materialUrl = `${apiEndpoint}/tracts/options/filename/${formType}/${lang1}/${lang2}/${audience}/${papersize}/${selectedContact}`;
                        fetch(materialUrl)
                        .then(response => response.json())
                        .then(data => {
                            if (data.length > 0) {
                                console.log(data);
                                approvalContainer.style.visibility = 'visible'; // Show approval container
                            }
                        })
                        .catch(error => console.error('Error fetching tract info:', error));
                    }
                });
            })
            .catch(error => console.error('Error fetching contact data:', error));
        }

        /**
         * Function to add a placeholder option to a select element.
         * @param {HTMLSelectElement} selectElement - The select element.
         * @param {string} placeholderText - The placeholder text.
         */
        function addPlaceholder(selectElement, placeholderText) {
            const placeholder = new Option(placeholderText, '');
            placeholder.disabled = true;
            placeholder.selected = true;
            selectElement.appendChild(placeholder);
        }

        /**
         * Function to reset selections and hide containers based on the current selection level.
         * @param {string} from - The field from which to reset selections ('lang1', 'lang2', 'audience', 'papersize').
         */
        function resetSelections(from) {
            if (from === 'lang1') {
                lang2Select.innerHTML = '';
                audienceSelect.innerHTML = '';
                papersizeSelect.innerHTML = '';
                contactSelect.innerHTML = '';
                lang2Container.style.visibility = 'hidden';
                audienceContainer.style.visibility = 'hidden';
                papersizeContainer.style.visibility = 'hidden';
                contactContainer.style.visibility = 'hidden';
            }
            if (from === 'lang2') {
                audienceSelect.innerHTML = '';
                papersizeSelect.innerHTML = '';
                contactSelect.innerHTML = '';
                audienceContainer.style.visibility = 'hidden';
                papersizeContainer.style.visibility = 'hidden';
                contactContainer.style.visibility = 'hidden';
            }
            if (from === 'audience') {
                papersizeSelect.innerHTML = '';
                contactSelect.innerHTML = '';
                papersizeContainer.style.visibility = 'hidden';
                contactContainer.style.visibility = 'hidden';
            }
            if (from === 'papersize') {
                contactSelect.innerHTML = '';
                contactContainer.style.visibility = 'hidden';
            }
        }
    }
});
