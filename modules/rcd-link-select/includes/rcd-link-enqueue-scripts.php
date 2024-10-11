<?php

// Enqueue scripts and styles for the RCD Link Select plugin
function enqueue_rcd_scripts_and_styles() {
    // Check if the shortcode exists on the page
    global $post;
    if (has_shortcode($post->post_content, 'rcd_link_select')) {
         // Enqueue jQuery (usually not necessary as it's often loaded by WordPress)
        if (!wp_script_is('jquery', 'enqueued')) {
            wp_enqueue_script('jquery');
        }

        // Enqueue jQuery UI Dialog for the popup functionality
        if (!wp_script_is('jquery-ui-dialog', 'enqueued')) {
            wp_enqueue_script('jquery-ui-dialog');
        }

        // Enqueue jQuery UI CSS from CDN
        if (!wp_style_is('jquery-ui-css', 'enqueued')) {
            wp_enqueue_style('jquery-ui-css', 'https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css');
        }

        // Enqueue the external script for popup functionality
        wp_enqueue_script('popup-js', RCD_LINK_PLUGIN_URL . 'js/rcd-link-popup.js', array('jquery'), null, true);
    
        // Localize script to pass dynamic data (file URL)
        wp_localize_script('popup-js', 'resourceFileUrl', esc_url($attributes['file']));
    
        // Enqueue custom JavaScript file for link select functionality
        wp_enqueue_script('rcd-link-select', RCD_LINK_PLUGIN_URL . 'js/rcd-link-select.js', array('jquery', 'jquery-ui-dialog'), null, true);

         // Enqueue create nonces for AJAX requests
         wp_enqueue_script('rcd-nonce', RCD_PLUGIN_URL . 'assets/js/rcd-nonce.js', array('jquery', 'jquery-ui-dialog'), null, true);
        
        // Enqueue add state to form functionality
        wp_enqueue_script('add-state-to-form', RCD_PLUGIN_URL . 'assets/js/add-state-to-form.js', array('jquery', 'jquery-ui-dialog'), null, true);
        
        // Enqueue add mail list to form functionality
        wp_enqueue_script('add-mail-lists-to-form', RCD_PLUGIN_URL . 'assets/js/add-mail-lists-to-form.js', array('jquery', 'jquery-ui-dialog'), null, true);     
        
        // Enqueue custom CSS file for the form
        wp_enqueue_style('rcd-link-select-css', plugin_dir_url(__FILE__) . '../css/rcd-link-select.css', array(), null, 'all');

    }
}

// Hook into wp_enqueue_scripts to load scripts and styles
add_action('wp_enqueue_scripts', 'enqueue_rcd_scripts_and_styles');
