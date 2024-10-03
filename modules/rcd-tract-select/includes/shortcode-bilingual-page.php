<?php

add_shortcode('rcd_tract_select_bilingual_page', 'rcd_tract_bilingual_page_select_form');

function rcd_tract_bilingual_page_select_form() {
        // Pass the specific tract type to the common form renderer
        return rcd_render_tract_form('bilingual-page');
}






