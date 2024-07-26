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

// Add the rest of your logging functions here...
function writeLog($filename, $content) {
    if (LOG_MODE !== 'write_log' && LOG_MODE !== 'write_time_log') {
        return;
    }
    $filename = validateFilename($filename);
    if (LOG_MODE == 'write_time_log') {
        $filename = time() . '-' . $filename;
    }
    $text = var_dump_ret($content);
    ensureLogDirectoryExists();
    $filePath = ROOT_LOG . $filename . '.txt';
    if (file_put_contents($filePath, $text) === false) {
        error_log("Failed to write log to $filePath");
    }
}

function writeLogAppend($filename, $content) {
    $filename = validateFilename($filename);
    $text = var_dump_ret($content);
    ensureLogDirectoryExists();
    $filePath = ROOT_LOG . 'APPEND-' . $filename . '.txt';
    if (file_put_contents($filePath, $text, FILE_APPEND | LOCK_EX) === false) {
        error_log("Failed to append log to $filePath");
    }
}

function writeLogDebug($filename, $content) {
    $filename = validateFilename($filename);
    $text = var_dump_ret($content);
    ensureLogDirectoryExists();
    $filePath = ROOT_LOG . 'DEBUG-' . $filename . '.txt';
    if (file_put_contents($filePath, $text) === false) {
        error_log("Failed to write debug log to $filePath");
    }
}

function writeLogError($filename, $content) {
    $filename = validateFilename($filename);
    $text = var_dump_ret($content);
    ensureLogDirectoryExists();
    $filePath = ROOT_LOG . 'ERROR-' . $filename . '.txt';
    if (file_put_contents($filePath, $text) === false) {
        error_log("Failed to write error log to $filePath");
    }
}

function var_dump_ret($mixed = null) {
    ob_start();
    var_dump($mixed);
    $content = ob_get_contents();
    ob_end_clean();
    return $content;
}

function ensureLogDirectoryExists() {
    if (!file_exists(ROOT_LOG)) {
        if (!mkdir(ROOT_LOG, 0755, true) && !is_dir(ROOT_LOG)) {
            throw new \RuntimeException(sprintf('Directory "%s" was not created', ROOT_LOG));
        }
    }
}

function validateFilename($filename) {
    if (empty($filename)) {
        $filename = 'log-' . time();
    }
    return preg_replace('/[^A-Za-z0-9_\-]/', '_', $filename); // Sanitize filename
}
?>
