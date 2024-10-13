
document.addEventListener('DOMContentLoaded', function() {
    // Listen for clicks on download links
    document.querySelectorAll('.resource-download-link').forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            
            var file = event.target.getAttribute('data-file');
            var mailLists = JSON.parse(event.target.getAttribute('data-mail-lists'));
            
            // Create form dynamically
            var form = document.createElement('form');
            form.setAttribute('id', 'download-form');
            form.setAttribute('method', 'post');
            
            // Email field
            var emailLabel = document.createElement('label');
            emailLabel.setAttribute('for', 'email');
            emailLabel.innerText = 'Email Address';
            form.appendChild(emailLabel);
            
            var emailInput = document.createElement('input');
            emailInput.setAttribute('type', 'email');
            emailInput.setAttribute('id', 'email');
            emailInput.setAttribute('name', 'email');
            emailInput.setAttribute('placeholder', 'Email');
            form.appendChild(emailInput);
            
            // Conditional Fields
            var conditionalFields = document.createElement('div');
            conditionalFields.setAttribute('id', 'conditional-fields');
            conditionalFields.style.display = 'none';  // Hidden initially
            
            var firstNameInput = document.createElement('input');
            firstNameInput.setAttribute('type', 'text');
            firstNameInput.setAttribute('id', 'first_name');
            firstNameInput.setAttribute('name', 'first_name');
            firstNameInput.setAttribute('placeholder', 'First Name');
            conditionalFields.appendChild(firstNameInput);
            
            // Country select
            var countrySelect = document.createElement('select');
            countrySelect.setAttribute('id', 'country');
            countrySelect.setAttribute('name', 'country');
            var defaultOption = new Option('SELECT COUNTRY', '');  // First option
            countrySelect.appendChild(defaultOption);

            // Populate country options from the `countries.js` file
            countryOptions.forEach(function(country) {
                var option = new Option(country, country);
                countrySelect.appendChild(option);
            });
            
            // State selection (initially hidden)
            var stateContainer = document.createElement('div');
            stateContainer.setAttribute('id', 'state-container');
            stateContainer.style.visibility = 'hidden';  // Hidden initially
            
            var stateSelect = document.createElement('select');
            stateSelect.setAttribute('id', 'state');
            stateSelect.setAttribute('name', 'state');
            stateContainer.appendChild(stateSelect);
            
            conditionalFields.appendChild(stateContainer);
            form.appendChild(conditionalFields);
            
            // Mailing lists checkboxes (looping over mailLists object)
            Object.entries(mailLists).forEach(function([code, labelText]) {
                var checkboxGroup = document.createElement('div');
                checkboxGroup.classList.add('checkbox-group');
                
                var checkbox = document.createElement('input');
                checkbox.setAttribute('type', 'checkbox');
                checkbox.setAttribute('id', code);
                checkbox.setAttribute('name', 'mail_lists[' + code + ']');
                checkbox.setAttribute('value', code);
                checkboxGroup.appendChild(checkbox);
                
                var label = document.createElement('label');
                label.setAttribute('for', code);
                label.innerText = labelText;
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
            form.appendChild(prayerTextarea);
            
            // Download button
            var submitButton = document.createElement('button');
            submitButton.setAttribute('type', 'button');
            submitButton.setAttribute('id', 'download-resource-button');
            submitButton.innerText = 'Download Resource';
            form.appendChild(submitButton);
            
            // Append form to body or modal container
            document.body.appendChild(form);
            
            // You can add event listeners to handle form validation or submission
        });
    });
});

