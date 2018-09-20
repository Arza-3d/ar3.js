// ar3-short-code.js
// required jQuery
// create <button>
(function() {
    'use strict';
    var shortCode = 'short code',
        showAllCode = 'show all code',
        newElement = !$('body').hasClass('r3-short-code_done');

    if (newElement) {
        $('pre + pre').css('display', 'none')
            .before('<button class="r3-short-code">'+ shortCode + '</button>');
    }

    $('.r3-short-code').click(function() {
        if ($(this).hasClass('r3-active')) {
            this.innerHTML= showAllCode;
            $(this).prev().delay(300).toggle(600);
            $(this).next().toggle(300);
        } else {
            this.innerHTML= shortCode;
            $(this).prev().toggle(300);
            $(this).next().delay(300).toggle(600);
        }
        $(this).toggleClass('r3-active');
    });

    $('body').addClass('r3-short-code_done');
})();
