<?php

add_shortcode('rcd_tract_select_monolingual_booklet', 'rcd_tract_monolingual_booklet_select_form');


function rcd_tract_monolingual_booklet_select_form() {
        // Pass the specific tract type to the common form renderer
        return rcd_render_tract_form('single-language-booklet');
}

    






