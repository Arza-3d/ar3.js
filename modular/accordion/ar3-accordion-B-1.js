/*######################
// ar3-accordion-B.js  #
######################*/
/*--------------------------
https://arza-3d.github.io/ar3.js/

<script src="https://raw.githack.com/Arza-3d/ar3.js/master/modular/accordion/ar3-accordion-B-1.js"></script>
--------------------------*/

{
    let accordTarget = $('body').attr('data-accordion-B-r3'),
        isValid = accordTarget !== undefined;
    if (isValid) {
        $(accordTarget).addClass('r3-accordion-B');
    }

    $('.r3-accordion-B').click(function() {
        $(this).toggleClass('r3-active')
            .next().next().slideToggle('slow');
    });
}
