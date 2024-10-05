document.addEventListener('DOMContentLoaded', function () {
    const apiEndpoint = RCDSettings.apiEndpoint;

    // Get the form element
    const form = document.getElementById('rcd-tract-form');
    if (form) {
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

        let selectedLang1 = '';
        let selectedLang2 = '';
        let selectedAudience = '';
        let selectedPapersize = '';
        let selectedContact = '';

        populateLang1Select(apiEndpoint, formType)

        // Function to populate lang1 options on page load
        function populateLang1Select(apiEndpoint, formType) {
            let lang1Url = `${apiEndpoint}/tracts/options/lang1/${formType}`;
            console.log (lang1Url)
            lang1Select.innerHTML = ''; // Clear existing options

            fetch(lang1Url)
            .then(response => response.json())
            .then(data => {
                addPlaceholder(lang1Select, 'Select a language...'); // Add the placeholder
                data.forEach(item => {
                    const option = new Option(item.lang1, item.lang1);
                    lang1Select.appendChild(option);
                });
            })
            .catch(error => console.error('Error fetching lang1 data:', error));
        }

        // Handle lang1 selection
        lang1Select.addEventListener('change', function () {
            selectedLang1 = lang1Select.value;
            resetSelections('lang1');
            console.log ('I am checking to see if lang2Container exists', lang2Container);
            console.log ('I am checking to see if selectedLang1 exists', selectedLang1);
            // Bilingual case: Check if lang2Container exists, and handle accordingly
            if (lang2Container && selectedLang1) {
                
                const lang2Url = `${apiEndpoint}/tracts/options/lang2/${formType}/${selectedLang1}`;
                console.log ('I am checking to see if lang2Url exists', lang2Url);
                fetch(lang2Url)
                    .then(response => response.json())
                    .then(data => {
                        lang2Select.innerHTML = '';  // Clear previous options
                        addPlaceholder(lang2Select, 'Select a language...'); // Add the placeholder
                        data.forEach(item => {
                            const option = new Option(item.lang2, item.lang2);
                            lang2Select.appendChild(option);
                        });
                        lang2Container.style.visibility = 'visible';
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
                // Single-language case: No lang2, so populate audience directly
                populateAudienceSelect(apiEndpoint, formType, selectedLang1);
            }
        });

         // Function to populate audience options (if needed)
         function populateAudienceSelect(apiEndpoint, formType, lang1, lang2) {
            let audienceUrl = `${apiEndpoint}/tracts/options/audience/${formType}/${lang1}/${lang2}`;

            audienceSelect.innerHTML = '';  // Clear previous options
            console.log ('I am checking to see if audience exists', audienceUrl);
            fetch(audienceUrl)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    // If audience options are available, show the audience container
                    addPlaceholder(audienceSelect, 'Select an audience...'); // Add the placeholder
                    data.forEach(item => {
                        const option = new Option(item.audience, item.audience);
                        audienceSelect.appendChild(option);
                    });
                    audienceContainer.style.visibility = 'visible';

                    // Handle audience selection to trigger papersize population
                    audienceSelect.addEventListener('change', function () {
                        selectedAudience = audienceSelect.value;
                        if (selectedAudience) {
                            resetSelections('audience');
                            populatePapersizeSelect(apiEndpoint, formType, selectedLang1, selectedLang2, selectedAudience);
                        }
                    });
                } else {
                    // If no audience is needed, skip to papersize selection
                    resetSelections('audience');
                    populatePapersizeSelect(apiEndpoint, formType, lang1, lang2, null);
                }
            })
            .catch(error => console.error('Error fetching audience data:', error));
        }


        // Function to populate papersize options
        function populatePapersizeSelect(apiEndpoint, formType, lang1, lang2, audience) {
            let papersizeUrl = `${apiEndpoint}/tracts/options/papersize/${formType}/${lang1}/${lang2}/${audience}`;

            papersizeSelect.innerHTML = '';  // Clear any existing options
            console.log ('I am checking to see if papersize exists',papersizeUrl);
            fetch(papersizeUrl)
            .then(response => response.json())
            .then(data => {
                console.log (data)
                addPlaceholder(papersizeSelect, 'Select paper size...'); // Add the placeholder
                data.forEach(item => {
                    const option = new Option(item.paper_size, item.paper_size);
                    papersizeSelect.appendChild(option);
                });
                console.log (papersizeSelect)
                papersizeContainer.style.visibility = 'visible';

                // Handle papersize selection
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

       

        
        // Function to populate contact options
        function populateContactSelect(apiEndpoint, formType, lang1, lang2, audience, papersize) {
            let contactUrl = `${apiEndpoint}/tracts/options/contacts/${formType}/${lang1}/${lang2}/${audience}/${papersize}`;

            contactSelect.innerHTML = '';  // Clear any existing options
            console.log ('I am checking to see if contact exists', contactUrl);
            fetch(contactUrl)
            
            .then(response => response.json())
            .then(data => {
                addPlaceholder(contactSelect, 'Select Country..'); // Add the placeholder
                data.forEach(item => {
                    const option = new Option(item.contact, item.contact);
                    contactSelect.appendChild(option);
                });
                contactContainer.style.visibility = 'visible';
                // Handle papersize selection
                contactSelect.addEventListener('change', function () {
                    selectedContact = contactSelect.value;
                    if (selectedContact) {
                        alert('You made it to the end!'); // Do something with the final selection
                    }
                });
            })
            .catch(error => console.error('Error fetching contact data:', error));
        }

        function addPlaceholder(selectElement, placeholderText) {
            const placeholder = new Option(placeholderText, '');
            placeholder.disabled = true;
            placeholder.selected = true;
            selectElement.appendChild(placeholder);
        }
        
        
        // Reset all options below a selection
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
