<?php
/*
 * Plugin Name: RCD Spirit Select
 * Description: Fetches and displays languages in which the Spirit Filled life is available.  When selected it will display the resource available in that language.
 */

// Add a shortcode to display the API result
function rcd_spirit_select_shortcode() {

    // Enqueue the JavaScript file for the shortcode
    wp_enqueue_script(
        'rcd-spirit-select-script', 
        plugin_dir_url(__FILE__) . 'rcd_spirit_select.js', 
        array('jquery'), 
        null, 
        true
    );
    // establish endpoint
    $api_url = API_ENDPOINT . '/spirit/titles';
    writeLogDebug('rcd_spirit_select_shortcode', $api_url);

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

    // Output the API data in a select form
    ob_start();
    
    if (!empty($data)) {
        echo '<form id="spirit-form">';
        echo '<select id = "spirit-select" name="language">';
        
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
        echo '<div id="resource-container"></div>';
    } else {
        echo 'No data available.';
    }

    return ob_get_clean();
}

// Register the shortcode
add_shortcode('rcd_spirit_select', 'rcd_spirit_select_shortcode');

// Enqueue the shortcode in a template
function rcd_spirit_select_template() {
    echo do_shortcode('[rcd_spirit_select]');
}

// Hook into the appropriate action to display the API result on the front end
add_action('wp_footer', 'rcd_spirit_select_template');
?>