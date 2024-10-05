<?php


function rcd_render_tract_form($tract_type) {
    writeLog("rcd_render_tract_form-1", 'rcd_render_tract_form');

    ob_start();
    ?>
    <form id="rcd-tract-form" data-form-type="<?php echo esc_attr($tract_type); ?>">

        <div>
            <label for="lang1">I want to share the Gospel with a person who reads:<br></label>
            <select id="lang1" name="lang1">
                <option value="">Select a language...
                </option>
                <!-- Add options dynamically based on API call if needed -->
            </select>
        </div>
        <?php if ($tract_type === 'bilingual-page' || $tract_type === 'bilingual-book') : ?>
            <!--  Get the second language options-->
            <div id="lang2-container" style="visibility:hidden;">
                <label for="lang2">I also want the tract to have text in:</label>
                <select id="lang2" name="lang2" >
                </select>
            </div>
        <?php endif; ?>

        <!--  Get the audience options-->
        <div id="audience-container" style="visibility:hidden;">
            <label for="audience">Audience </label>
            <select id="audience" name="audience" >
            </select>
        </div>
            
        <!--  Get the paper-size options-->
        <div id="papersize-container" style="visibility:hidden;">
            <label for="papersize">Paper size</label>
            <select id="papersize" name="papersize" >
            </select>
        </div>
        <!--  Get contact options-->
        <div id="contact-container" style="visibility:hidden;">
            <label for="contact">
                For further information, they should contact ministries in:
            </label>
            <select id="contact" name="contact" >
            </select>
        </div>
        <!--  Select Object-->
        <div id="approval-container" style="visibility:hidden;">
            <button>Tract Found.  Press to continue..</button>
           
        </div>
        
    </form>
    <div id="rcd-tract-results"></div>
    <?php
    return ob_get_clean();
}

?>






