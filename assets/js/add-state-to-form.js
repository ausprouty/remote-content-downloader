/**
 * This script initializes once the DOM is fully loaded and dynamically updates
 * the state options in a select element based on the selected country (Australia or the United States).
 *
 * When a user selects either "Australia" or "United States" from a country dropdown (`<select>`),
 * the relevant state options are displayed in the state dropdown. For other countries, the state dropdown is hidden.
 *
 * - US states are sourced from `us_options`.
 * - Australian states are sourced from `au_options`.
 * - A default "SELECT STATE:" option is added at the top of the dropdown.
 *
 * Tasks:
 * 1. Listens for the 'change' event on the 'country' `<select>` element.
 * 2. Updates the available state options dynamically based on the selected country.
 * 3. Hides the state dropdown if a country other than Australia or the United States is selected.
 *
 * Elements used:
 * - `country` (id): A dropdown where users select their country.
 * - `state-container` (id): A container element to control the visibility of the state select dropdown.
 * - `state` (id): The dropdown where state options are populated dynamically.
 * - `state-label` (id): Optional label for the state dropdown (although not directly used here).
 *
 * @return void
 */
document.addEventListener('DOMContentLoaded', function() {
    
    // Array of US state abbreviations
    const us_options =  [
        "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", 
        "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", 
        "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", 
        "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", 
        "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
    ];
    
    // Array of Australian state/territory abbreviations
    const au_options = [
        "NSW", "QLD", "SA", "TAS", "VIC", "WA", "ACT", "NT"
    ];
    
    /**
     * Updates the state dropdown based on the selected country.
     * - Hides the state select if the country is not "Australia" or "United States."
     * - Populates the state dropdown with appropriate options for the selected country.
     *
     * @return void
     */
    function updateStateOptions() {
        const country = document.getElementById('country').value;  // Get the selected country
        const stateContainer = document.getElementById('state-container'); // Container for the state dropdown
        const stateSelect = document.getElementById('state'); // State select element
        const stateLabel = document.getElementById('state-label'); // Label for the state (optional)
        
        // Hide and reset the state select
        stateSelect.style.display = 'none';
        stateSelect.innerHTML = '';  // Clear any previous options
        
        // If the country is Australia or the United States, show and update the state dropdown
        if (country === 'Australia' || country === 'United States') {
            stateContainer.style.visibility = 'visible'; // Show state container
            stateSelect.style.display = 'block'; // Display state select
    
            // Determine which options to load based on the selected country
            let options;
            if (country === 'Australia') {
                options = au_options;
            } else if (country === 'United States') {
                options = us_options;
            }

            // Add the default "SELECT STATE:" option at the top of the list
            const defaultOption = document.createElement('option');
            defaultOption.value = "";
            defaultOption.text = "SELECT STATE:";
            stateSelect.add(defaultOption);
            
            // Populate the state select with appropriate options
            options.forEach(function(option) {
                const opt = document.createElement('option');
                opt.value = option;
                opt.text = option;
                stateSelect.add(opt);
            });
        }
    }
    
    // Add an event listener for changes in the 'country' select dropdown
    document.getElementById('country').addEventListener('change', updateStateOptions);
});
