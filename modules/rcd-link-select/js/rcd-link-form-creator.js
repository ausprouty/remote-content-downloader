document.addEventListener('DOMContentLoaded', function() {
    // Listen for clicks on download links
    document.querySelectorAll('.resource-download-link').forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            
            // Check if the form already exists
            var existingForm = document.querySelector('#download-form');
            if (existingForm) {
                return;  // If the form is already present, don't add it again
            }

            var file = event.target.getAttribute('data-file');
            var mailLists = event.target.getAttribute('data-mail-lists').split(',');  // Split the comma-separated string 
            // Create form dynamically
            var form = document.createElement('form');
            form.setAttribute('id', 'download-form');
            form.setAttribute('method', 'post');
            form.classList.add('rcd-form');  // Adding a custom class for styling
            
            // Assuming name is passed from shortcode as a data-name attribute
            var itemName = event.target.getAttribute('data-name');  // Get the item name

            // Create the title for the form (name of the item)
            var formTitle = document.createElement('h3');
            formTitle.innerText = itemName;
            formTitle.classList.add('rcd-form-title');  // Add a class for styling

            // Append the title as the first element in the form
            form.appendChild(formTitle);

            // Create the static text element (e.g., a paragraph)
            var staticText = document.createElement('p');
            staticText.innerText = 'This is the static text that will appear after the title.';
            staticText.classList.add('rcd-static-text');  // Add a class for styling

            // Append the static text after the title
            form.appendChild(staticText);

            // Close button (first element in the form, positioned in the top-right corner)
            var closeButton = document.createElement('button');
            closeButton.setAttribute('type', 'button');
            closeButton.setAttribute('id', 'close-form-button');
            closeButton.setAttribute('aria-label', 'Close form');  // For accessibility
            closeButton.innerHTML = '&times;';  // The "X" icon
            closeButton.classList.add('rcd-close');  // Button styling

            // Optional title attribute to show "Close" on hover
            closeButton.setAttribute('title', 'Close');

            // Make sure the button is properly positioned before appending
            closeButton.style.position = 'absolute'; 
            closeButton.style.top = '10px'; 
            closeButton.style.right = '10px'; 

            closeButton.addEventListener('click', function(event) {
                event.stopPropagation();  // Prevent any other events from interfering
                console.log('Close button clicked');  // Log to verify click event
                form.remove();  // Remove the form when the close button is clicked
            });

            form.appendChild(closeButton);

            // Email field
            var emailLabel = document.createElement('label');
            emailLabel.setAttribute('for', 'email');
            emailLabel.innerText = 'Email Address';
            form.appendChild(emailLabel);
            
            var emailInput = document.createElement('input');
            emailInput.setAttribute('type', 'email');
            emailInput.setAttribute('id', 'email');
            emailInput.setAttribute('name', 'email');
            emailInput.setAttribute('placeholder', 'Enter your email');
            emailInput.classList.add('rcd-input');  // Input styling
            form.appendChild(emailInput);
            
            // First Name field (visible)
            var firstNameLabel = document.createElement('label');
            firstNameLabel.setAttribute('for', 'first_name');
            firstNameLabel.innerText = 'First Name';
            form.appendChild(firstNameLabel);
            
            var firstNameInput = document.createElement('input');
            firstNameInput.setAttribute('type', 'text');
            firstNameInput.setAttribute('id', 'first_name');
            firstNameInput.setAttribute('name', 'first_name');
            firstNameInput.setAttribute('placeholder', 'Enter your first name');
            firstNameInput.classList.add('rcd-input');  // Input styling
            form.appendChild(firstNameInput);
            
            // Country select (visible)
            var countryLabel = document.createElement('label');
            countryLabel.setAttribute('for', 'country');
            countryLabel.innerText = 'Country';
            form.appendChild(countryLabel);

            var countrySelect = document.createElement('select');
            countrySelect.setAttribute('id', 'country');
            countrySelect.setAttribute('name', 'country');
            countrySelect.classList.add('rcd-select');  // Select styling

            var defaultOption = new Option('Select Country', '');  // First option
            countrySelect.appendChild(defaultOption);
            
            // Assuming countryOptions is already available in your js file
            countryOptions.forEach(function(country) {
                var option = new Option(country, country);
                countrySelect.appendChild(option);
            });

            form.appendChild(countrySelect);
            
            // State Select (Initially hidden)
            var stateLabel = document.createElement('label');
            stateLabel.setAttribute('for', 'state');
            stateLabel.innerText = 'State';
            
            var stateContainer = document.createElement('div');
            stateContainer.setAttribute('id', 'state-container');
            stateContainer.style.display = 'none';  // Hide state by default
            stateContainer.classList.add('rcd-hidden');
            
            var stateSelect = document.createElement('select');
            stateSelect.setAttribute('id', 'state');
            stateSelect.setAttribute('name', 'state');
            stateSelect.classList.add('rcd-select');  // Apply select styles
            stateContainer.appendChild(stateLabel);  // Append state label inside the container
            stateContainer.appendChild(stateSelect);  // Append state dropdown
            
            form.appendChild(stateContainer);  // Append state container to the form
                
            // Mail list checkboxes
            // Loop through the passed mailLists and create checkboxes with descriptions
            mailLists.forEach(function(code) {
        
                // Check if the key exists in allMailLists object
                if (allMailLists.hasOwnProperty(code.trim())) {
                    var checkboxGroup = document.createElement('div');
                    checkboxGroup.classList.add('checkbox-group');
                    
                    // Create checkbox
                    var checkbox = document.createElement('input');
                    checkbox.setAttribute('type', 'checkbox');
                    checkbox.setAttribute('id', code);
                    checkbox.setAttribute('name', 'mail_lists[' + code + ']');
                    checkbox.setAttribute('value', code);
                    checkbox.classList.add('rcd-checkbox');  // Checkbox styling
                    checkboxGroup.appendChild(checkbox);
                    
                    // Create label for checkbox with the corresponding description
                    var label = document.createElement('label');
                    label.setAttribute('for', code);
                    label.innerText = allMailLists[code.trim()];  // Use the description from the mailLists object
                    label.classList.add('rcd-label');  // Label styling
                    checkboxGroup.appendChild(label);
                    
                    form.appendChild(checkboxGroup);  // Append the checkbox group to the form
                }
            });
            
            // Prayer request textarea
            var prayerLabel = document.createElement('label');
            prayerLabel.setAttribute('for', 'prayer');
            prayerLabel.innerText = 'How can we pray for you?';
            form.appendChild(prayerLabel);
            
            var prayerTextarea = document.createElement('textarea');
            prayerTextarea.setAttribute('id', 'prayer');
            prayerTextarea.setAttribute('name', 'prayer');
            prayerTextarea.setAttribute('placeholder', 'Your prayer request');
            prayerTextarea.classList.add('rcd-textarea');  // Textarea styling
            form.appendChild(prayerTextarea);

            // Download button
            var submitButton = document.createElement('button');
            submitButton.setAttribute('type', 'button');
            submitButton.setAttribute('id', 'download-resource-button');
            submitButton.innerText = 'Download Resource';
            submitButton.classList.add('rcd-button');  // Button styling
            form.appendChild(submitButton);
            
            // Insert the form directly after the clicked link
            event.target.insertAdjacentElement('afterend', form);
            var storedData = sessionStorage.getItem('hlCid');
            if (storedData) {
                var parsedData =  JSON.parse(storedData);
                console.log (parsedData)
                if (parsedData.email) {
                    emailInput.value = parsedData.email;
                }
                if (parsedData.first_name) {
                    firstNameInput.value = parsedData.first_name;
                }
                if (parsedData.country) {
                    countrySelect.value = parsedData.country;
                    countrySelect.dispatchEvent(new Event('change'));  // Trigger change for country
                }
                if (parsedData.state) {
                    stateSelect.value = parsedData.state;
                }
            }

            // NOW bind the blur event to the email input after it is created
            emailInput.addEventListener('blur', function() {
                var email = emailInput.value;
                if (email === '') return;  // Do not send empty email to the server

                // Validate the email format
                if (!validateEmail(email)) {
                    console.error('Please enter a valid email address.');
                    return;
                }

                console.log('Proceed with AJAX to check email in backend...');
                userMailingListInfo(email);// Perform your AJAX to verify the email here.
            });

            // Add event listener for the download button
            submitButton.addEventListener('click', async function() {
                // Create FormData object and append form fields
                var formData = new FormData();
                formData.append('file', file);
                formData.append('email', document.getElementById('email').value);
                formData.append('first_name', document.getElementById('first_name').value);
                formData.append('country', document.getElementById('country').value);
                formData.append('state', document.getElementById('state').value);
                formData.append('prayer', document.getElementById('prayer').value);
                formData.append('apiKey', RCDSettings.hlApiKey); 
                const nonce = await generateWordpressNonce('download-resource');
                formData.append('wpnonce', nonce);
                formData.append('action', 'download-resource');

                // Add mail list checkboxes
                mailLists.forEach(function(code) {
                    var checkbox = document.getElementById(code);
                    if (checkbox && checkbox.checked) {
                        formData.append('mail_lists[]', checkbox.value);
                    }
                });
                console.log('Form Data:');
                for (let [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
                }
                // Send a POST request with formData to /materials/download
                fetch(RCDSettings.apiEndpoint + '/materials/download', {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + RCDSettings.hlApiKey,
                    },
                    body: formData

                })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Network response was not ok.');
                })
                .then(data => {
                    console.log('Success:', data);
                    // You can handle the success case, such as displaying a success message or starting the download
                })
                .catch(error => {
                    console.error('Error:', error);
                    // You can handle the error case, such as displaying an error message to the user
                });
            });

            // Email validation function
            function validateEmail(email) {
                var re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                return re.test(email);
            }

            async function userMailingListInfo(email) {
                try {
                    // Generate the nonce before making the AJAX request
                    const nonce = await generateWordpressNonce('mailinglist_info');
                    // Send the request using fetch
                    const response = await fetch(RCDSettings.apiEndpoint + '/user/mailinglist/info', {
                        method: 'POST',
                        headers: {
                            'Authorization': 'Bearer ' + RCDSettings.hlApiKey,
                            'Content-Type': 'application/json'  // Use JSON format
                        },
                        body: JSON.stringify({
                            action: 'mailinglist_info',
                            email: email,
                            apiKey: RCDSettings.hlApiKey, 
                            wpnonce: nonce
                        })
                    });
                     // Check if response is ok before reading the body
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    // Parse the response as JSON
                    const dataObject = await response.json();
                    const data = dataObject.data;   
                    // Check if the response contains a valid user
                    if (data.cid == 'NULL') {
                       console.log ('New user detected');
                    } else {
                        // User is verified, store CID in sessionStorage
                        sessionStorage.setItem('hlCid', JSON.stringify(data));
            
                        // Populate known data in the form fields if available
                        if (data.first_name) {
                            document.getElementById('first_name').value = data.first_name;
                        }
                        if (data.country) {
                            document.getElementById('country').value = data.country;
                            document.getElementById('country').dispatchEvent(new Event('change'));  // Trigger country change
                        }
                        if (data.state) {
                            document.getElementById('state').value = data.state;
                        }
                    }
            
                } catch (error) {
                    console.error('Fetch Error: ', error);
                  //  document.getElementById('error').textContent = 'An unexpected error occurred. Please try again later.';
                  //  document.getElementById('error').style.display = 'block';
                }
            }
            

            // Handle country selection and update state options dynamically
            countrySelect.addEventListener('change', function() {
                var country = countrySelect.value;
                stateSelect.innerHTML = '';  // Clear existing options

                if (country === 'Australia') {
                    populateStateSelect(['NSW', 'QLD', 'SA', 'TAS', 'VIC', 'WA', 'ACT', 'NT']);
                    stateContainer.style.display = 'block';  // Show state dropdown
                } else if (country === 'United States') {
                    populateStateSelect(usaStates);
                    stateContainer.style.display = 'block';  // Show state dropdown
                } else {
                    stateContainer.style.display = 'none';  // Hide state dropdown for other countries
                }
            });

            // Populate state dropdown
            function populateStateSelect(states) {
                var defaultOption = new Option('SELECT STATE:', '');
                stateSelect.appendChild(defaultOption);

                states.forEach(function(state) {
                    var option = document.createElement('option');
                    option.value = state;
                    option.textContent = state;
                    stateSelect.appendChild(option);
                });
            }

        });
    })
});
