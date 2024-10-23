<?php

// Register AJAX handler with the correct action name
add_action('wp_ajax_rcd_link_render_dynamic', 'rcd_link_render_dynamic');
add_action('wp_ajax_nopriv_rcd_link_render_dynamic', 'rcd_link_render_dynamic');

// Define the callback function for the AJAX request
function rcd_link_render_dynamic() {
    // Sanitize incoming data
    $file = sanitize_text_field($_POST['file']);
    $name = sanitize_text_field($_POST['name']);
    $mail_lists = sanitize_text_field($_POST['mail_lists']);

    // Construct and render the shortcode
    $shortcode = "[rcd_link_select file='$file' name='$name' mail_lists='$mail_lists']";
    echo do_shortcode($shortcode);

    wp_die(); // Properly terminate the request
}
