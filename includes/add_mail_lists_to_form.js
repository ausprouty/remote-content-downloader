document.addEventListener('DOMContentLoaded', function() {
    // Function to add selected Mail lists to the form
    function addMailListsToForm() {
        let selectedMailLists = [];
        let checkboxes = document.querySelectorAll('input[name="mail_lists[]"]:checked');
        
        checkboxes.forEach(function(checkbox) {
            selectedMailLists.push(checkbox.value);
        });
        
        let form = document.querySelector('form'); // Adjust the selector to target your specific form
        if (form) {
            let existingInput = form.querySelector('input[name="selected_mail_lists"]');
            if (existingInput) {
                existingInput.value = selectedMailLists.join(',');
            } else {
                let hiddenInput = document.createElement('input');
                hiddenInput.type = 'hidden';
                hiddenInput.name = 'selected_mail_lists';
                hiddenInput.value = selectedMailLists.join(',');
                form.appendChild(hiddenInput);
            }
        }
    }
    
    // Add event listener to checkboxes
    let checkboxes = document.querySelectorAll('input[name="mail_lists[]"]');
    checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', addMailListsToForm);
    });
});
