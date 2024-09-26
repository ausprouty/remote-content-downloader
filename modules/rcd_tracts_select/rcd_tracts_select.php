<?php
/*
Plugin Name: RCD Tracts Select
Description: A form to select and retrieve tracts from an external API.
Version: 1.0
Author: Your Name
*/

// Define constants
define('RCD_TRACTS_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('RCD_TRACTS_PLUGIN_URL', plugin_dir_url(__FILE__));

// Enqueue scripts
function rcd_tracts_enqueue_scripts() {
    wp_enqueue_script('rcd-tracts-select', RCD_TRACTS_PLUGIN_URL . 'rcd_tracts_select.js', array('jquery'), null, true);
    wp_localize_script('rcd-tracts-select', 'RCDSettings', array(
        'apiEndpoint' =>  API_ENDPOINT// Replace with your actual API endpoint
    ));
}
add_action('wp_enqueue_scripts', 'rcd_tracts_enqueue_scripts');

// Register shortcode for the form
function rcd_tracts_select_form() {
    ob_start();
    ?>
    <form id="rcd-tracts-form">
        <div>
            <label for="lang1">I want to share the Gospel with a person who reads:</label>
            <select id="lang1" name="lang1">
                <option value="">Select a language...
                </option>
                <!-- Add options dynamically based on API call if needed -->
            </select>
        </div>
        <!--  Get the second language options-->
        <div id="lang2-container" style="visibility:hidden;">
            <label for="lang2">I also want the tract to have text in:</label>
            <select id="lang2" name="lang2" style="display:none;">
            </select>
        </div>
         <!--  Get the second language options-->
         <div id="lang2-container" style="visibility:hidden;">
            <label for="lang2">I also want the tract to have text in:</label>
            <select id="lang2" name="lang2" style="display:none;">
            </select>
        </div>
         <!--  Get the format options-->
         <div id="format-container" style="visibility:hidden;">
            <label for="format">I want to:</label>
            <select id="format" name="format" style="display:none;">
            </select>
        </div>
        <!--  Get contact options-->
        <div id="format-contacts" style="visibility:hidden;">
            <label for="contacts">I want to:</label>
            <select id="contacts" name="contacts" style="display:none;">
            </select>
        </div>

        <button type="submit">Submit</button>
    </form>
    <div id="rcd-tracts-results"></div>
    <?php
    return ob_get_clean();
}
add_shortcode('rcd_tracts_select', 'rcd_tracts_select_form');
