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
        var formData = $('#download-form').serializeArray();
        var file = $('.resource-download-link').data('file');
        formData.push({name: 'file', value: file});

        // Ensure RCDSettings and apiEndpoint are defined
        if (typeof RCDSettings === 'undefined' || typeof RCDSettings.apiEndpoint === 'undefined') {
            console.error('RCDSettings or apiEndpoint is not defined');
            container.textContent = 'Error: apiEndpoint is not defined';
            return;
        }
        const apiEndpoint = RCDSettings.apiEndpoint;
        console.log(apiEndpoint);
        const ajaxurl = apiEndpoint + '/materials/download';
        
        $.ajax({
            url: ajaxurl,
            type: 'POST',
            data: {
                action: 'process_resource_download',
                formData: formData
            },
            success: function(response) {
                if (response.success) {
                    window.location.href = response.data.file_url;
                    $('#resource-download-form').dialog('close');
                } else {
                    alert('There was an error processing your request.');
                }
            }
        });
    });
});
