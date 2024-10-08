<?php

// Enqueue scripts and styles

function rcd_tract_enqueue_scripts() {
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
