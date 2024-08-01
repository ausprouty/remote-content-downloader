document.addEventListener('DOMContentLoaded', function() {
    // Function to add selected mailing lists to the form
    function addMailingListsToForm() {
        let selectedMailLists = [];
        let checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
        
        checkboxes.forEach(function(checkbox) {
            if (checkbox.name.startsWith('mail_lists[')) {
                selectedMailLists.push(checkbox.value);
            }
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
    let checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function(checkbox) {
        if (checkbox.name.startsWith('mail_lists[')) {
            checkbox.addEventListener('change', addMailingListsToForm);
        }
    });
});
