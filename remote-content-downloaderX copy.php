<?php
/*
Plugin Name: Your Plugin
Description: A description of your plugin.
Version: 1.0
Author: Your Name
*/

function enqueue_module_scripts($module_name) {
    $plugin_url = plugin_dir_url(__FILE__);
    $script_path = "modules/{$module_name}/script.js";

    if (file_exists(plugin_dir_path(__FILE__) . $script_path)) {
        wp_enqueue_script(
            "{$module_name}-script", 
            $plugin_url . $script_path, 
            array('jquery'), 
            null, 
            true
        );
    }
}

// Conditionally load scripts based on module
add_action('wp_enqueue_scripts', function() {
    if (is_page('page-with-module1')) {
        enqueue_module_scripts('module1');
    } elseif (is_page('page-with-module2')) {
        enqueue_module_scripts('module2');
    }
});
