<?php
/*
 * Plugin Name: RCD Spirit Select
 * Description: Fetches and displays languages in which the Spirit Filled life is available. When selected it will display the resource available in that language.
 */

// Register the shortcode
add_shortcode('rcd_spirit_select', 'rcd_spirit_select_shortcode');

/**
 * Shortcode to display the language select form for Spirit Filled life resources.
 *
 * This shortcode fetches available languages from the API and displays them in a `<select>` dropdown. When a language
 * is selected and the form is submitted, the corresponding resource will be dynamically fetched and displayed
 * directly below the form (handled via JavaScript).
 *
 * @return string The generated HTML for the form or an error message if the API request fails.
 */
function rcd_spirit_select_shortcode() {
    // Enqueue the JavaScript file for handling form submission and API interactions
    wp_enqueue_script(
        'rcd-spirit-select-script', 
        plugin_dir_url(__FILE__) . 'rcd_spirit_select.js', 
        array('jquery'), 
        null, 
        true
    );

    // Establish the API endpoint for fetching the available languages
    $api_url = API_ENDPOINT . '/spirit/titles';
    writeLogDebug('rcd_spirit_select_shortcode', $api_url); // Log the API URL for debugging

    // Fetch the API data using `wp_remote_get`
    $response = wp_remote_get($api_url);

    // Check if the API request returned an error
    if (is_wp_error($response)) {
        return 'Unable to retrieve data from the API.';
    }

    // Retrieve the response body from the API call
    $body = wp_remote_retrieve_body($response);

    // Decode the JSON response from the API
    $data = json_decode($body, true);

    // Check for JSON decoding errors
    if (json_last_error() !== JSON_ERROR_NONE) {
        return 'Error decoding the JSON response.';
    }

    // Start output buffering to capture form HTML
    ob_start();
    
    // Check if data is available and output the form with the language select dropdown
    if (!empty($data)) {
        echo '<form id="spirit-form">';
        echo '<select id="spirit-select" name="language">';

        // Loop through each item in the API response and create an option element for each language
        foreach ($data as $item) {
            if (isset($item['languageName'])) {
                echo '<option value="' . esc_attr($item['languageName']) . '">' . esc_html($item['languageName']) . '</option>';
            }
        }
        
        echo '</select>';
        echo '<div class="wp-block-button">';
        echo '<button id="custom-button" type="submit" class="wp-block-button__link wp-element-button">View Resource</button>';
        echo '</div>';
        echo '</form>';
        echo '<div id="resource-container"></div>'; // This container will display the selected resource
    } else {
        echo 'No data available.';
    }

    // Return the generated HTML
    return ob_get_clean();
}
?>
