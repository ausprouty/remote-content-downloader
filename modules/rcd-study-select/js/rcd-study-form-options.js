document.addEventListener('DOMContentLoaded', function () {
    const apiEndpoint = RCDSettings.apiEndpoint;
    const ajaxurl = myScriptData.ajaxurl; // Access the localized AJAX URL
    const form = document.getElementById('rcd-tract-form');
    const wp_nonce = myScriptData.wp_nonce; 
 

    if (form) {
        const parentContainer = document.querySelector('#rcd-tract-form-container'); // Adjust the selector to match your layout
        const downloadContainer = parentContainer.querySelector('#download-container');
        const formType = form.getAttribute('data-form-type');
        const langSelect = form.querySelector('#lang');
        const session = form.querySelector('#session');
       
   

        // Populate the first language field on load
        populateLang1Select(apiEndpoint, formType);

        function populateLang1Select(apiEndpoint, formType) {
            const lang1Url = `${apiEndpoint}/dbs/languages`;
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
        

        

                .then(data => {
                    console.log('Filename:', data.filename);
                    // Prepare form data for the AJAX request to render the shortcode
                    const formData = new FormData();
                    formData.append('action', 'rcd_link_render_dynamic');
                    formData.append('file', data.filename);
                    formData.append('name', data.title);
                    formData.append('mail_lists', mailLists);
                    formData.append('wp_nonce', wp_nonce);
                    console.log (ajaxurl);
                    console.log([...formData.entries()]);
                    // Send the AJAX request to render the shortcode
                    return fetch(ajaxurl, {
                        method: 'POST',
                        body: formData,
                    })
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`AJAX request failed: ${response.statusText}`);
                    }
                    return response.text();
                })
                .then(html => {
                    form.style.display = 'none'; // Hide the form
                    // Inject the rendered shortcode output into the container
                    downloadContainer.innerHTML = `<p id="download-message">${html}</p>`;
                    //downloadContainer.style.display = 'none'; // Make it invisible
                    var downloadLink = document.querySelector('.resource-download-link');
                    handleDownloadClick(downloadLink);
                })
                .catch(error => {
                    console.error('Error:', error); // Handle errors
                });
        }
        
        
        

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
