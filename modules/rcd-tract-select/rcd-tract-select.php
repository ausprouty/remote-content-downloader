<?php
/*
Plugin Name: RCD Tracts Select
Description: A form to select and retrieve tract from an external API.
Version: 1.0
Author: Your Name
*/

// Define constants
define('RCD_TRACT_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('RCD_TRACT_PLUGIN_URL', plugin_dir_url(__FILE__));

// Enqueue common assets (if needed)
function rcd_tract_enqueue_global_scripts() {
    wp_enqueue_style('rcd-tract-style', RCD_TRACT_PLUGIN_URL . 'css/style.css');
}
add_action('wp_enqueue_scripts', 'rcd_tract_enqueue_global_scripts');

// Include shortcode files
include_once RCD_TRACT_PLUGIN_DIR . 'includes/shortcode-bilingual-booklet.php';
include_once RCD_TRACT_PLUGIN_DIR . 'includes/shortcode-bilingual-page.php';
include_once RCD_TRACT_PLUGIN_DIR . 'includes/shortcode-single-language-booklet.php';
