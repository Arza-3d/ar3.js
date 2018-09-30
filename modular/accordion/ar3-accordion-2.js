/*######################
// ar3-accordion-2.js  #
######################*/
/*--------------------------
https://arza-3d.github.io/ar3.js/

<script src="https://rawgit.com/Arza-3d/ar3.js/master/modular/accordion/ar3-accordion-2.js"></script>
--------------------------*/

{
    const $accordions = $('.r3-accordion');

    $accordions.click(function() {
        $(this).toggleClass('r3-active');
        // find panel
        let $panel = $(this).next();
        {
            let safeBreak = 0;
            while (!$panel.hasClass('r3-panel')) {
                $panel = $panel.next();
                safeBreak++;
                if (safeBreak > 5) {
                    break;
                }
            }
        }
        $panel.slideToggle('slow');
    });
}
