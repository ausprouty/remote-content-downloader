<?php

add_shortcode('rcd_tract_select_foreign_bilingual_book', 'rcd_tract_foreign_bilingual_book_select_form');


function rcd_tract_foreign_bilingual_book_select_form() {
        // Pass the specific tract type to the common form renderer
        return rcd_render_tract_form('foreign-bilingual-book');
}






