<?php
add_shortcode('rcd_request_resource_form', 'rcd_request_resource_form_shortcode');

function rcd_request_resource_form_shortcode() {
    ob_start();
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
    return ob_get_clean();
}

add_action('admin_post_nopriv_rcd_download_request_resource', 'rcd_handle_request_form_submission');
add_action('admin_post_rcd_download_request_resource', 'rcd_handle_request_form_submission');

function rcd_handle_request_form_submission() {
    if (!isset($_POST['action']) || $_POST['action'] !== 'rcd_download_request_resource') {
        wp_die('Invalid request.');
    }

    // Sanitize and validate input data
    $prayer_request = sanitize_textarea_field($_POST['prayer_request']);
    $ideas_first_group = isset($_POST['ideas_first_group']) ? 'Yes' : 'No';
    $groups_multiply = isset($_POST['groups_multiply']) ? 'Yes' : 'No';
    $email = sanitize_email($_POST['email']);
    $first_name = sanitize_text_field($_POST['first_name']);
    $country = sanitize_text_field($_POST['country']);

    // URL for the request resource
    $resource_url = 'https://hereslife.com/dev/order/display?fn=discovery/Discovery%20Study%20Bookmark%20-%20request.pdf';

    // Redirect to download the resource
    wp_redirect($resource_url);
    exit;
}