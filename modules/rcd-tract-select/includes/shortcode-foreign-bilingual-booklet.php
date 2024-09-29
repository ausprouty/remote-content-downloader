<?php

add_shortcode('rcd_tract_foreign_select_bilingual_booklet', 'rcd_tract_foreign_bilingual_booklet_select_form');


function rcd_tract_foreign_bilingual_booklet_select_form() {

    ob_start();
    ?>
    <form id="rcd-tract-form">
        <div>
            <label for="lang1">I want to share the Gospel with a person who reads:</label>
            <select id="lang1" name="lang1">
                <option value="">Select a language...
                </option>
                <!-- Add options dynamically based on API call if needed -->
            </select>
        </div>
        
            <!--  Get the format options-->
            <div id="paper-size-container" style="visibility:hidden;">
            <label for="paper-size">Paper size</label>
            <select id="paper-size" name="paper-size" style="display:none;">
            </select>
        </div>
        <!--  Get contact options-->
        <div id="contacts-container" style="visibility:hidden;">
            <label for="contacts">
                For further information, they should contact ministries in:
            </label>
            <select id="contacts" name="contacts" style="display:none;">
            </select>
        </div>

        
    </form>
    <div id="rcd-tract-results"></div>
    <?php
    return ob_get_clean();
}

?>






