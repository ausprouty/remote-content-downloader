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
            
            // State select (hidden initially)
            var stateLabel = document.createElement('label');
            stateLabel.setAttribute('for', 'state');
            stateLabel.innerText = 'State';
            form.appendChild(stateLabel);

            var stateContainer = document.createElement('div');
            stateContainer.setAttribute('id', 'state-container');
            stateContainer.style.display = 'none';  // Hide state by default
            stateContainer.classList.add('rcd-hidden');  // Hidden class for state

            var stateSelect = document.createElement('select');
            stateSelect.setAttribute('id', 'state');
            stateSelect.setAttribute('name', 'state');
            stateSelect.classList.add('rcd-select');  // Select styling
            stateContainer.appendChild(stateSelect);

            form.appendChild(stateContainer);
            
            // Mailing lists checkboxes (looping over mailLists array)
            mailLists.forEach(function(code) {
                var checkboxGroup = document.createElement('div');
                checkboxGroup.classList.add('checkbox-group');
                
                var checkbox = document.createElement('input');
                checkbox.setAttribute('type', 'checkbox');
                checkbox.setAttribute('id', code);
                checkbox.setAttribute('name', 'mail_lists[' + code + ']');
                checkbox.setAttribute('value', code);
                checkbox.classList.add('rcd-checkbox');  // Checkbox styling
                checkboxGroup.appendChild(checkbox);
                
                var label = document.createElement('label');
                label.setAttribute('for', code);
                label.innerText = code;  // Use the code as the label, or adjust accordingly
                label.classList.add('rcd-label');  // Label styling
                checkboxGroup.appendChild(label);
                
                form.appendChild(checkboxGroup);
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
        });
    });
});
