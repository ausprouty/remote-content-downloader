<?php

function enqueue_rcd_scripts_and_styles() {
    // Enqueue jQuery if not already included
    wp_enqueue_script('jquery');
    
    // Enqueue jQuery UI Dialog
    wp_enqueue_script('jquery-ui-dialog');
    
    // Enqueue jQuery UI CSS from an external source
    wp_enqueue_style('jquery-ui-css', 'https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css');
    
    // Enqueue custom JavaScript file
    wp_enqueue_script('rcd_link_select', plugin_dir_url(__FILE__) . 'rcd_link_select.js', array('jquery', 'jquery-ui-dialog'), null, true);
    
    // Enqueue custom CSS file
    wp_enqueue_style('rcd_link_select_css', plugin_dir_url(__FILE__) . 'rcd_link_select.css', array(), null, 'all');
}
add_action('wp_enqueue_scripts', 'enqueue_rcd_scripts_and_styles');


function rcd_link_select_shortcode($atts) {
    // Shortcode attributes
    $atts = shortcode_atts(array(
        'file' => '', // Actual file name
        'name' => ''  // User-friendly name
    ), $atts, 'rcd_link_select');
    
    if (empty($atts['file']) || empty($atts['name'])) {
        return '<p>Invalid file or name attribute.</p>';
    }
    
  // Output the hyperlink
    $output = '<a href="#" class="resource-download-link" data-file="' . esc_attr($atts['file']) . '">' . esc_html($atts['name']) . '</a>';
    $output .= '<div id="resource-download-form" style="display:none;">';
    $output .= '<form id="download-form">';
    $output .= '<input type="text" id="name" name="name" placeholder="Name" required>';
    $output .= '<input type="email" id="email" name="email" placeholder="Email" required>';
    $output .= '<input type="text" id="country" name="country" placeholder="Country" required>';
    $output .= '<input type="text" id="state" name="state" placeholder="State" required>';
    $output .= '<div class="checkbox-group">';
    $output .= '<input type="checkbox" id="checkbox1" name="checkbox1"><label for="checkbox1">Checkbox 1</label>';
    $output .= '<input type="checkbox" id="checkbox2" name="checkbox2"><label for="checkbox2">Checkbox 2</label>';
    $output .= '<input type="checkbox" id="checkbox3" name="checkbox3"><label for="checkbox3">Checkbox 3</label>';
    $output .= '</div>';
    
    $output .= '<textarea id="comments" name="comments" placeholder="How can we pray for you?"></textarea>';
    $output .= '<button type="button" id="download-resource-button">Download Resource</button>';
    $output .= '</form>';
    $output .= '</div>';
    return $output;
    }
add_shortcode('rcd_link_select', 'rcd_link_select_shortcode');

