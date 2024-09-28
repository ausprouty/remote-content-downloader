<?php
function rcd_tracts_bilingual_page_select_form($atts) {
    $atts = shortcode_atts(array(
        'tract_type' => 'bilingual-page',
    ), $atts);

    // Enqueue the relevant script
    rcd_tracts_enqueue_scripts($atts['tract_type']);

    ob_start();
    ?>
    <form id="rcd-tracts-page-form">
        <!-- Form fields for bilingual page -->
        <button type="submit">Submit</button>
    </form>
    <div id="rcd-tracts-results"></div>
    <?php
    return ob_get_clean();
}
add_shortcode('rcd_tracts_select_bilingual_page', 'rcd_tracts_bilingual_page_select_form');
