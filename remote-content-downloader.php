<?php
/*
Plugin Name: Remote Content Downloader
Plugin URI: http://api.hereslife.com/
Description: A plugin to download content from a remote server.
Version: 1.0
Author: Bob Prouty
Author URI: http://hereslife.com/
License: GPL2
*/

// Include all form modules
foreach (glob(plugin_dir_path(__FILE__) . 'modules/*.php') as $module) {
    include_once $module;
}


register_activation_hook(__FILE__, 'rcd_activate');
register_deactivation_hook(__FILE__, 'rcd_deactivate');

function rcd_activate() {
    // Code to run when the plugin is activated
}

function rcd_deactivate() {
    // Code to run when the plugin is deactivated
}

add_action('init', 'rcd_initialize');

function rcd_initialize() {
    // Initialization code here
}

add_shortcode('rcd_download_link', 'rcd_download_link_shortcode');

function rcd_download_link_shortcode($atts) {
    $atts = shortcode_atts(array(
        'url' => '',
        'filename' => 'downloaded_file.zip',
    ), $atts, 'rcd_download_link');

    $nonce = wp_create_nonce('rcd_download_nonce');
    $url = add_query_arg(array(
        'rcd_download' => 1,
        'remote_url' => urlencode($atts['url']),
        'filename' => urlencode($atts['filename']),
        '_wpnonce' => $nonce
    ), home_url());

    return '<a href="' . esc_url($url) . '">Download ' . esc_html($atts['filename']) . '</a>';
}

add_action('template_redirect', 'rcd_handle_download_request');

function rcd_handle_download_request() {
    if (isset($_GET['rcd_download'])) {
        rcd_download_content();
    }
}

function rcd_download_content() {
    if (!isset($_GET['rcd_download']) || !wp_verify_nonce($_GET['_wpnonce'], 'rcd_download_nonce')) {
        wp_die('Invalid request.');
    }

    $remote_url = urldecode($_GET['remote_url']);
    $filename = urldecode($_GET['filename']);

    $response = wp_remote_get($remote_url);

    if (is_wp_error($response)) {
        wp_die('Failed to download content.');
    }

    $content = wp_remote_retrieve_body($response);

    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename="' . basename($filename) . '"');
    header('Content-Length: ' . strlen($content));

    echo $content;
    exit;
}