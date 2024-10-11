jQuery(document).ready(function($) {
    // Open the download form in a modal dialog when the link is clicked
    $('.resource-download-link').on('click', function(e) {
        e.preventDefault(); // Prevent the default link behavior
        
        // Open the download form in a modal dialog
        $('#resource-download-form').dialog({
            modal: true, // Modal behavior
            title: 'Download Resource',
            width: 400 // Dialog width
        });
    });

    // Send AJAX to verify email as soon as it is entered
    $('#email').on('blur', async function() {
        var email = $(this).val();
        if (email === '') return; // Do not send empty email to the server
        // If the email field is not empty, validate the email format
        if ( !validateEmail(email)) {
            $('#error').text('Please enter a valid email address.').show();
            return;
        }
        $('#error').hide();  
        // Generate the nonce before making the AJAX request
        const nonce = await generateWordpressNonce('verify_email');
        // Verify the email via AJAX call
        $.ajax({
            url: RCDSettings.apiEndpoint + '/user/verify',  // Replace with your endpoint
            type: 'POST',
            headers: {
                'Authorization': 'Bearer ' + RCDSettings.hlApiKey
            },
            data: {
                action: 'verify_email',
                email: email,
                apiKey: RCDSettings.hlApiKey, 
                wpnonce: nonce
            },
            success: function(response) {
                console.log(response);
                if (response.cid == null) {
                    // If user is not verified, display additional fields
                    $('#conditional-fields').show();
                    if (response.showState) {
                        $('#state-container').css('visibility', 'visible');
                    }
                } else {
                    // If user is already verified, hide additional fields
                    $('#conditional-fields').hide();
                    $('#state-container').css('visibility', 'hidden');
                    sessionStorage.setItem('cid', response.cid);
                }
            },
            error: function(xhr, status, error) {
                console.error('AJAX Error: ', status, error);
                $('#error').text('An unexpected error occurred. Please try again later.').show();
            }
        });
    });

    // Handle form submission for resource download
    $('#download-resource-button').on('click', function() {
        

        const apiEndpoint = RCDSettings.apiEndpoint;
        const hlApiKey = RCDSettings.hlApiKey;
        
        // Serialize form data
        var formData = $('#download-form').serializeArray();
        
        // Add file data
        var file = $('.resource-download-link').data('file');
        formData.push({ name: 'file', value: file });
        
        // Add API key
        formData.push({ name: 'apiKey', value: hlApiKey });

        const ajaxurl = apiEndpoint + '/materials/download';

        // Send form data to the server via AJAX
        $.ajax({
            url: ajaxurl,
            type: 'POST',
            data: {
                action: 'process_resource_download',
                formData: formData,
                _wpnonce: RCDSettings.nonce // Validation nonce for security
            },
            success: function(response) {
                if (response.success) {
                    window.location.href = response.file_url;
                    $('#resource-download-form').dialog('close');
                } else {
                    $('#error').text(response.message).show();
                }
            },
            error: function(xhr, status, error) {
                console.error('AJAX Error: ', status, error);
                $('#error').text('An unexpected error occurred. Please try again later.').show();
            }
        });
    });

    // Validate email address
    function validateEmail(email) {
        var re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(email);
    }
});
