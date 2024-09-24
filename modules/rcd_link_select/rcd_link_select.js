jQuery(document).ready(function($) {
    /**
     * Opens the resource download form in a dialog when a download link is clicked.
     * 
     * The form is displayed in a modal dialog with a width of 400px. This is triggered by 
     * clicking on an element with the class `.resource-download-link`.
     *
     * @param {Event} e The click event for the download link.
     * @return void
     */
    $('.resource-download-link').on('click', function(e) {
        e.preventDefault(); // Prevent the default link behavior
        
        // Open the download form in a modal dialog
        $('#resource-download-form').dialog({
            modal: true, // Modal behavior to prevent interaction outside the dialog
            title: 'Download Resource',
            width: 400 // Set dialog width to 400px
        });
    });

    /**
     * Handles the download form submission when the download button is clicked.
     * 
     * This function validates the email field, ensures the API settings (`RCDSettings`) are defined, 
     * and sends an AJAX request to the server to process the resource download. 
     * If successful, the user is redirected to the file URL for downloading the resource.
     *
     * @return void
     */
    $('#download-resource-button').on('click', function() {
        // Get the value of the email field
        var email = $('#email').val();
        
        // Validate the email field
        if (!validateEmail(email)) {
            alert('Please enter a valid email address or leave it blank.');
            return;
        }

        // Ensure RCDSettings and the API endpoint are defined
        if (typeof RCDSettings === 'undefined' || typeof RCDSettings.apiEndpoint === 'undefined') {
            console.error('RCDSettings or apiEndpoint is not defined');
            return;
        }

        const apiEndpoint = RCDSettings.apiEndpoint;
        const hlApiKey = RCDSettings.hlApiKey;
        
        // Serialize the form data
        var formData = $('#download-form').serializeArray();
        
        // Add the file data (assumed to be stored in a data attribute)
        var file = $('.resource-download-link').data('file');
        formData.push({ name: 'file', value: file });
        
        // Add the API key to the form data
        formData.push({ name: 'apiKey', value: hlApiKey });

        const ajaxurl = apiEndpoint + '/materials/download';
        console.log('ajaxurl', ajaxurl);
        console.log(formData);
        
        // Send the form data to the server via AJAX
        $.ajax({
            url: ajaxurl,
            type: 'POST',
            data: {
                action: 'process_resource_download',
                formData: formData
            },
            success: function(response) {
                console.log('response', response);
                
                // If the response is successful, redirect to the file URL
                if (response.success) {
                    window.location.href = response.file_url;
                    $('#resource-download-form').dialog('close');
                } else {
                    // Show an error message if the request fails
                    alert(response.message);
                }
            },
            error: function(xhr, status, error) {
                console.error('AJAX Error: ', status, error);
                alert('An unexpected error occurred. Please try again later.');
            }
        });
    });

    /**
     * Validates the email address entered by the user.
     * 
     * This function uses a regular expression to validate that the email follows standard formatting. 
     * It allows null or empty emails, as those may be optional in this context.
     * 
     * @param {string} email The email address entered by the user.
     * @return {boolean} Returns true if the email is valid or empty, false otherwise.
     */
    function validateEmail(email) {
        // Allow null or empty email
        if (email === null || email.trim() === '') {
            return true;
        }
        
        // Regular expression to validate email format
        var re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(email);
    }
});
