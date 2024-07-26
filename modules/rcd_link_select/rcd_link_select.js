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
        console.log (formData)
        var formData = $('#download-form').serialize() + '&file=' + $('.resource-download-link').data('file');
        
        $.ajax({
            url: ajaxurl,
            type: 'POST',
            data: {
                action: 'process_resource_download',
                data: formData
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
