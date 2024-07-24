<?php

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
