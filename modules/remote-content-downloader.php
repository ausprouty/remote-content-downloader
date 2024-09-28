<?php
/**
 * Registers a function to handle download requests when a specific query parameter is present.
 * 
 * This code listens for the `rcd_download` query parameter in the URL. If found, it triggers the download process 
 * by calling `rcd_download_content()`. This process involves verifying the nonce for security, fetching the remote file, 
 * and serving it to the user as a downloadable attachment.
 */

// Hook into the template redirect to listen for download requests
add_action('template_redirect', 'rcd_handle_download_request');

/**
 * Handles the download request by checking for the 'rcd_download' query parameter.
 * 
 * If the 'rcd_download' query parameter is present in the URL, this function will trigger the content download by calling `rcd_download_content()`.
 * 
 * Example URL structure:
 * - https://example.com/?rcd_download=true&remote_url=https%3A%2F%2Fexample.com%2Ffile.pdf&filename=example.pdf&_wpnonce=xxxxxx
 *
 * @return void
 */
function rcd_handle_download_request() {
    // Check if the 'rcd_download' query parameter is present in the URL
    if (isset($_GET['rcd_download'])) {
        rcd_download_content(); // Initiate the content download
    }
}

/**
 * Downloads content from a remote URL and serves it as a downloadable file.
 * 
 * This function verifies that the request is valid by checking the nonce for security. It then retrieves content from the remote URL and serves it 
 * as a downloadable file with the specified filename.
 *
 * @return void
 */
function rcd_download_content() {
    // Verify that the 'rcd_download' parameter is present and the nonce is valid
    if (!isset($_GET['rcd_download']) || !wp_verify_nonce($_GET['_wpnonce'], 'rcd_download_nonce')) {
        wp_die('Invalid request.');
    }

    // Decode the remote URL and filename from the URL parameters
    $remote_url = urldecode($_GET['remote_url']);
    $filename = urldecode($_GET['filename']);

    // Fetch the remote content using wp_remote_get
    $response = wp_remote_get($remote_url);

    // Check for errors in the remote request
    if (is_wp_error($response)) {
        wp_die('Failed to download content.');
    }

    // Retrieve the body of the response (the content of the remote file)
    $content = wp_remote_retrieve_body($response);

    // Set the headers to force the browser to download the content as a file
    header('Content-Type: application/octet-stream'); // General binary content
    header('Content-Disposition: attachment; filename="' . basename($filename) . '"'); // Use the specified filename for the download
    header('Content-Length: ' . strlen($content)); // Set the content length for the download

    // Output the content of the file
    echo $content;
    exit; // Terminate the script after serving the file
}
