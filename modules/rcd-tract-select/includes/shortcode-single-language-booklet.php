<?php
function rcd_tracts_monolingual_booklet_select_form($atts) {
    $atts = shortcode_atts(array(
        'tract_type' => 'bilingual-booklet',
    ), $atts);

    // Enqueue the relevant script
    rcd_tracts_enqueue_scripts($atts['tract_type']);

    ob_start();
    ?>
    <form id="rcd-tracts-form">
        <div>
            <label for="lang1">I want to share the Gospel with a person who reads:</label>
            <select id="lang1" name="lang1">
                <option value="">Select a language...</option>
                <!-- Add options dynamically based on API call -->
            </select>
        </div>
        <!-- Additional form fields -->
        <button type="submit">Submit</button>
    </form>
    <div id="rcd-tracts-results"></div>
    <?php
    return ob_get_clean();
}
add_shortcode('rcd_tracts_select_monolingual_booklet', 'rcd_tracts_monolingual_booklet_select_form');
