<?php
function rcd_tracts_bilingual_booklet_select_form() {
    // Pass the specific tract type to the common form renderer
    return rcd_render_tract_form('bilingual-booklet');
}
add_shortcode('rcd_tracts_select_bilingual_booklet', 'rcd_tracts_bilingual_booklet_select_form');
?>
