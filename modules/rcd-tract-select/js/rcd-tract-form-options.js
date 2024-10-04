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
        const papersizeSelect = form.querySelector('#papersize');
        const contactSelect = form.querySelector('#contacts');

        let selectedLang1 = '';
        let selectedLang2 = '';
        let selectedAudience = '';
        let selectedPapersize = '';
        let selectedContact = '';

        populateLang1Select(apiEndpoint, formType)

        // Function to populate lang1 options on page load
        function populateLang1Select(apiEndpoint, formType) {
            let lang1Url = `${apiEndpoint}/tracts/options/lang1/${formType}`;
            lang1Select.innerHTML = ''; // Clear existing options

            fetch(lang1Url)
            .then(response => response.json())
            .then(data => {
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
                lang2Container.style.visibility = 'visible';
                const lang2Url = `${apiEndpoint}/tracts/options/lang2/${formType}/${selectedLang1}`;
                console.log ('I am checking to see if lang2Url exists', lang2Url);
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

            fetch(audienceUrl)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    // If audience options are available, show the audience container
                    audienceContainer.style.visibility = 'visible';
                    audienceSelect.style.display = 'block';

                    data.forEach(item => {
                        const option = new Option(item.audience, item.audience);
                        audienceSelect.appendChild(option);
                    });

                    // Handle audience selection to trigger papersize population
                    audienceSelect.addEventListener('change', function () {
                        selectedAudience = audienceSelect.value;
                        if (selectedAudience) {
                            resetSelections('audience');
                            populatePapersizeSelect(apiEndpoint, formType, selectedLang1, selectedLang2);
                        }
                    });
                } else {
                    // If no audience is needed, skip to papersize selection
                    resetSelections('audience');
                    populatePapersizeSelect(apiEndpoint, formType, lang1, lang2);
                }
            })
            .catch(error => console.error('Error fetching audience data:', error));
        }


        // Function to populate papersize options
        function populatePapersizeSelect(apiEndpoint, formType, lang1, lang2 = null) {
            let papersizeUrl = lang2
                ? `${apiEndpoint}/tracts/options/papersize/${formType}/${lang1}/${lang2}`
                : `${apiEndpoint}/tracts/options/papersize/${formType}/${lang1}/${lang1}`;

            papersizeSelect.innerHTML = '';  // Clear any existing options

            fetch(papersizeUrl)
            .then(response => response.json())
            .then(data => {
                data.forEach(item => {
                    const option = new Option(item.papersize, item.papersize);
                    papersizeSelect.appendChild(option);
                });

                // Handle papersize selection
                papersizeSelect.addEventListener('change', function () {
                    selectedPapersize = papersizeSelect.value;
                    if (selectedPapersize) {
                        resetSelections('papersize');
                        populateContactSelect(apiEndpoint, formType, selectedLang1, selectedLang2, selectedPapersize);
                    }
                });
            })
            .catch(error => console.error('Error fetching papersize data:', error));
        }

       

        
        // Function to populate contact options
        function populateContactSelect(apiEndpoint, formType, lang1, lang2, papersize) {
            let contactUrl = `${apiEndpoint}/tracts/options/contacts/${formType}/${lang1}/${lang2 ? lang2 : lang1}/${papersize}`;

            contactSelect.innerHTML = '';  // Clear any existing options

            fetch(contactUrl)
            .then(response => response.json())
            .then(data => {
                data.forEach(item => {
                    const option = new Option(item.contact, item.contact);
                    contactSelect.appendChild(option);
                });
            })
            .catch(error => console.error('Error fetching contact data:', error));
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
                papersizeSelect.style.display = 'none';
                contactSelect.style.display = 'none';
            }
            if (from === 'lang2') {
                audienceSelect.innerHTML = '';
                papersizeSelect.innerHTML = '';
                contactSelect.innerHTML = '';
                audienceContainer.style.visibility = 'hidden';
                papersizeSelect.style.display = 'none';
                contactSelect.style.display = 'none';
            }
            if (from === 'audience') {
                papersizeSelect.innerHTML = '';
                contactSelect.innerHTML = '';
                papersizeSelect.style.display = 'none';
                contactSelect.style.display = 'none';
            }
            if (from === 'papersize') {
                contactSelect.innerHTML = '';
                contactSelect.style.display = 'none';
            }
        }


        
    }
});
