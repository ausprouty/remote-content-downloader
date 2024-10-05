<?php

/*
Plugin Name: RCD Link Select
Description: A form to select and download resources.
Version: 1.1
Author: Your Name
*/

// Define constants
define('RCD_LINK_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('RCD_LINK_PLUGIN_URL', plugin_dir_url(__FILE__));

// Include the form rendering file
include_once RCD_LINK_PLUGIN_DIR . 'includes/rcd-render-link-form.php';

// Include the script/style enqueuing file
include_once RCD_LINK_PLUGIN_DIR . 'includes/rcd-enqueue-link-scripts.php';

// Unified shortcode function
function rcd_link_select_form($atts) {
    // Set default attributes and merge with incoming attributes
    $atts = shortcode_atts(array(
        'file' => '', // default file attribute
        'name' => '', // default name attribute
        'mail_lists' => array()
    ), $atts, 'rcd_link_select');

    // Pass the attributes to the common form renderer
    return rcd_render_link_form($atts);
}
add_shortcode('rcd_link_select', 'rcd_link_select_form');
