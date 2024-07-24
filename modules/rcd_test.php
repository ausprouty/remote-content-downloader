<?php
/*
 * Plugin Name: RCD Test
 * Description: Fetches and displays data from the RCD Test API.
 */

// Add a shortcode to display the API result
function rcd_test_shortcode() {
    $api_url = 'https://api.hereslife.com/rcd/test';

    // Use wp_remote_get to fetch the API data
    $response = wp_remote_get($api_url);

    // Check if the response is valid
    if (is_wp_error($response)) {
        return 'Unable to retrieve data from the API.';
    }

    // Get the response body
    $body = wp_remote_retrieve_body($response);

    // Decode the JSON response
    $data = json_decode($body, true);

    // Check if decoding was successful
    if (json_last_error() !== JSON_ERROR_NONE) {
        return 'Error decoding the JSON response.';
    }

    // Output the API data
    ob_start();
    
    echo '<pre>' . print_r($data, true) . '</pre>';

    return ob_get_clean();
}

// Register the shortcode
add_shortcode('rcd_test', 'rcd_test_shortcode');

// Enqueue the shortcode in a template
function rcd_test_template() {
    echo do_shortcode('[rcd_test]');
}

// Hook into the appropriate action to display the API result on the front end
add_action('wp_footer', 'rcd_test_template');