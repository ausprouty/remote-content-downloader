<?php
/**
 * This seems incomplete and superceeded by rcd_link_select shortcode
 * 
 * 
 * Registers a shortcode to display a request resource form.
 * 
 * This shortcode generates a form that allows users to request resources by submitting their email,
 * first name, and additional options such as prayer requests and group ideas. The form submission 
 * is handled by an admin-post action to download a resource file.
 *
 * Shortcode usage: 
 * - Add [rcd_request_resource_form] to a page or post to display the form.
 */

// Register the shortcode to display the request resource form
add_shortcode('rcd_request_resource_form', 'rcd_request_resource_form_shortcode');

/**
 * Outputs the HTML form for requesting a resource.
 * 
 * The form includes fields for prayer requests, email, first name, and options to select ideas for starting a group or multiplying groups. 
 * Upon submission, the form sends a POST request to the admin-post handler in WordPress to process the form and redirect the user to a resource.
 *
 * @return string The HTML of the request resource form
 */
function rcd_request_resource_form_shortcode() {
    ob_start(); // Start output buffering to capture form HTML
    ?>
    <form id="request-resource-form" class="bbp-form" method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>">
        <textarea name="prayer_request" class="bbp-textarea" placeholder="Please pray that we can connect people to Jesus and each other by"></textarea>
        <div class="bbp-form-group">
            <label><input type="checkbox" name="ideas_first_group" value="1" class="bbp-checkbox"> Give me ideas for starting my first group</label>
            <label><input type="checkbox" name="groups_multiply" value="1" class="bbp-checkbox"> I want to know how to get my groups to multiply</label>
        </div>
        <input type="email" name="email" class="bbp-input" placeholder="Email" required>
        <input type="text" name="first_name" class="bbp-input" placeholder="First Name" required>
        <div class="bbp-form-group">
            <select name="country" class="bbp-select" required>
                <option value="">Select Country</option>
                <option value="Korea">Korea</option>
                <option value="USA">USA</option>
                <option value="Australia">Australia</option>
                <!-- Add more countries as needed -->
            </select>
            <button type="submit" class="bbp-submit">Download Resource</button>
        </div>
        <input type="hidden" name="action" value="rcd_download_request_resource">
    </form>
    <?php
    return ob_get_clean(); // Return the form HTML
}

/**
 * Hook the form submission to admin-post actions.
 * 
 * These hooks handle form submissions for both logged-in and logged-out users. When the form is submitted, 
 * the request is handled by 'rcd_handle_request_form_submission' function.
 */
add_action('admin_post_nopriv_rcd_download_request_resource', 'rcd_handle_request_form_submission');
add_action('admin_post_rcd_download_request_resource', 'rcd_handle_request_form_submission');

/**
 * Handles the request resource form submission.
 * 
 * This function is called when the form is submitted. It processes the form input, sanitizes and validates the data, 
 * and then redirects the user to download a specific resource. If the action is invalid, it terminates the request.
 *
 * @return void
 */
function rcd_handle_request_form_submission() {
    // Verify the request action
    if (!isset($_POST['action']) || $_POST['action'] !== 'rcd_download_request_resource') {
        wp_die('Invalid request.');
    }

    // Sanitize and validate input data
    $prayer_request = sanitize_textarea_field($_POST['prayer_request']); // Sanitize the prayer request textarea input
    $ideas_first_group = isset($_POST['ideas_first_group']) ? 'Yes' : 'No'; // Check if 'ideas for starting my first group' checkbox is checked
    $groups_multiply = isset($_POST['groups_multiply']) ? 'Yes' : 'No'; // Check if 'groups to multiply' checkbox is checked
    $email = sanitize_email($_POST['email']); // Sanitize the email input
    $first_name = sanitize_text_field($_POST['first_name']); // Sanitize the first name input
    $country = sanitize_text_field($_POST['country']); // Sanitize the selected country input

    // URL for the resource the user is requesting
    $resource_url = 'https://hereslife.com/dev/order/display?fn=discovery/Discovery%20Study%20Bookmark%20-%20request.pdf';

    // Redirect the user to download the resource file
    wp_redirect($resource_url);
    exit; // Terminate the script after redirecting
}
