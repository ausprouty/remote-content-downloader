/**
 * Initializes the mailing list selection functionality once the DOM is fully loaded.
 *
 * This event listener waits for the `DOMContentLoaded` event, then performs the following tasks:
 * 
 * - Adds the selected mailing lists from checkbox inputs to a hidden field in the form.
 * - Updates the hidden field every time the user checks or unchecks a mailing list.
 *
 * The hidden input `selected_mail_lists` is created if it doesn't exist, and the list of selected mailing
 * lists (checkbox values) is updated in real-time when checkboxes are modified.
 *
 * Tasks:
 * 1. On page load, binds the `change` event to any checkbox with a name starting with 'mail_lists['.
 * 2. When a checkbox is checked or unchecked, the function `addMailingListsToForm` collects the selected 
 *    mailing lists and appends or updates the hidden input in the form with a comma-separated list of the 
 *    selected values.
 *
 * This ensures that the selected mailing lists are submitted along with the form.
 *
 * @return void
 */
document.addEventListener('DOMContentLoaded', function() {
    /**
     * Collects selected mailing list checkboxes and adds their values to the form.
     *
     * - Gathers the values of all checkboxes with names starting with 'mail_lists['.
     * - Ensures a hidden input field with name 'selected_mail_lists' exists in the form.
     * - Updates the hidden input field with a comma-separated string of selected mailing list values.
     *
     * @return void
     */
    function addMailingListsToForm() {
        let selectedMailLists = [];
        let checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
        
        // Collect the values of checked mailing list checkboxes
        checkboxes.forEach(function(checkbox) {
            if (checkbox.name.startsWith('mail_lists[')) {
                selectedMailLists.push(checkbox.value);
            }
        });
        
        let form = document.querySelector('form'); // Adjust this selector to your specific form
        if (form) {
            // Check if the hidden input for selected mailing lists already exists
            let existingInput = form.querySelector('input[name="selected_mail_lists"]');
            if (existingInput) {
                // Update the existing hidden input's value
                existingInput.value = selectedMailLists.join(',');
            } else {
                // Create a hidden input if it doesn't exist
                let hiddenInput = document.createElement('input');
                hiddenInput.type = 'hidden';
                hiddenInput.name = 'selected_mail_lists';
                hiddenInput.value = selectedMailLists.join(',');
                form.appendChild(hiddenInput);
            }
        }
    }
    
    // Add event listener to all checkboxes related to mailing lists
    let checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function(checkbox) {
        if (checkbox.name.startsWith('mail_lists[')) {
            // Bind the change event to update the mailing lists in the form when checked/unchecked
            checkbox.addEventListener('change', addMailingListsToForm);
        }
    });
});
