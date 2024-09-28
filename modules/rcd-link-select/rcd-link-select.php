<?php
/*
Plugin Name: Link Select
Description: This creates a shortcode that displays a hyperlink that, when clicked, displays a form to download a resource.

It also prepopulates the form with the resource name and file name as well as options for the user to enter their name, email, country, state, and prayer request.

Based on the resource, it will select a series of emails that you can sign up for.

Version: 1.0
Author: Bob Prouty
*/

add_shortcode('rcd_link_select', 'rcd_link_select_shortcode');

function rcd_link_select_shortcode($atts) {
    enqueue_rcd_scripts_and_styles();

    // Shortcode attributes
    $atts = shortcode_atts(array(
        'file' => '', // Actual file name
        'name' => '', // User-friendly name
        'mail_lists' => array(), // Mail lists to sign up for
    ), $atts, 'rcd_link_select');
    
    // Ensure mail_lists is an array
    if (!is_array($atts['mail_lists'])) {
        if (!empty($atts['mail_lists'])) {
            $atts['mail_lists'] = explode(',', $atts['mail_lists']);
        } else {
            $atts['mail_lists'] = array();
        }
    }
    
    if (empty($atts['file']) || empty($atts['name'])) {
        return '<p>Invalid file or name attribute.</p>';
    }

    // Include necessary files for options and logging
    include_once plugin_dir_path(__FILE__) . '../../includes/select-options.php';
    writeLogDebug('link_select', $atts);

    // Output the hyperlink
    $output = '<a href="#" class="resource-download-link" data-file="' . esc_attr($atts['file']) . '">' . esc_html($atts['name']) . '</a>';
    $output .= '<div id="resource-download-form" style="display:none;">';
    $output .= '<form id="download-form">';
    $output .= '<input type="text" id="name" name="name" placeholder="Name" >';
    $output .= '<input type="email" id="email" name="email" placeholder="Email" >';

    // Get the country options
    $output .= '<div>';
    $output .= '<select id="country" name="country">';
    $output .= '<option value="">SELECT COUNTRY</option>';
    foreach ($country_options as $country) {
        $output .= '<option value="' . htmlspecialchars($country, ENT_QUOTES, 'UTF-8') . '">' . htmlspecialchars($country, ENT_QUOTES, 'UTF-8') . '</option>';
    }
    $output .= '</select>';
    $output .= '</div>';

    // Get the state options
    $output .= '<div id="state-container" style="visibility:hidden;">';
    $output .= '<select id="state" name="state" style="display:none;">';
    $output .= '</select>';
    $output .= '</div>';

    // Generate checkboxes for specified mail_lists
    foreach ($atts['mail_lists'] as $code) {
        $code = trim($code);
        writeLogAppend('link_select_mail_list', $code);
        if (isset($mail_list_options[$code])) {
            $output .= '<div class="checkbox-group">
                            <input type="checkbox" id="' . esc_attr($code) . '" name="mail_lists[' . $code . ']" value="' . esc_attr($code) . '">
                            <label for="' . esc_attr($code) . '">' . esc_html($mail_list_options[$code]) . '</label>
                        </div>';
        }
    }

    // Prayer Request
    $output .= '<label for="prayer">How can we pray for you?</label>';
    $output .= '<textarea id="prayer" name="prayer" placeholder="Write your prayer request here..."></textarea>';
    $output .= '<button type="button" id="download-resource-button">Download Resource</button>';
    $output .= '<div id="error" style="color: red;"></div>';
    $output .= '</form>';
    $output .= '</div>';

    return $output;
}

// Enqueue necessary scripts and styles
function enqueue_rcd_scripts_and_styles() {
    // Enqueue jQuery if not already included
    wp_enqueue_script('jquery');

    // Enqueue jQuery UI Dialog
    wp_enqueue_script('jquery-ui-dialog');

    // Enqueue jQuery UI CSS from an external source
    wp_enqueue_style('jquery-ui-css', 'https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css');

    // Enqueue custom JavaScript file
    wp_enqueue_script('rcd-link-select', plugin_dir_url(__FILE__) . 'rcd-link-select.js', array('jquery', 'jquery-ui-dialog'), null, true);

    // Enqueue add state to form file
    wp_enqueue_script('add-state-to-form', plugin_dir_url(__FILE__) . '../../includes/add-state-to-form.js', array('jquery', 'jquery-ui-dialog'), null, true);

    // Enqueue add mail list to form file
    wp_enqueue_script('add-mail-lists-to-form', plugin_dir_url(__FILE__) . '../../includes/add-mail-lists-to-form.js', array('jquery', 'jquery-ui-dialog'), null, true);

    // Enqueue custom CSS file
    wp_enqueue_style('rcd-link-select-css', plugin_dir_url(__FILE__) . 'rcd-link-select.css', array(), null, 'all');

    // Pass the API key to the JavaScript file
    wp_localize_script('add-mail-lists-to-form', 'hlApiConfig', array(
        'apiKey' => HL_API_KEY
    ));
}
?>