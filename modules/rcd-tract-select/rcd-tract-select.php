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

// Include the form file
include_once RCD_TRACT_PLUGIN_DIR . 'includes/rcd-render-tract-form.php';

// Enqueue global scripts and styles
function rcd_tract_enqueue_global_scripts() {
    wp_enqueue_style('rcd-tract-style', RCD_TRACT_PLUGIN_URL . 'css/rcd-tract.css');
    wp_enqueue_script('rcd-tract-form-options', RCD_TRACT_PLUGIN_URL . 'js/rcd-tract-form-options.js', array('jquery'), null, true);
}
add_action('wp_enqueue_scripts', 'rcd_tract_enqueue_global_scripts');

// Unified shortcode function
function rcd_tract_select_form($atts) {
    // Set default attributes and merge with incoming attributes
    $atts = shortcode_atts(array(
        'type' => 'bilingual-page' // default tract type
    ), $atts, 'rcd_tract_select');

    // Pass the tract type to the common form renderer
    return rcd_render_tract_form($atts['type']);
}
add_shortcode('rcd_tract_select', 'rcd_tract_select_form');
