jQuery(document).ready(function($) {
    $('.resource-download-link').on('click', function(e) {
        e.preventDefault();
        $('#resource-download-form').dialog({
            modal: true,
            title: 'Download Resource',
            width: 400
        });
    });

    $('#download-resource-button').on('click', function() {
        var email = $('#email').val();
        
        if (!validateEmail(email)) {
            alert('Please enter a valid email address or leave it blank.');
            return;
        }
        // Ensure RCDSettings and apiEndpoint are defined
        if (typeof RCDSettings === 'undefined' || typeof RCDSettings.apiEndpoint === 'undefined') {
            console.error('RCDSettings or apiEndpoint is not defined');
            return;
        }
        const apiEndpoint = RCDSettings.apiEndpoint;
        const hlApiKey = RCDSettings.hlApiKey;            
        
        
        var formData = $('#download-form').serializeArray();
        var file = $('.resource-download-link').data('file');
        formData.push({name: 'file', value: file});
         // Add the API key to formData
        formData.push({name: 'apiKey', value: hlApiKey});
        const ajaxurl = apiEndpoint + '/materials/download';
        console.log('ajaxurl', ajaxurl);
        console.log (formData);
        
        $.ajax({
            url: ajaxurl,
            type: 'POST',
            data: {
                action: 'process_resource_download',
                formData: formData
            },
            success: function(response) {
                console.log(response);
                if (response.success) {
                    window.location.href = response.file_url;
                    $('#resource-download-form').dialog('close');
                } else {
                    alert('There was an error processing your request.');
                }
            }
        });
    });

    function validateEmail(email) {
        if (email === null || email.trim() === '') {
            return true; // Allow null or empty email
        }
        var re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(email);
    }
});
