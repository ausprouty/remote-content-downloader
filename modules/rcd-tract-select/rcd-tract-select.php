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

// Include the form file
include_once RCD_TRACT_PLUGIN_DIR . 'includes/rcd-render-tract-form.php';
writeLog("rcd-tract-select-15", 'rcd-tract-select');
function rcd_tract_enqueue_global_scripts() {
    // Enqueue CSS
    wp_enqueue_style('rcd-tract-style', RCD_TRACT_PLUGIN_URL . 'css/rcd-tract.css');

    // Enqueue JavaScript files 
    wp_enqueue_script('rcd-tract-form-options', RCD_TRACT_PLUGIN_URL . 'js/rcd-tract-form-options.js', array('jquery'), null, true);
}   
add_action('wp_enqueue_scripts', 'rcd_tract_enqueue_global_scripts');
writeLog("rcd-tract-select-24", 'rcd-tract-select');
// Include shortcode files
include_once RCD_TRACT_PLUGIN_DIR . 'includes/shortcode-bilingual-book.php';
include_once RCD_TRACT_PLUGIN_DIR . 'includes/shortcode-bilingual-page.php';
include_once RCD_TRACT_PLUGIN_DIR . 'includes/shortcode-foreign-bilingual-book.php';
include_once RCD_TRACT_PLUGIN_DIR . 'includes/shortcode-single-language-book.php';
include_once RCD_TRACT_PLUGIN_DIR . 'includes/shortcode-single-language-page.php';
