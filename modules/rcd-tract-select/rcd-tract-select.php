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

// Unified shortcode function
function rcd_tract_select_form($atts) {

    // Include the form rendering file
    include_once RCD_TRACT_PLUGIN_DIR . 'includes/rcd-tract-form-renderer.php';
  
    // Include the script/style enqueuing file
    include_once RCD_TRACT_PLUGIN_DIR . 'includes/rcd-tract-enqueue-scripts.php';

    // Enqueue local scripts and styles
    add_action('wp_enqueue_scripts', 'rcd_tract_enqueue_scripts');

    // Set default attributes and merge with incoming attributes
    $atts = shortcode_atts(array(
        'type' => 'bilingual-book' // default tract type
    ), $atts, 'rcd_tract_select');

    // Pass the tract type to the common form renderer
    return rcd_render_tract_form($atts['type']);
}


