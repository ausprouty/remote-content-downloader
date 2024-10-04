<?php
function rcd_tracts_bilingual_book_select_form() {
    writeLog("rcd_tracts_bilingual_book_select_form-3", 'rcd_tracts_bilingual_book_select_form');    
    // Pass the specific tract type to the common form renderer
    return rcd_render_tract_form('bilingual-book');
}
add_shortcode('rcd_tract_select_bilingual_book', 'rcd_tracts_bilingual_book_select_form');
?>
