<?php
/*
Plugin Name: Remote Content Downloader
Description: To interact with database.
Version: 1.0
Author: Bob Prouty
*/

// Define plugin directory
define('RCD_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('RCD_PLUGIN_URL', plugin_dir_url(__FILE__));

// Include logging functions
include_once RCD_PLUGIN_DIR . 'logging-functions.php';

// Include module files
function rcd_include_modules() {
    $modules_dir = RCD_PLUGIN_DIR . 'modules/';
    
    // Scan the modules directory
    $modules = array_filter(glob($modules_dir . '*'), 'is_dir');
    
    foreach ($modules as $module_dir) {
        $module_name = basename($module_dir);
        $module_file = $modules_dir . $module_name . '/' . $module_name . '.php';
        if (file_exists($module_file)) {
            writeLogDebug('rcd_include_modules', $module_file);
            include_once $module_file;
        }
    }
}
add_action('plugins_loaded', 'rcd_include_modules');

// Localize variables without enqueuing scripts
function rcd_localize_variables() {
    wp_register_script('rcd-dummy-handle', ''); // Register a dummy script handle

    $localize_data = array(
        'apiEndpoint' => API_ENDPOINT,
    );

    wp_localize_script('rcd-dummy-handle', 'RCDSettings', $localize_data); // Localize the variables
    wp_enqueue_script('rcd-dummy-handle'); // Enqueue the dummy script to make the localized variables available
}
add_action('wp_enqueue_scripts', 'rcd_localize_variables');
