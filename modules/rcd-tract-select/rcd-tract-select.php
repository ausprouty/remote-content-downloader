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

function rcd_tract_enqueue_global_scripts() {
    // Enqueue CSS
    wp_enqueue_style('rcd-tract-style', RCD_TRACT_PLUGIN_URL . 'css/style.css');

    // Enqueue JavaScript files (alphabetically)
    wp_enqueue_script('rcd-contact-options', RCD_TRACT_PLUGIN_URL . 'js/rcd-contact-options.js', array('jquery'), null, true);
    wp_enqueue_script('rcd-lang1-options', RCD_TRACT_PLUGIN_URL . 'js/rcd-lang1-options.js', array('jquery'), null, true);
    wp_enqueue_script('rcd-lang2-options', RCD_TRACT_PLUGIN_URL . 'js/rcd-lang2-options.js', array('jquery'), null, true);
    wp_enqueue_script('rcd-papersize-options', RCD_TRACT_PLUGIN_URL . 'js/rcd-papersize-options.js', array('jquery'), null, true);
}
add_action('wp_enqueue_scripts', 'rcd_tract_enqueue_global_scripts');

// Include shortcode files
include_once RCD_TRACT_PLUGIN_DIR . 'includes/shortcode-bilingual-booklet.php';
include_once RCD_TRACT_PLUGIN_DIR . 'includes/shortcode-bilingual-page.php';
include_once RCD_TRACT_PLUGIN_DIR . 'includes/shortcode-foreign-bilingual-booklet.php';
include_once RCD_TRACT_PLUGIN_DIR . 'includes/shortcode-single-language-booklet.php';
include_once RCD_TRACT_PLUGIN_DIR . 'includes/shortcode-single-language-page.php';
