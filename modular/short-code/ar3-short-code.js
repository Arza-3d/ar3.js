// ar3-short-code.js
// required jQuery
// create <button>
(function() {
    'use strict';
    let constructNote = 'r3-short-code_done',
        newElement = !$('body').hasClass(constructNote);

    let shortCode = 'short code',
        longCode = 'show all code';

    if (newElement) {
        $('pre + pre').css('display', 'none')
            .before('<button class="r3-short-code">'+ shortCode + '</button>');
    }

    $('.r3-short-code').click(function() {
        if ($(this).hasClass('r3-active')) {
            this.innerHTML= longCode;
            $(this).prev().delay(300).toggle(600);
            $(this).next().toggle(300);
        } else {
            this.innerHTML= shortCode;
            $(this).prev().toggle(300);
            $(this).next().delay(300).toggle(600);
        }
        $(this).toggleClass('r3-active');
    });

    $('body').addClass(constructNote);
})();
