<?php
/*
Plugin Name: RCD Tracts Select
Description: A form to select and retrieve tract from an external API.
Version: 1.1
Author: Your Name
*/

// Define constants
define('RCD_TRACT_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('RCD_TRACT_PLUGIN_URL', plugin_dir_url(__FILE__));

add_shortcode('rcd_tract_select', 'rcd_tract_select_form');


add_action('wp_enqueue_scripts', 'rcd_tract_check_enqueue_scripts');

// Unified shortcode function
function rcd_tract_select_form($atts) {
    writeLog("rcd_tract_select_form-17", 'rcd_tract_select_form');
    // Include the form rendering file
    include_once RCD_TRACT_PLUGIN_DIR . 'includes/rcd-tract-form-renderer.php';
  
    writeLog("rcd_tract_select_form-27", 'rcd_tract_select_form');
    // Set default attributes and merge with incoming attributes
    $atts = shortcode_atts(array(
        'type' => 'bilingual-book' // default tract type
    ), $atts, 'rcd_tract_select');

    // Pass the tract type to the common form renderer
    return rcd_render_tract_form($atts['type']);
}

function rcd_tract_check_enqueue_scripts() {
    // Check if the shortcode exists on the page
    global $post;
    if (has_shortcode($post->post_content, 'rcd_tract_select')) {
        // Enqueue jQuery if not already included
        wp_enqueue_script('jquery');

        // Enqueue jQuery UI Dialog for modal functionality
        wp_enqueue_script('jquery-ui-dialog');

        // Enqueue jQuery UI CSS for the dialog styling
        wp_enqueue_style('jquery-ui-css', 'https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css');

        // Enqueue custom JS  for the form
        wp_enqueue_script('rcd-tract-options', RCD_TRACT_PLUGIN_URL . 'js/rcd-tract-form-options.js', array('jquery'), null, true);

        // Enqueue custom CSS for the form
        wp_enqueue_style('rcd-tract-select-css', RCD_TRACT_PLUGIN_URL . 'css/rcd-tract-select.css', array(), null, 'all');
    }
    
}


