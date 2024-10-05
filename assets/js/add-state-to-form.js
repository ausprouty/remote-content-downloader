/**
 * This script dynamically updates the state options in a `<select>` element based on the selected country
 * (Australia or the United States).
 *
 * When a user selects "Australia" or "United States" from the country dropdown (`<select>`),
 * the appropriate states for that country are displayed in the state dropdown. For all other countries,
 * the state dropdown is hidden.
 *
 * - US states are sourced from `us_options`.
 * - Australian states are sourced from `au_options`.
 * - A default "SELECT STATE:" option is added to the top of the dropdown.
 *
 * Tasks:
 * 1. Listens for the 'change' event on the 'country' dropdown (`<select>` element with id `country`).
 * 2. Updates the state dropdown (`<select>` element with id `state`) dynamically based on the selected country.
 * 3. Hides the state dropdown if a country other than Australia or the United States is selected.
 *
 * Elements used:
 * - `#country`: A dropdown where users select their country.
 * - `#state-container`: A container element to control the visibility of the state dropdown.
 * - `#state`: The dropdown where state options are populated dynamically.
 *
 * @return void
 */
jQuery(document).ready(function($) {
    // Handle country selection and update state options dynamically
    $('#country').on('change', function() {
        var country = $(this).val();   // Get selected country
        var stateSelect = $('#state'); // State dropdown element
        stateSelect.empty();           // Clear existing options

        // Populate state dropdown based on selected country
        if (country === 'Australia') {
            populateStateSelect(['NSW', 'QLD', 'SA', 'TAS', 'VIC', 'WA', 'ACT', 'NT']);
        } else if (country === 'United States') {
            populateStateSelect(['AL', 'AK', 'AZ', 'CA', /* other US states */]);
        } else {
            $('#state-container').hide(); // Hide state dropdown if country is neither Australia nor US
            return;
        }

        $('#state-container').show(); // Show state dropdown if a valid country is selected
    });

    /**
     * Populates the state dropdown with options.
     *
     * @param {Array} states - An array of state abbreviations to populate the dropdown with.
     * @return void
     */
    function populateStateSelect(states) {
        var stateSelect = $('#state');
        stateSelect.append('<option value="">SELECT STATE:</option>'); // Default option
        $.each(states, function(i, state) {
            stateSelect.append('<option value="' + state + '">' + state + '</option>'); // Add each state
        });
        stateSelect.show(); // Display the dropdown
    }
});
