<?php
function rcd_tract_bilingual_page_select_form($atts) {
    $atts = shortcode_atts(array(
        'tract_type' => 'bilingual-page',
    ), $atts);

    // Enqueue the relevant script
    rcd_tract_enqueue_scripts($atts['tract_type']);

    ob_start();
    ?>
    <form id="rcd-tract-page-form">
        <!-- Form fields for bilingual page -->
        <button type="submit">Submit</button>
    </form>
    <div id="rcd-tract-results"></div>
    <?php
    return ob_get_clean();
}
add_shortcode('rcd_tract_select_bilingual_page', 'rcd_tract_bilingual_page_select_form');
