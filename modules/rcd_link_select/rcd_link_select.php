<?php

function rcd_link_select_shortcode($atts) {
    // Shortcode attributes
    $atts = shortcode_atts(array(
        'file' => '', // Actual file name
        'name' => ''  // User-friendly name
    ), $atts, 'rcd_link_select');
    
    if (empty($atts['file']) || empty($atts['name'])) {
        return '<p>Invalid file or name attribute.</p>';
    }

    // Enqueue necessary scripts
    wp_enqueue_script('jquery');
    wp_enqueue_script('rcd_link_select', plugin_dir_url(__FILE__) . 'rcd_link_select.js', array('jquery'), null, true);

    // Output the hyperlink
    $output = '<a href="#" class="resource-download-link" data-file="' . esc_attr($atts['file']) . '">' . esc_html($atts['name']) . '</a>';
    $output .= '<div id="resource-download-form" style="display:none;">';
    $output .= '<form id="download-form">';
    $output .= '<label for="name">Name:</label><input type="text" id="name" name="name" required><br>';
    $output .= '<label for="email">Email:</label><input type="email" id="email" name="email" required><br>';
    $output .= '<label for="country">Country:</label><input type="text" id="country" name="country" required><br>';
    $output .= '<label for="state">State:</label><input type="text" id="state" name="state" required><br>';
    $output .= '<label for="checkbox1">Checkbox 1:</label><input type="checkbox" id="checkbox1" name="checkbox1"><br>';
    $output .= '<label for="checkbox2">Checkbox 2:</label><input type="checkbox" id="checkbox2" name="checkbox2"><br>';
    $output .= '<label for="checkbox3">Checkbox 3:</label><input type="checkbox" id="checkbox3" name="checkbox3"><br>';
    $output .= '<label for="comments">Comments:</label><textarea id="comments" name="comments"></textarea><br>';
    $output .= '<button type="button" id="download-resource-button">Download Resource</button>';
    $output .= '</form>';
    $output .= '</div>';

    return $output;
}
add_shortcode('rcd_link_select', 'rcd_link_select_shortcode');

// Handle AJAX request
function process_resource_download() {
    // Validate and sanitize input data
    $name = sanitize_text_field($_POST['name']);
    $email = sanitize_email($_POST['email']);
    $country = sanitize_text_field($_POST['country']);
    $state = sanitize_text_field($_POST['state']);
    $checkbox1 = isset($_POST['checkbox1']) ? 1 : 0;
    $checkbox2 = isset($_POST['checkbox2']) ? 1 : 0;
    $checkbox3 = isset($_POST['checkbox3']) ? 1 : 0;
    $comments = sanitize_textarea_field($_POST['comments']);
    $file = sanitize_text_field($_POST['file']);

    // Log or process the form data as needed
    // ...

    // Generate the file URL
    $file_url = site_url($file);

    wp_send_json_success(array('file_url' => $file_url));
}
add_action('wp_ajax_process_resource_download', 'process_resource_download');
add_action('wp_ajax_nopriv_process_resource_download', 'process_resource_download');

// Enqueue jQuery UI for the popup
function enqueue_jquery_ui() {
    wp_enqueue_script('jquery-ui-dialog');
    wp_enqueue_style('jquery-ui-css', '//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css');
}
add_action('wp_enqueue_scripts', 'enqueue_jquery_ui');
