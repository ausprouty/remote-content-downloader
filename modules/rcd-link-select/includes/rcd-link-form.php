<?php



function rcd_render_link_form($atts) {
    // Include the country and state options for select
    include_once RCD_PLUGIN_DIR . 'includes/select-options.php';
    // Check if file and name query parameters are set
    $file = isset($_GET['file']) ? sanitize_text_field($_GET['file']) : $atts['file'];
    $name = isset($_GET['name']) ? sanitize_text_field($_GET['name']) : $atts['name'];

    if (empty($file) || empty($name)) {
        return '<p>Invalid file or name attribute.</p>';
    }

    ob_start(); ?>
    <a href="#" class="resource-download-link" data-file="<?= esc_attr($file) ?>">
        <?= esc_html($name) ?>
    </a>
    <div id="resource-download-form" style="display:none;">
        <form id="download-form">
            <!-- Always show email input field -->
            <label for="prayer">Email Address</label>
            <input type="email" id="email" name="email" placeholder="Email" autocomplete="off">

            <!-- These fields will be conditionally displayed based on the userID check -->
            <div id="conditional-fields" style="display:none;">
                <input type="text" id="first_name" name="first_name" placeholder="First Name" autocomplete="off">

                <!-- Country selection -->
                <div>
                    <select id="country" name="country">
                        <option value="">SELECT COUNTRY</option>
                        <?php foreach ($country_options as $country): ?>
                            <option value="<?= esc_html($country) ?>"><?= esc_html($country) ?></option>
                        <?php endforeach; ?>
                    </select>
                </div>

                <!-- State selection, hidden initially -->
                <div id="state-container" style="visibility:hidden;">
                    <select id="state" name="state" style="display:none;"></select>
                </div>
            </div>

            <!-- Mailing lists (Always visible) -->
            <?php foreach ($atts['mail_lists'] as $code): ?>
                <?php if (isset($mail_list_options[$code])): ?>
                    <div class="checkbox-group">
                        <input type="checkbox" id="<?= esc_attr($code) ?>" name="mail_lists[<?= esc_attr($code) ?>]" value="<?= esc_attr($code) ?>">
                        <label for="<?= esc_attr($code) ?>"><?= esc_html($mail_list_options[$code]) ?></label>
                    </div>
                <?php endif; ?>
            <?php endforeach; ?>

            <!-- Prayer request (Always visible) -->
            <label for="prayer">How can we pray for you?</label>
            <textarea id="prayer" name="prayer"></textarea>

            <button type="button" id="download-resource-button">Download Resource</button>
            <div id="error" style="color: red;"></div>
        </form>
    </div>
    <?php return ob_get_clean();
}
