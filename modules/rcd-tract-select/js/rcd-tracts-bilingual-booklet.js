jQuery(document).ready(function($) {
    $('#lang1').on('change', function() {
        var lang1 = $(this).val();
        if (lang1) {
            $('#lang2-container').show();
            $('#audience-container').show();

            $.ajax({
                url: RCDSettings.apiEndpoint + '/languages/' + lang1,
                method: 'GET',
                success: function(data) {
                    $('#lang2').empty().append('<option value="">Select second language (or NONE)...</option>');
                    $.each(data.languages, function(index, language) {
                        $('#lang2').append('<option value="' + language.code + '">' + language.name + '</option>');
                    });
                    $('#lang2').show();
                }
            });

            $.ajax({
                url: RCDSettings.apiEndpoint + '/audience/' + lang1,
                method: 'GET',
                success: function(data) {
                    $('#audience').empty();
                    $.each(data.audiences, function(index, audience) {
                        $('#audience').append('<option value="' + audience.id + '">' + audience.name + '</option>');
                    });
                    $('#audience').show();
                }
            });
        } else {
            $('#lang2-container, #audience-container').hide();
        }
    });
    
    $('#rcd-tracts-form').on('submit', function(e) {
        e.preventDefault();
        // Handle form submission logic
    });
});
