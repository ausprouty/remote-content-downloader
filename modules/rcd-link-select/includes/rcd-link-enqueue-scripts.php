<?php

// Enqueue scripts and styles for the RCD Link Select plugin
function enqueue_rcd_scripts_and_styles() {
    // Enqueue jQuery if not already included
    wp_enqueue_script('jquery');

    // Enqueue jQuery UI Dialog
    wp_enqueue_script('jquery-ui-dialog');

    // Enqueue jQuery UI CSS from an external source
    wp_enqueue_style('jquery-ui-css', 'https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css');

    // Enqueue custom JavaScript file for link select functionality
    wp_enqueue_script('rcd-link-select', plugin_dir_url(__FILE__) . '../js/rcd-link-select.js', array('jquery', 'jquery-ui-dialog'), null, true);

    // Enqueue custom CSS file for the form
    wp_enqueue_style('rcd-link-select-css', plugin_dir_url(__FILE__) . '../css/rcd-link-select.css', array(), null, 'all');

    // Pass the API key to the JavaScript file for AJAX requests
    wp_localize_script('add-mail-lists-to-form', 'hlApiConfig', array(
        'apiKey' => HL_API_KEY
    ));
}

// Hook into wp_enqueue_scripts to load scripts and styles
add_action('wp_enqueue_scripts', 'enqueue_rcd_scripts_and_styles');
